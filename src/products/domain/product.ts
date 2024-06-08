import { IBrand } from 'src/brands/domain/models/brand.interface'
import { IProduct } from './models/product.interface'
import { ICategory } from 'src/categories/domain/models/category.interface'

export class Product implements IProduct {
  id: number
  name: string
  description: string | null
  stock: number
  price: number
  isActive: boolean
  category: ICategory
  brand: IBrand

  private constructor() {}

  static builder() {
    return new ProductBuilder(new Product())
  }
}

class ProductBuilder {
  constructor(private product: IProduct) {}

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

  isActive(isActive: boolean) {
    this.product.isActive = isActive
    return this
  }

  category(category: ICategory) {
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
