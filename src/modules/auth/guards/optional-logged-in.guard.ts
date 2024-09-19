import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalLoggedInGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  handleRequest(err, user) {
    if (!user) {
      return true;
    } else if (err) {
      throw err;
    }

    return user;
  }
}
