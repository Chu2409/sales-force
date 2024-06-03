import { Inject, Injectable } from '@nestjs/common'
import { IModulesServicePort } from '../domain/ports/in/modules.service.port'
import { IModulesRepositoryPort } from '../domain/ports/out/modules.repository.port'
import { ICreateModuleDto } from '../domain/dtos/create-module.dto'
import { IUpdateModuleDto } from '../domain/dtos/update-module.dto'
import { IModuleRes } from '../domain/dtos/module.res'
import { MODULES_REPOSITORY_PORT } from '../shared/modules-providers.consts'

@Injectable()
export class ModulesService implements IModulesServicePort {
  constructor(
    @Inject(MODULES_REPOSITORY_PORT)
    private readonly repository: IModulesRepositoryPort,
  ) {}

  async createModule(module: ICreateModuleDto): Promise<IModuleRes> {
    return await this.repository.createModule(module)
  }

  async updateModule(
    id: number,
    module: IUpdateModuleDto,
  ): Promise<IModuleRes> {
    return await this.repository.updateModule(id, module)
  }

  async deleteModule(id: number): Promise<boolean> {
    return await this.repository.deleteModule(id)
  }

  async getModules(): Promise<IModuleRes[]> {
    return await this.repository.getModules()
  }

  async getModuleById(id: number): Promise<IModuleRes> {
    return await this.repository.getModuleById(id)
  }
}
