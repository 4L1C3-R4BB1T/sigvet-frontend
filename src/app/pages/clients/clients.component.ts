import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import BaseStoreComponent from '../../base/base-store.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ClientListComponent } from './client-list/client-list.component';
import { SearchService } from '../../services/search.service';
import { FilterPropertyModel } from '../../components/filter/filter.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    ClientListComponent,
    PaginatorComponent,
    FilterComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export default class ClientsComponent extends BaseStoreComponent {

  @ViewChild(ClientListComponent)
  clientListComponent!: ClientListComponent;

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  #clientService = inject(ClientService);

  filterPropertyModel: FilterPropertyModel[] = [
    {
      property: 'name',
      propertyNickname: 'Nome',
    },
    {
      property: 'email',
      propertyNickname: 'Email',
    },
    {
      property: 'username',
      propertyNickname: 'Apelido'
    },
    {
      property: 'document',
      propertyNickname: 'Documento',
      mask: '000.000.000-00',
    },
    {
      property: 'phone',
      propertyNickname: 'Celular',
      mask: '(00) 00000-0000',
    },
  ];

  openMoreFilterModal = signal(false);

  userId = signal<number | null>(null);

  createClient = signal(false);

  #searchService = inject(SearchService);

  appliedFilters = signal([] as FilterPropertyModel[]);

  async reload() {
    this.clearAppliedFilters();
    await this.clientListComponent.reload();
  }

  generatePDF() {
    this.clientListComponent?.generatePDF();
  }

  async searchByName(name: string) {
    this.clearAppliedFilters();
    const data = await this.#searchService.searchClientsByName(name);
    this.clientListComponent.setData(data);
  }

  async handleOnFilter(properties: FilterPropertyModel[]) {
    const equalFilters = properties.reduce((currentQueryParam, propertyFilter) => {
      if (currentQueryParam.length !== 0) {
        currentQueryParam += ';';
      }
      return currentQueryParam + `${propertyFilter.property}:=${propertyFilter.outputValue}`;
    }, '');

    this.appliedFilters.set(properties);

    const data = await this.#clientService.findAll({
      equal_filters: equalFilters,
    })
    this.clientListComponent.setData(data);
  }

  clearAppliedFilters() {
    this.appliedFilters.set([]);
  }

  clearFilters() {
    this.searchInput.nativeElement.value = '';
    this.reload();
  }
}
