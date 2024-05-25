import { Product } from '@prisma/client'

import { CreateProductDto } from '../in/dtos/create-product.dto'
import { UpdateProductDto } from '../in/dtos/update-product.dto'
import { ProductModel } from 'src/products/domain/models/product'
import { Brand } from 'src/brands/domain/brand'
import { Category } from 'src/categories/domain/category'

export class ProductsMapper {
  public static toModel(product: Product): ProductModel {
    return new ProductModel(
      product.id,
      product.name,
      product.description,
      product.stock,
      product.price,
      Brand.builder().id(product.brandId).build(),
      Category.builder().id(product.categoryId).build(),
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
      Brand.builder().id(dto.brandId).build(),
      Category.builder().id(dto.categoryId).build(),
    )
  }
}
