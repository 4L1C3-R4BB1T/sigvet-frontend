import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import CreateAccountComponent from './create-account/create-account.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterOutlet, CreateAccountComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export default class AccountComponent {

}
