import { Routes } from '@angular/router';
import { LayoutsComponent } from './shared/components/layouts/layouts.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path:'login',
    loadComponent: () =>
    import('./components/auth/auth.component').then((x) => x.AuthComponent),

  },
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        redirectTo: 'departments',
        pathMatch: 'full'

      },
      {
        path: 'departments',
        loadComponent: () =>
          import('./components/departments/departments.component').then((x) => x.DepartmentsComponent),

      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./components/employees/employees.component').then((x) => x.EmployeeListComponent),

      }
    ],
    canActivate: [authGuard] 
  }

];
