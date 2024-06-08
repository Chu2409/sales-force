import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { AuthService } from './application/auth.service'
import { AuthPrismaRepositoryAdapter } from './infrastructure/adapters/auth.prisma.repository.adapter'
import { AUTH_REPOSITORY_PORT, AUTH_SERVICE_PORT } from './shared/auth.conts'
import { PrismaService } from 'src/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { AuthController } from './infrastructure/http-server/controllers/auth.controller'
import { JwtStrategy } from './infrastructure/http-server/strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { EnvConfiguration } from 'config/configuration'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<EnvConfiguration>('config').jwtSecret,
          signOptions: {
            expiresIn: '2h',
          },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: AUTH_SERVICE_PORT,
      useClass: AuthService,
    },
    {
      provide: AUTH_REPOSITORY_PORT,
      useClass: AuthPrismaRepositoryAdapter,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
