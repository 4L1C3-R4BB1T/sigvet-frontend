import { Component } from '@angular/core';

import TableComponent from '../table/table.component';

@Component({
  selector: 'app-vaccinations',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './vaccinations.component.html',
  styleUrl: './vaccinations.component.scss'
})
export default class VaccinationsComponent { }
