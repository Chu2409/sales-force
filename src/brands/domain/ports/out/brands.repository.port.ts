import { BrandModel } from '../../models/brand'

export interface IBrandsRepositoryPort {
  createBrand(brand: BrandModel): Promise<BrandModel>
  updateBrand(id: number, brand: BrandModel): Promise<BrandModel>
  deleteBrand(id: number): Promise<boolean>
  getBrands(): Promise<BrandModel[]>
  getBrandById(id: number): Promise<BrandModel>
}
