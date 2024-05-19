import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject, signal } from '@angular/core';
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
import { CreateUser } from '../../models/create-user';
import { AccountService } from '../../services/account.service';
import { UpdateUser } from '../../models/update-user';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Store } from '@ngrx/store';
import { WindowReloadPageAction } from '../../store/reducers/window.reducer';
import { User } from '../../models/user';

@Component({
  selector: 'app-update-user-modal',
  standalone: true,
  imports: [NgxMaskDirective, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatTabsModule, MatSelectModule, RouterLink, JsonPipe],
  templateUrl: './update-user-modal.component.html',
  styleUrl: './update-user-modal.component.scss',
  providers: [CityService, provideNgxMask()],
})
export class UpdateUserModalComponent extends BaseFormComponent implements OnInit, OnChanges {

  @Input()
  userId: number | null = null;
  user = signal({} as User);

  @Output()
  onExit = new EventEmitter();

  previewsPhoto = signal('');
  savedPhoto = signal(null as File | null);

  #formBuilder = inject(FormBuilder);
  #cityService = inject(CityService);
  #clientService = inject(ClientService);
  #accountService = inject(AccountService);
  #store = inject(Store);

  cities = signal([] as City[]);

  protected override form = this.#formBuilder.group({
    id: [''],
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

  async ngOnInit() {
    this.cities.set(await lastValueFrom(this.#cityService.findAll));
  }

  async ngOnChanges() {
    await this.checkIfEdition();
  }

  async create() {
    this.checkForm();
    if (this.form.invalid) return;
    const result = await this.#clientService.create(this.form.value as CreateUser);
    if (!result?.id) return;
    if (this.savedPhoto()) {
      this.#accountService.addUserPhoto(this.savedPhoto()!, result.id);
    }
    this.toastrService.success('Adicionado', 'Cliente');
    this.onExit.emit();
    setTimeout(() => this.#store.dispatch(WindowReloadPageAction()), 200);
  }

  async update() {
    this.checkForm();
    if (!this.userId) return;
    if (this.form.invalid) return;
    const result = await this.#clientService.update(this.userId!, this.form.value as UpdateUser);
    if (this.savedPhoto() && this.previewsPhoto()) {
      this.#accountService.addUserPhoto(this.savedPhoto()!, this.userId);
    }
    if (result) {
      this.toastrService.success('Atualizado', 'Cliente');
      this.onExit.emit();
      setTimeout(() => this.#store.dispatch(WindowReloadPageAction()), 200);
    }
  }

  async addPhoto(files: FileList | null) {
    if (!files) return;
    const file = files.item(0);
    this.previewsPhoto.set(URL.createObjectURL(file!));
    this.savedPhoto.set(file);
  }

  async checkIfEdition() {
    if (!this.userId) return;
    this.form.removeControl('password' as never);
    this.form.removeControl('confirmationPassword' as never);
    const user = await this.#accountService.findById(this.userId);
    this.user.set(user);
    this.previewsPhoto.set(user.photoUrl ?? '');
    this.form.patchValue(user as any);
    this.form.controls.address.controls.cityId.setValue(user.address?.city.id as any ?? '');
  }

}
