import { Brand } from 'src/brands/domain/brand'
import { CategoryModel } from 'src/categories/domain/models/category'

export class ProductModel {
  constructor(
    private id: number,
    private name: string,
    private description: string | null,
    private stock: number,
    private price: number,
    private brand: Brand,
    private category: CategoryModel,
  ) {}

  public getId(): number {
    return this.id
  }

  public setId(id: number): void {
    this.id = id
  }

  public getName(): string {
    return this.name
  }

  public setName(name: string): void {
    this.name = name
  }

  public getStock(): number {
    return this.stock
  }

  public setStock(stock: number): void {
    this.stock = stock
  }

  public getPrice(): number {
    return this.price
  }

  public setPrice(price: number): void {
    this.price = price
  }

  public getDescription(): string | null {
    return this.description
  }

  public setDescription(description: string | null): void {
    this.description = description
  }

  public getBrand(): Brand {
    return this.brand
  }

  public setBrand(brand: Brand): void {
    this.brand = brand
  }

  public getCategory(): CategoryModel {
    return this.category
  }

  public setCategory(category: CategoryModel): void {
    this.category = category
  }
}
