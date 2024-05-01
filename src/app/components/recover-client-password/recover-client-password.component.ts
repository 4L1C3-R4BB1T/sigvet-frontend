import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recover-client-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './recover-client-password.component.html',
  styleUrl: './recover-client-password.component.scss'
})
export class RecoverClientPasswordComponent implements OnInit {

  isOpen = signal(false)
  isValidEmail = signal(false);
  isPasswordFilled = signal(false);

  #formBuilder = inject(FormBuilder);

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
}
