import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { SharedModule } from '../../../../shared/components/shared/shared.module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, NgSelectModule,],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  modalRef!: BsModalRef;
  @ViewChild('relocateTemplate', { static: false }) relocateTemplate: any;
  employees: any = [];
  DB: any = [
    {
      ID: 12,
      Name: "D1",
      Selected: false
    },
    {
      ID: 13,
      Name: "D2",
      Selected: false
    }
  ];
  DBID: number = 0

  selectedEmployeeId: number | null = null
  constructor(
    private employeeService: EmployeeService,
    private modalService: BsModalService,
    private toastrService: ToastrService,


  ) { }

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }


  showRelocateEmployee(em: { DBID: number; id: number | null; }) {
    this.DBID = em.DBID
    this.selectedEmployeeId = em.id
    this.modalRef = this.modalService.show(this.relocateTemplate, { class: 'modal-md' });
  }

  relocateEmployee() {
    const employeeIndex = this.employees.findIndex((emp: { id: number; }) => emp.id === this.selectedEmployeeId);

    if (employeeIndex !== -1) {

      if (this.employees[employeeIndex].DBID == this.DBID) {
        this.toastrService.error('Employee Same DB');

      } else {
        // Update the department of the employee
        this.employees[employeeIndex].DBID = this.DBID;
        this.toastrService.success('Employee Relocated',);
      }
      this.modalRef.hide()

    }
  }
}
