import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error | null, user: User) => void,
  ): void {
    done(null, user);
  }

  async deserializeUser(
    payload: User,
    done: (err: Error | null, user: Omit<User, 'password'> | null) => void,
  ): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        return done(new Error('User not found'), null);
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
