import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ModalModule.forRoot(),
  NgSelectModule,
   FormsModule,
   ReactiveFormsModule,

    
  ]
})
export class SharedModule { }
