export interface UpdateConsult {
  dateTime: Date;
  veterinarianId: number;
  animalId: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
}
