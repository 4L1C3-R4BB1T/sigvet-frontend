import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterProperty } from './filter.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
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

  applyFilter(select: HTMLSelectElement) {
    if (!select.value) return;
    // Passar o objeto
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
