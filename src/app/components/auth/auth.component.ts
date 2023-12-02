import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormService } from '../../core/services/form.service';
import { AbstractControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthModel } from '../../core/models/auth.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  authModel: AuthModel = { Username: '', Password: '' };

  constructor(
    private router: Router,
    private formService: FormService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // #region Form Initialization
    this.loginForm = this.formService.createFormGroup({
      Username: [this.authModel.Username, Validators.required],
      Password: [this.authModel.Password, Validators.required],
    });
    // #endregion

   
  }

  // #region Form Submission
  onSubmit(): void {
    if (this.loginForm.value) {
      const res = this.authService.login(this.loginForm.value)
      if (res) {
        this.showToastrMessage(true);
        this.router.navigate(['']);

      } else {
        this.showToastrMessage(false);

      }
    }
  }
  // #endregion



  // #region Form Validation
  shouldDisplayValidation(control: AbstractControl): boolean {
    return this.formService.shouldDisplayValidation(control);
  }

  getValidationMessage(controlName: string): string[] {
    return this.formService.getValidationMessages(this.loginForm, controlName);
  }
  // #endregion

  // #region Toastr Messages
  private showToastrMessage(success: boolean): void {
    if (success) {
      this.toastrService.success('Login Successfully');
    } else {
      this.toastrService.error('Something Went Wrong');
    }
  }
  // #endregion
}
