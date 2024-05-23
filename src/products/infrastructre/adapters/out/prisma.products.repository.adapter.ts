import { Inject, Injectable } from '@nestjs/common'
import { ProductModel } from 'src/products/domain/models/product'
import { IProductsRepositoryPort } from 'src/products/domain/ports/out/products.repository.port'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductsMapper } from '../mappers/products.mapper'

@Injectable()
export class PrismaProductsRepositoryAdapter
  implements IProductsRepositoryPort
{
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getProducts(): Promise<ProductModel[]> {
    return ProductsMapper.toModels(await this.prismaService.product.findMany())
  }

  async getProductById(id: number): Promise<ProductModel> {
    return ProductsMapper.toModel(
      await this.prismaService.product.findUnique({
        where: { id },
        include: {
          brand: true,
          category: true,
        },
      }),
    )
  }

  async createProduct(product: ProductModel): Promise<ProductModel> {
    return ProductsMapper.toModel(
      await this.prismaService.product.create({
        data: {
          name: product.getName(),
          description: product.getDescription(),
          stock: product.getStock(),
          price: product.getPrice(),
          brandId: product.getBrand().getId(),
          categoryId: product.getCategory().getId(),
        },
      }),
    )
  }

  async updateProduct(
    id: number,
    product: ProductModel,
  ): Promise<ProductModel> {
    return ProductsMapper.toModel(
      await this.prismaService.product.update({
        where: { id },
        data: {
          name: product.getName(),
          description: product.getDescription(),
          stock: product.getStock(),
          price: product.getPrice(),
          brandId: product.getBrand().getId(),
          categoryId: product.getCategory().getId(),
        },
      }),
    )
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = await this.prismaService.product.delete({
      where: { id },
    })
    return !!product
  }
}
