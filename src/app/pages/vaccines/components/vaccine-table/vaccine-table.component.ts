import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Vaccine } from '../../../../models/vaccine';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import moment from 'moment';

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
    LoadingComponent,
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

  hasExpired(date: Date) {
    const today = moment().startOf('day');
    const target = moment(date).startOf('day');
    return target.isBefore(today);
  }

  isNearExpiry(date: Date) {
    const today = moment().startOf('day');
    const target = moment(date).startOf('day');
    const daysBeforeExpiry = moment(date).subtract(10, 'days').startOf('day');
    return today.isSameOrAfter(daysBeforeExpiry) && today.isBefore(target);
  }
}
