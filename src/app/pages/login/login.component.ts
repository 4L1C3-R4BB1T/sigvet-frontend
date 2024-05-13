import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import BaseFormComponent from '../../base/base-form.component';
import { CreateNewClientComponent } from '../../components/create-new-client/create-new-client.component';
import { RecoverClientPasswordComponent } from '../../components/recover-client-password/recover-client-password.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ProfileComponent,RouterLink, RouterOutlet, CreateNewClientComponent, RecoverClientPasswordComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent extends BaseFormComponent {

  #authService = inject(AuthService);

  openAccountCreationModal = signal(false);
  openRecoverAccountModal = signal(false);

  override form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public signIn() {
    if (!this.form.valid) {
      // Exibir algo
      return;
    }
    console.log(this.form.value)
    this.#authService.authenticate(this.form.value as User);
  }
}
