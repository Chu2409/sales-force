import { IPersonModel } from 'src/people/domain/models/person.model'
import { ConsumerType, IConsumerModel } from './models/consumer.model'

export class Consumer implements IConsumerModel {
  id: number
  type: ConsumerType
  isCustomer: boolean
  person: IPersonModel

  private constructor() {}

  static builder() {
    return new ConsumerBuilder(new Consumer())
  }
}

class ConsumerBuilder {
  constructor(private consumer: Consumer) {}

  id(id: number) {
    this.consumer.id = id
    return this
  }

  type(type: ConsumerType) {
    this.consumer.type = type
    return this
  }

  isCustomer(isCustomer: boolean) {
    this.consumer.isCustomer = isCustomer
    return this
  }

  person(person: IPersonModel) {
    this.consumer.person = person
    return this
  }

  build() {
    return this.consumer
  }
}
