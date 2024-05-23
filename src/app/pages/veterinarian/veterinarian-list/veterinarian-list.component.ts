import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import BaseStoreComponent from '../../../base/base-store.component';
import { FadeInDirective } from '../../../directives/fade-in.directive';
import { VeterinarianCardComponent } from '../veterinarian-card/veterinarian-card.component';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { VeterinarianService } from '../../../services/veterinarian.service';
import { User } from '../../../models/user';
import { UpdateUserModalComponent } from '../../../components/update-user-modal/update-user-modal.component';
import { selectUserInfo } from '../../../store/reducers/user.reducer';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-veterinarian-list',
  standalone: true,
  imports: [FadeInDirective, AsyncPipe, VeterinarianCardComponent,  MatPaginatorModule, UpdateUserModalComponent],
  templateUrl: './veterinarian-list.component.html',
  styleUrl: './veterinarian-list.component.scss',
})
export class VeterinarianListComponent extends BaseStoreComponent  implements OnInit {

    #veterinarianService = inject(VeterinarianService);

    #toastrService = inject(ToastrService);


    userInfo = this.store.selectSignal(selectUserInfo);

    @Output()
    onEdit = new EventEmitter();

    userId = signal<number | null>(null);

    data = signal([] as User[]);

    length = 50; // Quantidade de dados trazidos
    pageSize = 5;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25];

    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

    pageEvent!: PageEvent;

    async ngOnInit() {
      await this.reload();
    }

    async reload() {
      const data = await this.#veterinarianService.findAll({ size: this.pageSize, page: this.pageIndex });
      this.length = data.length;
      this.data.set(data);
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

    edit(userId: number) {
      this.onEdit.emit(userId);
    }


    generatePDF() {
      if (!this.data() || !this.data().length) {
        this.#toastrService.info('Não há dados', 'PDF');
        return;
      }
      const doc = new jsPDF();

      const title = "Ficha de Veterinarianes";
      const pageWidth = doc.internal.pageSize.getWidth();
      const textWidth = doc.getTextWidth(title);
      const textX = (pageWidth - textWidth) / 2; // Calcula a posição central

      doc.setFontSize(18);
      doc.text(title, textX, 10);
      const header = [['Id', 'Nome Completo', 'Usuário', 'Email', 'CPF', 'Celular']];

      const  data = this.data().map(veterinarian => [
          veterinarian.id,
          veterinarian.name,
          veterinarian.username,
          veterinarian.email,
          veterinarian.document,
          veterinarian.phone,
      ])

      autoTable(doc, {
        head: header,
        body: data,
      });

      doc.save("veterinarian.pdf");
    }


}
