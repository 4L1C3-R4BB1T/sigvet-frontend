import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Vaccine } from '../../../../models/vaccine';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vaccine-table',
  standalone: true,
  imports: [
    MatMenuModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    ButtonModule,
    CurrencyPipe,
    TagModule,
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    RouterLink,
  ],
  templateUrl: './vaccine-table.component.html',
  styleUrl: './vaccine-table.component.scss',
})
export class VaccineTableComponent implements OnChanges {
  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'manufacturer',
    'lot',
    'unitPrice',
    'stock',
    'expirationDate',
    'actions',
  ];

  @Input()
  data: Vaccine[] = [];

  dataSource!: MatTableDataSource<Vaccine>;
  selection = new SelectionModel<Vaccine>(true, []);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
}
