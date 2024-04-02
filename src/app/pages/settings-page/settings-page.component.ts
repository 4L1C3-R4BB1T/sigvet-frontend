import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../store';
import { toggle } from '../../store/actions/setting-menu.action';
import { SettingsAccountFormComponent } from './components/settings-account-form/settings-account-form.component';
import { SettingsHeaderComponent } from './components/settings-header/settings-header.component';
import { SettingsUploadPictureComponent } from './components/settings-upload-picture/settings-upload-picture.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [SettingsHeaderComponent, SettingsAccountFormComponent, SettingsUploadPictureComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export default class SettingsPageComponent {

  #store: Store<AppState> = inject(Store<AppState>);

  public closeSettingMenu() {
    this.#store.dispatch(toggle());
  }
  
}
