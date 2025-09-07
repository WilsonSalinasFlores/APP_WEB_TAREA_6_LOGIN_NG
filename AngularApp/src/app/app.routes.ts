import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente';
import { Usuarios } from './Administracion/usuarios/usuarios';
import { Roles } from './Administracion/roles/roles';
import { Accesos } from './Administracion/accesos/accesos';
import { NuevoCliente } from './cliente/nuevo-cliente/nuevo-cliente';
import { LoginComponent } from './Administracion/usuarios/login/login';
// Update the import path below to the correct location of UsuarioComponent



export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },

    {
        path: 'cliente',
        component: ClienteComponent,
        pathMatch: 'full'
    },
    {
        path: 'nuevo-cliente',
        component: NuevoCliente,
        pathMatch: 'full'
    },
    {
        path: 'editar-cliente/:parametro',
        component: NuevoCliente,
        pathMatch: 'full'
    },
    {
        path:"admin",
        children:[
                        {
                path: "",
                component: Usuarios
            },
            {
                path: "roles",
                component: Roles
            },
            {
                path: "accesos",
                component: Accesos
            }

        ]
    }    
];
