import { Component, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { VaccineTableComponent } from './components/vaccine-table/vaccine-table.component';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [
    VaccineTableComponent,
    PaginatorComponent,
    FilterComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    MatPaginatorModule
  ],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})
export default class VaccinesComponent {

  openMoreFilterModal = signal(false);

  length = 50; // Quantidade de dados trazidos
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [2, 5, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  async ngOnInit() {
    await this.reload();
  }

  async reload() {
    // const data = await this.#clientService.findAll({ size: this.pageSize, page: this.pageIndex });
    // this.length = data.length;
    // this.data.set(data);
  }

  async handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    await this.reload();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}

