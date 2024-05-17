import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import BaseStoreComponent from '../../../base/base-store.component';
import { FadeInDirective } from '../../../directives/fade-in.directive';
import { ClientCardComponent } from '../client-card/client-card.component';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { ClientService } from '../../../services/client.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [FadeInDirective, AsyncPipe, ClientCardComponent,  MatPaginatorModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent extends BaseStoreComponent  implements OnInit {

    #clientService = inject(ClientService);

    data = signal([] as User[]);

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
      const data = await this.#clientService.findAll({ size: this.pageSize, page: this.pageIndex });
      this.length = data.length;
      this.data.set(data);
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
