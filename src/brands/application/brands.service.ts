import { Inject, Injectable } from '@nestjs/common'
import { IBrandsServicePort } from '../domain/ports/in/brands.service.port'
import { IBrandsRepositoryPort } from '../domain/ports/out/brands.repository.port'
import { BrandModel } from '../domain/models/brand'

@Injectable()
export class BrandsService implements IBrandsServicePort {
  constructor(
    @Inject('IBrandsRepositoryPort')
    private readonly repository: IBrandsRepositoryPort,
  ) {}

  async createBrand(model: BrandModel): Promise<BrandModel> {
    return this.repository.createBrand(model)
  }

  async updateBrand(id: number, model: BrandModel): Promise<BrandModel> {
    return this.repository.updateBrand(id, model)
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
