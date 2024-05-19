import { User } from "./user";

export interface Animal {
  id: number;
  name: string;
  breed: string;
  birthDate?: string;
  client: User;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}
