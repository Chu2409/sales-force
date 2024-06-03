import { IModuleRes } from '../../dtos/module.res'
import { ICreateModuleDto } from '../../dtos/create-module.dto'
import { IUpdateModuleDto } from '../../dtos/update-module.dto'

export interface IModulesRepositoryPort {
  createModule(module: ICreateModuleDto): Promise<IModuleRes>
  updateModule(id: number, module: IUpdateModuleDto): Promise<IModuleRes>
  deleteModule(id: number): Promise<boolean>
  getModules(): Promise<IModuleRes[]>
  getModuleById(id: number): Promise<IModuleRes>
}
