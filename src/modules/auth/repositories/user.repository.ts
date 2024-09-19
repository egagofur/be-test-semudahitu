import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(
    email: string,
    password: string,
    isThrowable?: boolean,
  ): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (!user && isThrowable) {
      throw new UnprocessableEntityException('Email atau Kata sandi salah!');
    }

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid && isThrowable) {
      throw new UnprocessableEntityException('Email atau Kata sandi salah!');
    }

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async create(data: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data,
    });
    return newUser;
  }

  async createWithTransaction(data: User): Promise<User> {
    return await this.prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data,
      });
      return newUser;
    });
  }

  async findById(id: string, relations?: string[]): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: relations?.reduce((acc, relation) => {
        acc[relation] = true;
        return acc;
      }, {}),
    });

    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async isPhoneNumberExist(
    phoneNumber: string,
    ignoreId?: string,
  ): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        mobilePhoneNumber: phoneNumber,
        id: ignoreId ? { not: ignoreId } : undefined,
      },
    });
    return !!user;
  }

  async findOneByEmailAndCheckIsExist(
    email: string,
    isThrowable?: boolean,
  ): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (isThrowable && !user) {
      throw new UnprocessableEntityException('Email tidak dapat ditemukan');
    }

    return user;
  }

  async findOneByEmailAndCheckIsNotExist(
    email: string,
    isThrowable?: boolean,
  ): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (isThrowable && user) {
      throw new UnprocessableEntityException('Email sudah terdaftar');
    }

    return user;
  }

  async checkEmailIsExist(
    email: string,
    isThrowable?: boolean,
  ): Promise<boolean> {
    const user = await this.findByEmail(email);

    if (isThrowable && user) {
      throw new UnprocessableEntityException('Email sudah terdaftar');
    }

    return !!user;
  }

  async checkEmailIsNotExist(
    email: string,
    isThrowable?: boolean,
  ): Promise<boolean> {
    const user = await this.findByEmail(email);

    if (isThrowable && !user) {
      throw new UnprocessableEntityException('Email tidak dapat ditemukan');
    }

    return !user;
  }

  async updateWithTransaction(id: string, data: User): Promise<User> {
    return await this.prisma.$transaction(async (prisma) => {
      await prisma.user.update({
        where: { id },
        data,
      });

      return await this.findById(id);
    });
  }
}
