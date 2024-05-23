import { JsonPipe } from '@angular/common';
import { Component, OnChanges, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { lastValueFrom } from 'rxjs';
import BaseFormComponent from '../../../base/base-form.component';
import { City } from '../../../models/city';
import { State } from '../../../models/state';
import { UpdateUser } from '../../../models/update-user';
import { User } from '../../../models/user';
import { AccountService } from '../../../services/account.service';
import CityService from '../../../services/city.service';
import { StateService } from '../../../services/state.service';
import { VeterinarianService } from '../../../services/veterinarian.service';
import VeterinarianComponent from '../veterinarian.component';



@Component({
  selector: 'app-update-veterinarian',
  standalone: true,
  imports: [
    NgxMaskDirective,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    RouterLink,
    JsonPipe,
  ],
  templateUrl: './update-veterinarian.component.html',
  styleUrl: './update-veterinarian.component.scss',
  providers: [CityService, provideNgxMask()],
})
export class UpdateVeterinarianComponent
  extends BaseFormComponent
  implements OnInit, OnChanges
{

  specialties = [
    "Clínica Geral",
    "Cirurgia",
    "Dermatologia",
    "Odontologia",
    "Oftalmologia",
    "Ortopedia",
    "Cardiologia",
    "Oncologia",
    "Neurologia",
    "Medicina Interna",
    "Anestesiologia",
    "Comportamento Animal",
    "Exóticos",
    "Nutrição",
    "Radiologia",
    "Reprodução Animal",
    "Endocrinologia"
  ];

  veterinarianId = signal(inject(ActivatedRoute).snapshot.params['id']);
  veterinarian = signal({} as User);
  #veterinarianComponent = inject(VeterinarianComponent);

  previewsPhoto = signal('');
  savedPhoto = signal(null as File | null);

  #formBuilder = inject(FormBuilder);
  #cityService = inject(CityService);
  #veterinarianService = inject(VeterinarianService);
  #accountService = inject(AccountService);

  #store = inject(Store);

  cities = signal([] as City[]);

  states = signal([] as State[]);

  protected override form = this.#formBuilder.group({
    id: [''],
    name: [
      '',
      [Validators.maxLength(100), Validators.minLength(3), Validators.required],
    ],
    username: [
      '',
      [Validators.maxLength(100), Validators.minLength(3), Validators.required],
    ],
    document: ['', [Validators.maxLength(14), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.required]],
    specialty: ['', [Validators.required]],
    crmv: ['', [Validators.required]],
    crmvUf: ['', [Validators.required]],
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
    this.states.set(await inject(StateService).findAll());
  }

  async ngOnChanges() {
    await this.checkIfEdition();
  }

  async create() {
    this.checkForm();
    if (this.form.invalid) return;
    const result = await this.#veterinarianService.create(
      this.form.value as UpdateUser
    );
    if (!result?.id) return;
    if (this.savedPhoto()) {
      this.#accountService.addUserPhoto(this.savedPhoto()!, result.id);
    }
    this.toastrService.success('Adicionado', 'Veterinário');
    await this.#veterinarianComponent.reload();
  }

  async update() {
    this.checkForm();
    if (!this.veterinarianId()) return;
    if (this.form.invalid) return;
    const result = await this.#veterinarianService.update(
      this.veterinarianId(),
      this.form.value as UpdateUser
    );
    if (this.savedPhoto() && this.previewsPhoto()) {
      this.#accountService.addUserPhoto(
        this.savedPhoto()!,
        this.veterinarianId()
      );
    }
    if (result) {
      this.toastrService.success('Atualizado', 'Cliente');
      await this.#veterinarianComponent.reload();
    }
  }

  async addPhoto(files: FileList | null) {
    if (!files) return;
    const file = files.item(0);
    this.previewsPhoto.set(URL.createObjectURL(file!));
    this.savedPhoto.set(file);
  }

  async checkIfEdition() {
    if (!this.veterinarianId()) return;
    this.form.removeControl('password' as never);
    this.form.removeControl('confirmationPassword' as never);
    const user = await this.#accountService.findById(this.veterinarianId());
    this.veterinarian.set(user);
    this.previewsPhoto.set(user.photoUrl ?? '');
    this.form.patchValue(user as any);
    this.form.controls.address.controls.cityId.setValue(
      (user.address?.city.id as any) ?? ''
    );
  }
}
