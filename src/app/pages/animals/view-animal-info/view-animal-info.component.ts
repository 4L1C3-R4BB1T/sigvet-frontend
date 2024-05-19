import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-animal-info',
  standalone: true,
  imports: [
    MatTooltipModule,
    MatTabsModule,
    MatButtonModule,
    TagModule,
    DatePipe,
  ],
  templateUrl: './view-animal-info.component.html',
  styleUrl: './view-animal-info.component.scss'
})
export class ViewAnimalInfoComponent implements OnInit {

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  animal = signal<Animal | null>(null);
  #animalService = inject(AnimalService);

  async ngOnInit() {
    const result = await this.#animalService.findById(this.#route.snapshot.params['id']);
    if (!result) {
      this.#router.navigateByUrl('/dashboard/animais');
      return;
    }
    this.animal.set(result);
    console.log(result)
  }

  exit() {
    this.#router.navigateByUrl('/dashboard/animais');
  }

}
