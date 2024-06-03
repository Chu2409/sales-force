import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
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
    const module = await this.prismaService.module.findUnique({
      where: { id },
    })

    if (!module) throw new NotFoundException('Module not found')

    return module
  }

  async createModule(module: ICreateModuleDto): Promise<IModuleRes> {
    const moduleExists = await this.prismaService.module.findFirst({
      where: { name: module.name },
    })
    if (moduleExists) throw new BadRequestException('Module already exists')

    return await this.prismaService.module.create({
      data: module,
    })
  }

  async updateModule(
    id: number,
    module: IUpdateModuleDto,
  ): Promise<IModuleRes> {
    await this.getModuleById(id)

    const moduleExists = await this.prismaService.module.findFirst({
      where: { name: module.name, id: { not: id } },
    })
    if (moduleExists) throw new BadRequestException('Module already exists')

    return await this.prismaService.module.update({
      where: { id },
      data: module,
    })
  }

  async deleteModule(id: number): Promise<boolean> {
    await this.getModuleById(id)

    const module = await this.prismaService.module.update({
      where: { id },
      data: { isActive: false },
    })

    return !!module
  }
}
