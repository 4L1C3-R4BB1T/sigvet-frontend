import { Component } from '@angular/core';

import TableComponent from '../table/table.component';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.scss'
})
export default class AnimalsComponent { }
