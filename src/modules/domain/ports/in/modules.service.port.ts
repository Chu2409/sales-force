import { ICreateModuleDto } from '../../dtos/create-module.dto'
import { IModuleRes } from '../../dtos/module.res'
import { IUpdateModuleDto } from '../../dtos/update-module.dto'

export interface IModulesServicePort {
  createModule(module: ICreateModuleDto): Promise<IModuleRes>
  updateModule(id: number, brand: IUpdateModuleDto): Promise<IModuleRes>
  toggleModuleActive(id: number): Promise<boolean>
  getModules(): Promise<IModuleRes[]>
  getModuleById(id: number): Promise<IModuleRes>
}
