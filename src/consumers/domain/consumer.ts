import { IPerson } from 'src/people/domain/models/person.interface'
import { ConsumerType, IConsumer } from './models/consumer.interface'

export class Consumer implements IConsumer {
  id: number
  type: ConsumerType
  isCustomer: boolean
  person: IPerson

  private constructor() {}

  static builder() {
    return new ConsumerBuilder(new Consumer())
  }
}

class ConsumerBuilder {
  constructor(private consumer: IConsumer) {}

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

  person(person: IPerson) {
    this.consumer.person = person
    return this
  }

  build() {
    return this.consumer
  }
}
