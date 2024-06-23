import { IUpdateItemDto } from 'src/items/domain/dtos/update-item.dto'
import { ICreateTransactionDto } from './create-transaction.dto'

export interface IUpdateTransactionDto
  extends Partial<Omit<ICreateTransactionDto, 'items'>> {
  items?: IUpdateItemDto[]
}
