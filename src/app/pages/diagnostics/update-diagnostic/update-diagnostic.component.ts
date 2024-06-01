import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import BaseFormComponent from '../../../base/base-form.component';
import { ConsultService } from '../../../services/consult.service';
import { DiagnosticService } from '../../../services/diagnostic.service';
import DiagnosticsComponent from '../diagnostics.component';
import { Consult } from './../../../models/consult';
import { ConsultStatusPipe } from '../../../pipes/consult-status.pipe';
import { SearchService } from '../../../services/search.service';

const onlyConsultScheduled = (consult: Consult) => consult.status === 'SCHEDULED';

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
    MatSelectModule,
    RouterLink,
    ConsultStatusPipe,
  ],
  templateUrl: './update-diagnostic.component.html',
  styleUrl: './update-diagnostic.component.scss',
  providers: [provideNgxMask()],
})
export class UpdateDiagnosticComponent
  extends BaseFormComponent
  implements OnInit {
  #formBuilder = inject(FormBuilder);
  #consultService = inject(ConsultService);
  #diagnosticService = inject(DiagnosticService);
  #searchService = inject(SearchService);

  #table = inject(DiagnosticsComponent);

  consults = signal([] as Consult[]);

  id = signal(inject(ActivatedRoute).snapshot.params['id']);

  protected override form = this.#formBuilder.group({
    diagnosis: ['', [Validators.required]],
    comments: [''],
    consults: this.#formBuilder.group({
      name: ['', Validators.required],
    }),
    consultId: ['', Validators.required],
  });

  async ngOnInit() {
    await this.checkIfEdition();
    this.consults.set((await this.#consultService.findAll()).elements.filter(onlyConsultScheduled));
  }

  private isEmpty(value: string | null | undefined) {
    return value === '' || !value;
  }

  async searchConsultByTerm(term: string) {
    this.form.controls.consultId.setValue('');
    if (term.trim() === '') {
      this.consults.set((await this.#consultService.findAll()).elements);
      return;
    }
    this.consults.set(await this.#searchService.searchConsultsByTerm(term));
  }

  setConsultId(id: number) {
    this.form.controls.consultId.setValue(id.toString());
  }

  private checkIfRequiredFieldsIsValid() {
    if (this.isEmpty(this.form.controls.consultId.value)) {
      this.toastrService.warning('Consulta é obrigatória')
      return;
    }
  }

  async save() {
    if (!this.form.controls.consultId.value) {
      const consultId = this.form.controls.consults.get('name')?.value ?? '';
      this.form.controls.consultId.setValue(consultId);
    }

    if (this.form.invalid) {
      if (this.form.controls.diagnosis.valid || this.form.controls.comments.valid) {
        this.checkIfRequiredFieldsIsValid();
      }
      this.checkForm();
      return;
    }

    if (this.isEdition() && (await this.#diagnosticService.update(this.id(), <any>this.form.value))) {
      this.toastrService.success('Atualizado', 'Diagnóstico');
      await this.#table.reload();
      this.router.navigate(['/dashboard', 'diagnosticos']);
    }

    if (!this.isEdition() && (await this.#diagnosticService.create(<any>this.form.value))) {
      this.toastrService.success('Criado', 'Diagnóstico');
      await this.#table.reload();
      this.router.navigate(['/dashboard', 'diagnosticos']);
    }
  }

  async checkIfEdition() {
    if (!this.id()) return false;
    const data = (await this.#diagnosticService.findById(this.id()))!;

    this.form.patchValue(<any>data);

    const consult = (await this.#consultService.findById(data.consult.id))!;

    this.form.controls.consults.patchValue({
      name: this.toPrettyString(consult.id.toString(), consult.date.toString(), consult.hour,
        consult.veterinarian.name, consult.veterinarian.crmv, consult.animal.name, consult.animal.breed)
    });

    this.form.controls.consults.disable();

    this.form.controls.consultId.setValue(<any>data?.consult.id);

    return true;
  }

  isEdition() {
    return !!this.id();
  }

  toPrettyString(...args: string[]) {
    return args.join(' - ');
  }

}
