import { Brand } from '@prisma/client'
import { CreateBrandDto } from '../in/dtos/create-brand.dto'
import { UpdateBrandDto } from '../in/dtos/update-brand.dto'
import { BrandModel } from 'src/brands/domain/models/brand'

export class BrandsMapper {
  public static toModel(brand: Brand): BrandModel {
    return new BrandModel(brand.id, brand.name)
  }

  public static toModels(brands: Brand[]): BrandModel[] {
    return brands.map((brand) => this.toModel(brand))
  }

  public static dtoToModel(dto: CreateBrandDto | UpdateBrandDto): BrandModel {
    return new BrandModel(undefined, dto.name)
  }
}
