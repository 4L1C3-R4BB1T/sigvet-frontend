import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CustomValidators } from '../../validators/custom-validators';


@Component({
  selector: 'app-recover-client-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, ToastModule],
  templateUrl: './recover-client-password.component.html',
  styleUrl: './recover-client-password.component.scss',
  providers: [MessageService]
})
export class RecoverClientPasswordComponent implements OnInit {

  isOpen = signal(false)
  isValidEmail = signal(false);
  isPasswordFilled = signal(false);

  #formBuilder = inject(FormBuilder);
  #messageService = inject(MessageService);

  @Output()
  closedEvent = new EventEmitter();

  form = this.#formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmationPassword: ['', [Validators.required]]
  })

  @Input()
  set opened(b: boolean) {
    this.isOpen.set(b);
  }

  public ngOnInit(): void {
    this.form.controls.password.addValidators(CustomValidators.passwordMatch('password', this.form));
  }

  public close() {
    this.isOpen.set(false);

    this.closedEvent.emit(true);
  }
  public show() {
    this.#messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
}
