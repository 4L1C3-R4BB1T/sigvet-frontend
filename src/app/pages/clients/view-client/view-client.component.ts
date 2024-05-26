import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { VeterinarianService } from '../../../services/veterinarian.service';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [MatTabsModule, NgIf, MatButtonModule, RouterLink, AsyncPipe, DatePipe, MatDividerModule],
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.scss'
})
export class ViewClientComponent implements OnInit {

  #clientService = inject(ClientService);

  id = signal(inject(ActivatedRoute).snapshot.params['id']);

  client!: User;

  async ngOnInit() {
    this.client = (await this.#clientService.findById(this.id()))!;
  }

}
