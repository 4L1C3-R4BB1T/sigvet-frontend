import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  exports: [ChartModule, ProgressSpinnerModule, MatDialogModule]
})
export class SharedModule { }
