import { Animal } from "./animal";
import { BaseModel } from "./base-model";
import { User } from "./user";

export interface Consult extends BaseModel {
  date: Date;
  hour: string;
  animal: Animal;
  veterinarian: User;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
}
