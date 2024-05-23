import { Service } from '@prisma/client'
import { CreateServiceDto } from '../in/dtos/create-service.dto'
import { UpdateServiceDto } from '../in/dtos/update-service.dto'
import { ServiceModel } from 'src/services/domain/models/service'

export class ServicesMapper {
  public static toModel(service: Service): ServiceModel {
    return new ServiceModel(
      service.id,
      service.name,
      service.description,
      service.pricePerHour,
      service.isAvailable,
    )
  }

  public static toModels(services: Service[]): ServiceModel[] {
    return services.map((service) => this.toModel(service))
  }

  public static dtoToModel(
    dto: CreateServiceDto | UpdateServiceDto,
  ): ServiceModel {
    return new ServiceModel(
      undefined,
      dto.name,
      dto.description,
      dto.pricePerHour,
      dto.isAvaliable,
    )
  }
}
