import { ICreateProductDto } from '../../dtos/create-product.dto'
import { IProductRes } from '../../dtos/product.res'
import { IUpdateProductDto } from '../../dtos/update-product.dto'

export interface IProductsServicePort {
  getProducts(): Promise<IProductRes[]>
  getProductById(id: number): Promise<IProductRes>
  createProduct(product: ICreateProductDto): Promise<IProductRes>
  updateProduct(id: number, product: IUpdateProductDto): Promise<IProductRes>
  deleteProduct(id: number): Promise<boolean>
}
