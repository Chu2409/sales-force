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

    return product ? ProductsMapper.toRes(product) : null
  }

  async createProduct(product: ICreateProductDto): Promise<IProductRes> {
    const createdProduct = await this.prismaService.product.create({
      data: product,
      include: {
        brand: true,
        category: true,
      },
    })

    return createdProduct ? ProductsMapper.toRes(createdProduct) : null
  }

  async updateProduct(
    id: number,
    product: IUpdateProductDto,
  ): Promise<IProductRes> {
    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: product,
      include: {
        brand: true,
        category: true,
      },
    })

    return updatedProduct ? ProductsMapper.toRes(updatedProduct) : null
  }

  async setProductActive(id: number, state: boolean): Promise<boolean> {
    const product = await this.prismaService.product.update({
      where: { id },
      data: { isActive: state },
    })
    return !!product
  }
}
