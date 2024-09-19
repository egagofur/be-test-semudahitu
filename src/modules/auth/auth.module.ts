import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from '../../config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRegisterService } from './services/auth-register.service';
import { AuthRegisterController } from './controllers/v1/auth-register.controller';
import { AuthLoginService } from './services/auth-login.service';
import { AuthLoginController } from './controllers/v1/auth-login.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [],
      useFactory: async () => ({
        secret: config.auth.jwt.secret,
        signOptions: {
          expiresIn: `${config.auth.jwt.timeExpired.year} years`,
        },
      }),
      inject: [],
    }),
  ],

  providers: [
    JwtStrategy,

    // services
    PrismaService,
    AuthRegisterService,
    AuthLoginService,

    // repositories
    UserRepository,
  ],
  controllers: [AuthRegisterController, AuthLoginController],
  exports: [
    // services
    AuthRegisterService,
    AuthLoginService,

    // repositories
    UserRepository,
  ],
})
export class AuthModule {}
