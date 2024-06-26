import { IItem } from '../models/item.interface'
import { IProductRes } from 'src/products/domain/dtos/product.res'
import { IServiceRes } from 'src/services/domain/dtos/service.res'

export interface IItemRes
  extends Omit<IItem, 'transaction' | 'product' | 'service'> {
  product: IProductRes | null
  service: IServiceRes | null
}
