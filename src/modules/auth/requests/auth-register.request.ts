import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';
import { passwordRegex } from '../../../../constants/regex.constant';

export const AuthRegisterRequestSchema = z.object({
  fullname: z
    .string({
      required_error: 'Nama lengkap tidak boleh kosong',
    })
    .min(1, {
      message: 'Nama lengkap tidak boleh kosong',
    })
    .max(255, {
      message: 'Nama lengkap maksimal 255 karakter',
    }),
  companyName: z
    .string({
      required_error: 'Nama perusahaan tidak boleh kosong',
    })
    .min(1, {
      message: 'Nama perusahaan tidak boleh kosong',
    })
    .max(255, {
      message: 'Nama perusahaan maksimal 255 karakter',
    }),
  mobilePhoneNumber: z
    .string({
      required_error: 'Nomor telepon tidak boleh kosong',
    })
    .min(1, {
      message: 'Nomor telepon tidak boleh kosong',
    })
    .max(13, {
      message: 'Nomor telepon maksimal 13 karakter',
    }),
  email: z
    .string({
      required_error: 'Email tidak boleh kosong',
    })
    .min(1, {
      message: 'Email tidak boleh kosong',
    })
    .email({
      message: 'Format email tidak valid',
    }),
  password: z
    .string({
      required_error: 'Kata sandi tidak boleh kosong',
    })
    .min(1, {
      message: 'Kata sandi tidak boleh kosong',
    })
    .regex(passwordRegex, {
      message:
        'Kata sandi lemah. Harus terdapat minimal 8 karakter, kombinasi huruf besar, huruf kecil, angka, dan simbol',
    }),
});

export class AuthRegisterRequest extends createZodDto(
  AuthRegisterRequestSchema,
) {}
