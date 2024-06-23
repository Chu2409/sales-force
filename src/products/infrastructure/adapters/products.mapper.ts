/* eslint-disable @typescript-eslint/no-unused-vars */
import { Brand, Category, Product } from '@prisma/client'
import { IProductRes } from 'src/products/domain/dtos/product.res'

export interface IPrismaFullProduct extends Product {
  brand: Brand
  category: Category
}

export class ProductsMapper {
  static toRes({
    brandId,
    categoryId,
    ...product
  }: IPrismaFullProduct): IProductRes {
    return product
  }
}
