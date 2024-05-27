import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Diagnostic } from '../../../models/diagnostic';
import { DiagnosticService } from '../../../services/diagnostic.service';

@Component({
  selector: 'app-view-diagnostic',
  standalone: true,
  imports: [MatTabsModule, NgIf, MatButtonModule, RouterLink, AsyncPipe, DatePipe, MatDividerModule],
  templateUrl: './view-diagnostic.component.html',
  styleUrl: './view-diagnostic.component.scss'
})
export class ViewDiagnosticComponent implements OnInit {

  #diagnosticService = inject(DiagnosticService);

  id = signal(inject(ActivatedRoute).snapshot.params['id']);

  diagnostic!: Diagnostic;

  dateFormatted = '';

  async ngOnInit() {
    this.diagnostic = (await this.#diagnosticService.findById(this.id()))!;
    const fullDateString = new Date(this.diagnostic.consult.date).toLocaleDateString('pt-BR', { dateStyle: 'full' });
    const hour = parseInt(this.diagnostic.consult.hour.split(':')[0]);
    const period = hour >= 12 ? 'da tarde' : 'da manhã';
    this.dateFormatted = `${fullDateString[0].toUpperCase() + fullDateString.substring(1)}, às ${this.diagnostic.consult.hour.split(':')[0]}:${this.diagnostic.consult.hour.split(':')[1]} ${period}`;
  }

}
