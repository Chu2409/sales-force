import { Inject } from '@nestjs/common'
import { IServicesRepositoryPort } from '../domain/ports/out/services.repository'
import { IServicesServicePort } from '../domain/ports/in/services.service.port'
import { SERVICES_REPOSITORY_PORT } from '../shared/products-providers.consts'
import { ICreateServiceDto } from '../domain/dtos/create-service.dto'
import { IServiceRes } from '../domain/dtos/service.res'
import { IUpdateServiceDto } from '../domain/dtos/update-service.dto'

export class ServicesService implements IServicesServicePort {
  constructor(
    @Inject(SERVICES_REPOSITORY_PORT)
    private readonly repository: IServicesRepositoryPort,
  ) {}

  async createService(service: ICreateServiceDto): Promise<IServiceRes> {
    return await this.repository.createService(service)
  }

  async updateService(
    id: number,
    service: IUpdateServiceDto,
  ): Promise<IServiceRes> {
    return await this.repository.updateService(id, service)
  }

  async deleteService(id: number): Promise<boolean> {
    return await this.repository.deleteService(id)
  }

  async getServices(): Promise<IServiceRes[]> {
    return await this.repository.getServices()
  }

  async getServiceById(id: number): Promise<IServiceRes> {
    return await this.repository.getServiceById(id)
  }
}
