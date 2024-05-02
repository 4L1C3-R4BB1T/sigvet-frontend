import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { toggle } from '../../store/actions/setting-menu.action';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  isAbout = signal(true)
  #store: Store<AppState> = inject(Store<AppState>)

  public tabChange() {
    this.isAbout.set(!this.isAbout());
  }

  public close() {
    this.#store.dispatch(toggle());
  }

}
