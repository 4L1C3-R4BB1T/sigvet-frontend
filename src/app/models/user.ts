import { Animal } from "./animal";
import { BaseModel } from "./base-model";

export interface User extends BaseModel {
  username: string;
  email: string;
  name: string;
  document: string;
  phone: string;
  specialty: string;
  photoUrl: string;
  crmv: string;
  crmvUf: string;
  address?: {
    id: number;
    street: string;
    neighborhood: string;
    zipCode: string;
    number: number;
    city: {
      id: number;
      name: string;
      state: {
        id: string;
        name: string;
      }
    }
  },
  roles: string[];
  animals: Animal[];
  createdAt: string;
  updatedAt: string;
}
