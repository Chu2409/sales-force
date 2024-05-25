import { ICreateCategoryDto } from './dtos/create-category.dto'
import { ICategoryModel } from './models/category.model'

export class Category implements ICategoryModel {
  id: number
  name: string

  private constructor() {}

  static create(category: ICreateCategoryDto) {
    const categoryCreated = new CategoryBuilder(new Category())
      .name(category.name)
      .build()

    return categoryCreated
  }

  static builder() {
    return new CategoryBuilder(new Category())
  }
}

class CategoryBuilder {
  constructor(private category: Category) {}

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
