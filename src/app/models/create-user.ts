export interface CreateUser {
  name: string;
  username: string;
  document: string;
  email: string;
  phone: string;
  password: string;
  confirmationPassword: string;
  address?: {
    street: string;
    neighborhood: string;
    zipCode: string;
    number: number;
    cityId: number;
  }
}
