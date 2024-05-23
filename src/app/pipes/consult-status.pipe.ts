import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consultStatus',
  standalone: true
})
export class ConsultStatusPipe implements PipeTransform {

  transform(value: 'SCHEDULED' | 'COMPLETED' | 'CANCELED'): string {
    const enums = {
      SCHEDULED: 'Agendado',
      COMPLETED: 'Finalizada',
      CANCELED: 'Cancelada',
    };
    return enums[value] ?? 'Desconhecido';
  }

}
