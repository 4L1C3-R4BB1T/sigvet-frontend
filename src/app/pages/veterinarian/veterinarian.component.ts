import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VeterinarianListComponent } from './veterinarian-list/veterinarian-list.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import BaseComponent from '../../base/base.component';
import { SearchService } from '../../services/search.service';
import { PageModel } from '../../models/page-model';
import { VeterinarianService } from '../../services/veterinarian.service';
import { User } from '../../models/user';
import { FilterPropertyModel } from '../../components/filter/filter.model';
import { ShowAppliedFiltersComponent } from '../../components/show-applied-filters/show-applied-filters.component';

@Component({
  selector: 'app-veterinarian',
  standalone: true,
  imports: [
    FilterComponent,
    VeterinarianListComponent,
    PaginatorComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    MatPaginatorModule,
    RouterLink,
    RouterOutlet,
    ShowAppliedFiltersComponent
  ],
  templateUrl: './veterinarian.component.html',
  styleUrl: './veterinarian.component.scss'
})
export default class VeterinarianComponent extends BaseComponent {

  @ViewChild(VeterinarianListComponent)
  veterinarianListComponent!: VeterinarianListComponent;

  @ViewChild('searchInput')
  searchInput!: ElementRef;

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
    {
      property: 'specialty',
      propertyNickname: 'Especialidade',
    },
  ];

  openMoreFilterModal = signal(false);

  userId = signal<number | null>(null);

  createVeterinarian = signal(false);

  #searchService = inject(SearchService);

  #veterinarianService = inject(VeterinarianService);

  reset() {
    this.createVeterinarian.set(false);
    this.userId.set(null);
  }

  override async searchByName(name: string) {
    this.clearAppliedFilters();
    const data = await this.#searchService.searchVeterinariansByName(name);
    this.veterinarianListComponent.setData(data);
  }

  override setData(data: PageModel<User[]>) {
    this.veterinarianListComponent.setData(data);
  }

  override async reload() {
    this.clearAppliedFilters();
    await this.veterinarianListComponent.reload();
  }


  override getEntityService() {
    return this.#veterinarianService;
  }

  override getInput(): HTMLInputElement {
    return this.searchInput.nativeElement;
  }

  generatePDF() {
    this.veterinarianListComponent?.generatePDF();
  }
}
