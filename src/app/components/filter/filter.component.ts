import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterProperty } from './filter.model';
import { NgIf } from '@angular/common';
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
export class FilterComponent implements OnInit {

  @Output()
  onClose = new EventEmitter();

  @Input()
  fields: FilterProperty[] = [
    {
      property: 'name',
      propertyNickname: 'Nome',
    },
    {
      property: 'document',
      propertyNickname: 'Documento',
      mask: '000.000.000-00',
    }
  ];

  fieldsCopy = signal(this.fields);

  fieldsSelect = signal([] as FilterProperty[]);

  form = new FormGroup({});

  ngOnInit(): void {
    for (const { property } of this.fields) {
      this.form.addControl(property, new FormControl());
    }
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
}
