import { User } from '@prisma/client';
import { AuthUserResponse } from './auth-user-response.response';

export interface IUserWithToken {
  user: User;
  token: string;
}

export class AuthLoginResponse {
  user: AuthUserResponse;

  token: string;

  static fromEntity(data: IUserWithToken): AuthLoginResponse {
    return {
      user: AuthUserResponse.fromEntity(data.user),
      token: data.token,
    };
  }
}
