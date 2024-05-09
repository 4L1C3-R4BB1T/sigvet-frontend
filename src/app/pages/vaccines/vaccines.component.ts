import { Component, signal } from '@angular/core';
import { VaccineTableComponent } from './components/vaccine-table/vaccine-table.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { FilterComponent } from '../../components/filter/filter.component';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [VaccineTableComponent, PaginatorComponent, FilterComponent],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})
export default class VaccinesComponent {

  openFilterModal = signal(false);
}

