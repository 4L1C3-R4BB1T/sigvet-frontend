import { DialogModule } from '@angular/cdk/dialog';
import { NgModule } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogExitComponent } from './components/dialog/dialog-exit.component';

@NgModule({
  declarations: [DialogExitComponent],
  imports: [DialogModule, MatDialogActions, MatDialogContent, MatButtonModule, MatDialogTitle],
  exports: [ChartModule, ProgressSpinnerModule, MatDialogModule, DialogExitComponent],
})
export class SharedModule { }
