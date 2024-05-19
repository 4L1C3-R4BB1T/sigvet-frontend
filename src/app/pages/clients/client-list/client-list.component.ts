import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import BaseStoreComponent from '../../../base/base-store.component';
import { FadeInDirective } from '../../../directives/fade-in.directive';
import { ClientCardComponent } from '../client-card/client-card.component';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { ClientService } from '../../../services/client.service';
import { User } from '../../../models/user';
import { UpdateUserModalComponent } from '../../../components/update-user-modal/update-user-modal.component';
import { selectUserInfo } from '../../../store/reducers/user.reducer';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [FadeInDirective, AsyncPipe, ClientCardComponent,  MatPaginatorModule, UpdateUserModalComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
})
export class ClientListComponent extends BaseStoreComponent  implements OnInit {

    #clientService = inject(ClientService);

    userInfo = this.store.selectSignal(selectUserInfo);

    @Output()
    onEdit = new EventEmitter();

    userId = signal<number | null>(null);

    data = signal([] as User[]);

    length = 50; // Quantidade de dados trazidos
    pageSize = 25;
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

    edit(userId: number) {
      this.onEdit.emit(userId);
    }

}
