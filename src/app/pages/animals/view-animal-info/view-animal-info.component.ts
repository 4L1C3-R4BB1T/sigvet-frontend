import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { DatePipe, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-view-animal-info',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatTabsModule,
    MatButtonModule,
    TagModule,
    DatePipe,
    NgIf,
    RouterLink,
    MatDividerModule,
  ],
  templateUrl: './view-animal-info.component.html',
  styleUrl: './view-animal-info.component.scss'
})
export class ViewAnimalInfoComponent implements OnInit {

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  animal!: Animal;
  #animalService = inject(AnimalService);

  authService = inject(AuthService);

  async ngOnInit() {
    const result = await this.#animalService.findById(this.#route.snapshot.params['id']);
    if (!result) {
      this.#router.navigateByUrl('/dashboard/animais');
      return;
    }
    this.animal = result;
  }

  exit() {
    this.#router.navigateByUrl('/dashboard/animais');
  }

}
