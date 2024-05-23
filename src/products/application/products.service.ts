import { Inject, Injectable } from '@nestjs/common'
import { IProductsServicePort } from '../domain/ports/in/products.service.port'
import { IProductsRepositoryPort } from '../domain/ports/out/products.repository.port'
import { ProductModel } from '../domain/models/product'

@Injectable()
export class ProductsService implements IProductsServicePort {
  constructor(
    @Inject('IProductsRepositoryPort')
    private readonly repository: IProductsRepositoryPort,
  ) {}

  public async getProducts(): Promise<ProductModel[]> {
    return this.repository.getProducts()
  }

  public async createProduct(product: ProductModel): Promise<ProductModel> {
    return this.repository.createProduct(product)
  }

  public async getProductById(productId: number): Promise<ProductModel> {
    return this.repository.getProductById(productId)
  }

  public async updateProduct(
    id: number,
    product: ProductModel,
  ): Promise<ProductModel> {
    return this.repository.updateProduct(id, product)
  }

  public async deleteProduct(productId: number): Promise<boolean> {
    return this.repository.deleteProduct(productId)
  }
}
