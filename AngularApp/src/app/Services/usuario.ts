import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IUsuario } from '../Interfases/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly rutaAPI = 'https://localhost:7004/api/Usuario/auth';
  
  constructor(private http: HttpClient) {}

  manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
    });
  }

  iniciarSesion(email: string, password: string) {
    console.log("Iniciar Sesion");
    const ruta = this.rutaAPI + '/?email=' + email + '&password=' + password;
    return this.http.get<IUsuario[]>(ruta).pipe(catchError(this.manejoErrores));
  }
}
