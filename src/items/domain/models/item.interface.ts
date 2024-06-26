import { IProduct } from 'src/products/domain/models/product.interface'
import { IService } from 'src/services/domain/models/service.interface'
import { ITransaction } from 'src/transactions/domain/models/transaction.interface'

export interface IItem {
  id: number
  quantity: number
  discount: number | null
  transaction: ITransaction
  product: IProduct | null
  service: IService | null
}
