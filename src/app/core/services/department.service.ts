import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable()
export class DepartmentsService {
  private endpointDepartments = 'assets/data/departments.json';
  constructor(
    private ApiService: ApiService,
  ){}


  getDepartments(): Observable<Department[]> {
    return this.ApiService.getAll(this.endpointDepartments);
  }
  getDeparmentById(id: number): Observable<Department> {
    return this.ApiService.getById(this.endpointDepartments, id);
  }

  addDepartment(value:string): Observable<Department[]> {
    const newDepartment: Department = { ID: this.generateUniqueId(), Name:value };
    return this.getDepartments().pipe(
      map((departments) => {
        const updatedDepartments = [...departments, newDepartment];
        return updatedDepartments;
      })
    );
  }

  private generateUniqueId(): number {
    return Date.now();
  }



}
