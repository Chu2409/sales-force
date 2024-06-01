import { ICategory } from './models/category.interface'

export class Category implements ICategory {
  id: number
  name: string

  private constructor() {}

  static builder() {
    return new CategoryBuilder(new Category())
  }
}

class CategoryBuilder {
  constructor(private category: ICategory) {}

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
