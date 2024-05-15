import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  exports: [ChartModule, ProgressSpinnerModule, MatDialogModule]
})
export class SharedModule { }
