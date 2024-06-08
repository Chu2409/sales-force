import { IService } from '../models/service.interface'

export interface ICreateServiceDto extends Omit<IService, 'id' | 'isActive'> {
  isActive?: boolean
}
