import { JsonPipe, NgIf } from '@angular/common';
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
import { ConsultService } from '../../../services/consult.service';
import { SearchService } from '../../../services/search.service';
import { CustomValidators } from '../../../validators/custom-validators';
import ConsultsComponent from '../consults.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-consult',
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
    RouterLink,
    MatSelectModule,
    NgIf,
  ],
  templateUrl: './update-consult.component.html',
  styleUrl: './update-consult.component.scss',
  providers: [provideNgxMask()],
})
export class UpdateConsultComponent
  extends BaseFormComponent
  implements OnInit {
  #formBuilder = inject(FormBuilder);
  #searchService = inject(SearchService);
  #consultService = inject(ConsultService);

  #table = inject(ConsultsComponent);

  id = signal(inject(ActivatedRoute).snapshot.params['id']);

  consultStatus = [
    {
      name: 'SCHEDULED',
      brName: 'Agendada',
    },
    {
      name: 'COMPLETED',
      brName: 'Finalizada',
    },
    {
      name: 'CANCELED',
      brName: 'Cancelada',
    },
  ]

  protected override form = this.#formBuilder.group({
    date: ['', [Validators.required]],
    hour: ['', [Validators.pattern(/^(?:[01]\d|2[0-3])[0-5]\d$/), Validators.required]],
    veterinarian: this.#formBuilder.group({
      name: ['', Validators.required],
    }),
    status: ['', [Validators.required]],
    animal: this.#formBuilder.group({
      name: ['', Validators.required],
    }),
    veterinarianId: ['', [Validators.required]],
    animalId: ['', [Validators.required]],
  });

  isCompleted = signal(false);

  animals = signal([] as Animal[]);

  veterinarians = signal([] as User[]);

  async ngOnInit() {
    await this.checkIfEdition();
    if (!this.isEdition()) {
      this.form.controls.date.addValidators(CustomValidators.presentOrFuture);
      this.form.controls.status.setValue('SCHEDULED');
      this.form.controls.status.disable();
    }
  }

  private isEmpty(value: string | null) {
    return value === '' || !value;
  }

  private checkIfRequiredFieldsIsValid() {
    if (this.isEmpty(this.form.controls.veterinarianId.value)) {
      this.toastrService.warning('Veterinário é obrigatório')
      return;
    }

    if (this.isEmpty(this.form.controls.animalId.value)) {
      this.toastrService.warning('Animal é obrigatório');
      return;
    }
  }

  async save() {
    if (this.form.invalid) {
      if (this.form.controls.veterinarian.valid || this.form.controls.animal.valid) {
        this.checkIfRequiredFieldsIsValid();
      }
      this.checkForm();
      return;
    }

    const payload = {
      ...this.form.value,
      hour: this.formatStringToUTCHour(this.form.controls.hour.value!),
    };

    if (this.isEdition() && (await this.#consultService.update(this.id(), payload as any))) {
      this.toastrService.success('Atualizada', 'Consulta');
      await this.#table.reload();
      this.router.navigate(['/dashboard', 'consultas']);
    }

    if (!this.isEdition() && (await this.#consultService.create(payload as any))) {
      this.toastrService.success('Criada', 'Consulta');
      await this.#table.reload();
      this.router.navigate(['/dashboard', 'consultas']);
    }
  }

  async checkIfEdition() {
    if (!this.id()) return false;
    const data = (await this.#consultService.findById(this.id()))!;

    this.form.patchValue(<any>data);

    this.form.controls.veterinarian.patchValue({
      name: this.toPrettyString(data.veterinarian.document, data.veterinarian.name),
    });

    this.form.controls.veterinarianId.setValue(<any>data?.veterinarian.id);

    this.form.controls.animal.patchValue({
      name: this.toPrettyString(data.animal.name, data.animal.client.document, data.animal.client.name),
    });

    this.form.controls.animal.disable();

    this.form.controls.animalId.setValue(<any>data?.animal.id);

    this.form.controls.date.valueChanges.pipe(first()).subscribe(value => {
      this.form.controls.date.addValidators(CustomValidators.presentOrFuture);
      this.form.controls.date.setValue('');
      setTimeout(() => {
        this.form.controls.date.setValue(value);
      }, 100);
      this.form.updateValueAndValidity();
    });

    if (data.status === 'CANCELED' || data.status === 'COMPLETED') {
      this.form.disable();
      this.isCompleted.set(true);
      return;
    }

    return true;
  }

  isEdition() {
    return !!this.id();
  }

  toPrettyString(...args: string[]) {
    return args.join(' - ');
  }

  formatStringToUTCHour(value: string) {
    if (value === '') return value;
    return value.slice(0, 2) + ':' + value.slice(2);
  }

  async searchByName(name: string, option: 0 | 1) {
    if (option === 0) {
      this.form.controls.veterinarianId.setValue('');
      this.veterinarians.set(
        await this.#searchService.searchVeterinariansByName(name)
      );
    } else if (option === 1) {
      this.form.controls.animalId.setValue('');
      this.animals.set(await this.#searchService.searchAnimalsByName(name));
    }
  }

  onSelectionChange(object: { id: number | string }, index: 0 | 1 = 1) {
    if (index === 0) {
      this.form.controls.veterinarianId.setValue(object.id as string);
    } else if (index === 1) {
      this.form.controls.animalId.setValue(object.id as string);
    }
  }

}
