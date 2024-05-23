import { Inject } from '@nestjs/common'
import { IServicesRepositoryPort } from '../domain/ports/out/services.repository'
import { IServicesServicePort } from '../domain/ports/in/services.service.port'
import { ServiceModel } from '../domain/models/service'

export class ServicesService implements IServicesServicePort {
  constructor(
    @Inject('IServicesRepositoryPort')
    private readonly repository: IServicesRepositoryPort,
  ) {}

  createService(service: ServiceModel): Promise<ServiceModel> {
    return this.repository.createService(service)
  }

  updateService(id: number, service: ServiceModel): Promise<ServiceModel> {
    return this.repository.updateService(id, service)
  }

  deleteService(id: number): Promise<boolean> {
    return this.repository.deleteService(id)
  }

  getServices(): Promise<ServiceModel[]> {
    return this.repository.getServices()
  }

  getServiceById(id: number): Promise<ServiceModel> {
    return this.repository.getServiceById(id)
  }
}
