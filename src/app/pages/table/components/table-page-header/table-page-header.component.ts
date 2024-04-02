import { Component } from '@angular/core';

import { PaginatorComponent } from '../../../../components/paginator/paginator.component';

@Component({
  selector: 'app-table-page-header',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './table-page-header.component.html',
  styleUrl: './table-page-header.component.scss'
})
export class TablePageHeaderComponent { }
