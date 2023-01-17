import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumMarkToStrPipe } from '../Pipes/num-mark-to-str.pipe';



@NgModule({
  declarations: [
    NumMarkToStrPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumMarkToStrPipe
  ]
})
export class SharedModule { }
