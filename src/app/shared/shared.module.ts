import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageModule } from './error-message/error-message.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorMessageModule,
  ],
  exports: [
    ErrorMessageModule
  ]
})
export class SharedModule { }
