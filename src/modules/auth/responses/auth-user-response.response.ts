import { User } from '@prisma/client';

export class AuthUserResponse {
  id: string;

  fullname: string;

  email: string;

  static fromEntity(user: User): AuthUserResponse {
    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    };
  }
}
