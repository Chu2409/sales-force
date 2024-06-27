import { Inject, Injectable } from '@nestjs/common'
import { IProductsServicePort } from '../domain/ports/in/products.service.port'
import { IProductsRepositoryPort } from '../domain/ports/out/products.repository.port'
import { IProductRes } from '../domain/dtos/product.res'
import { ICreateProductDto } from '../domain/dtos/create-product.dto'
import { IUpdateProductDto } from '../domain/dtos/update-product.dto'
import { PRODUCTS_REPOSITORY_PORT } from '../shared/products.consts'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'
import { BrandsService } from 'src/brands/application/brands.service'
import { BRANDS_SERVICE_PORT } from 'src/brands/shared/brands.consts'
import { CATEGORIES_SERVICE_PORT } from 'src/categories/shared/categories.consts'
import { CategoriesService } from 'src/categories/application/categories.service'
import { IMostSoldProduct } from '../domain/dtos/most-sold-products.res'

@Injectable()
export class ProductsService implements IProductsServicePort {
  constructor(
    @Inject(PRODUCTS_REPOSITORY_PORT)
    private readonly repository: IProductsRepositoryPort,
    @Inject(BRANDS_SERVICE_PORT) private readonly brandsService: BrandsService,
    @Inject(CATEGORIES_SERVICE_PORT)
    private readonly categoriesService: CategoriesService,
  ) {}

  async getProducts(): Promise<IProductRes[]> {
    return await this.repository.getProducts()
  }

  async createProduct(product: ICreateProductDto): Promise<IProductRes> {
    await this.brandsService.getBrandById(product.brandId)
    await this.categoriesService.getCategoryById(product.categoryId)

    const createdProduct = await this.repository.createProduct(product)
    if (!createdProduct)
      throw new AppError('Product not created', Errors.INTERNAL_SERVER_ERROR)

    return createdProduct
  }

  async getProductById(productId: number): Promise<IProductRes> {
    const product = await this.repository.getProductById(productId)
    if (!product) throw new AppError('Product not found', Errors.NOT_FOUND)

    return product
  }

  async updateProduct(
    id: number,
    product: IUpdateProductDto,
  ): Promise<IProductRes> {
    await this.getProductById(id)
    if (product.brandId) await this.brandsService.getBrandById(product.brandId)
    if (product.categoryId)
      await this.categoriesService.getCategoryById(product.categoryId)

    const updatedProduct = await this.repository.updateProduct(id, product)
    if (!updatedProduct)
      throw new AppError('Product not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedProduct
  }

  async toggleProductActive(productId: number): Promise<boolean> {
    const product = await this.getProductById(productId)

    return await this.repository.setProductActive(productId, !product.isActive)
  }

  async discountProductStock(
    products: { id: number; quantity: number }[],
  ): Promise<boolean> {
    return await this.repository.discountProductStock(products)
  }

  async getMostSoldProducts(): Promise<IMostSoldProduct[]> {
    return await this.repository.getMostSoldProducts()
  }
}
