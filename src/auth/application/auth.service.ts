import { Inject, Injectable } from '@nestjs/common'
import { IAuthServicePort } from '../domain/ports/in/auth.service.port'
import { IAuthLoginDto } from '../domain/dtos/auth-login.dto'
import { IAuthRes } from '../domain/dtos/auth.res'
import { IAuthRepositoryPort } from '../domain/ports/out/auth.repository.port'
import { AUTH_REPOSITORY_PORT } from '../shared/auth.conts'
import { AppError } from 'src/shared/domain/models/app.error'
import { Errors } from 'src/shared/domain/consts/errors'

@Injectable()
export class AuthService implements IAuthServicePort {
  constructor(
    @Inject(AUTH_REPOSITORY_PORT)
    private readonly repository: IAuthRepositoryPort,
  ) {}

  async login(dto: IAuthLoginDto): Promise<IAuthRes> {
    const employee = await this.repository.getEmployeeByUsername(dto.username)

    if (!employee) throw new AppError('Employee not found', Errors.NOT_FOUND)

    if (!this.repository.comparePasswords(dto.password, employee.password))
      throw new AppError('Invalid password', Errors.UNAUTHORIZED)

    return {
      employee,
      token: this.repository.signIn(employee.id),
    }
  }
}
