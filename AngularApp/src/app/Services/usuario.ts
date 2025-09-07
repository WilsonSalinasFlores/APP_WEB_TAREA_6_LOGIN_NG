import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, map } from 'rxjs';
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

  iniciarSesion(email: string, password: string): import('rxjs').Observable<boolean> {
    console.log("Iniciar Sesion");
    const ruta = this.rutaAPI + '/?email=' + email + '&password=' + password;
    return this.http.get<IUsuario[]>(ruta).pipe(
      catchError(this.manejoErrores),
      // Map the response to true if users exist, false otherwise
      map((usuarios: IUsuario[]) => !!usuarios && usuarios.length > 0)
    );
  }
}
