import { ICreatePayMethodDto } from './dtos/create-pay-method.dto'
import { IPayMethodModel } from './models/pay-method.model'

export class PayMethod implements IPayMethodModel {
  id: number
  name: string

  private constructor() {}

  static create(payMethod: ICreatePayMethodDto) {
    const payMethodCreated = new PayMethodBuilder(new PayMethod())
      .name(payMethod.name)
      .build()

    return payMethodCreated
  }

  static builder() {
    return new PayMethodBuilder(new PayMethod())
  }
}

class PayMethodBuilder {
  constructor(private payMethod: PayMethod) {}

  id(id: number) {
    this.payMethod.id = id
    return this
  }

  name(name: string) {
    this.payMethod.name = name
    return this
  }

  build() {
    return this.payMethod
  }
}
