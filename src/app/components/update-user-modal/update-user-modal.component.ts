import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import BaseFormComponent from '../../base/base-form.component';
import { City } from '../../models/city';
import CityService from '../../services/city.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatTabsModule, MatSelectModule, RouterLink, JsonPipe],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss',
  providers: [CityService],
})
export class UpdateUserModalComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input()
  userId: number | null = null;

  @Input()
  returnUrl: string = '';

  #formBuilder = inject(FormBuilder);
  #cityService = inject(CityService);
  #clientService = inject(ClientService);
  #cdr = inject(ChangeDetectorRef);

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

  async ngOnChanges() {
    await this.checkIfEdition();
  }

  async checkIfEdition() {
    if (!this.userId) return;
    console.log("OII")
    this.form.removeControl('password' as never);
    this.form.removeControl('confirmationPassword' as never);
    const user = await this.#clientService.findById(this.userId);
    this.form.patchValue(user as any);
    this.form.controls.address.controls.cityId.setValue(user.address?.city.id as any ?? '');
    this.#cdr.detectChanges();
  }
}
