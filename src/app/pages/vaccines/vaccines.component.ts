import { AfterViewInit, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogModule } from 'primeng/dialog';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { Vaccine } from '../../models/vaccine';
import { VaccineService } from '../../services/vaccine.service';
import { VaccineTableComponent } from './components/vaccine-table/vaccine-table.component';
import { ToastrService } from 'ngx-toastr';
import BaseStoreComponent from '../../base/base-store.component';
import { RouterLink, RouterOutlet } from '@angular/router';

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
    MatPaginatorModule,
    DialogModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.scss'
})
export default class VaccinesComponent extends BaseStoreComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(VaccineTableComponent)
  vaccineTable!: VaccineTableComponent;

  #toastrService = inject(ToastrService);

  closeDialog = signal(true);

  #vaccineService = inject(VaccineService);
  openMoreFilterModal = signal(false);
  data = signal([] as Vaccine[]);


  async ngOnInit() {
    // this.data.set(await this.#vaccineService.findAll());
  }

  ngAfterViewInit() {
    this.vaccineTable.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;
    this.paginator.pageSizeOptions = [5, 10, 25];
    this.paginator.pageIndex = 0;
    this.reload();
    this.paginator.page.subscribe(event => this.reload({ size: event.pageSize, page: event.pageIndex }))
  }

  async reload(params?:{ size: number; page: number;}) {
    const pageModel = await this.#vaccineService.findAll(params)
    this.paginator.length = pageModel.totalElements;
    this.data.set(pageModel.elements);
  }

  async removeAll() {
    if (!this.vaccineTable.selection.hasValue()) {
      this.#toastrService.info('Selecione uma ou mais vacinas', 'Deletar');
      this.closeDialog.set(true);
      return;
    }
    const length = this.vaccineTable.selection.selected.length;
    this.vaccineTable.selection.selected.forEach(async ({ id }) => await this.#vaccineService.deleteById(id));

    length == 1 ? this.#toastrService.success('Removida', 'Vacina') : this.#toastrService.success('Removidas', 'Vacina');
    setTimeout(() => this.reload(), 200);

    this.closeDialog.set(true);
  }

}

