import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginService } from '../../services/auth-login.service';
import { AuthLoginRequest } from '../../requests/auth-login.request';
import { IApiResponse } from 'src/common/interface/response.interface';
import { AuthLoginResponse } from '../../responses/auth-login.response';

@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @Post('login')
  async loginBasic(
    @Body() request: AuthLoginRequest,
  ): Promise<IApiResponse<AuthLoginResponse>> {
    const data = await this.authLoginService.basic(request);

    return {
      data: AuthLoginResponse.fromEntity(data),
      message: 'Berhasil login',
    };
  }
}
