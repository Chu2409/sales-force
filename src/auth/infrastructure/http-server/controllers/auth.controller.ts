import { Body, Controller, Inject, Post } from '@nestjs/common'
import { AuthService } from 'src/auth/application/auth.service'
import { AUTH_SERVICE_PORT } from 'src/auth/shared/auth.conts'
import { AuthLoginReq } from '../models/auth-login.req'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthRes } from '../models/auth.res'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_PORT)
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: AuthRes })
  async login(@Body() dto: AuthLoginReq) {
    return await this.authService.login(dto)
  }
}
