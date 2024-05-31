import { IPayMethodModel } from './models/pay-method.model'

export class PayMethod implements IPayMethodModel {
  id: number
  name: string
  tax: number

  private constructor() {}

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
