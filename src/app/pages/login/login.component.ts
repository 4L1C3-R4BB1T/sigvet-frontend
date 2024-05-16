import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import BaseFormComponent from '../../base/base-form.component';
import { CreateNewClientComponent } from '../../components/create-new-client/create-new-client.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { RecoverClientPasswordComponent } from '../../components/recover-client-password/recover-client-password.component';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public signIn() {
    if (!this.form.valid) {
      this.validateControls('email', 'e-mail');
      this.validateControls('password', 'senha');
      return;
    }

    this.#authService.authenticate(this.form.value as User);
  }

  private validateControls(controlName: keyof typeof this.form.controls, humanName: string) {
    const control = this.form.controls[controlName];
    control.hasError('email') && this.toastrService.warning(`O campo ${humanName} não é um e-mail válido.`);
    control.hasError('required') && this.toastrService.warning(`O campo ${humanName} é obrigatório.`)

  }
}
