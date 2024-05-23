import { Animal } from "./animal";
import { BaseModel } from "./base-model";
import { User } from "./user";
import { Vaccine } from "./vaccine";

export interface Vaccination extends BaseModel {
  dateTime: Date;
  veterinarian: User;
  vaccine: Vaccine;
  animal: Animal;
}
