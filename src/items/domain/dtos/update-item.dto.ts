import { ICreateItemDto } from './create-item.dto'

export interface IUpdateItemDto extends Partial<ICreateItemDto> {}
