import { Inject, Injectable } from '@nestjs/common'
import { IProductsRepositoryPort } from 'src/products/domain/ports/out/products.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { IProductRes } from 'src/products/domain/dtos/product.res'
import { ICreateProductDto } from 'src/products/domain/dtos/create-product.dto'
import { IUpdateProductDto } from 'src/products/domain/dtos/update-product.dto'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'

@Injectable()
export class PrismaProductsRepositoryAdapter
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

    return products.map((product) => ({
      id: product.id,
      description: product.description,
      name: product.name,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
    }))
  }

  async getProductById(id: number): Promise<IProductRes> {
    const product = await this.prismaService.product.findUniqueOrThrow({
      where: { id },
      include: {
        brand: true,
        category: true,
      },
    })

    return {
      id: product.id,
      description: product.description,
      name: product.name,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
    }
  }

  async createProduct(product: ICreateProductDto): Promise<IProductRes> {
    const productCreated = await this.prismaService.product.create({
      data: {
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        brandId: product.brandId,
        categoryId: product.categoryId,
      },
      include: {
        brand: true,
        category: true,
      },
    })

    return {
      id: productCreated.id,
      description: productCreated.description,
      name: productCreated.name,
      price: productCreated.price,
      stock: productCreated.stock,
      brand: productCreated.brand,
      category: productCreated.category,
    }
  }

  async updateProduct(
    id: number,
    product: IUpdateProductDto,
  ): Promise<IProductRes> {
    const productUpdated = await this.prismaService.product.update({
      where: { id },
      data: {
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        brandId: product.brandId,
        categoryId: product.categoryId,
      },
      include: {
        brand: true,
        category: true,
      },
    })

    return {
      id: productUpdated.id,
      description: productUpdated.description,
      name: productUpdated.name,
      price: productUpdated.price,
      stock: productUpdated.stock,
      brand: productUpdated.brand,
      category: productUpdated.category,
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.prismaService.product.delete({
      where: { id },
    })
    return !!product
  }
}
