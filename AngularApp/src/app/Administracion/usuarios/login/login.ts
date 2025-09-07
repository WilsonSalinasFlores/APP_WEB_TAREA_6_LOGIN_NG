import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../Services/usuario';

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
    // Implement login logic here
    console.log('Iniciar sesión con:', this.usuario);
    var i = this.usuarioServicio.iniciarSesion(this.usuario.username, this.usuario.password);
    if (i) {
      // Login exitoso
      // expiracion de la cookie en 5 minutos
      var date = new Date();
      date.setTime(date.getTime() + (5 * 60 * 1000));
      var expires = "expires=" + date.toUTCString();
      // Asegurarse de que la cookie sea segura y tenga SameSite=strict
      document.cookie = `username=${encodeURIComponent(this.usuario.username)}; ${expires}; httponly; path=/; secure; samesite=strict`;
      console.log('Login exitoso');
      sessionStorage.setItem('username', this.usuario.username);
      window.location.href = '/cliente';
    } else {
      // Login fallido
     Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
        confirmButtonText: 'Aceptar'

      });
      
    }
  }

}
