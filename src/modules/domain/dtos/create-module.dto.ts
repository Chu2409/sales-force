import { IModule } from '../models/module.interface'

export interface ICreateModuleDto
  extends Omit<IModule, 'id' | 'isActive' | 'description'> {
  description?: string
  isActive?: boolean
}
