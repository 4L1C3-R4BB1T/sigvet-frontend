import { Component, DoCheck, Input, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import BaseFormComponent from '../../base/base-form.component';
import { AccountService } from '../../services/account.service';
import CityService from '../../services/city.service';
import { City } from '../../models/city';
import { lastValueFrom } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatSelectModule, RouterLink],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss',
  providers: [CityService],
})
export class UpdateUserModalComponent extends BaseFormComponent implements OnInit, DoCheck {

  @Input()
  userId: number | null = null;

  @Input()
  returnUrl: string = '';

  stop = false;

  #formBuilder = inject(FormBuilder);
  #cityService = inject(CityService);
  #clientService = inject(ClientService);

  cities = signal([] as City[]);

  override form = this.#formBuilder.group({
    id: [''],
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

  async ngOnInit() {
    this.cities.set(await lastValueFrom(this.#cityService.findAll));
  }

  async ngDoCheck() {
    if (this.stop) return;
    await this.checkIfEdition();
    this.stop = true;
  }
  async checkIfEdition() {
    if (!this.userId) return;
    this.form.removeControl('password' as never);
    this.form.removeControl('confirmationPassword' as never);
    const user = await this.#clientService.findById(this.userId);
    console.log(user)
    this.form.patchValue(user as any);
    this.form.controls.address.controls.cityId.setValue(user.address?.city.id as any ?? '');
    this.form.updateValueAndValidity();
  }
}
