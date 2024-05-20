import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import BaseFormComponent from '../../base/base-form.component';
import { City } from '../../models/city';
import { UpdateUser } from '../../models/update-user';
import CityService from '../../services/city.service';
import { ClientService } from '../../services/client.service';
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
  #clientService = inject(ClientService);
  #toastrService = inject(ToastrService);
  #store = inject(Store);
  userInfo = this.#store.selectSignal(selectUserInfo);
  cities = signal([] as City[]);


  @Output()
  onClose = new EventEmitter();

  #formBuilder = inject(FormBuilder);
  override form = this.#formBuilder.group({
    name: ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
    username: ['', [Validators.maxLength(100), Validators.minLength(3), Validators.required]],
    document: ['', [Validators.maxLength(14), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    crmv: [''],
    crmvUf: [''],
    address: this.#formBuilder.group({
      street: ['', [Validators.maxLength(100), Validators.required]],
      neighborhood: ['', [Validators.maxLength(100), Validators.required]],
      zipCode: ['', [Validators.maxLength(100), Validators.required]],
      number: ['', [Validators.maxLength(100), Validators.required]],
      cityId: ['', Validators.required],
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

  async update() {
    if (!this.userInfo()?.crmv) {
      if (await this.#clientService.update(this.userInfo()?.id!, this.form.value as UpdateUser)) {
        this.toastrService.info('Atualizado', 'Perfil');
        this.reloadPage();
      }

    } else {
      this.toastrService.info('Ainda não foi implementado', 'Veterinário');
    }
  }

  public reloadPage() {
    window.location.reload();
  }
}
