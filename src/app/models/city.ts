import { BaseModel } from "./base-model";

export interface City extends BaseModel {
  name: string;
  state: {
    id: string;
    name: string;
  }
}
