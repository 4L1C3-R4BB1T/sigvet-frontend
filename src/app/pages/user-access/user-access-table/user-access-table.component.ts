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
import { User } from '../../../models/user';
import { LoadingComponent } from '../../../components/loading/loading.component';

type PartialUser = Pick<User, 'id'| 'name' |'username' | 'email' | 'document' | 'phone' | 'createdAt'>;

@Component({
  selector: 'app-user-access-table',
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
  templateUrl: './user-access-table.component.html',
  styleUrl: './user-access-table.component.scss',
})
export class UserAccessTableComponent implements OnChanges {
  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'username',
    'email',
    'document',
    'phone',
    'createdAt'
  ];

  @Input()
  data: PartialUser[] = [];

  dataSource!: MatTableDataSource<PartialUser>;
  selection = new SelectionModel<PartialUser>(true, []);

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
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
