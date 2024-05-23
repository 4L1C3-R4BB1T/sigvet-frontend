import { Animal } from "./animal";
import { BaseModel } from "./base-model";
import { User } from "./user";

export interface Consult extends BaseModel {
  dateTime: Date;
  animal: Animal;
  veterinarian: User;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
}
