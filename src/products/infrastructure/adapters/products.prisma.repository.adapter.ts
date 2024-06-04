import { Inject, Injectable } from '@nestjs/common'
import { IProductsRepositoryPort } from 'src/products/domain/ports/out/products.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IProductRes } from 'src/products/domain/dtos/product.res'
import { ICreateProductDto } from 'src/products/domain/dtos/create-product.dto'
import { IUpdateProductDto } from 'src/products/domain/dtos/update-product.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ProductsMapper } from './products.mapper'

@Injectable()
export class ProductsPrismaRepositoryAdapter
  implements IProductsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getProducts(): Promise<IProductRes[]> {
    const products = await this.prismaService.product.findMany({
      include: {
        brand: true,
        category: true,
      },
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

  async deleteProduct(id: number): Promise<boolean> {
    await this.getProductById(id)

    const product = await this.prismaService.product.update({
      where: { id },
      data: { isActive: false },
    })
    return !!product
  }
}
