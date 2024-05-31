/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common'
import { IProductsRepositoryPort } from 'src/products/domain/ports/out/products.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IProductRes } from 'src/products/domain/dtos/product.res'
import { ICreateProductDto } from 'src/products/domain/dtos/create-product.dto'
import { IUpdateProductDto } from 'src/products/domain/dtos/update-product.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'

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

    return products.map(({ brandId, categoryId, ...product }) => product)
  }

  async getProductById(id: number): Promise<IProductRes> {
    const { brandId, categoryId, ...product } =
      await this.prismaService.product.findUniqueOrThrow({
        where: { id },
        include: {
          brand: true,
          category: true,
        },
      })

    return product
  }

  async createProduct(
    productToCreate: ICreateProductDto,
  ): Promise<IProductRes> {
    const { brandId, categoryId, ...product } =
      await this.prismaService.product.create({
        data: productToCreate,
        include: {
          brand: true,
          category: true,
        },
      })

    return product
  }

  async updateProduct(
    id: number,
    productToUpdate: IUpdateProductDto,
  ): Promise<IProductRes> {
    const { brandId, categoryId, ...product } =
      await this.prismaService.product.update({
        where: { id },
        data: productToUpdate,
        include: {
          brand: true,
          category: true,
        },
      })

    return product
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.prismaService.product.delete({
      where: { id },
    })
    return !!product
  }
}
