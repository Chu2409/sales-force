import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
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
    return await this.prismaService.brand.findMany()
  }

  async getBrandById(id: number): Promise<IBrandRes> {
    const brand = await this.prismaService.brand.findUnique({
      where: { id },
    })

    if (!brand) throw new NotFoundException('Brand not found')

    return brand
  }

  async createBrand(brand: ICreateBrandDto): Promise<IBrandRes> {
    const brandExists = await this.prismaService.brand.findFirst({
      where: { name: brand.name },
    })
    if (brandExists) throw new BadRequestException('Brand already exists')

    return await this.prismaService.brand.create({
      data: brand,
    })
  }

  async updateBrand(id: number, brand: IUpdateBrandDto): Promise<IBrandRes> {
    await this.getBrandById(id)

    const brandExists = await this.prismaService.brand.findFirst({
      where: { name: brand.name, id: { not: id } },
    })
    if (brandExists) throw new BadRequestException('Brand already exists')

    return await this.prismaService.brand.update({
      where: { id },
      data: brand,
    })
  }

  async deleteBrand(id: number): Promise<boolean> {
    await this.getBrandById(id)

    const brand = await this.prismaService.brand.update({
      where: { id },
      data: { isActive: false },
    })

    return !!brand
  }
}
