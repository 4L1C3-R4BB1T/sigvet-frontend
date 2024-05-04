import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileComponent, NgIf],
  styles: `
    app-profile {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
    }
  `,
  template: `
    <router-outlet/>
    <app-profile *ngIf="showModalProfile()"/>
  `,
})
export class AppComponent {

  #store: Store<AppState> = inject(Store);

  showModalProfile = toSignal(this.#store.select(state => state.menuVisibilityReducer.modalProfile));

}
