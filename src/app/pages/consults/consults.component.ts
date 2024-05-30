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
import { Consult } from '../../models/consult';
import { ConsultService } from '../../services/consult.service';
import { ConsultTableComponent } from './consult-table/consult-table.component';

@Component({
  selector: 'app-consults',
  standalone: true,
  imports: [
    ConsultTableComponent,
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
  templateUrl: './consults.component.html',
  styleUrl: './consults.component.scss'
})
export default class ConsultsComponent extends BaseComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(ConsultTableComponent)
  consultTable!: ConsultTableComponent;

  #toastrService = inject(ToastrService);

  closeDialog = signal(true);

  #consultService = inject(ConsultService);
  openMoreFilterModal = signal(false);
  data = signal([] as Consult[]);

  ngAfterViewInit() {
    this.consultTable.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;
    this.paginator.pageSizeOptions = [5, 10, 25];
    this.paginator.pageIndex = 0;
    this.reload();
    this.paginator.page.subscribe(event => this.reload({ size: event.pageSize, page: event.pageIndex }))
  }

  override async reload(params?:{ size: number; page: number;}) {
    const pageModel = await this.#consultService.findAll(params)
    this.paginator.length = pageModel.totalElements;
    this.data.set(pageModel.elements);
  }

  async removeAll() {
    if (!this.consultTable.selection.hasValue()) {
      this.#toastrService.info('Selecione uma ou mais consultas', 'Deletar');
      this.closeDialog.set(true);
      return;
    }
    const length = this.consultTable.selection.selected.length;
    this.consultTable.selection.selected.forEach(async ({ id }) => await this.#consultService.deleteById(id));

    length == 1 ? this.#toastrService.success('Removida', 'Consulta') : this.#toastrService.success('Removidas', 'Consulta');
    setTimeout(() => this.reload(), 200);

    this.closeDialog.set(true);
  }

}
