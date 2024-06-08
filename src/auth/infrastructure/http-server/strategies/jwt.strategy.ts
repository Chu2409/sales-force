import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Employee } from '@prisma/client'
import { EnvConfiguration } from 'config/configuration'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from 'src/auth/domain/dtos/jwt-payload'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,

    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<EnvConfiguration>('config').jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate({ id }: JwtPayload): Promise<Employee> {
    const employee = await this.prismaService.employee.findUnique({
      where: { id },
    })

    if (!employee) throw new UnauthorizedException('Token not valid')

    if (!employee.isActive)
      throw new UnauthorizedException(
        'Employee is inactive, talk with an admin',
      )

    return employee
  }
}
