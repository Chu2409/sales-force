import { ILocation } from './models/location.interface'

export class Location implements ILocation {
  id: number
  name: string
  isActive: boolean

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

  isActive(isActive: boolean) {
    this.location.isActive = isActive
    return this
  }

  build() {
    return this.location
  }
}
