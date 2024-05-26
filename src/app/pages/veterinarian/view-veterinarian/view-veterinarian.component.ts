import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { VeterinarianService } from '../../../services/veterinarian.service';

@Component({
  selector: 'app-view-veterinarian',
  standalone: true,
  imports: [MatTabsModule, NgIf, MatButtonModule, RouterLink, AsyncPipe, DatePipe, MatDividerModule],
  templateUrl: './view-veterinarian.component.html',
  styleUrl: './view-veterinarian.component.scss'
})
export class ViewVeterinarianComponent implements OnInit {

  #veterinarianService = inject(VeterinarianService);

  id = signal(inject(ActivatedRoute).snapshot.params['id']);

  veterinarian!: User;

  async ngOnInit() {
    this.veterinarian = (await this.#veterinarianService.findById(this.id()))!;
  }

}
