import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IBrandsRepositoryPort } from 'src/brands/domain/ports/out/brands.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IBrandRes } from 'src/brands/domain/dtos/brand.res'
import { ICreateBrandDto } from 'src/brands/domain/dtos/create-brand.dto'
import { IUpdateBrandDto } from 'src/brands/domain/dtos/update-brand.dto'

@Injectable()
export class BrandsPrismaRepositoryAdapter implements IBrandsRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async getBrands(): Promise<IBrandRes[]> {
    return await this.prismaService.brand.findMany({
      orderBy: { name: 'asc' },
    })
  }

  async getBrandById(id: number): Promise<IBrandRes> {
    return await this.prismaService.brand.findUnique({
      where: { id },
    })
  }

  async getBrandByName(name: string): Promise<IBrandRes> {
    return await this.prismaService.brand.findFirst({
      where: { name },
    })
  }

  async createBrand(brand: ICreateBrandDto): Promise<IBrandRes> {
    return await this.prismaService.brand.create({
      data: brand,
    })
  }

  async updateBrand(id: number, brand: IUpdateBrandDto): Promise<IBrandRes> {
    return await this.prismaService.brand.update({
      where: { id },
      data: brand,
    })
  }

  async toggleBrandAvailability(id: number, state: boolean): Promise<boolean> {
    const brand = await this.prismaService.brand.update({
      where: { id },
      data: { isActive: state },
    })

    return !!brand
  }
}
