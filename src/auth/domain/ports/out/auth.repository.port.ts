import { IAuthLoginDto } from '../../dtos/auth-login.dto'
import { IAuthRes } from '../../dtos/auth.res'

export interface IAuthRepositoryPort {
  login(dto: IAuthLoginDto): Promise<IAuthRes>
}
