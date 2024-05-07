import { Component } from '@angular/core';
import { VaccineTableComponent } from './components/vaccine-table/vaccine-table.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [VaccineTableComponent, PaginatorComponent],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})
export default class VaccinesComponent { }
