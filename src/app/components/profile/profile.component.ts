import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AccountService } from '../../services/account.service';
import { AppState } from '../../store';
import { ProfileActions } from '../../store/reducers/menu-visibility.reducer';
import { selectUserPhoto } from '../../store/reducers/user.reducer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  isAbout = signal(true)
  #store: Store<AppState> = inject(Store)
  #accountService = inject(AccountService);
  photo = this.#store.selectSignal(selectUserPhoto);

  public tabChange() {
    this.isAbout.set(!this.isAbout());
  }

  public close() {
    this.#store.dispatch(ProfileActions.toggleModal());
  }

  public addPhoto(fileList: FileList | null) {
    if (!fileList || fileList.length == 0) return;
    this.#accountService.addPhoto(fileList.item(0)!);
  }



}
