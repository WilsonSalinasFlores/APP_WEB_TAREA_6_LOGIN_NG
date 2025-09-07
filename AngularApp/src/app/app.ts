import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClienteComponent } from './cliente/cliente';
import { MenuComponent } from './menu/menu';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ClienteComponent, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ventasApp');
}
