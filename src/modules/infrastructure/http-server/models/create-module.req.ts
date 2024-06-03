import { IsOptional, IsString, MinLength } from 'class-validator'
import { ICreateModuleDto } from 'src/modules/domain/dtos/create-module.dto'

export class CreateModuleReq implements ICreateModuleDto {
  @IsString()
  @MinLength(3)
  name: string

  @IsString()
  @IsOptional()
  description: string
}
