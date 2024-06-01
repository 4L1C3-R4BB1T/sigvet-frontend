import { Component, computed, inject, signal } from '@angular/core';

import { NgIf } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { FadeInDirective } from '../../../directives/fade-in.directive';
import { Animal } from '../../../models/animal';
import { User } from '../../../models/user';
import { AnimalService } from '../../../services/animal.service';
import { ClientService } from '../../../services/client.service';
import { selectUserInfo } from '../../../store/reducers/user.reducer';
import { AnimalCardComponent } from '../animal-card/animal-card.component';
import BaseComponent from '../../../base/base.component';
import { PageModel } from '../../../models/page-model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [AnimalCardComponent, FadeInDirective, MatPaginatorModule, NgIf, LoadingComponent],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent extends BaseComponent {

  #animalService = inject(AnimalService);

  #clientService = inject(ClientService);

  #activatedRoute = inject(ActivatedRoute);

  clientId = signal(this.#activatedRoute.snapshot.queryParams['clientId'] as number | null);
  client = signal({} as User);
  #toastrService = inject(ToastrService);

  elements = signal<Animal[]>([]);

  userId = computed(() => this.store.selectSignal(selectUserInfo)()?.id);

  length = 50; // Quantidade de dados trazidos
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  async ngOnInit() {

    if (!this.authService.hasRole('ADMIN')) {
      this.clientId.set(this.store.selectSignal(selectUserInfo)()!.id);
    }

    if (this.clientId()) {
      this.client.set(await this.#clientService.findById(this.clientId()!));
      this.reload(true);
      this.showFirstLastButtons = false;
      this.showPageSizeOptions = false;
      return;
    }

    await this.reload();
  }

  override async reload(strict = false) {
    let pageInfo: any = strict ? { size: 10, page: 0 } : { size: this.pageSize, page: this.pageIndex };
    if (this.clientId()) {
      pageInfo = {
        ...pageInfo,
        equal_filters: `client.id:=${this.clientId()}`,
      };
    }
    this.setData(await this.#animalService.findAll(pageInfo)); // botar um equal filter
  }

  async handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    console.log(e)
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    await this.reload();
  }

  override setData(parameter: Animal[] | PageModel<Animal[]>): void {
    if (parameter instanceof Array) {
      this.length = parameter.length;
      this.elements.set(parameter);
    } else {
      this.length = parameter.totalElements;
      this.pageSize = parameter.totalPages
      this.pageIndex = parameter.currentPage;
      this.elements.set(parameter.elements);
    }
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
