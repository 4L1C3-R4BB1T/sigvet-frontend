import { BaseModel } from "./base-model";
import { Consult } from "./consult";

export interface Diagnostic extends BaseModel {
  diagnosis: string;
  comments?: string;
  consult: Consult;
}
