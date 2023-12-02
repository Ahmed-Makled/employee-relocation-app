import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private formSubmitSubject = new Subject<any>();


  constructor(private fb: FormBuilder) {}

  // Create a form group with the provided controls and their initial values
  createFormGroup(controlsConfig: Record<string, any>, formOptions?: any): FormGroup {
    return this.fb.group(controlsConfig, formOptions);
  }

  // Get a form control by its name
  getControl(form: FormGroup, controlName: string): AbstractControl {
    return form.get(controlName)!;
  }

 

  // Reset the form to its initial state
  resetForm(form: FormGroup): void {
    form.reset();
  }

  // Get validation error messages for a specific control
  getValidationMessages(form: FormGroup, controlName: string): string[] {
    const control = this.getControl(form, controlName);

    if (control && control.errors) {
      return Object.keys(control.errors).map(errorKey => {
        // You can customize error messages based on errorKey
        return `Validation error: ${errorKey}`;
      });
    }

    return [];
  }
  shouldDisplayValidation(control: AbstractControl): boolean {
    return control.touched && control.dirty;
  }
  // Handle errors (e.g., log, display an alert, etc.)
  handleError(error: any): void {
    console.error('An error occurred:', error);
    // Optionally, you can implement more sophisticated error handling
  }
}
