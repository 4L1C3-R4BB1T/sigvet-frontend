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
import { Consult } from '../../../models/consult';
import { ConsultStatusPipe } from '../../../pipes/consult-status.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-consult-table',
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
    ConsultStatusPipe,
    LoadingComponent,
  ],
  templateUrl: './consult-table.component.html',
  styleUrl: './consult-table.component.scss',


})
export class ConsultTableComponent implements OnChanges {
  displayedColumns: string[] = [
    'select',
    'date',
    'hour',
    'veterinarianName',
    'specialty',
    'animalName',
    'breed',
    'clientName',
    'status',
    'actions',
  ];

  @Input()
  data: Consult[] = [];

  dataSource!: MatTableDataSource<Consult>;
  selection = new SelectionModel<Consult>(true, []);

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
