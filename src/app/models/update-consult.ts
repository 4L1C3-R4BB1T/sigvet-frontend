export interface UpdateConsult {
  date: Date;
  hour: string;
  veterinarianId: number;
  animalId: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
}
