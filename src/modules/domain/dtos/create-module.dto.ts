import { IModule } from '../models/module.interface'

export interface ICreateModuleDto extends Omit<IModule, 'id'> {}
