import { Injectable } from '@angular/core';
import {  Employee } from '../models/employee.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {
  private endpointEmployees = 'assets/data/employees.json'; 
  constructor(
    private ApiService: ApiService,
  ){}

  getEmployees(): Observable<Employee[]> {
    return this.ApiService.getAll(this.endpointEmployees);
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.ApiService.getById(this.endpointEmployees, id);
  }
 

}
