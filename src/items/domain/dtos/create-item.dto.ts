import { IItem } from '../models/item.interface'

export interface ICreateItemDto
  extends Omit<
    IItem,
    'id' | 'discount' | 'product' | 'service' | 'transaction'
  > {
  discount?: number
  productId?: number
  serviceId?: number
}
