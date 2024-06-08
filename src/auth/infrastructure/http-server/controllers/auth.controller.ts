import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { AuthService } from 'src/auth/application/auth.service'
import { AUTH_SERVICE_PORT } from 'src/auth/shared/auth.conts'
import { AuthLoginReq } from '../models/auth-login.req'
import { Auth } from '../decorators/auth.decorator'
import { EmployeeRole } from 'src/employees/domain/models/employee.interface'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_PORT)
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() dto: AuthLoginReq) {
    return await this.authService.login(dto)
  }

  @Get('test')
  @Auth(EmployeeRole.ADMIN)
  async test() {
    return 'Hello'
  }
}
