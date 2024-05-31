import { IProductModel } from './models/product.model'
import { IBrand } from 'src/brands/domain/models/brand.model'
import { ICategoryModel } from 'src/categories/domain/models/category.model'

export class Product implements IProductModel {
  id: number
  name: string
  description: string | null
  stock: number
  price: number
  category: ICategoryModel
  brand: IBrand

  private constructor() {}

  static builder() {
    return new ProductBuilder(new Product())
  }
}

class ProductBuilder {
  constructor(private product: Product) {}

  id(id: number) {
    this.product.id = id
    return this
  }

  name(name: string) {
    this.product.name = name
    return this
  }

  description(description: string | null) {
    this.product.description = description
    return this
  }

  stock(stock: number) {
    this.product.stock = stock
    return this
  }

  price(price: number) {
    this.product.price = price
    return this
  }

  category(category: ICategoryModel) {
    this.product.category = category
    return this
  }

  brand(brand: IBrand) {
    this.product.brand = brand
    return this
  }

  build() {
    return this.product
  }
}
