import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService } from '../../Services/cliente';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nuevo-cliente',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevo-cliente.html',
  styleUrls: ['./nuevo-cliente.css'],
})
export class NuevoCliente implements OnInit {
  clienteForm: FormGroup = new FormGroup({});
  titulo_formulario: string = 'Registro de Nuevo Cliente';
  id: number = 0;
  Editar: boolean = false;

  constructor(
    private clienteServicio: ClienteService,
    private navegacion: Router,
    private parametrosRuta: ActivatedRoute,
    
  ) {
    this.clienteForm = new FormGroup({
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      
    });

    this.parametrosRuta.params.subscribe((params) => {
      if (params['parametro']) {
        this.titulo_formulario = 'Actualizar Datos del  Cliente';
        this.Editar = true;
        this.id = params['parametro'];
        this.clienteServicio.uncliente(this.id).subscribe((cliente) => {
          this.clienteForm.patchValue(cliente);
        });
      } else {
        this.clienteForm.reset();
        }
    });
        
  }

    ngOnInit(): void {}

  guardarCliente() {
    if (this.clienteForm.invalid) {
      return;
    }
    if (this.Editar) {
    const cliente = this.clienteForm.value;
    cliente.id = this.id;
    this.clienteServicio.editarCliente(cliente).subscribe((cliente) => {
      if (cliente == null) {
        alert('Error al actualizar el cliente');
        return;
      }
      alert('Cliente actualizado con exito');
      this.clienteForm.reset();
      console.log(cliente);
      this.navegacion.navigate(['']);
    });
    } else {
    const cliente = this.clienteForm.value;
    this.clienteServicio.guardarCliente(cliente).subscribe((algo: any) => {
      alert('Cliente guardado con exito');
      this.clienteForm.reset();
      console.log(algo);
      this.navegacion.navigate(['']);
    });
  }
}
}