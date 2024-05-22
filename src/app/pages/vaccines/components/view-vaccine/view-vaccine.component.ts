import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-vaccine',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, RouterLink],
  templateUrl: './view-vaccine.component.html',
  styleUrl: './view-vaccine.component.scss'
})
export class ViewVaccineComponent {

}
