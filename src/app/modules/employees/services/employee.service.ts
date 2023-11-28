// employee.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      ID: 1,
      Name: 'Marshall Nichols',
      EmployeeId: 'LA-0215',
      Phone: '+264-625-1526',
      JoinDate: '12 Jun, 2015',
      Role: 'Web Designer',
      DepartmentId: 12
    },
    {
      ID: 2,
      Name: 'Debra Stewart',
      EmployeeId: 'LA-0216',
      Phone: '+264-625-4613',
      JoinDate: '28 July, 2015',
      Role: 'Web Developer',
      DepartmentId: 13
    },
  ];

  getEmployees(): Employee[] {
    return this.employees;
  }

  relocateEmployee(employeeId: number, newDepartmentId: number): boolean {
    const employeeIndex = this.employees.findIndex(emp => emp.ID === employeeId);

    if (employeeIndex !== -1 && this.employees[employeeIndex].DepartmentId !== newDepartmentId) {
      this.employees[employeeIndex].DepartmentId = newDepartmentId;
      return true;
    }

    return false;
  }
  
}
