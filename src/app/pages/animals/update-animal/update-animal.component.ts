import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import BaseFormComponent from '../../../base/base-form.component';
import { Animal } from '../../../models/animal';
import { UpdateAnimal } from '../../../models/create-animal';
import { User } from '../../../models/user';
import { AnimalService } from '../../../services/animal.service';
import { ClientService } from '../../../services/client.service';
import AnimalsComponent from '../animals.component';

@Component({
  selector: 'app-update-animal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatAutocompleteModule,
    JsonPipe,
    NgIf,
    MatSlideToggleModule
  ],
  templateUrl: './update-animal.component.html',
  styleUrl: './update-animal.component.scss'
})
export class UpdateAnimalComponent extends BaseFormComponent implements OnInit, OnDestroy {

  #formBuilder = inject(FormBuilder);

  #clientService = inject(ClientService);

  #animalService = inject(AnimalService);

  #activatedRoute = inject(ActivatedRoute);

  #router = inject(Router);

  #animalComponent = inject(AnimalsComponent);

  animalId = signal<number | null>(this.#activatedRoute.snapshot.params['id'] ?? null);
  clientId = signal<number | null>(this.#activatedRoute.snapshot.queryParams['clientId'] ?? null);

  clients = signal([] as User[]);

  animal = signal({} as Animal);

  previewPhotoUrl = signal('');
  file = signal({} as File | null);

  filteredClients = signal([] as User[]);


  @ViewChild(MatSlideToggle, { static: true })
  matSlideToggle!: MatSlideToggle;


  subscription!: Subscription;

  override form = this.#formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
    breed: ['', Validators.required],
    birthDate: ['', Validators.required],
    client: this.#formBuilder.group({
      name: ['', Validators.required]
    }),
    clientId: ['', Validators.required],
  });

  async ngOnInit() {
    this.clients.set((await this.#clientService.findAll()).elements);
    this.filteredClients.set(this.clients());
    this.subscription = this.form.controls.client.valueChanges.subscribe(() => {
      const typed = this.form.controls.client.controls.name.value!;
      if (typed === '') {
        this.form.controls.clientId.setValue('');
      }
      this.#clientService.searchByName(typed).then(result => this.filteredClients.set(result));
    });
    await this.checkIfEdition();

    if (this.clientId()) {
      this.form.controls.client.controls.name.disable();
      const client = await this.#clientService.findById(this.clientId()!);
      this.form.controls.clientId.setValue(''+client.id);
      this.form.controls.client.controls.name.setValue(client.document + ' - ' + client.name);
      this.form.updateValueAndValidity();
    }

  }

  savePhoto(fileList: FileList) {
    const file = fileList.item(0)!;
    this.previewPhotoUrl.set(URL.createObjectURL(file));
    this.file.set(file);
  }

  async create() {
    this.checkForm();
    if (this.form.invalid) return;
    const animal = await this.#animalService.create(this.form.value as UpdateAnimal);
    if (!animal) return;
    this.toastrService.success('Foi criado', 'Animal');
    if (this.hasKey(this.file()!) && this.previewPhotoUrl()) {
      const saved = await this.#animalService.savePhoto(animal.id, this.file()!);
      if (!saved) {
        this.toastrService.info('Não foi possível salvar a foto', 'Animal');
      }
    }

    let data: Animal[] = [];

    if (this.clientId()) {
      data = await this.#animalService.findAllByClientId(this.clientId()!);
      this.#animalComponent.animalListComponent.setData(data);
      this.#animalComponent.clearFilters();
      this.#router.navigate(['/dashboard/animais'], { queryParams: { clientId: this.clientId() }});
    } else {
      this.#animalComponent.clearFilters();
      await this.#animalComponent.reload();
      this.#router.navigate(['/dashboard/animais']);
    }
  }

  async update() {
    this.checkForm();
    if (!this.animalId()) return;
    if (this.form.invalid) return;

    if (this.clientId() && this.form.controls.clientId.value !== this.clientId()) {
      this.toastrService.info('Não é permitido alterar o cliente', 'Atualização');
      return;
    }
    if (await this.#animalService.update(this.animalId()!, this.form.value as UpdateAnimal)) {
      this.toastrService.success('Atualizado', 'Animal');
    }

    if (this.hasKey(this.file()!) && this.previewPhotoUrl()) {
      const saved = await this.#animalService.savePhoto(this.animalId()!, this.file()!);
      if (!saved) {
        this.toastrService.info('Não foi possível salvar a foto', 'Animal');
      }
    }

    let data: Animal[] = [];

    if (this.clientId()) {
      data = await this.#animalService.findAllByClientId(this.clientId()!);
      await this.#animalComponent.clearFilters();
      this.#router.navigate(['/dashboard/animais'], { queryParams: { clientId: this.clientId() }});
    } else {
      await this.#animalComponent.clearFilters();
      await this.#animalComponent.reload();
      this.#router.navigate(['/dashboard/animais']);
    }
  }

  hasKey(obj: object) {
    for (const key in obj) {
      return true;
    }
    return false;
  }

  async checkIfEdition() {
    if (!this.animalId()) return;
    const animal = (await this.#animalService.findById(this.animalId()!))!;
    this.animal.set(animal);
    this.previewPhotoUrl.set(animal.photoUrl ?? '');
    const client = await this.#clientService.findById(animal.client.id);
    this.form.controls.clientId.setValue(''+client.id);
    this.form.controls.client.controls.name.setValue(client.document + ' - ' + client.name);
    this.form.patchValue(animal);
    this.matSlideToggle.checked = !!animal.photoUrl;
    this.form.updateValueAndValidity();
  }

  onClientSelect(event: MatAutocompleteSelectedEvent) {
    const _document = event.option.value.replace(/(\d{3}\.\d{3}\.\d{3}-\d{2}).*/, '$1');
    const client = this.clients().filter(({ document }) => document.trim() === _document.trim());
    this.form.controls.clientId.setValue(''+client[0].id);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  removeFile() {
    if (this.animalId() && this.animal().photoUrl) {
      this.#animalService.removePhoto(this.animalId()!);
    }
    this.previewPhotoUrl.set('');
    this.file.set(null);
  }

}
