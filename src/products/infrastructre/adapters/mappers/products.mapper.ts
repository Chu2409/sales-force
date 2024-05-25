import { Product } from '@prisma/client'

import { CreateProductDto } from '../in/dtos/create-product.dto'
import { UpdateProductDto } from '../in/dtos/update-product.dto'
import { ProductModel } from 'src/products/domain/models/product'
import { BrandModel } from 'src/brands/domain/models/brand'
import { CategoryModel } from 'src/categories/domain/models/category'

export class ProductsMapper {
  public static toModel(product: Product): ProductModel {
    return new ProductModel(
      product.id,
      product.name,
      product.description,
      product.stock,
      product.price,
      BrandModel.builder().id(product.brandId).build(),
      new CategoryModel(product.categoryId, undefined),
    )
  }

  public static toModels(products: Product[]): ProductModel[] {
    return products.map((product) => this.toModel(product))
  }

  public static dtoToModel(
    dto: CreateProductDto | UpdateProductDto,
  ): ProductModel {
    return new ProductModel(
      undefined,
      dto.name,
      dto.description,
      dto.stock,
      dto.price,
      BrandModel.builder().id(dto.brandId).build(),
      new CategoryModel(dto.categoryId, undefined),
    )
  }
}
