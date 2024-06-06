import { Inject, Injectable } from '@nestjs/common'
import { IProductsServicePort } from '../domain/ports/in/products.service.port'
import { IProductsRepositoryPort } from '../domain/ports/out/products.repository.port'
import { IProductRes } from '../domain/dtos/product.res'
import { ICreateProductDto } from '../domain/dtos/create-product.dto'
import { IUpdateProductDto } from '../domain/dtos/update-product.dto'
import { PRODUCTS_REPOSITORY_PORT } from '../shared/products-providers.consts'

@Injectable()
export class ProductsService implements IProductsServicePort {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_PORT)
    private readonly repository: IProductsRepositoryPort,
  ) {}

  async getProducts(): Promise<IProductRes[]> {
    return await this.repository.getProducts()
  }

  async createProduct(product: ICreateProductDto): Promise<IProductRes> {
    return await this.repository.createProduct(product)
  }

  async getProductById(productId: number): Promise<IProductRes> {
    return await this.repository.getProductById(productId)
  }

  async updateProduct(
    id: number,
    product: IUpdateProductDto,
  ): Promise<IProductRes> {
    return await this.repository.updateProduct(id, product)
  }

  async toggleProductAvailability(productId: number): Promise<boolean> {
    return await this.repository.toggleProductAvailability(productId)
  }
}
