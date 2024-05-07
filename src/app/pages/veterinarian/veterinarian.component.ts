import { Component } from '@angular/core';
import { VeterinarianTableComponent } from './components/veterinarian-table/veterinarian-table.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-veterinarian',
  standalone: true,
  imports: [VeterinarianTableComponent, PaginatorComponent],
  templateUrl: './veterinarian.component.html',
  styleUrl: './veterinarian.component.scss'
})
export default class VeterinarianComponent {

}
