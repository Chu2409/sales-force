import { ProductModel } from '../../models/product'

export interface IProductsServicePort {
  getProducts(): Promise<ProductModel[]>
  getProductById(id: number): Promise<ProductModel | null>
  createProduct(product: ProductModel): Promise<ProductModel>
  updateProduct(id: number, product: ProductModel): Promise<ProductModel>
  deleteProduct(id: number): Promise<boolean>
}
