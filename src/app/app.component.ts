import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileActions } from './store/reducers/menu-visibility.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileComponent, NgIf, EditProfileComponent],
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
    <app-profile *ngIf="showModalProfile()" (onClickEditProfile)="showEditProfile()"/>
    <app-edit-profile *ngIf="showModalEditProfile()" (onClose)="showModalEditProfile.set(false)"/>
  `,
})
export class AppComponent {

  #store: Store<AppState> = inject(Store);

  showModalProfile = toSignal(this.#store.select(state => state.menuVisibilityReducer.modalProfile));

  showModalEditProfile = signal(false);

  showEditProfile() {
    this.#store.dispatch(ProfileActions.toggleModal());
    this.showModalEditProfile.set(true);
  }

}
