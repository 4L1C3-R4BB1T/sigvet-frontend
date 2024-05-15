import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';

import { NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import { City } from '../../models/city';
import CityService from '../../services/city.service';
import { CustomValidators } from '../../validators/custom-validators';
import BaseFormComponent from '../../base/base-form.component';

@Component({
  selector: 'app-create-new-client',
  standalone: true,
  imports: [NgxMaskDirective, NgIf, ReactiveFormsModule],
  templateUrl: './create-new-client.component.html',
  styleUrl: './create-new-client.component.scss',
  providers: [provideNgxMask(), CityService],
})
export class CreateNewClientComponent extends BaseFormComponent implements OnInit {

  isOpen = signal(false)
  isDetails = signal(true);

  #formBuilder = inject(FormBuilder);
  #cityService = inject(CityService);

  override form = this.#formBuilder.group({
    name: ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
    username: ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
    document: ['', [Validators.maxLength(14), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmationPassword: ['', [Validators.required]],
    address: this.#formBuilder.group({
      street: ['', [Validators.maxLength(100), Validators.required]],
      neighborhood: ['', [Validators.maxLength(100), Validators.required]],
      zipCode: ['', [Validators.maxLength(100), Validators.required]],
      number: ['', [Validators.maxLength(100), Validators.required]],
      cityId: ['', [Validators.required]],
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
    this.form.controls.password.addValidators(CustomValidators.passwordMatch('confirmationPassword', this.form));
  }

  public async findAllCities() {
    const cities = await lastValueFrom(this.#cityService.findAll);
    this.cities.set(cities);
  }

  public close() {
    this.isOpen.set(false);
    this.closedEvent.emit(true);
  }

  public register() {
    this.checkForm();
  }

}
