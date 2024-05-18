export interface UpdateUser {
  username: string;
  email: string;
  name: string;
  document: string;
  phone: string;
  specialty?: string;
  crmv?: string;
  crmvUf?: string;
  address?: {
    street: string;
    neighborhood: string;
    zipCode: string;
    number: number;
    cityId:  number;
  }
}
