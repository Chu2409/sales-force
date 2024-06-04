import { IsString, MinLength } from 'class-validator'
import { IAuthLoginDto } from 'src/auth/domain/dtos/auth-login.dto'

export class AuthLoginReq implements IAuthLoginDto {
  @IsString()
  @MinLength(4)
  username: string

  @IsString()
  @MinLength(6)
  password: string
}
