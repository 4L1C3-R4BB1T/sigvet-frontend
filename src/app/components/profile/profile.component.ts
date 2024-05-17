import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import BaseStoreComponent from '../../base/base-store.component';
import { ProfileActions } from '../../store/reducers/menu-visibility.reducer';
import { selectUserPhoto } from '../../store/reducers/user.reducer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTabsModule, MatListModule, MatDividerModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends BaseStoreComponent {
  isAbout = signal(true);
  photoUrl = this.store.selectSignal(selectUserPhoto);

  public tabChange() {
    this.isAbout.set(!this.isAbout());
  }

  public close() {
    this.store.dispatch(ProfileActions.toggleModal());
  }

}
