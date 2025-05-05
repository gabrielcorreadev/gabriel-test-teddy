import { Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AdminComponent } from './theme/layout/admin/admin.component';

export const routes: Routes = [
    {
        path: "",
        component: AdminComponent,
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
];
