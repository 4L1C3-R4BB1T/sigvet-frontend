import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterOutlet } from '@angular/router';
import BaseFormComponent from '../../base/base-form.component';
import { CreateNewUserComponent } from '../../components/create-new-user/create-new-user.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { UserLogin } from '../../models/user-login';
import { AuthService } from '../../services/auth.service';
import { RecoverUserPasswordComponent } from '../../components/recover-user-password/recover-user-password.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ProfileComponent,
    RouterLink,
    RouterOutlet,
    CreateNewUserComponent,
    RecoverUserPasswordComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    JsonPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent extends BaseFormComponent {
  #authService = inject(AuthService);

  openAccountCreationModal = signal(false);
  openRecoverAccountModal = signal(false);

  override form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async signIn() {
    if (!this.form.valid) {
      return;
    }

    await this.#authService.authenticate(this.form.value as UserLogin);
  }

}
