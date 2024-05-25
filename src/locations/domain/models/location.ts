import { ICreateLocationDto } from '../dtos/create-location.dto'

export enum LocationTypeModel {
  COUNTRY = 'COUNTRY',
  STATE = 'STATE',
  CITY = 'CITY',
  NEIGHBORHOOD = 'NEIGHBORHOOD',
}

export class LocationModel {
  id: number
  name: string
  type: LocationTypeModel
  parent: LocationModel | null

  private constructor() {}

  static create(location: ICreateLocationDto) {
    return new LocationModelBuilder(new LocationModel())
      .name(location.name)
      .type(location.type)
      .parent(
        location.parentId
          ? LocationModel.builder().id(location.parentId).build()
          : null,
      )
      .build()
  }

  static createWithouParent(location: ICreateLocationDto) {
    return new LocationModelBuilder(new LocationModel())
      .name(location.name)
      .type(location.type)
      .build()
  }

  static builder() {
    return new LocationModelBuilder(new LocationModel())
  }
}

class LocationModelBuilder {
  constructor(private location: LocationModel) {}

  id(id: number) {
    this.location.id = id
    return this
  }

  name(name: string) {
    this.location.name = name
    return this
  }

  type(type: LocationTypeModel) {
    this.location.type = type
    return this
  }

  parent(parent: LocationModel | null) {
    this.location.parent = parent
    return this
  }

  build() {
    return this.location
  }
}
