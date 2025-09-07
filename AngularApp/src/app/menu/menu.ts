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
    const match = document.cookie.match(new RegExp('(^| )username=([^;]+)'));
    if (match) {
      this.sessionVariable = decodeURIComponent(match[2]);
      // Verifica si la cookie aún existe (no ha expirado)
      console.log('Cookie "username" encontrada:', match);
      this.inicioSession = true;
    } else {
      this.sessionVariable = null;
      this.inicioSession = false;
    }

    console.log('this.inicioSession:', this.inicioSession);
  }

  logout(): void {
    (document as Document).cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    sessionStorage.removeItem('username');
    this.inicioSession = false;
    window.location.href = '/login';
  }
}
