import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-menu',
  imports: [RouterLink,CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {

  sessionVariable: string | null = null;
  inicioSession: boolean = false;

  ngOnInit(): void {
    // Obtener el usuario desde una cookie llamada 'username'
    const match = document.cookie.match(new RegExp('(^| )username=([^;]+)'));
    this.sessionVariable = match ? decodeURIComponent(match[2]) : null;
    console.log(this.sessionVariable);
    if (this.sessionVariable) {
      this.inicioSession = true;
    } else {
      this.inicioSession = false;
    }
    console.log('this.inicioSession:', this.inicioSession);
  }
  logout() {
    sessionStorage.removeItem('username');
    this.inicioSession = false;
    window.location.href = '/login';
  }
}
