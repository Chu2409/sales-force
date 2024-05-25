import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IBrandsRepositoryPort } from 'src/brands/domain/ports/out/brands.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IBrandsRes } from 'src/brands/domain/dtos/brands.res'
import { CreateBrandReq } from '../http-server/models/create-brand.req'

@Injectable()
export class PrismaBrandsRepositoryAdapter implements IBrandsRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getBrands(): Promise<IBrandsRes[]> {
    return await this.prismaService.brand.findMany({})
  }

  async getBrandById(id: number): Promise<IBrandsRes> {
    return await this.prismaService.brand.findUniqueOrThrow({
      where: { id },
    })
  }

  async createBrand(brand: CreateBrandReq): Promise<IBrandsRes> {
    return await this.prismaService.brand.create({
      data: {
        name: brand.name,
      },
    })
  }

  async updateBrand(id: number, brand: CreateBrandReq): Promise<IBrandsRes> {
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
