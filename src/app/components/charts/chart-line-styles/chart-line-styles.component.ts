import { Component, inject } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { MonthAndCount, ReportService } from '../../../services/report.service';

const getCountPerMonth = (list: MonthAndCount[]) => {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const counts = Array.from({ length: 12 }, () => 0);

  for (const { month, count } of list) {
      counts[month - 1] = count;
  }

  return counts;
}

@Component({
  selector: 'app-chart-line-styles',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './chart-line-styles.component.html',
  styleUrl: './chart-line-styles.component.scss',
})
export class ChartLineStylesComponent {

  data: any;

  options: any;

  #reportService = inject(ReportService);


  async ngOnInit() {
    const result = (await this.#reportService.fetchMonthlyAnimalsAndClients())!;
    const clientsResultMapped = getCountPerMonth(result.clientsResult);
    const animalsResultMapped = getCountPerMonth(result.animalsResult);

    console.log(animalsResultMapped)

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      datasets: [
        {
          label: 'Animais criados',
          backgroundColor: documentStyle.getPropertyValue('--blue-900'),
          borderColor: documentStyle.getPropertyValue('--blue-900'),
          data: animalsResultMapped,
        },
        {
          label: 'Clientes criados',
          backgroundColor: documentStyle.getPropertyValue('--blue-400'),
          borderColor: documentStyle.getPropertyValue('--blue-400'),
          data: clientsResultMapped,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
