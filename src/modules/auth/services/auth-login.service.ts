import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';
import { AuthLoginRequest } from '../requests/auth-login.request';
import { IUserWithToken } from '../responses/auth-login.response';
import { IJwtPayload } from 'src/common/interface/jwt-payload.interface';

@Injectable()
export class AuthLoginService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async basic(data: AuthLoginRequest): Promise<IUserWithToken> {
    const user = await this.userRepository.validateUser(
      data.email,
      data.password,
      true,
    );

    if (!user) {
      throw new BadRequestException('Email atau Kata sandi salah!');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      user,
      token: accessToken,
    };
  }
}
