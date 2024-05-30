import { DatePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, inject, signal } from '@angular/core';
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
import { ClientService } from '../../../services/client.service';
import ClientsComponent from '../clients.component';
import BaseStoreComponent from '../../../base/base.component';
import { selectUserInfo } from '../../../store/reducers/user.reducer';

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
    RouterLink,
    NgIf
  ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
  providers: [],
})
export class ClientCardComponent extends BaseStoreComponent {

  @Input({ required: true }) client!: User;

  #clientService = inject(ClientService);

  #toastrService = inject(ToastrService);

  #clientComponent = inject(ClientsComponent);

  #router = inject(Router);

  userId = computed(() => this.store.selectSignal(selectUserInfo)()?.id);

  closeDialog = signal(true);

  async remove() {
    if (this.userId() === this.client.id) {
      this.#toastrService.warning('Operação não permitida', 'Aviso');
      return;
    }
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
