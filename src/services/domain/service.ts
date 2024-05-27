import { IServiceModel } from './models/service.model'

export class Service implements IServiceModel {
  id: number
  name: string
  description: string
  pricePerHour: number
  isAvailable: boolean

  private constructor() {}

  static builder() {
    return new ServiceBuilder(new Service())
  }
}

class ServiceBuilder {
  constructor(private readonly service: Service) {}

  id(id: number) {
    this.service.id = id
    return this
  }

  name(name: string) {
    this.service.name = name
    return this
  }

  description(description: string) {
    this.service.description = description
    return this
  }

  pricePerHour(pricePerHour: number) {
    this.service.pricePerHour = pricePerHour
    return this
  }

  isAvailable(isAvailable: boolean) {
    this.service.isAvailable = isAvailable
    return this
  }

  build() {
    return this.service
  }
}
