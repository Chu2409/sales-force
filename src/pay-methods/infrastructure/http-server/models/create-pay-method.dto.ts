import { IsPositive, IsString, MinLength } from 'class-validator'
import { ICreatePayMethodDto } from 'src/pay-methods/domain/dtos/create-pay-method.dto'

export class CreatePayMethodReq implements ICreatePayMethodDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsPositive()
  tax: number
}
