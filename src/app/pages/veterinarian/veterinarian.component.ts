import { Component, ViewChild, signal } from '@angular/core';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VeterinarianListComponent } from './veterinarian-list/veterinarian-list.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { UpdateUserModalComponent } from '../../components/update-user-modal/update-user-modal.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-veterinarian',
  standalone: true,
  imports: [
    FilterComponent,
    UpdateUserModalComponent,
    VeterinarianListComponent,
    PaginatorComponent,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    MatPaginatorModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './veterinarian.component.html',
  styleUrl: './veterinarian.component.scss'
})
export default class VeterinarianComponent {

  @ViewChild(VeterinarianListComponent)
  veterinarianListComponent!: VeterinarianListComponent;

  openMoreFilterModal = signal(false);

  userId = signal<number | null>(null);

  createVeterinarian = signal(false);

  reset() {
    this.createVeterinarian.set(false);
    this.userId.set(null);
  }

  async reload() {
    await this.veterinarianListComponent.reload();
    console.log('oii')
  }

  generatePDF() {
    this.veterinarianListComponent?.generatePDF();
  }
}
