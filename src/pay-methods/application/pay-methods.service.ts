import { Inject, Injectable } from '@nestjs/common'
import { IPayMethodsServicePort } from '../domain/ports/in/pay-mehtods.service.port'
import { IPayMethodsRepositoryPort } from '../domain/ports/out/pay-methods.repository.port'
import { ICreatePayMethodDto } from '../domain/dtos/create-pay-method.dto'
import { IPayMethodRes } from '../domain/dtos/pay-method.res'
import { IUpdatePayMethodDto } from '../domain/dtos/update-pay-method.dto'
import { PAY_METHODS_REPOSITORY_PORT } from '../shared/pay-methods-providers.consts'

@Injectable()
export class PayMethodsService implements IPayMethodsServicePort {
  constructor(
    @Inject(PAY_METHODS_REPOSITORY_PORT)
    private readonly repository: IPayMethodsRepositoryPort,
  ) {}

  async createPayMethod(
    payMethod: ICreatePayMethodDto,
  ): Promise<IPayMethodRes> {
    return await this.repository.createPayMethod(payMethod)
  }

  async updatePayMethod(
    id: number,
    payMethod: IUpdatePayMethodDto,
  ): Promise<IPayMethodRes> {
    return await this.repository.updatePayMethod(id, payMethod)
  }

  async deletePayMethod(id: number): Promise<boolean> {
    return await this.repository.deletePayMethod(id)
  }

  async getPayMethods(): Promise<IPayMethodRes[]> {
    return await this.repository.getPayMethods()
  }

  async getPayMethodById(id: number): Promise<IPayMethodRes> {
    return await this.repository.getPayMethodById(id)
  }
}
