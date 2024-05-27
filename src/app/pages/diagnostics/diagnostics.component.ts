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
import { ToastrService } from 'ngx-toastr';
import BaseStoreComponent from '../../base/base-store.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DiagnosticsTableComponent } from './diagnostics-table/diagnostics-table.component';
import { DiagnosticService } from '../../services/diagnostic.service';
import { Diagnostic } from '../../models/diagnostic';

@Component({
  selector: 'app-diagnostics',
  standalone: true,
  imports: [
    DiagnosticsTableComponent,
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
  templateUrl: './diagnostics.component.html',
  styleUrl: './diagnostics.component.scss'
})
export default class DiagnosticsComponent extends BaseStoreComponent implements AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(DiagnosticsTableComponent)
  diagnosticTable!: DiagnosticsTableComponent;

  #toastrService = inject(ToastrService);

  closeDialog = signal(true);

  #diagnosticService = inject(DiagnosticService);
  openMoreFilterModal = signal(false);
  data = signal([] as Diagnostic[]);


  ngAfterViewInit() {
    this.diagnosticTable.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;
    this.paginator.pageSizeOptions = [5, 10, 25];
    this.paginator.pageIndex = 0;
    this.reload();
    this.paginator.page.subscribe(event => this.reload({ size: event.pageSize, page: event.pageIndex }))
  }

  async reload(params?:{ size: number; page: number;}) {
    const pageModel = await this.#diagnosticService.findAll(params)
    this.paginator.length = pageModel.totalElements;
    this.data.set(pageModel.elements);
  }

  async removeAll() {
    if (!this.diagnosticTable.selection.hasValue()) {
      this.#toastrService.info('Selecione uma ou mais diagnósticos', 'Deletar');
      this.closeDialog.set(true);
      return;
    }
    const length = this.diagnosticTable.selection.selected.length;
    this.diagnosticTable.selection.selected.forEach(async ({ id }) => await this.#diagnosticService.deleteById(id));

    length == 1 ? this.#toastrService.success('Removido', 'Diagnósticos') : this.#toastrService.success('Removidos', 'Diagnósticos');
    setTimeout(() => this.reload(), 200);

    this.closeDialog.set(true);
  }

}

