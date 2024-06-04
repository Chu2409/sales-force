import { Inject, Injectable } from '@nestjs/common'
import { IBrandsServicePort } from '../domain/ports/in/brands.service.port'
import { IBrandsRepositoryPort } from '../domain/ports/out/brands.repository.port'
import { ICreateBrandDto } from '../domain/dtos/create-brand.dto'
import { IUpdateBrandDto } from '../domain/dtos/update-brand.dto'
import { BRANDS_REPOSITORY_PORT } from '../shared/brands-providers.consts'
import { IBrandRes } from '../domain/dtos/brand.res'

@Injectable()
export class BrandsService implements IBrandsServicePort {
  constructor(
    @Inject(BRANDS_REPOSITORY_PORT)
    private readonly repository: IBrandsRepositoryPort,
  ) {}

  async createBrand(brand: ICreateBrandDto): Promise<IBrandRes> {
    return await this.repository.createBrand(brand)
  }

  async updateBrand(id: number, brand: IUpdateBrandDto): Promise<IBrandRes> {
    return await this.repository.updateBrand(id, brand)
  }

  async deleteBrand(id: number): Promise<boolean> {
    return await this.repository.toggleBrandAvaliabilty(id)
  }

  async getBrands(): Promise<IBrandRes[]> {
    return await this.repository.getBrands()
  }

  async getBrandById(id: number): Promise<IBrandRes> {
    return await this.repository.getBrandById(id)
  }
}
