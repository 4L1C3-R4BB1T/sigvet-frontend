import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { User } from '../../../models/user';
import { DialogModule } from 'primeng/dialog';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-card',
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
  ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
  providers: [],
})
export class ClientCardComponent {

  @Input({ required: true }) client!: User;

  @Output()
  onEdit = new EventEmitter();

  #clientService = inject(ClientService);

  closeDialog = signal(true);

  edit() {
    this.onEdit.emit(this.client.id);
  }


  async remove() {
    await this.#clientService.deleteById(this.client.id);
    this.closeDialog.set(true);
  }
}
