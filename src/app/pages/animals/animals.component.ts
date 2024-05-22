import { AfterViewInit, Component, ViewChild, inject, signal } from '@angular/core';

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
  ],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.scss'
})
export default class AnimalsComponent {

  @ViewChild(AnimalListComponent)
  animalListComponent!: AnimalListComponent;

  openMoreFilterModal = signal(false);

  #router = inject(Router);

  create() {
    if (this.animalListComponent.clientId()) {
      this.#router.navigateByUrl('/dashboard/animais/novo?clientId='+this.animalListComponent.clientId());
    } else {
      this.#router.navigateByUrl('/dashboard/animais/novo');
    }
  }
  reload(data?: Animal[]) {
    this.animalListComponent.reload(data);
  }
}
