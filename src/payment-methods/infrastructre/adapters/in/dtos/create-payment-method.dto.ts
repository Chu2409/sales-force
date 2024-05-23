import { IsString, MinLength } from 'class-validator'

export class CreatePaymentMethodDto {
  @IsString()
  @MinLength(3)
  name: string
}
