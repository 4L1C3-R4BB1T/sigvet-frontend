import { AfterViewInit, Component, ViewChild, inject, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import BaseComponent from '../../base/base.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Vaccination } from '../../models/vaccination';
import { VaccinationService } from '../../services/vaccination.service';
import { VaccinationTableComponent } from './vaccination-table/vaccination-table.component';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vaccinations',
  standalone: true,
  imports: [
    VaccinationTableComponent,
    PaginatorComponent,
    FilterComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    MatPaginatorModule,
    DialogModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './vaccinations.component.html',
  styleUrl: './vaccinations.component.scss'
})
export default class VaccinationsComponent extends BaseComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(VaccinationTableComponent)
  vaccinationTable!: VaccinationTableComponent;

  #toastrService = inject(ToastrService);

  closeDialog = signal(true);

  #vaccinationService = inject(VaccinationService);
  openMoreFilterModal = signal(false);
  data = signal([] as Vaccination[]);

  #searchService = inject(SearchService);

  ngAfterViewInit() {
    this.vaccinationTable.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;
    this.paginator.pageSizeOptions = [5, 10, 25];
    this.paginator.pageIndex = 0;
    this.reload();
    this.paginator.page.subscribe(event => this.reload({ size: event.pageSize, page: event.pageIndex }))
  }

  async searchByTerm(term: string) {
    if (!term.trim().length) {
      this.paginator.disabled = false;
      await this.reload();
      return;
    }
    this.paginator.disabled = true;
    this.data.set(await this.#searchService.searchVaccinationsByTerm(term));
  }

  clear(input: HTMLInputElement) {
    input.value = '';
    this.reload();
  }

  override async reload(params?:{ size: number; page: number;}) {
    const pageModel = await this.#vaccinationService.findAll(params)
    this.paginator.length = pageModel.totalElements;
    this.data.set(pageModel.elements);
  }

  async removeAll() {
    if (!this.vaccinationTable.selection.hasValue()) {
      this.#toastrService.info('Selecione uma ou mais vacinações', 'Deletar');
      this.closeDialog.set(true);
      return;
    }
    const length = this.vaccinationTable.selection.selected.length;
    this.vaccinationTable.selection.selected.forEach(async ({ id }) => await this.#vaccinationService.deleteById(id));

    length == 1 ? this.#toastrService.success('Removida', 'Vacinação') : this.#toastrService.success('Removidas', 'Vacinação');
    setTimeout(() => this.reload(), 200);

    this.closeDialog.set(true);
  }

}

