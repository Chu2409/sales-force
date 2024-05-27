import { IUpdatePersonDto } from 'src/people/domain/dtos/update-person.dto'
import { ICreateConsumerDto } from './create-consumer.dto'

export interface IUpdateConsumerDto
  extends Partial<Omit<ICreateConsumerDto, 'person'>> {
  person?: IUpdatePersonDto
}
