import { Component, signal } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import BaseStoreComponent from '../../base/base-store.component';
import { CreateNewClientComponent } from '../../components/create-new-client/create-new-client.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ClientListComponent } from './client-list/client-list.component';
import { UpdateUserModalComponent } from '../../components/update-user-modal/update-user-modal.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    ClientListComponent,
    PaginatorComponent,
    CreateNewClientComponent,
    FilterComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    UpdateUserModalComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export default class ClientsComponent extends BaseStoreComponent {
  openMoreFilterModal = signal(false);

  userId = signal<number | null>(null);
}
