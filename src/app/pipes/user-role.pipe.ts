import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRole',
  standalone: true
})
export class UserRolePipe implements PipeTransform {

  transform(value: string[]): string {
    if (value.includes('ADMIN')) {
      return 'Administrador';
    } else if (value.includes('CLIENT')) {
      return 'Cliente';
    } else {
      return 'Visitante';
    }
  }

}
