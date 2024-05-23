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
import { ConsultService } from '../../services/consult.service';
import { ToastrService } from 'ngx-toastr';
import BaseStoreComponent from '../../base/base-store.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ConsultTableComponent } from './consult-table/consult-table.component';
import { Consult } from '../../models/consult';

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
export default class ConsultsComponent extends BaseStoreComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(ConsultTableComponent)
  consultTable!: ConsultTableComponent;

  #toastrService = inject(ToastrService);

  closeDialog = signal(true);

  #consultService = inject(ConsultService);
  openMoreFilterModal = signal(false);
  data = signal([] as Consult[]);


  async ngOnInit() {
    this.data.set(await this.#consultService.findAll());
  }

  ngAfterViewInit() {
    this.consultTable.dataSource.paginator = this.paginator;
  }

  async reload() {
    this.data.set(await this.#consultService.findAll());
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
  }


}

