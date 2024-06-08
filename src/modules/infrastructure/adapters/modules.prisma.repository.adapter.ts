import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IModulesRepositoryPort } from 'src/modules/domain/ports/out/modules.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'
import { ICreateModuleDto } from 'src/modules/domain/dtos/create-module.dto'
import { IUpdateModuleDto } from 'src/modules/domain/dtos/update-module.dto'

@Injectable()
export class ModulesPrismaRepositoryAdapter implements IModulesRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getModules(): Promise<IModuleRes[]> {
    return await this.prismaService.module.findMany()
  }

  async getModuleById(id: number): Promise<IModuleRes> {
    return await this.prismaService.module.findUnique({
      where: { id },
    })
  }

  async getModuleByName(name: string): Promise<IModuleRes> {
    return await this.prismaService.module.findFirst({
      where: { name },
    })
  }

  async createModule(module: ICreateModuleDto): Promise<IModuleRes> {
    return await this.prismaService.module.create({
      data: module,
    })
  }

  async updateModule(
    id: number,
    module: IUpdateModuleDto,
  ): Promise<IModuleRes> {
    return await this.prismaService.module.update({
      where: { id },
      data: module,
    })
  }

  async setModuleActive(id: number, state: boolean): Promise<boolean> {
    await this.getModuleById(id)

    const module = await this.prismaService.module.update({
      where: { id },
      data: { isActive: state },
    })

    return !!module
  }
}
