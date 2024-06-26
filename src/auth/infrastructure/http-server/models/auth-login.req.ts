import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'
import { IAuthLoginDto } from 'src/auth/domain/dtos/auth-login.dto'

export class AuthLoginReq implements IAuthLoginDto {
  @IsString()
  @MinLength(4)
  @ApiProperty({ minLength: 4 })
  username: string

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6 })
  password: string
}
