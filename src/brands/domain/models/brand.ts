import { ICreateBrandDto } from '../dtos/create-brand.dto'

export class BrandModel {
  id: number
  name: string

  private constructor() {}

  static create(brand: ICreateBrandDto) {
    const brandCreated = new BrandModelBuilder(new BrandModel())
      .name(brand.name)
      .build()

    return brandCreated
  }

  static builder() {
    return new BrandModelBuilder(new BrandModel())
  }
}

class BrandModelBuilder {
  constructor(private brand: BrandModel) {}

  id(id: number) {
    this.brand.id = id
    return this
  }

  name(name: string) {
    this.brand.name = name
    return this
  }

  build() {
    return this.brand
  }
}
