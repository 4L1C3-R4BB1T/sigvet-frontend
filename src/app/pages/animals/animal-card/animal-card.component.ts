import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatRippleModule } from '@angular/material/core';
import { Animal } from '../../../models/animal';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { AnimalService } from '../../../services/animal.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { WindowReloadPageAction } from '../../../store/reducers/window.reducer';

@Component({
  selector: 'app-animal-card',
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
    MatRippleModule,
    DatePipe,
    RouterLink,
    DialogModule,
  ],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss',
  providers: [],
})
export class AnimalCardComponent{

  @Input({ required: true })
  animal!: Animal;

  #animalService = inject(AnimalService);

  #toastrService = inject(ToastrService);

  #store = inject(Store);

  closeDialog = signal(true);

  async remove() {
    await this.#animalService.deleteById(this.animal.id);
    this.#toastrService.success('Foi removido', 'Animal');
    this.#store.dispatch(WindowReloadPageAction());
    this.closeDialog.set(true);
  }
}
