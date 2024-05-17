import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { User } from '../../../models/user';
import { UpdateUserModalComponent } from '../../../components/update-user-modal/update-user-modal.component';

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
  ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
  providers: [],
})
export class ClientCardComponent {

  @Input({ required: true }) client!: User;

  @Output()
  onEdit = new EventEmitter();

  edit() {
    this.onEdit.emit(this.client.id);
  }
}
