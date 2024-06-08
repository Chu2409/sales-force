import { Inject, Injectable } from '@nestjs/common'
import { IModulesServicePort } from '../domain/ports/in/modules.service.port'
import { IModulesRepositoryPort } from '../domain/ports/out/modules.repository.port'
import { ICreateModuleDto } from '../domain/dtos/create-module.dto'
import { IUpdateModuleDto } from '../domain/dtos/update-module.dto'
import { IModuleRes } from '../domain/dtos/module.res'
import { MODULES_REPOSITORY_PORT } from '../shared/modules.consts'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'

@Injectable()
export class ModulesService implements IModulesServicePort {
  constructor(
    @Inject(MODULES_REPOSITORY_PORT)
    private readonly repository: IModulesRepositoryPort,
  ) {}

  async createModule(module: ICreateModuleDto): Promise<IModuleRes> {
    const moduleExists = await this.repository.getModuleByName(module.name)
    if (moduleExists)
      throw new AppError('Module already exists', Errors.CONFLICT)

    return await this.repository.createModule(module)
  }

  async updateModule(
    id: number,
    module: IUpdateModuleDto,
  ): Promise<IModuleRes> {
    await this.getModuleById(id)
    const moduleExists = await this.repository.getModuleByName(module.name)
    if (moduleExists && moduleExists.id !== id)
      throw new AppError('Module already exists', Errors.CONFLICT)

    return await this.repository.updateModule(id, module)
  }

  async toggleModuleActive(id: number): Promise<boolean> {
    const module = await this.getModuleById(id)

    return await this.repository.setModuleActive(id, !module.isActive)
  }

  async getModules(): Promise<IModuleRes[]> {
    return await this.repository.getModules()
  }

  async getModuleById(id: number): Promise<IModuleRes> {
    const module = await this.repository.getModuleById(id)
    if (!module) throw new AppError('Module not found', Errors.NOT_FOUND)

    return module
  }
}
