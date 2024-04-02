import { Component } from '@angular/core';
import TableComponent from '../table/table.component';

@Component({
  selector: 'app-veterinaries',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './veterinaries.component.html',
  styleUrl: './veterinaries.component.scss'
})
export default class VeterinariesComponent { }
