import { Inject, Injectable } from '@nestjs/common'
import { IProductsRepositoryPort } from 'src/products/domain/ports/out/products.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IProductRes } from 'src/products/domain/dtos/product.res'
import { ICreateProductDto } from 'src/products/domain/dtos/create-product.dto'
import { IUpdateProductDto } from 'src/products/domain/dtos/update-product.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ProductsMapper } from './products.mapper'
import { BRANDS_SERVICE_PORT } from 'src/brands/shared/brands.consts'
import { BrandsService } from 'src/brands/application/brands.service'
import { CATEGORIES_SERVICE_PORT } from 'src/categories/shared/categories.consts'
import { CategoriesService } from 'src/categories/application/categories.service'

@Injectable()
export class ProductsPrismaRepositoryAdapter
  implements IProductsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
    @Inject(BRANDS_SERVICE_PORT) private readonly brandsService: BrandsService,
    @Inject(CATEGORIES_SERVICE_PORT)
    private readonly categoriesService: CategoriesService,
  ) {}

  async getProducts(): Promise<IProductRes[]> {
    const products = await this.prismaService.product.findMany({
      include: {
        brand: true,
        category: true,
      },
      orderBy: { name: 'asc' },
    })

    return products.map((product) => ProductsMapper.toRes(product))
  }

  async getProductById(id: number): Promise<IProductRes> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
      },
    })

    if (!product) throw new Error('Product not found')

    return product
  }

  async createProduct(product: ICreateProductDto): Promise<IProductRes> {
    await this.brandsService.getBrandById(product.brandId)
    await this.categoriesService.getCategoryById(product.categoryId)

    const createdProduct = await this.prismaService.product.create({
      data: product,
      include: {
        brand: true,
        category: true,
      },
    })

    return ProductsMapper.toRes(createdProduct)
  }

  async updateProduct(
    id: number,
    product: IUpdateProductDto,
  ): Promise<IProductRes> {
    await this.getProductById(id)

    if (product.brandId) await this.brandsService.getBrandById(product.brandId)
    if (product.categoryId)
      await this.categoriesService.getCategoryById(product.categoryId)

    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: product,
      include: {
        brand: true,
        category: true,
      },
    })

    return ProductsMapper.toRes(updatedProduct)
  }

  async toggleProductAvailability(id: number): Promise<boolean> {
    const preoductToUpdate = await this.getProductById(id)

    const product = await this.prismaService.product.update({
      where: { id },
      data: { isActive: !preoductToUpdate.isActive },
    })
    return !!product
  }
}
