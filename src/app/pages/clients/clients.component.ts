import { Component, ViewChild, signal } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import BaseStoreComponent from '../../base/base-store.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { ClientListComponent } from './client-list/client-list.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    ClientListComponent,
    PaginatorComponent,
    FilterComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export default class ClientsComponent extends BaseStoreComponent {

  @ViewChild(ClientListComponent)
  clientListComponent!: ClientListComponent;

  openMoreFilterModal = signal(false);

  userId = signal<number | null>(null);

  createClient = signal(false);

  async reload() {
    await this.clientListComponent.reload();
  }

  generatePDF() {
    this.clientListComponent?.generatePDF();
  }
}
