export interface UpdateVaccine {
  name: string
  manufacturer: string
  lot: string
  unitPrice: number | string;
  stock: number | string;
  expirationDate: string
}
