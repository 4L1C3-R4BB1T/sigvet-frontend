import { Animal } from "./animal";
import { BaseModel } from "./base-model";
import { User } from "./user";
import { Vaccine } from "./vaccine";

export interface Vaccination extends BaseModel {
  date: Date;
  veterinarian: User;
  hour: string;
  vaccine: Vaccine;
  animal: Animal;
}
