import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Vaccination } from '../../../models/vaccination';
import { VaccinationService } from '../../../services/vaccination.service';

@Component({
  selector: 'app-view-vaccination',
  standalone: true,
  imports: [MatTabsModule, NgIf, MatButtonModule, RouterLink, AsyncPipe, DatePipe, MatDividerModule],
  templateUrl: './view-vaccination.component.html',
  styleUrl: './view-vaccination.component.scss'
})
export class ViewVaccinationComponent implements OnInit {

  #vaccinationService = inject(VaccinationService);

  id = signal(inject(ActivatedRoute).snapshot.params['id']);

  vaccination!: Vaccination;

  dateFormatted = '';

  async ngOnInit() {
    this.vaccination = (await this.#vaccinationService.findById(this.id()))!;
    const fullDateString = new Date(this.vaccination.date + "T00:00:00").toLocaleDateString('pt-BR', { dateStyle: 'full'});
    const hour = parseInt(this.vaccination.hour.split(':')[0]);
    const period = hour >= 12 ? 'da tarde' : 'da manhã';
    this.dateFormatted = `${fullDateString[0].toUpperCase() + fullDateString.substring(1)}, às ${this.vaccination.hour.split(':')[0]}:${this.vaccination.hour.split(':')[1]} ${period}`;
  }

}
