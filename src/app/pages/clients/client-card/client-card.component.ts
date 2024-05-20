import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { User } from '../../../models/user';
import { ClientService } from '../../../services/client.service';
import ClientsComponent from '../clients.component';

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

  #toastrService = inject(ToastrService);

  #clientComponent = inject(ClientsComponent);

  #router = inject(Router);

  closeDialog = signal(true);

  edit() {
    this.onEdit.emit(this.client.id);
  }

  async remove() {
    if (await this.#clientService.deleteById(this.client.id)) {
      this.#toastrService.success('Foi removido', 'Cliente');
      await this.#clientComponent.reload();
      this.closeDialog.set(true);
    }
  }

  showAnimals() {
    this.#router.navigateByUrl('/dashboard/animais?clientId='+this.client.id);
  }
}
