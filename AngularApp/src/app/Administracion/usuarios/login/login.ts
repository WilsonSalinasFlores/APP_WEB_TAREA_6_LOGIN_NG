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
    if (this.usuarioServicio.iniciarSesion(this.usuario.username, this.usuario.password)) {
      // Login exitoso
      const expires = new Date(Date.now() + 5 * 60 * 1000).toUTCString(); // 5 minutos
      document.cookie = `username=${encodeURIComponent(this.usuario.username)}; path=/; httpOnly; secure; samesite=strict; expires=${expires}`;
      console.log('Login exitoso');

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
