import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
  import { DepartmentsService } from '../../core/services/department.service';
import { CreateDepartentModel, Department } from '../../core/models/department.model';
import { SearchByNamePipe } from '../../core/pipes/search-empolyee.pipe';
import { SharedModule } from '../../shared/shared.module';
import { FormService } from '../../core/services/form.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.component.html',
  imports: [CommonModule, SharedModule, FormsModule, SearchByNamePipe, RouterLink, ReactiveFormsModule],
  providers: [DepartmentsService]
})
export class DepartmentsComponent implements OnInit {
  @ViewChild('createDepartmentTemplate', { static: false }) createDepartmentTemplate: any;
  @ViewChild('editDepartmentTemplate', { static: false }) editDepartmentTemplate: any;
  modalRef!: BsModalRef;
  createDepartmentForm!: FormGroup
  editDepartmentForm!: FormGroup
  departments: Department[] = []
  searchDepartmentValue: string = '';
  createDepartmentModel: CreateDepartentModel = { Name: '' }
  selectedDepartment: Department = { ID: 0, Name: '' }

  constructor(
    private formService: FormService,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private departmentsService: DepartmentsService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  // #region Load Data
  private loadData(): void {
    this.departmentsService.getDepartments().subscribe(departments => this.departments = departments);
  }
  // #endregion

  // #region Create Department
  private createDepartmentFormInit() {
    this.createDepartmentForm = this.formService.createFormGroup({
      Name: [this.createDepartmentModel.Name, Validators.required],
    });
  }

  showcreateDepartmentTemplate(): void {
    this.createDepartmentFormInit();
    this.modalRef = this.modalService.show(this.createDepartmentTemplate, { class: 'modal-md' });
  }

  createDepartment(): void {
    const newDepartment = this.createDepartmentForm.value.Name;

    if (newDepartment) {
      this.departmentsService.addDepartment(newDepartment).subscribe({
        next: (response) => {
          console.log(response);
          this.departments = response;
          this.showToastrMessage(true);
        },
        error: () => {
          this.showToastrMessage(false);
        }
      });
    }

    this.modalRef.hide();
  }
  // #endregion

  // #region Edit Department
  private editDepartmentFormInit() {
    this.editDepartmentForm = this.formService.createFormGroup({
      ID: [this.selectedDepartment.ID, Validators.required],
      Name: [this.selectedDepartment.Name, Validators.required],
    });
  }

  showeditDepartmentTemplate(department: Department): void {
    this.selectedDepartment = department;
    this.editDepartmentFormInit();
    this.modalRef = this.modalService.show(this.editDepartmentTemplate, { class: 'modal-md' });
  }

  editDepartment(): void {
    const updatedDepartment = this.editDepartmentForm.value;

    if (updatedDepartment) {
      const index = this.departments.findIndex(d => d.ID === updatedDepartment.ID);
      this.departments[index] = updatedDepartment;
      this.showToastrMessage(true);
    } else {
      this.showToastrMessage(false);
    }

    this.modalRef.hide();
  }
  // #endregion

  // #region Remove Department
  removeDepartment(departmentId: number) {
    const index = this.departments.findIndex(d => d.ID == departmentId);

    if (index !== -1) {
      this.departments.splice(index, 1);
      this.showToastrMessage(true);
    } else {
      this.showToastrMessage(false);
    }
  }
  // #endregion

  // #region Helpers
  shouldDisplayValidation(control: AbstractControl): boolean {
    return this.formService.shouldDisplayValidation(control);
  }

  getValidationMessage(form: FormGroup, controlName: string): string[] {
    return this.formService.getValidationMessages(form, controlName);
  }

  private showToastrMessage(success: boolean): void {
    const message = success ? 'Proccess Successfully' : 'Something Went Wrong';
    this.toastrService[success ? 'success' : 'error'](message);
  }
  // #endregion
}
