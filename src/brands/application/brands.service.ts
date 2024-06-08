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

    const createdBrand = await this.repository.createBrand(brand)
    if (!createdBrand)
      throw new AppError('Brand not created', Errors.INTERNAL_SERVER_ERROR)

    return createdBrand
  }

  async updateBrand(id: number, brand: IUpdateBrandDto): Promise<IBrandRes> {
    await this.getBrandById(id)

    const brandExists = await this.repository.getBrandByName(brand.name)
    if (brandExists && brandExists.id !== id)
      throw new AppError('Brand already exists', Errors.BAD_REQUEST)

    const updatedBrand = await this.repository.updateBrand(id, brand)
    if (!updatedBrand)
      throw new AppError('Brand not updated', Errors.INTERNAL_SERVER_ERROR)

    return updatedBrand
  }

  async toggleBrandActive(id: number): Promise<boolean> {
    const brand = await this.getBrandById(id)

    return await this.repository.setBrandActive(id, !brand.isActive)
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
