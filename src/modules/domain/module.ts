import { IModule } from './models/module.interface'

export class Module implements IModule {
  id: number
  name: string
  description: string | null
  isActive: boolean

  private constructor() {}

  static builder() {
    return new ModuleBuilder(new Module())
  }
}

class ModuleBuilder {
  constructor(private brand: IModule) {}

  id(id: number) {
    this.brand.id = id
    return this
  }

  name(name: string) {
    this.brand.name = name
    return this
  }

  description(description: string | null) {
    this.brand.description = description
    return this
  }

  isActive(isActive: boolean) {
    this.brand.isActive = isActive
    return this
  }

  build() {
    return this.brand
  }
}
