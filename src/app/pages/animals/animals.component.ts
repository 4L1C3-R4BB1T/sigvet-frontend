import { Component } from '@angular/core';

import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { AnimalListComponent } from './animal-list/animal-list.component';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [AnimalListComponent, PaginatorComponent],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.scss'
})
export default class AnimalsComponent { }
