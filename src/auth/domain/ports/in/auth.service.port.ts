import { IAuthLoginDto } from '../../dtos/auth-login.dto'
import { IAuthRes } from '../../dtos/auth.res'

export interface IAuthServicePort {
  login(dto: IAuthLoginDto): Promise<IAuthRes>
}
