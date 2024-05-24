import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';

import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import BaseFormComponent from '../../base/base-form.component';
import { City } from '../../models/city';
import { CreateUser } from '../../models/create-user';
import { AccountService } from '../../services/account.service';
import CityService from '../../services/city.service';
import { CustomValidators } from '../../validators/custom-validators';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-create-new-user',
  standalone: true,
  imports: [NgxMaskDirective, NgIf, MatSelectModule, ReactiveFormsModule, MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.scss',
  providers: [provideNgxMask(), CityService],
})
export class CreateNewUserComponent extends BaseFormComponent implements OnInit {
  tabs = ['Pessoais', 'Endereço'];
  selected = new FormControl(0);

  isOpen = signal(false)
  isDetails = signal(true);

  #formBuilder = inject(FormBuilder);
  #cityService = inject(CityService);
  #accountService = inject(AccountService);

  override form = this.#formBuilder.group({
    name: ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
    username: ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
    document: ['', [Validators.maxLength(14), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmationPassword: ['', [Validators.required]],
    address: this.#formBuilder.group({
      street: ['', [Validators.maxLength(100)]],
      neighborhood: ['', [Validators.maxLength(100)]],
      zipCode: ['', [Validators.maxLength(100)]],
      number: ['', [Validators.maxLength(100)]],
      cityId: [''],
    }),
  });

  @Output()
  closedEvent = new EventEmitter();

  cities = signal([] as City[]);

  @Input()
  set opened(b: boolean) {
    this.isOpen.set(b);
  }

  public ngOnInit(): void {
    this.findAllCities();
    this.form.controls.confirmationPassword.addValidators(CustomValidators.passwordMatch('password', this.form));
  }

  public checkFormAddressControls() {
    const address = this.form.controls.address;
    let hasAnyFieldWithValue = false;

    for (const controlName in address.controls) {
      const control = address.get(controlName)!;
      if (control.value !== '') {
        hasAnyFieldWithValue = true;
        break;
      }
    }

    if (hasAnyFieldWithValue) {
      for (const controlName in address.controls) {
        const control = address.get(controlName)!;
        control.addValidators(Validators.required);
        control.updateValueAndValidity();
      }
    } else {
      for (const controlName in address.controls) {
        const control = address.get(controlName)!;
        control.removeValidators(Validators.required);
        control.updateValueAndValidity();
      }
    }

    this.checkForm();
  }

  public async findAllCities() {
    const cities = await lastValueFrom(this.#cityService.findAll);
    this.cities.set(cities);
  }

  public close() {
    this.isOpen.set(false);
    this.closedEvent.emit(true);
  }

  public async register() {
    this.checkFormAddressControls();
    if (this.form.invalid) return;
    const address = this.form.controls.address;
    let payload = { ...this.form.value };
    if (address.controls.cityId.value === '') {
      delete payload.address;
    }
    if (await this.#accountService.create(payload as CreateUser)) {
      this.close();
    }
  }

}
