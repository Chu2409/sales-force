import { Inject, Injectable } from '@nestjs/common'
import { IAuthServicePort } from '../domain/ports/in/auth.service.port'
import { IAuthLoginDto } from '../domain/dtos/auth-login.dto'
import { IAuthRes } from '../domain/dtos/auth.res'
import { IAuthRepositoryPort } from '../domain/ports/out/auth.repository.port'
import { AUTH_REPOSITORY_PORT } from '../shared/auth.conts'

@Injectable()
export class AuthService implements IAuthServicePort {
  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly repository: IAuthRepositoryPort,
  ) {}

  async login(dto: IAuthLoginDto): Promise<IAuthRes> {
    return await this.repository.login(dto)
  }
}
