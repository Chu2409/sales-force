import { ICreateBrandDto } from './dtos/create-brand.dto'
import { IBrand } from './models/brand.interface'

export class Brand implements IBrand {
  id: number
  name: string
  isActive: boolean

  private constructor() {}

  static create(brand: ICreateBrandDto) {
    const brandCreated = new BrandBuilder(new Brand()).name(brand.name).build()

    return brandCreated
  }

  static builder() {
    return new BrandBuilder(new Brand())
  }
}

class BrandBuilder {
  constructor(private brand: IBrand) {}

  id(id: number) {
    this.brand.id = id
    return this
  }

  name(name: string) {
    this.brand.name = name
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
