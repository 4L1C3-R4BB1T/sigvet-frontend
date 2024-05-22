import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import BaseFormComponent from '../../../../base/base-form.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../validators/custom-validators';
import { VaccineService } from '../../../../services/vaccine.service';
import { UpdateVaccine } from '../../../../models/update-vaccine';
import VaccinesComponent from '../../vaccines.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-vaccine',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, RouterLink, MatButtonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './update-vaccine.component.html',
  styleUrl: './update-vaccine.component.scss'
})
export class UpdateVaccineComponent extends BaseFormComponent implements OnInit {
  // <!-- name: string
  // manufacturer: string
  // lot: string
  // unitPrice: number
  // stock: number
  // expirationDate: string -->

  #vaccineService = inject(VaccineService);

  #formBuilder = inject(FormBuilder);

  #vaccineTableComponent = inject(VaccinesComponent);

  #activatedRoute = inject(ActivatedRoute);

  #router = inject(Router);

  vaccineId = signal(this.#activatedRoute.snapshot.params['id']);

  override form = this.#formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    manufacturer: ['', [Validators.required, Validators.maxLength(100)]],
    lot: ['', [Validators.required, Validators.maxLength(100)]],
    unitPrice: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required,]],
    expirationDate: ['', [Validators.required, CustomValidators.presentOrFuture]],
  });

  async ngOnInit() {
    await this.checkIfEdition();
  }

  async save() {
    this.checkForm();
    if (this.form.invalid) return;
    if (this.vaccineId()) {
      await this.#vaccineService.update(this.vaccineId(), this.form.value as UpdateVaccine);
      this.#vaccineService.toastrService.success('Atualizada', 'Vacina')
    } else {
      await this.#vaccineService.create(this.form.value as UpdateVaccine);
      this.#vaccineService.toastrService.success('Criada', 'Vacina')

    }
    await this.#vaccineTableComponent.reload();
    this.#router.navigate(['dashboard', 'vacinas']);
  }

  async checkIfEdition() {
    if (!this.vaccineId()) return;
    const data = await this.#vaccineService.findById(this.vaccineId());
    this.form.patchValue(data as any);
  }
}
