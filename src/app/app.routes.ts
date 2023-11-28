import { Routes } from '@angular/router';
import { LayoutsComponent } from './shared/components/layouts/layouts.component';

export const routes: Routes = [
  {
    path:'',
    component:LayoutsComponent,
    children:[
      {
        path:'',
        redirectTo:'departments',
        pathMatch:'full'
        
      },
      {
        path:'departments',
        loadComponent: () =>
        import('./modules/departments/pages/index/index.component').then((x) => x.IndexComponent),
    
      },
      {
        path:'employees',
        loadComponent: () =>
        import('./modules/employees/pages/employee-list/employee-list.component').then((x) => x.EmployeeListComponent),
    
      }
    ]
}
    
];
