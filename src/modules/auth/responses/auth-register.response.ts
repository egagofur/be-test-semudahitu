import { User } from '@prisma/client';

export class AuthRegisterResponse {
  id: string;

  static fromEntity(data: User): AuthRegisterResponse {
    const response = new AuthRegisterResponse();
    response.id = data.id;

    return response;
  }
}
