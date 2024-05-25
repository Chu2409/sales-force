import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IBrandsRepositoryPort } from 'src/brands/domain/ports/out/brands.repository.port'
import { BrandModel } from 'src/brands/domain/models/brand'

@Injectable()
export class PrismaBrandsRepositoryAdapter implements IBrandsRepositoryPort {
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getBrands(): Promise<BrandModel[]> {
    return await this.prismaService.brand.findMany()
  }

  async getBrandById(id: number): Promise<BrandModel> {
    return await this.prismaService.brand.findUniqueOrThrow({
      where: { id },
    })
  }

  async createBrand(brand: BrandModel): Promise<BrandModel> {
    return await this.prismaService.brand.create({
      data: {
        name: brand.name,
      },
    })
  }

  async updateBrand(id: number, brand: BrandModel): Promise<BrandModel> {
    return await this.prismaService.brand.update({
      where: { id },
      data: {
        name: brand.name,
      },
    })
  }

  async deleteBrand(id: number): Promise<boolean> {
    const brand = await this.prismaService.brand.delete({
      where: { id },
    })

    return !!brand
  }
}
