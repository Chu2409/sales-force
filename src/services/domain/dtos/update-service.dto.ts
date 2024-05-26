import { ICreateServiceDto } from './create-service.dto'

export interface IUpdateServiceDto extends Partial<ICreateServiceDto> {}
