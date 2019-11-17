import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from './error-message/error-message.module';
import { ModalModule } from './modal/modal.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorMessageModule,
    ModalModule
  ],
  exports: [
    ErrorMessageModule,
    ModalModule
  ]
})
export class SharedModule { }
