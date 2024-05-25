import { IsString, MinLength } from 'class-validator'

export class CreateCategoryReq {
  @IsString()
  @MinLength(3)
  name: string
}
