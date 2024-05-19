import { Component, inject, signal } from '@angular/core';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FadeInDirective } from '../../../directives/fade-in.directive';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [AnimalCardComponent, FadeInDirective, MatPaginatorModule],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {

  #animalService = inject(AnimalService);

  elements = signal<Animal[]>([]);

  length = 50; // Quantidade de dados trazidos
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [2, 5, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  async ngOnInit() {
    await this.reload();
  }

  async reload() {
    const elements = await this.#animalService.findAll({ size: this.pageSize, page: this.pageIndex });
    this.length = elements.length;
    this.elements.set(elements);
  }

  async handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    await this.reload();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
