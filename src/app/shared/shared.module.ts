import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ActiveStatusPipe } from './pipes/active-status.pipe';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    ActiveStatusPipe,
    PhonePipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    ActiveStatusPipe,
    PhonePipe
  ]
})
export class SharedModule { }
