import { Component, inject, signal } from '@angular/core';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FadeInDirective } from '../../../directives/fade-in.directive';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [AnimalCardComponent, FadeInDirective, MatPaginatorModule],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {

  #animalService = inject(AnimalService);

  #clientService = inject(ClientService);

  #activatedRoute = inject(ActivatedRoute);

  clientId = signal(this.#activatedRoute.snapshot.queryParams['clientId'] as number);
  client = signal({} as User);

  elements = signal<Animal[]>([]);

  length = 50; // Quantidade de dados trazidos
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  async ngOnInit() {
    if (this.clientId()) {
      this.client.set(await this.#clientService.findById(this.clientId()));
      await this.reload(await this.#animalService.findAllByClientId(this.clientId()));
      return;
    }

    await this.reload();
  }

  async reload(data?: Animal[]) {
    if (data) {
      this.length = data.length;
      this.elements.set(data);
      return;
    }
    const pageModel = await this.#animalService.findAll({ size: this.pageSize, page: this.pageIndex });
    this.length = pageModel.totalElements;
    this.elements.set(pageModel.elements);
  }

  async handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
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
