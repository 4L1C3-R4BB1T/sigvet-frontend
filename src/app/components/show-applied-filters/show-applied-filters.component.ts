import { Component, Input } from '@angular/core';
import { FilterPropertyModel } from '../filter/filter.model';

@Component({
  selector: 'app-show-applied-filters',
  standalone: true,
  imports: [],
  templateUrl: './show-applied-filters.component.html',
  styleUrl: './show-applied-filters.component.scss'
})
export class ShowAppliedFiltersComponent {

  @Input()
  filters: FilterPropertyModel[] = [];

  applyCapitalize(value: string) {
    return value.replace(/\b./, char => char.toUpperCase());
  }
}
