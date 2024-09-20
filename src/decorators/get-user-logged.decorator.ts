import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUserLogged = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<User> => {
    return ctx.switchToHttp().getRequest().user;
  },
);
