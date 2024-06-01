import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import BaseFormComponent from '../../base/base-form.component';
import { City } from '../../models/city';
import { UpdateUser } from '../../models/update-user';
import { AccountService } from '../../services/account.service';
import CityService from '../../services/city.service';
import { VeterinarianService } from '../../services/veterinarian.service';
import { selectUserInfo } from '../../store/reducers/user.reducer';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatSelectModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
  providers: [provideNgxMask(), CityService]
})
export class EditProfileComponent extends BaseFormComponent implements OnInit {

  #cityService = inject(CityService);
  #toastrService = inject(ToastrService);
  #accountService = inject(AccountService);
  #store = inject(Store);
  userInfo = this.#store.selectSignal(selectUserInfo);
  cities = signal([] as City[]);
  #router = inject(Router);
  #veterinarianService = inject(VeterinarianService);


  @Output()
  onClose = new EventEmitter();

  #formBuilder = inject(FormBuilder);
  override form = this.#formBuilder.group({
    name: ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
    username: ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
    document: ['', [Validators.maxLength(14), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    specialty: [''],
    crmv: [''],
    crmvUf: [''],
    address: this.#formBuilder.group({
      street: ['', [Validators.maxLength(100)]],
      neighborhood: ['', [Validators.maxLength(100)]],
      zipCode: ['', [Validators.maxLength(100)]],
      number: ['', [Validators.maxLength(100)]],
      cityId: [''],
    }),
  });

  async ngOnInit() {
    if (!this.userInfo()) return;
    await this.findAllCities();
    this.form.patchValue(this.userInfo() as any);
    this.form.controls.address.controls.cityId.setValue(this.userInfo()?.address?.city.id as any);
  }

  async findAllCities() {
    const cities = await lastValueFrom(this.#cityService.findAll);
    this.cities.set(cities);
  }

  async save() {
    this.checkFormAddressControls();
    if (this.form.invalid) return;
    let payload = { ...this.form.value };
    if (!this.form.controls.address.controls.cityId.value) {
      delete payload['address'];
    }
    if (!this.userInfo()?.crmv) {
      // O padrão vai ser userService porque cliente é um user
      if (await this.#accountService.update(this.userInfo()?.id!, payload as UpdateUser)) {
        this.toastrService.info('Atualizado', 'Perfil');
        this.reloadPage();
      }

    } else {
      if (await this.#veterinarianService.update(this.userInfo()?.id!, payload as UpdateUser)) {
        this.toastrService.info('Atualizado', 'Perfil');
        this.reloadPage();
      }
    }
  }

  public reloadPage() {
    setTimeout(() => window.location.reload(), 1000);
  }

  checkFormAddressControls() {
    const address = this.form.controls.address;
    let hasAnyFieldWithValue = false;

    for (const controlName in address.controls) {
      const control = address.get(controlName)!;
      if (control.value !== '' && !!control.value) {
        console.log(control.value)
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
}
