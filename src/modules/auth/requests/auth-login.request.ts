import { passwordRegex } from 'constants/regex.constant';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const AuthLoginRequestSchema = z.object({
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

export class AuthLoginRequest extends createZodDto(AuthLoginRequestSchema) {}
