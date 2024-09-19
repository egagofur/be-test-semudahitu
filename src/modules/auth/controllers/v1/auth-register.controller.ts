import { Body, Controller, Post } from '@nestjs/common';
import { IApiResponse } from '../../../../common/interface/response.interface';
import { AuthRegisterRequest } from '../../requests/auth-register.request';
import { AuthRegisterService } from '../../services/auth-register.service';
import { AuthRegisterResponse } from '../../responses/auth-register.response';

@Controller('auth')
export class AuthRegisterController {
  constructor(private readonly authRegisterService: AuthRegisterService) {}

  @Post('register')
  async registerUser(
    @Body() data: AuthRegisterRequest,
  ): Promise<IApiResponse<AuthRegisterResponse>> {
    const registerUser = await this.authRegisterService.register(data);

    return {
      data: AuthRegisterResponse.fromEntity(registerUser),
      message: 'Selamat Register berhasil.',
    };
  }
}
