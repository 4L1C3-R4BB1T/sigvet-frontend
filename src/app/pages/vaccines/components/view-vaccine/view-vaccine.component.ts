import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VaccineService } from '../../../../services/vaccine.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Vaccine } from '../../../../models/vaccine';
import moment from 'moment';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-view-vaccine',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, RouterLink, AsyncPipe, DatePipe, MatDividerModule],
  templateUrl: './view-vaccine.component.html',
  styleUrl: './view-vaccine.component.scss'
})
export class ViewVaccineComponent implements OnInit {

  vaccineService = inject(VaccineService);
  vaccineId = signal(inject(ActivatedRoute).snapshot.params['id']);
  vaccine = signal({} as Vaccine);
  totalCountOfUses = signal(0);

  async ngOnInit() {
    const vaccine = await this.vaccineService.findById(this.vaccineId());
    this.vaccine.set(vaccine!);
    this.totalCountOfUses.set((await this.vaccineService.getTotalOfUses(vaccine!.id))?.count ?? 0);
  }

  isExpirationDate() {
    const expirationDate = moment(this.vaccine().expirationDate).startOf('day');
    const currentDate = moment(new Date()).startOf('day');
    return expirationDate.isSameOrBefore(currentDate);
  }


}
