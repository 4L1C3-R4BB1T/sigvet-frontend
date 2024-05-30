import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import BaseComponent from '../../base/base.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ClientListComponent } from './client-list/client-list.component';
import { SearchService } from '../../services/search.service';
import { FilterPropertyModel } from '../../components/filter/filter.model';
import { ClientService } from '../../services/client.service';
import { User } from '../../models/user';
import { PageModel } from '../../models/page-model';
import { ShowAppliedFiltersComponent } from '../../components/show-applied-filters/show-applied-filters.component';

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
    ShowAppliedFiltersComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export default class ClientsComponent extends BaseComponent {

  @ViewChild(ClientListComponent)
  clientListComponent!: ClientListComponent;

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  #clientService = inject(ClientService);

  override filterPropertyModel: FilterPropertyModel[] = [
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

  generatePDF() {
    this.clientListComponent?.generatePDF();
  }

  override async searchByName(name: string) {
    this.clearAppliedFilters();
    const data = await this.#searchService.searchClientsByName(name);
    this.clientListComponent.setData(data);
  }

  override setData(data: PageModel<User[]>) {
    this.clientListComponent.setData(data);
  }

  override async reload() {
    this.clearAppliedFilters();
    await this.clientListComponent.reload();
  }


  override getEntityService() {
    return this.#clientService;
  }

  override getInput(): HTMLInputElement {
    return this.searchInput.nativeElement;
  }

}
