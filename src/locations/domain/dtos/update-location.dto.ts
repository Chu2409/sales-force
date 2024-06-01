import { ICreateLocationDto } from './create-location.dto'

export interface IUpdateLocationDto extends Partial<ICreateLocationDto> {}
