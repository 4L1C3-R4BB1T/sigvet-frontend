import { Component, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { AccountService } from '../../services/account.service';
import { AppState } from '../../store';
import { ProfileActions } from '../../store/reducers/menu-visibility.reducer';
import { selectUserPhoto } from '../../store/reducers/user.reducer';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTabsModule, MatListModule, MatDividerModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  isAbout = signal(true);
  #store: Store<AppState> = inject(Store);
  #accountService = inject(AccountService);
  photo = this.#store.selectSignal(selectUserPhoto);

  public tabChange() {
    this.isAbout.set(!this.isAbout());
  }

  public close() {
    this.#store.dispatch(ProfileActions.toggleModal());
  }

  public async addPhoto(fileList: FileList | null) {
    if (!fileList || fileList.length == 0) return;
    await this.#accountService.addPhoto(fileList.item(0)!);
  }
}
