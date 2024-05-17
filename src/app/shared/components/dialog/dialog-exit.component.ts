import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog-exit.component.html',
  styleUrl: './dialog-exit.component.scss'
})
export class DialogExitComponent implements OnInit {

  #dialogRef = inject(MatDialogRef<DialogExitComponent>);
  #authService = inject(AuthService);
  subscription: Subscription | null = null;

  public ngOnInit(): void {
      this.#dialogRef.afterClosed().subscribe(b => {
        if (b) {
          this.#authService.signOut();
        } else {
          this.#dialogRef.close();
        }
      });
  }

  public close(b: boolean) {
    this.#dialogRef.close(b);
  }
}
