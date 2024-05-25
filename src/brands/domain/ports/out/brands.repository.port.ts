import { IBrandsRes } from '../../dtos/brands.res'
import { ICreateBrandDto } from '../../dtos/create-brand.dto'
import { IUpdateBrandDto } from '../../dtos/update-brand.dto'

export interface IBrandsRepositoryPort {
  createBrand(brand: ICreateBrandDto): Promise<IBrandsRes>
  updateBrand(id: number, brand: IUpdateBrandDto): Promise<IBrandsRes>
  deleteBrand(id: number): Promise<boolean>
  getBrands(): Promise<IBrandsRes[]>
  getBrandById(id: number): Promise<IBrandsRes>
}
