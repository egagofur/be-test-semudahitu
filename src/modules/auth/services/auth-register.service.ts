import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthRegisterRequest } from '../requests/auth-register.request';
import { User } from '@prisma/client';
import { Utils } from '../../../common/utils/util';

@Injectable()
export class AuthRegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: AuthRegisterRequest): Promise<User> {
    const emailExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (emailExists) {
      throw new Error('Email already exists');
    }

    return this.prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          email: data.email,
          password: await Utils.bcryptHash(data.password),
          fullname: data.fullname,
          mobilePhoneNumber: data.mobilePhoneNumber,
          companyName: data.companyName,
        },
      });

      return newUser;
    });
  }
}
