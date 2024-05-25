import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { first } from 'rxjs';
import BaseFormComponent from '../../../base/base-form.component';
import { Animal } from '../../../models/animal';
import { User } from '../../../models/user';
import { Vaccine } from '../../../models/vaccine';
import { SearchService } from '../../../services/search.service';
import { VaccinationService } from '../../../services/vaccination.service';
import { CustomValidators } from '../../../validators/custom-validators';

@Component({
  selector: 'app-update-vaccination',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    MatAutocompleteModule,
    NgxMaskDirective,
    MatButton,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './update-vaccination.component.html',
  styleUrl: './update-vaccination.component.scss',
  providers: [provideNgxMask()],
})
export class UpdateVaccinationComponent
  extends BaseFormComponent
  implements OnInit
{
  #formBuilder = inject(FormBuilder);
  #searchService = inject(SearchService);
  #vaccinationService = inject(VaccinationService);

  id = signal(inject(ActivatedRoute).snapshot.params['id']);

  protected override form = this.#formBuilder.group({
    dateTime: ['', [Validators.required]],
    veterinarian: this.#formBuilder.group({
      name: ['', Validators.required],
    }),
    vaccine: this.#formBuilder.group({
      name: ['', Validators.required],
    }),
    animal: this.#formBuilder.group({
      name: ['', Validators.required],
    }),
    veterinarianId: ['', [Validators.required]],
    vaccineId: ['', [Validators.required]],
    animalId: ['', [Validators.required]],
  });

  animals = signal([] as Animal[]);

  veterinarians = signal([] as User[]);

  vaccines = signal([] as Vaccine[]);

  async ngOnInit() {
    await this.checkIfEdition();
    if (!this.isEdition()) {
      this.form.controls.dateTime.addValidators(CustomValidators.presentOrFuture);
    }

  }

  private isEmpty(value: string | null) {
    return value === '' || !value;
  }

  private checkIfRequiredFieldsIsValid() {
    if (this.isEmpty(this.form.controls.vaccineId.value)) {
      this.toastrService.warning('Vacina é obrigatório');
    }

    if (this.isEmpty(this.form.controls.animalId.value)) {
      this.toastrService.warning('Animal é obrigatório');
    }

    if (this.isEmpty(this.form.controls.veterinarianId.value)) {
      this.toastrService.warning('Veterinário é obrigatório')
    }
  }

  async save() {
    if (this.form.invalid) {
      if (this.form.controls.veterinarian.valid || this.form.controls.vaccine.valid || this.form.controls.animal.valid) {
        this.checkIfRequiredFieldsIsValid();
      }
      this.checkForm();
      return;
    }

    if (
      this.isEdition() &&
      (await this.#vaccinationService.update(this.id(), <any>this.form.value))
    ) {
      this.toastrService.success('Atualizada', 'Vacinação');
    }

    if (
      !this.isEdition() &&
      (await this.#vaccinationService.create(<any>this.form.value))
    ) {
      this.toastrService.success('Criada', 'Vacinação');
    }

    this.router.navigate(['/dashboard', 'vacinacoes']);
  }

  async checkIfEdition() {
    if (!this.id()) return false;
    const data = (await this.#vaccinationService.findById(this.id()))!;

    this.form.patchValue(<any>data);

    this.form.controls.veterinarianId.setValue(<any>data?.veterinarian.id);

    this.form.controls.veterinarian.patchValue({
      name: this.toPrettyString(data.veterinarian.document, data.veterinarian.name),
    });

    this.form.controls.veterinarian.disable();

    this.form.controls.animal.patchValue({
      name: this.toPrettyString(data.animal.name, data.animal.client.document, data.animal.client.name),
    });

    this.form.controls.animal.disable();

    this.form.controls.vaccine.patchValue({
      name: this.toPrettyString(data.vaccine.lot, data.vaccine.name),
    })
    this.form.controls.vaccine.disable();

    this.form.controls.animalId.setValue(<any>data?.animal.id);
    this.form.controls.vaccineId.setValue(<any>data?.vaccine.id);

    this.form.controls.dateTime.valueChanges.pipe(first()).subscribe(value => {
      this.form.controls.dateTime.addValidators(CustomValidators.presentOrFuture);
      this.form.controls.dateTime.setValue('');
      setTimeout(() => {
        this.form.controls.dateTime.setValue(value);
      }, 100);
      this.form.updateValueAndValidity();
    });

    return true;
  }

  isEdition() {
    return !!this.id();
  }

  toPrettyString(...args: string[]) {
    return args.join(' - ');
  }

  async searchByName(name: string, option: 0 | 1 | 2) {
    if (option === 0) {
      this.form.controls.veterinarianId.setValue('');
      this.veterinarians.set(
        await this.#searchService.searchVeterinariansByName(name)
      );
    } else if (option === 1) {
      this.form.controls.animalId.setValue('');
      this.animals.set(await this.#searchService.searchAnimalsByName(name));
    } else {
      this.form.controls.vaccineId.setValue('');
      this.vaccines.set(await this.#searchService.searchVaccinesByName(name));
    }
  }

  onSelectionChange(object: { id: number | string }, index: 0 | 1 | 2 = 2) {
    if (index === 0) {
      this.form.controls.veterinarianId.setValue(object.id as string);
    } else if (index === 1) {
      this.form.controls.vaccineId.setValue(object.id as string);
    } else {
      this.form.controls.animalId.setValue(object.id as string);
    }
  }
  
}
