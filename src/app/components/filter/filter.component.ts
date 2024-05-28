import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterPropertyModel } from './filter.model';
import { JsonPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgIf, MatButtonModule, MatSelectModule, MatInputModule],
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
    for (const { property } of this.fields) {
      this.form.addControl(property, new FormControl());
    }
    this.fieldsCopy.set(this.fields);
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
    const propertiesSelected = this.fieldsSelect().map(propertyFilter => {
      const value = this.form.get(propertyFilter.property)?.value ?? '';
      propertyFilter.outputValue = value;
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
