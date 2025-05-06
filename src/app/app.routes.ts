import { Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { UsuarioAutenticadoGuard } from './guards/usuario-autenticado.guard';
import { LoginComponent } from './theme/layout/login/login.component';
import { UsuarioNaoAutenticadoGuard } from './guards/usuario-nao-autenticado.guard';

export const routes: Routes = [
    {
        path: "",
        component: AdminComponent,
        canActivate: [UsuarioAutenticadoGuard],
        children: [
          {
            path: "",
            redirectTo: "clientes",
            pathMatch: "full",
          },
          {
            path: "clientes",
            component: ClientesComponent
          }
        ],
      },
      { path: 'login', 
        component: LoginComponent, 
        canActivate: [UsuarioNaoAutenticadoGuard]
      },
];
