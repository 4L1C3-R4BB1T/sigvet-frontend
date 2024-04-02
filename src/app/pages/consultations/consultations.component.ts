import { Component } from '@angular/core';
import TableComponent from '../table/table.component';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss'
})
export default class ConsultationsComponent { }
