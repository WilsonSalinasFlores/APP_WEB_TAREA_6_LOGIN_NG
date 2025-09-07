import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUsuario } from '../Interfases/iusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  authUsuario(email: string, password: string) {
    const url = `${this.rutaAPI}/?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return this.http.get<IUsuario>(url).pipe(
      catchError(this.manejoErrores)
    );
  }
  private readonly rutaAPI = 'https://localhost:7004/api/Usuario/auth';
  
  constructor(private http: HttpClient) {}

  manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
      console.log(msg);
    });
  }

}
