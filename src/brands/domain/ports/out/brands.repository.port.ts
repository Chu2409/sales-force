import { IBrandRes } from '../../dtos/brand.res'
import { ICreateBrandDto } from '../../dtos/create-brand.dto'
import { IUpdateBrandDto } from '../../dtos/update-brand.dto'

export interface IBrandsRepositoryPort {
  createBrand(brand: ICreateBrandDto): Promise<IBrandRes>
  updateBrand(id: number, brand: IUpdateBrandDto): Promise<IBrandRes>
  toggleBrandAvailability(id: number, state: boolean): Promise<boolean>
  getBrands(): Promise<IBrandRes[]>
  getBrandById(id: number): Promise<IBrandRes>
  getBrandByName(name: string): Promise<IBrandRes>
}
