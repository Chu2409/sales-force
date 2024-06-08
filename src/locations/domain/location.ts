import { ILocation, LocationType } from './models/location.interface'

export class Location implements ILocation {
  id: number
  name: string
  type: LocationType
  isActive: boolean
  parent: ILocation | null

  private constructor() {}

  static builder() {
    return new LocationBuilder(new Location())
  }
}

class LocationBuilder {
  constructor(private location: ILocation) {}

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

  isActive(isActive: boolean) {
    this.location.isActive = isActive
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
