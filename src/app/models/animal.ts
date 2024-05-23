import { BaseModel } from "./base-model";
import { User } from "./user";

export interface Animal extends BaseModel {
  name: string;
  breed: string;
  birthDate?: string;
  client: User;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}
