import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { CreateNewClientComponent } from '../../components/create-new-client/create-new-client.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { AppState } from '../../store';
import { ClientListComponent } from './client-list/client-list.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ClientListComponent, PaginatorComponent, CreateNewClientComponent, FilterComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export default class ClientsComponent {

  #store: Store<AppState> = inject(Store<AppState>);

  openMoreFilterModal = signal(false);

}
