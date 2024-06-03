import { IPayMethod } from './models/pay-method.interface'

export class PayMethod implements IPayMethod {
  id: number
  name: string
  tax: number
  isActive: boolean

  private constructor() {}

  static builder() {
    return new PayMethodBuilder(new PayMethod())
  }
}

class PayMethodBuilder {
  constructor(private payMethod: IPayMethod) {}

  id(id: number) {
    this.payMethod.id = id
    return this
  }

  name(name: string) {
    this.payMethod.name = name
    return this
  }

  isActive(isActive: boolean) {
    this.payMethod.isActive = isActive
    return this
  }

  build() {
    return this.payMethod
  }
}
