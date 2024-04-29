import { Component } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [NgxMaskDirective, NgxMaskPipe],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  providers: [provideNgxMask()]
})
export default class CreateAccountComponent {

}
