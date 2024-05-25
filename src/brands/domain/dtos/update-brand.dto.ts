import { ICreateBrandDto } from './create-brand.dto'

export interface IUpdateBrandDto extends Partial<ICreateBrandDto> {}
