import { Component, ViewChild, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { SearchByNamePipe } from '../../core/pipes/search-empolyee.pipe';
import { Department } from '../../core/models/department.model';
import { DepartmentsService } from '../../core/services/department.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  imports: [CommonModule, SharedModule, FormsModule, NgSelectModule, SearchByNamePipe, RouterLink],
  providers: [EmployeeService, DepartmentsService]
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('relocateTemplate', { static: false }) relocateTemplate: any;
  modalRef!: BsModalRef;
  employees: Employee[] = [];
  departments: Department[] = []
  selectedEmployeeId: number | null = null;
  departmentId!: number;
  searchEmployeeValue: string = '';

  constructor(
    private employeeService: EmployeeService,
    private departmentsService: DepartmentsService,
    private modalService: BsModalService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  // #region Load Data
  private loadData(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
    this.departmentsService.getDepartments().subscribe(departments => this.departments = departments);
  }
  // #endregion

  // #region Relocate Employee
  showRelocateEmployee(employee: Employee): void {
    this.departmentId = employee.DepartmentID;
    this.selectedEmployeeId = employee.ID;
    this.modalRef = this.modalService.show(this.relocateTemplate, { class: 'modal-md' });
  }

  relocateEmployee(): void {
    if (this.selectedEmployeeId !== null && this.departmentId !== undefined) {
      let employee = this.employees.find(empolye => empolye.ID == this.selectedEmployeeId)
      if (employee?.DepartmentID !== this.departmentId) {
        const departmentName: string = this.departments.find(department => department.ID == this.departmentId)?.Name as string
        employee!.DepartmentID = this.departmentId
        employee!.DepartmentName = departmentName
        this.showToastrMessage(true);
      }
      else {
        this.showToastrMessage(false);
      }
    }
    else {
      this.showToastrMessage(false);
    }
    this.modalRef.hide();
  }
  // #endregion

  // #region Helpers
  private showToastrMessage(success: boolean): void {
    if (success) {
      this.toastrService.success('Employee Relocated');
    } else {
      this.toastrService.error('Employee Same Department');
    }
  }
  // #endregion
}
