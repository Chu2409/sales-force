import { ILocationModel, LocationType } from './models/location.model'

export class Location implements ILocationModel {
  id: number
  name: string
  type: LocationType
  parent: ILocationModel | null

  private constructor() {}

  static builder() {
    return new LocationBuilder(new Location())
  }
}

class LocationBuilder {
  constructor(private location: Location) {}

  id(id: number) {
    this.location.id = id
    return this
  }

  name(name: string) {
    this.location.name = name
    return this
  }

  type(type: LocationType) {
    this.location.type = type
    return this
  }

  parent(parent: Location | null) {
    this.location.parent = parent
    return this
  }

  build() {
    return this.location
  }
}
