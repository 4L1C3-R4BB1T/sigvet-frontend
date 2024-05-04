import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { AppState } from '../../store';
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

}
