import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import BaseFormComponent from '../../base/base-form.component';
import { CreateNewClientComponent } from '../../components/create-new-client/create-new-client.component';
import { RecoverClientPasswordComponent } from '../../components/recover-client-password/recover-client-password.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CreateNewClientComponent, RecoverClientPasswordComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent extends BaseFormComponent {

  openAccountCreationModal = signal(false);
  openRecoverAccountModal = signal(false);

  override form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });


}
