import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterPropertyModel } from './filter.model';
import { JsonPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {MatDatepickerModule} from '@angular/material/datepicker';
import moment, { isMoment } from 'moment';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, MatDatepickerModule, NgxMaskDirective, NgIf, MatButtonModule, MatSelectModule, MatInputModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [provideNgxMask()]
})
export class FilterComponent implements OnChanges {

  @Output()
  onClose = new EventEmitter();

  @Input()
  fields: FilterPropertyModel[] = [];

  @Output()
  onFilter = new EventEmitter();

  fieldsCopy = signal([] as FilterPropertyModel[]);

  fieldsSelect = signal([] as FilterPropertyModel[]);

  form = new FormGroup({});


  ngOnChanges(): void {
    for (const { property, pattern } of this.fields) {
      if (property.includes('.')) {
        const formGroupName = property.split('.')[0];
        const formControlName = property.split('.')[1];
        if (!this.form.get(formGroupName)) {
          this.form.addControl(formGroupName, new FormGroup({
            [formControlName]: new FormControl('', [Validators.pattern(pattern ?? '')]),
          }));
        } else {
          (this.form.controls as FormGroup).addControl(formControlName, new FormControl('', [Validators.pattern(pattern ?? '')]));
        }

      } else {
        this.form.addControl(property, new FormControl('', [Validators.pattern(pattern ?? '')]));
      }
    }
    this.form.updateValueAndValidity();
    this.fieldsCopy.set(this.fields);
  }

  isFormGroup(property: string) {
    return property.includes('.');
  }

  getFormGroup(property: string) {
    return property.split('.');
  }

  applyFilter(select: MatSelectChange) {
    if (!select.value) return;
    const field = this.fields.find(field => field.property === select.value)!;
    this.fieldsSelect().push(field);
    this.fieldsCopy.update(oldFields => oldFields.filter(field1 => field1.property !== field.property));
  }

  removeFilter(property: string) {
    const field = this.fields.find(field => field.property === property)!;
    this.fieldsSelect.update(oldFields => oldFields.filter(field => field.property !== property));
    this.fieldsCopy().push(field);
  }

  clearFilter() {
    this.fieldsSelect.set([]);
    this.fieldsCopy.set(this.fields);
  }

  handleCloseEvent() {
    this.onClose.emit();
  }

  handleFilter() {
    if (this.form.invalid) {
      return;
    }
    const propertiesSelected = this.fieldsSelect().map(propertyFilter => {
      const value = this.form.get(propertyFilter.property)?.value ?? '';
      if (isMoment(value)) {
        console.log(value)
        propertyFilter.outputValue = moment(value).format('YYYY-MM-DD');
      } else {
        propertyFilter.outputValue = value;
      }
      return propertyFilter;
    })
    .filter(({ outputValue }) => outputValue!.trim() !== '');
    this.onFilter.emit(propertiesSelected);
    this.close();
  }

  close() {
    this.onClose.emit();
  }
}
