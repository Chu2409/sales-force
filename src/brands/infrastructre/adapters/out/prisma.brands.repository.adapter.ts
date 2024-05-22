import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { BrandsMapper } from '../mappers/brands.mapper'
import { IBrandsRepositoryPort } from 'src/brands/domain/ports/out/brands.repository.port'
import { BrandModel } from 'src/brands/domain/models/brand'

@Injectable()
export class PrismaBrandsRepositoryAdapter implements IBrandsRepositoryPort {
  constructor(
    @Inject('PrismaService') private readonly prismaService: PrismaService,
  ) {}

  async getBrands(): Promise<BrandModel[]> {
    return BrandsMapper.toModels(await this.prismaService.brand.findMany())
  }

  async getBrandById(id: number): Promise<BrandModel> {
    return BrandsMapper.toModel(
      await this.prismaService.brand.findUnique({
        where: { id },
      }),
    )
  }

  async createBrand(brand: BrandModel): Promise<BrandModel> {
    return BrandsMapper.toModel(
      await this.prismaService.brand.create({
        data: {
          name: brand.getName(),
        },
      }),
    )
  }

  async updateBrand(id: number, brand: BrandModel): Promise<BrandModel> {
    return BrandsMapper.toModel(
      await this.prismaService.brand.update({
        where: { id },
        data: {
          name: brand.getName(),
        },
      }),
    )
  }

  async deleteBrand(id: number): Promise<boolean> {
    const brand = await this.prismaService.brand.delete({
      where: { id },
    })

    return !!brand
  }
}
