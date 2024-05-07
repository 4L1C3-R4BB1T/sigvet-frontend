import { Component } from '@angular/core';

import { FadeInDirective } from '../../../directives/fade-in.directive';
import { AnimalCardComponent } from '../animal-card/animal-card.component';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [AnimalCardComponent, FadeInDirective],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalListComponent {

  elements = Array.from({ length: 20 });

}
