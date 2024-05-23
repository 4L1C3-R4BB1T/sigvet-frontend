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
import { Vaccination } from '../../../models/vaccination';

@Component({
  selector: 'app-vaccination-table',
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
  templateUrl: './vaccination-table.component.html',
  styleUrl: './vaccination-table.component.scss',
})
export class VaccinationTableComponent implements OnChanges {
  displayedColumns: string[] = [
    'select',
    'dateTime',
    'veterinaryName',
    'vaccineName',
    'manufacturer',
    'lot',
    'animalName',
    'breed',
    'clientName',
    'actions',
  ];

  @Input()
  data: Vaccination[] = [];

  dataSource!: MatTableDataSource<Vaccination>;
  selection = new SelectionModel<Vaccination>(true, []);

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
