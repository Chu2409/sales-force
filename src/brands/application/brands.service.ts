import { Inject, Injectable } from '@nestjs/common'
import { IBrandsServicePort } from '../domain/ports/in/brands.service.port'
import { IBrandsRepositoryPort } from '../domain/ports/out/brands.repository.port'
import { BrandModel } from '../domain/models/brand'
import { ICreateBrandDto } from '../domain/dtos/create-brand.dto'
import { IUpdateBrandDto } from '../domain/dtos/update-brand.dto'
import { BRANDS_REPOSITORY_PORT } from '../shared/brands-providers.consts'

@Injectable()
export class BrandsService implements IBrandsServicePort {
  constructor(
    @Inject(BRANDS_REPOSITORY_PORT)
    private readonly repository: IBrandsRepositoryPort,
  ) {}

  async createBrand(model: ICreateBrandDto): Promise<BrandModel> {
    return this.repository.createBrand(
      BrandModel.create({
        name: model.name,
      }),
    )
  }

  async updateBrand(id: number, model: IUpdateBrandDto): Promise<BrandModel> {
    return this.repository.updateBrand(
      id,
      BrandModel.create({
        name: model.name,
      }),
    )
  }

  async deleteBrand(id: number): Promise<boolean> {
    return this.repository.deleteBrand(id)
  }

  async getBrands(): Promise<BrandModel[]> {
    return this.repository.getBrands()
  }

  async getBrandById(id: number): Promise<BrandModel> {
    return this.repository.getBrandById(id)
  }
}
