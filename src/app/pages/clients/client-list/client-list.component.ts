import { Component } from '@angular/core';

import { FadeInDirective } from '../../../directives/fade-in.directive';
import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [ClientCardComponent, FadeInDirective],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {

  elements = Array.from({ length: 20 });


}
