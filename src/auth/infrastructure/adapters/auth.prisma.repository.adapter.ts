import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { IAuthRepositoryPort } from 'src/auth/domain/ports/out/auth.repository.port'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { EmployeesMapper } from 'src/employees/infrastructure/adapters/employees.mapper'
import { IEmployeeRes } from 'src/employees/domain/dtos/employee.res'

@Injectable()
export class AuthPrismaRepositoryAdapter implements IAuthRepositoryPort {
  constructor(
    @Inject(PRISMA_SERVICE)
    private readonly prismaService: PrismaService,

    private readonly jwtService: JwtService,
  ) {}

  async getEmployeeByUsername(username: string): Promise<IEmployeeRes> {
    const employee = await this.prismaService.employee.findFirst({
      where: {
        username,
      },
      include: {
        person: {
          include: { location: true },
        },
      },
    })

    return employee ? EmployeesMapper.toRes(employee) : null
  }

  comparePasswords(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }

  signIn(id: number): string {
    return this.jwtService.sign({ id })
  }
}
