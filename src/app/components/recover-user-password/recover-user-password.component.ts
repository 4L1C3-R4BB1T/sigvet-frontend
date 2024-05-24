import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import BaseFormComponent from '../../base/base-form.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatStepperModule } from '@angular/material/stepper';
import { AccountService } from '../../services/account.service';
import { RecoverUser } from '../../models/recover-user';
import { CustomValidators } from '../../validators/custom-validators';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-recover-user-password',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, NgIf, ToastrModule, MatInputModule, MatButtonModule, NgxMaskDirective, NgIf],
  templateUrl: './recover-user-password.component.html',
  styleUrl: './recover-user-password.component.scss',
  providers: [MessageService, provideNgxMask()]
})
export class RecoverUserPasswordComponent extends BaseFormComponent implements OnInit {

  isOpen = signal(false)
  isValidEmail = signal(false);
  isPasswordFilled = signal(false);
  #accountService = inject(AccountService);

  #formBuilder = inject(FormBuilder);

  @Output()
  closedEvent = new EventEmitter();

  protected override form = this.#formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    document: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmationPassword: ['', [Validators.required]]
  })

  @Input()
  set opened(b: boolean) {
    this.isOpen.set(b);
  }

  ngOnInit(): void {
    this.form.controls.password.addValidators(CustomValidators.passwordMatch('password', this.form));
  }

  close() {
    this.isOpen.set(false);

    this.closedEvent.emit(true);
  }

  allFieldsFilled() {
   return this.form.controls.email.valid && this.form.controls.document.valid && this.form.controls.password.valid && this.form.controls.confirmationPassword.valid;
  }

  async recover() {
    this.checkForm();
    if (!this.form.valid) return;
    if (await this.#accountService.recover(this.form.value as RecoverUser)) {
      this.close();
    }
  }

}
