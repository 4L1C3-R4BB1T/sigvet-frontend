import { Component } from '@angular/core';

import TableComponent from '../table/table.component';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})
export default class VaccinesComponent { }
