import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';
import { config } from '../../../config';

interface IJwtPayload {
  id: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      secretOrKey: config.auth.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UnprocessableEntityException(`Phone or password is not valid!`);
    }

    return user;
  }
}
