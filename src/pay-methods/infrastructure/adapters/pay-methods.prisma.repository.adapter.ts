import { Inject, Injectable } from '@nestjs/common'
import { ICreatePayMethodDto } from 'src/pay-methods/domain/dtos/create-pay-method.dto'
import { IPayMethodRes } from 'src/pay-methods/domain/dtos/pay-method.res'
import { IUpdatePayMethodDto } from 'src/pay-methods/domain/dtos/update-pay-method.dto'
import { IPayMethodsRepositoryPort } from 'src/pay-methods/domain/ports/out/pay-methods.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PayMethodsPrismaRepositoryAdapter
  implements IPayMethodsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getPayMethods(): Promise<IPayMethodRes[]> {
    return await this.prismaService.payMethod.findMany()
  }

  async getPayMethodById(id: number): Promise<IPayMethodRes> {
    return await this.prismaService.payMethod.findUnique({
      where: { id },
    })
  }

  async getPayMethodByName(name: string): Promise<IPayMethodRes> {
    return await this.prismaService.payMethod.findFirst({
      where: { name },
    })
  }

  async createPayMethod(
    payMethod: ICreatePayMethodDto,
  ): Promise<IPayMethodRes> {
    return await this.prismaService.payMethod.create({
      data: payMethod,
    })
  }

  async updatePayMethod(
    id: number,
    payMethod: IUpdatePayMethodDto,
  ): Promise<IPayMethodRes> {
    return await this.prismaService.payMethod.update({
      where: { id },
      data: payMethod,
    })
  }

  async setPayMethodActive(id: number, state: boolean): Promise<boolean> {
    const payMethod = await this.prismaService.payMethod.update({
      where: { id },
      data: { isActive: state },
    })

    return !!payMethod
  }
}
