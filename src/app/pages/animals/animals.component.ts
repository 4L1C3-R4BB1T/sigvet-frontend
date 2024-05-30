import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { ViewAnimalInfoComponent } from './view-animal-info/view-animal-info.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { Animal } from '../../models/animal';
import BaseComponent from '../../base/base.component';
import { SearchService } from '../../services/search.service';
import { AnimalService } from '../../services/animal.service';
import { FilterPropertyModel } from '../../components/filter/filter.model';
import { ShowAppliedFiltersComponent } from '../../components/show-applied-filters/show-applied-filters.component';
import { PageModel } from '../../models/page-model';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    AnimalListComponent,
    PaginatorComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    ViewAnimalInfoComponent,
    RouterOutlet,
    FilterComponent,
    ShowAppliedFiltersComponent
  ],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.scss'
})
export default class AnimalsComponent extends BaseComponent implements AfterViewInit {

  @ViewChild(AnimalListComponent)
  animalListComponent!: AnimalListComponent;

  @ViewChild('searchInput')
  searchInput!: ElementRef;

  #animalService = inject(AnimalService);

  #searchService = inject(SearchService);

  openMoreFilterModal = signal(false);

  #router = inject(Router);

  protected override filterPropertyModel: FilterPropertyModel[] = [
    {
      property: 'name',
      propertyNickname: 'Nome',
    },
    {
      property: 'breed',
      propertyNickname: 'Raça',
    },
    {
      property: 'birthDate',
      propertyNickname: 'Data de Nascimento',
      type: 'date',
    },
    {
      property: 'client.name',
      propertyNickname: 'Nome do Cliente',
    }
  ];

  ngAfterViewInit() {
      if (this.animalListComponent.clientId()) {
        this.filterPropertyModel = this.filterPropertyModel.filter(property => property.property !== 'client.name');
      }
  }

  create() {
    if (this.animalListComponent.clientId()) {
      this.#router.navigateByUrl('/dashboard/animais/novo?clientId='+this.animalListComponent.clientId());
    } else {
      this.#router.navigateByUrl('/dashboard/animais/novo');
    }
  }

  override async searchByName(name: string) {
    this.clearAppliedFilters();
    let data = await this.#searchService.searchAnimalsByName(name);
    if (this.animalListComponent.clientId()) {
      data = data.filter(animal => {
        return  animal.client.id == this.animalListComponent.clientId();
      });
    }
    this.animalListComponent.setData(data);
  }

  override setData(data: Animal[] | PageModel<Animal[]>) {
    this.animalListComponent.setData(data);
  }

  override async reload() {
    this.clearAppliedFilters();
    await this.animalListComponent.reload(true);
  }


  override getEntityService() {
    return this.#animalService;
  }

  override getInput(): HTMLInputElement {
    return this.searchInput.nativeElement;
  }

 override async handleOnFilter(properties: FilterPropertyModel[])  {
  let initialParams = '';
  if (this.animalListComponent.clientId()) {
    initialParams = `client.id:=${this.animalListComponent.clientId()}`;
  }

  const equalFilters = properties.reduce((currentQueryParam, propertyFilter) => {
    if (currentQueryParam.length !== 0) {
      currentQueryParam += ';';
    }
    return currentQueryParam + `${propertyFilter.property}:=${propertyFilter.outputValue}`;
  }, initialParams);

    this.appliedFilters.set(properties);


    const data = await this.getEntityService().findAll({
      equal_filters: equalFilters,
    })

    this.setData(data);
  }
}
