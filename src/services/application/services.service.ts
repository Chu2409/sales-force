import { Inject } from '@nestjs/common'
import { IServicesRepositoryPort } from '../domain/ports/out/services.repository'
import { IServicesServicePort } from '../domain/ports/in/services.service.port'
import { SERVICES_REPOSITORY_PORT } from '../shared/services.consts'
import { ICreateServiceDto } from '../domain/dtos/create-service.dto'
import { IServiceRes } from '../domain/dtos/service.res'
import { IUpdateServiceDto } from '../domain/dtos/update-service.dto'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { IMostSoldService } from '../domain/dtos/most-sold-service.res'

export class ServicesService implements IServicesServicePort {
  constructor(
    @Inject(SERVICES_REPOSITORY_PORT)
    private readonly repository: IServicesRepositoryPort,
  ) {}

  async createService(service: ICreateServiceDto): Promise<IServiceRes> {
    const createdService = await this.repository.createService(service)
    if (!createdService)
      throw new AppError('Service not created', Errors.INTERNAL_SERVER_ERROR)

    return createdService
  }

  async updateService(
    id: number,
    service: IUpdateServiceDto,
  ): Promise<IServiceRes> {
    await this.getServiceById(id)

    const updatedService = await this.repository.updateService(id, service)
    if (!updatedService)
      throw new AppError('Service not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedService
  }

  async toggleServiceActive(id: number): Promise<boolean> {
    const service = await this.getServiceById(id)

    return await this.repository.setServiceActive(id, !service.isActive)
  }

  async getServices(): Promise<IServiceRes[]> {
    return await this.repository.getServices()
  }

  async getServiceById(id: number): Promise<IServiceRes> {
    const service = await this.repository.getServiceById(id)
    if (!service) throw new AppError('Service not found', Errors.NOT_FOUND)

    return service
  }

  async getMostSoldServices(): Promise<IMostSoldService[]> {
    return await this.repository.getMostSoldServices()
  }
}
