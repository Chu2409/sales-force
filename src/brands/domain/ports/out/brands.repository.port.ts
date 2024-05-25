import { IBrandRes } from '../../dtos/brand.res'
import { ICreateBrandDto } from '../../dtos/create-brand.dto'
import { IUpdateBrandDto } from '../../dtos/update-brand.dto'

export interface IBrandsRepositoryPort {
  createBrand(brand: ICreateBrandDto): Promise<IBrandRes>
  updateBrand(id: number, brand: IUpdateBrandDto): Promise<IBrandRes>
  deleteBrand(id: number): Promise<boolean>
  getBrands(): Promise<IBrandRes[]>
  getBrandById(id: number): Promise<IBrandRes>
}
