import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateNewClientComponent } from '../../components/create-new-client/create-new-client.component';
import { RecoverClientPasswordComponent } from '../../components/recover-client-password/recover-client-password.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterOutlet, CreateNewClientComponent, RecoverClientPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {

  openAccountCreationModal = signal(false);
  openRecoverAccountModal = signal(false);

}
