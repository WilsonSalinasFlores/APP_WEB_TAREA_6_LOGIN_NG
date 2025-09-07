import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../Services/cliente';
import { ICliente } from '../Interfases/icliente';
import { Router, RouterLink } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-cliente',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink ],
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css']
})
export class ClienteComponent {
  lista_clientes$!: ICliente[];
  sessionVariable: string | null = null;

  constructor(private clienteServicio: ClienteService, private router: Router) { }
  ngOnInit() {

    const match = document.cookie.match(new RegExp('(^| )username=([^;]+)'));
    this.sessionVariable = match ? decodeURIComponent(match[2]) : null;
    if (!this.sessionVariable) {

      this.router.navigate(['login']);
      return
    }

    this.cargaTabla();
  }
  declare  Swal: any;
  cargaTabla() {
    this.clienteServicio.todos().subscribe(
      (clientes) => {
        this.lista_clientes$ = clientes;
      }
    );
  }
  eliminarCliente(id:number) {
    // Confirmar la eliminación con el usuario
      if (id != null) {

      Swal.fire({
                    title: "Estas seguro de eliminar el cliente?",
                    text: "No podrás revertir esto!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "rgba(214, 47, 47, 1)",
                    confirmButtonText: "Sí, elimínalo!"
                  }).then((result:any) => {
                      if (result.isConfirmed) {
                          this.clienteServicio.eliminarCliente(id).subscribe(() => {
                          this.cargaTabla(); // Recargar la tabla después de eliminar
                      });
                      Swal.fire({

                        title: "¡Eliminado!",
                        text: "El cliente ha sido eliminado.",
                        icon: "success"
                      });
                    }
                  });
      
      return
       
    }
  }
  variable_sesion() {
    sessionStorage.setItem('variable', 'valor');
  }
}