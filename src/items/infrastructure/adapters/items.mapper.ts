import { Item, Service } from '@prisma/client'
import { IItemRes } from 'src/items/domain/dtos/item.res'
import {
  IPrismaFullProduct,
  ProductsMapper,
} from 'src/products/infrastructure/adapters/products.mapper'

export interface IPrismaItem extends Item {
  product: IPrismaFullProduct
  service: Service
}

export class ItemsMapper {
  static toRes({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    productId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    serviceId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transactionId,
    product,
    ...item
  }: IPrismaItem): IItemRes {
    return {
      ...item,
      product: product ? ProductsMapper.toRes(product) : null,
      service: item.service,
    }
  }
}
