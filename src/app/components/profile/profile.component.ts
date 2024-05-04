import { Component, OnInit, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { ProfileActions } from '../../store/reducers/menu-visibility.reducer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  isAbout = signal(true)
  #store: Store<AppState> = inject(Store)

  public tabChange() {
    this.isAbout.set(!this.isAbout());
  }

  public ngOnInit() {
    this.#store.select(state => state.menuVisibilityReducer).subscribe(console.log)
  }

  public close() {
    this.#store.dispatch(ProfileActions.toggleModal());
  }

}
