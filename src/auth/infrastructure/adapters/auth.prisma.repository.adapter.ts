import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IAuthRepositoryPort } from 'src/auth/domain/ports/out/auth.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { IAuthLoginDto } from 'src/auth/domain/dtos/auth-login.dto'
import { IAuthRes } from 'src/auth/domain/dtos/auth.res'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthPrismaRepositoryAdapter implements IAuthRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,

    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: IAuthLoginDto): Promise<IAuthRes> {
    const employee = await this.prismaService.employee.findFirst({
      where: {
        username,
      },
    })

    if (!employee) throw new NotFoundException('Employee not found')

    if (!bcrypt.compareSync(password, employee.password))
      throw new UnauthorizedException('Credentials are not valid (password)')

    return {
      token: this.jwtService.sign({ id: employee.id }),
    }
  }
}
