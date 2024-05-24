import { Component, inject, signal } from '@angular/core';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FadeInDirective } from '../../../directives/fade-in.directive';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../models/animal';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { User } from '../../../models/user';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';

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
  #toastrService = inject(ToastrService);

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

  async generatePDF() {
    let elements = (await this.#animalService.findAll()).elements;

    if (this.clientId()) {
      elements = this.elements();
    }

    if (!elements || !elements.length) {
      this.#toastrService.info('Não há dados', 'PDF');
      return;
    }
    const doc = new jsPDF();

    const title = "Ficha de Animais";
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2; // Calcula a posição central

    doc.setFontSize(18);
    doc.text(title, textX, 10);
    const header = [['Id', 'Nome', 'Raça', 'Data Nascimento', 'Dono']];


    const  data = elements.map(animal => [
        animal.id,
        animal.name,
        animal.breed,
        animal.birthDate,
        animal.client.name
    ]);

    autoTable(doc, {
      head: header,
      body: data as any,
    });

    doc.save(`animais${this.clientId() ? '-' + this.client().name : ''}.pdf`);
  }

}
