import { ICreateProductDto } from '../../dtos/create-product.dto'
import { IProductRes } from '../../dtos/product.res'
import { IUpdateProductDto } from '../../dtos/update-product.dto'

export interface IProductsRepositoryPort {
  getProducts(): Promise<IProductRes[]>
  getProductById(id: number): Promise<IProductRes>
  createProduct(product: ICreateProductDto): Promise<IProductRes>
  updateProduct(id: number, product: IUpdateProductDto): Promise<IProductRes>
  setProductActive(id: number, state: boolean): Promise<boolean>
  discountProductStock(
    products: {
      id: number
      quantity: number
    }[],
  ): Promise<boolean>
}
