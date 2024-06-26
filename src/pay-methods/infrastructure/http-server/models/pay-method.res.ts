import { ApiProperty } from '@nestjs/swagger'
import { IPayMethodRes } from 'src/pay-methods/domain/dtos/pay-method.res'

export class PayMethodRes implements IPayMethodRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  tax: number

  @ApiProperty()
  isActive: boolean
}
