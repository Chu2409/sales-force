import { ICreateCategoryDto } from '../dtos/create-category.dto'

export class CategoryModel {
  id: number
  name: string

  private constructor() {}

  static create(category: ICreateCategoryDto) {
    const categoryCreated = new CategoryModelBuilder(new CategoryModel())
      .name(category.name)
      .build()

    return categoryCreated
  }

  static builder() {
    return new CategoryModelBuilder(new CategoryModel())
  }
}

class CategoryModelBuilder {
  constructor(private category: CategoryModel) {}

  id(id: number) {
    this.category.id = id
    return this
  }

  name(name: string) {
    this.category.name = name
    return this
  }

  build() {
    return this.category
  }
}
