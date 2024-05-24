import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnChanges, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import BaseFormComponent from '../../../base/base-form.component';
import { City } from '../../../models/city';
import { CreateUser } from '../../../models/create-user';
import { UpdateUser } from '../../../models/update-user';
import { User } from '../../../models/user';
import { AccountService } from '../../../services/account.service';
import CityService from '../../../services/city.service';
import { ClientService } from '../../../services/client.service';
import ClientsComponent from '../clients.component';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CustomValidators } from '../../../validators/custom-validators';


@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [NgxMaskDirective, MatSlideToggleModule, NgIf, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatTabsModule, MatSelectModule, RouterLink, JsonPipe],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.scss',
  providers: [provideNgxMask()],
})
export class UpdateClientComponent extends BaseFormComponent implements OnInit {

  clientId = signal(inject(ActivatedRoute).snapshot.params['id']);
  client = signal({} as User);

  #clientComponent = inject(ClientsComponent);

  previewsPhoto = signal('');
  savedPhoto = signal(null as File | null);

  #formBuilder = inject(FormBuilder);
  #cityService = inject(CityService);
  #clientService = inject(ClientService);
  #accountService = inject(AccountService);


  @ViewChild(MatSlideToggle, { static: true })
  matSlideToggle!: MatSlideToggle;

  cities = signal([] as City[]);

  #router = inject(Router);

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
    this.form.controls.confirmationPassword.addValidators(CustomValidators.passwordMatch('password', this.form));
    this.cities.set(await lastValueFrom(this.#cityService.findAll));
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
    this.toastrService.success('Adicionado', 'Usuário');
    await this.#clientComponent.reload();
    this.#router.navigate(['/dashboard', 'clientes']);
  }

  async update() {
    this.checkForm();
    if (!this.clientId()) return;
    if (this.form.invalid) return;
    const result = await this.#clientService.update(this.clientId(), this.form.value as UpdateUser);
    if (this.savedPhoto() && this.previewsPhoto()) {
      await this.#accountService.addUserPhoto(this.savedPhoto()!, this.clientId());
    }
    if (result) {
      this.toastrService.success('Atualizado', 'Cliente');
      await this.#clientComponent.reload();
      this.#router.navigate(['/dashboard', 'clientes']);
    }
  }

  async addPhoto(files: FileList | null) {
    if (!files) return;
    const file = files.item(0);
    this.previewsPhoto.set(URL.createObjectURL(file!));
    this.savedPhoto.set(file);
  }

  async checkIfEdition() {
    if (!this.clientId()) return;
    this.form.removeControl('password' as never);
    this.form.removeControl('confirmationPassword' as never);
    const client = await this.#accountService.findById(this.clientId());
    this.client.set(client);
    this.previewsPhoto.set(client.photoUrl ?? '');
    this.matSlideToggle.checked = !!client.photoUrl;
    this.form.patchValue(client as any);
    this.form.controls.address.controls.cityId.setValue(client.address?.city.id as any ?? '');
  }

  removeFile() {
    if (this.clientId() && this.client().photoUrl) {
      this.#accountService.removePhotoByUserId(this.clientId());
    }
    this.savedPhoto.set(null);
    this.previewsPhoto.set('');
  }

}
