import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { AppState } from '../../store';
import { toggleCreateClientModal } from '../../store/actions/modal-create-client.action';
import { ClientListComponent } from './client-list/client-list.component';
import { CreateNewClientComponent } from '../../components/create-new-client/create-new-client.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ClientListComponent, PaginatorComponent, CreateNewClientComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export default class ClientsComponent {

  #store: Store<AppState> = inject(Store<AppState>);

  openModalCreateClient$ = toSignal(this.#store.select(state => state.clientModal.open));


  public openModalCreateClient() {
    this.#store.dispatch(toggleCreateClientModal());
  }

}
