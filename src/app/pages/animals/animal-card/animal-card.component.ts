import { DatePipe, JsonPipe } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import AnimalsComponent from '../animals.component';
import { AuthService } from '../../../services/auth.service';

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
    JsonPipe,
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

  #animalComponent = inject(AnimalsComponent);

  #activatedRoute = inject(ActivatedRoute);

  authService = inject(AuthService);

  #router = inject(Router);

  clientId = signal<number | null>(this.#activatedRoute.snapshot.queryParams['clientId'] ?? null);

  closeDialog = signal(true);

  async remove() {
    await this.#animalService.deleteById(this.animal.id);
    this.#toastrService.success('Foi removido', 'Animal');
    if (this.clientId()) {
      this.#animalComponent.setData(await this.#animalService.findAllByClientId(this.clientId()!))
    } else {
      this.#animalComponent.reload();
    }
    this.closeDialog.set(true);
  }

  update() {
    if (this.clientId()) {
      this.#router.navigate(['/dashboard', 'animais', 'atualizar', this.animal.id], { queryParams: {
        clientId: this.clientId(),
      }});
    } else {
      this.#router.navigate(['/dashboard', 'animais', 'atualizar', this.animal.id]);
    }
  }
}
