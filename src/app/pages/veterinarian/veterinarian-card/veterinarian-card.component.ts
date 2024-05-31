import { DatePipe, JsonPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { User } from '../../../models/user';
import { VeterinarianService } from '../../../services/veterinarian.service';
import VeterinarianComponent from '../veterinarian.component';

@Component({
  selector: 'app-veterinarian-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTreeModule,
    MatTooltipModule,
    MatCardModule,
    MatAccordion,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    DatePipe,
    DialogModule,
    RouterLink,
    JsonPipe,
    NgIf
  ],
  templateUrl: './veterinarian-card.component.html',
  styleUrl: './veterinarian-card.component.scss',
  providers: [],
})
export class VeterinarianCardComponent {

  @Input({ required: true }) veterinarian!: User;

  @Output()
  onEdit = new EventEmitter();

  #veterinarianService = inject(VeterinarianService);

  #toastrService = inject(ToastrService);

  #veterinarianComponent = inject(VeterinarianComponent);

  #router = inject(Router);

  closeDialog = signal(true);

  edit() {
    this.onEdit.emit(this.veterinarian.id);
  }

  async remove() {
    if (await this.#veterinarianService.deleteById(this.veterinarian.id)) {
      this.#toastrService.success('Foi removido', 'Veterinário');
      await this.#veterinarianComponent.reload();
      this.closeDialog.set(true);
    }
  }

}
