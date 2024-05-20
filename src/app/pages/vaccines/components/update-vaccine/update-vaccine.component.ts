import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import BaseFormComponent from '../../../../base/base-form.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../validators/custom-validators';

@Component({
  selector: 'app-update-vaccine',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './update-vaccine.component.html',
  styleUrl: './update-vaccine.component.scss'
})
export class UpdateVaccineComponent extends BaseFormComponent {
  // <!-- name: string
  // manufacturer: string
  // lot: string
  // unitPrice: number
  // stock: number
  // expirationDate: string -->

  #formBuilder = inject(FormBuilder);

  override form = this.#formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    manufacturer: ['', [Validators.required, Validators.maxLength(100)]],
    lot: ['', [Validators.required, Validators.maxLength(100)]],
    unitPrice: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required,]],
    expirationDate: ['', [Validators.required, CustomValidators.presentOrFuture]],
  });
}
