import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../Services/usuario';
import { IUsuario } from '../../../Interfases/iusuario';

declare const Swal: any;

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  usuario = {
    username: '',
    password: ''
  };

  constructor(private usuarioServicio: UsuarioService) {}

  
  onLogin() {
    const email = this.usuario.username;
    const password = this.usuario.password;
    this.usuarioServicio.authUsuario(email, password).subscribe({
      next: (usuario: IUsuario) => {
        if (usuario.id && usuario.id !== 0) {
          // Guardar en cookie y sessionStorage
          const expires = Date.now() + 10 * 60 * 1000;
          document.cookie = `username=${encodeURIComponent(usuario.nombre)}; path=/; expires=${new Date(expires).toUTCString()}; SameSite=Strict; Secure`;
          sessionStorage.setItem('username', email);
          window.location.href = '/cliente';
          Swal.fire({
            icon: 'success',
            title: 'Sesión iniciada',
            text: 'Bienvenido, ' + usuario.nombre
          });

        } else {
          Swal.fire({
            icon: 'error',
            title: 'No ha iniciado sesión',
            text: 'Usuario o contraseña incorrectos.'
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
            title: 'No ha iniciado sesión',
            text: 'Usuario o contraseña incorrectos.'
        });
      }
    });
  }

}
