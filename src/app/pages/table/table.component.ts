import { Component } from '@angular/core';

import { TablePageBodyComponent } from './components/table-page-body/table-page-body.component';
import { TablePageHeaderComponent } from './components/table-page-header/table-page-header.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TablePageHeaderComponent, TablePageBodyComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export default class TableComponent { }
