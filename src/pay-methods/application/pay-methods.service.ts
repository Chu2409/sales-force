import { Inject, Injectable } from '@nestjs/common'
import { IPayMethodsServicePort } from '../domain/ports/in/pay-mehtods.service.port'
import { IPayMethodsRepositoryPort } from '../domain/ports/out/pay-methods.repository.port'
import { ICreatePayMethodDto } from '../domain/dtos/create-pay-method.dto'
import { IPayMethodRes } from '../domain/dtos/pay-method.res'
import { IUpdatePayMethodDto } from '../domain/dtos/update-pay-method.dto'
import { PAY_METHODS_REPOSITORY_PORT } from '../shared/pay-methods.consts'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'

@Injectable()
export class PayMethodsService implements IPayMethodsServicePort {
  constructor(
    @Inject(PAY_METHODS_REPOSITORY_PORT)
    private readonly repository: IPayMethodsRepositoryPort,
  ) {}

  async createPayMethod(
    payMethod: ICreatePayMethodDto,
  ): Promise<IPayMethodRes> {
    const payMethodExists = await this.repository.getPayMethodByName(
      payMethod.name,
    )
    if (payMethodExists)
      throw new AppError('Pay method already exists', Errors.CONFLICT)

    const createdPayMethod = await this.repository.createPayMethod(payMethod)
    if (!createdPayMethod)
      throw new AppError('Pay method not created', Errors.INTERNAL_SERVER_ERROR)

    return createdPayMethod
  }

  async updatePayMethod(
    id: number,
    payMethod: IUpdatePayMethodDto,
  ): Promise<IPayMethodRes> {
    this.getPayMethodById(id)

    const payMethodExists = await this.repository.getPayMethodByName(
      payMethod.name,
    )
    if (payMethodExists && payMethodExists.id !== id)
      throw new AppError('Pay method already exists', Errors.CONFLICT)

    const updatedPayMethod = await this.repository.updatePayMethod(
      id,
      payMethod,
    )
    if (!updatedPayMethod)
      throw new AppError('Pay method not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedPayMethod
  }

  async togglePayMethodActive(id: number): Promise<boolean> {
    const payMethod = await this.getPayMethodById(id)

    return await this.repository.setPayMethodActive(id, !payMethod.isActive)
  }

  async getPayMethods(): Promise<IPayMethodRes[]> {
    return await this.repository.getPayMethods()
  }

  async getPayMethodById(id: number): Promise<IPayMethodRes> {
    const payMethod = await this.repository.getPayMethodById(id)
    if (!payMethod) throw new AppError('Pay method not found', Errors.NOT_FOUND)

    return payMethod
  }
}
