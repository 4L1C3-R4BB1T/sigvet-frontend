import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Consult } from '../../../models/consult';
import { ConsultStatusPipe } from '../../../pipes/consult-status.pipe';
import { ConsultService } from '../../../services/consult.service';

@Component({
  selector: 'app-view-consult',
  standalone: true,
  imports: [MatTabsModule, NgIf, MatButtonModule, RouterLink, AsyncPipe, DatePipe, MatDividerModule, ConsultStatusPipe],
  templateUrl: './view-consult.component.html',
  styleUrl: './view-consult.component.scss'
})
export class ViewConsultComponent implements OnInit {

  #consultService = inject(ConsultService);

  id = signal(inject(ActivatedRoute).snapshot.params['id']);

  consult!: Consult;

  dateFormatted = '';

  async ngOnInit() {
    this.consult = (await this.#consultService.findById(this.id()))!;
    const fullDateString = new Date(this.consult.date + "T00:00:00").toLocaleDateString('pt-BR', { dateStyle: 'full' });
    const hour = parseInt(this.consult.hour.split(':')[0]);
    const period = hour >= 12 ? 'da tarde' : 'da manhã';
    this.dateFormatted = `${fullDateString[0].toUpperCase() + fullDateString.substring(1)}, às ${this.consult.hour.split(':')[0]}:${this.consult.hour.split(':')[1]} ${period}`;
  }

}
