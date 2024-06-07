import { Inject, Injectable } from '@nestjs/common'
import { IBrandsServicePort } from '../domain/ports/in/brands.service.port'
import { IBrandsRepositoryPort } from '../domain/ports/out/brands.repository.port'
import { ICreateBrandDto } from '../domain/dtos/create-brand.dto'
import { IUpdateBrandDto } from '../domain/dtos/update-brand.dto'
import { BRANDS_REPOSITORY_PORT } from '../shared/brands.consts'
import { IBrandRes } from '../domain/dtos/brand.res'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'

@Injectable()
export class BrandsService implements IBrandsServicePort {
  constructor(
    @Inject(BRANDS_REPOSITORY_PORT)
    private readonly repository: IBrandsRepositoryPort,
  ) {}

  async createBrand(brand: ICreateBrandDto): Promise<IBrandRes> {
    const brandExists = await this.repository.getBrandByName(brand.name)
    if (brandExists)
      throw new AppError('Brand already exists', Errors.BAD_REQUEST)

    return await this.repository.createBrand(brand)
  }

  async updateBrand(id: number, brand: IUpdateBrandDto): Promise<IBrandRes> {
    await this.getBrandById(id)

    const brandExists = await this.repository.getBrandByName(brand.name)
    if (brandExists && brandExists.id !== id)
      throw new AppError('Brand already exists', Errors.BAD_REQUEST)

    return await this.repository.updateBrand(id, brand)
  }

  async toggleBrandAvailability(id: number): Promise<boolean> {
    const brand = await this.getBrandById(id)

    return await this.repository.toggleBrandAvailability(id, !brand.isActive)
  }

  async getBrands(): Promise<IBrandRes[]> {
    return await this.repository.getBrands()
  }

  async getBrandById(id: number): Promise<IBrandRes> {
    const brand = await this.repository.getBrandById(id)
    if (!brand) throw new AppError('Brand not found', Errors.NOT_FOUND)

    return brand
  }
}
