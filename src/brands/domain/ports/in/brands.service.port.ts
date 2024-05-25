import { ICreateBrandDto } from '../../dtos/create-brand.dto'
import { IUpdateBrandDto } from '../../dtos/update-brand.dto'
import { BrandModel } from '../../models/brand'

export interface IBrandsServicePort {
  createBrand(brand: ICreateBrandDto): Promise<BrandModel>
  updateBrand(id: number, brand: IUpdateBrandDto): Promise<BrandModel>
  deleteBrand(id: number): Promise<boolean>
  getBrands(): Promise<BrandModel[]>
  getBrandById(id: number): Promise<BrandModel>
}
