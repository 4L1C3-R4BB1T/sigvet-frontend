import { BaseModel } from "./base-model"

export interface Vaccine extends BaseModel {
  createdAt: string
  updatedAt: string
  name: string
  manufacturer: string
  lot: string
  unitPrice: number
  stock: number
  expirationDate: string
}
