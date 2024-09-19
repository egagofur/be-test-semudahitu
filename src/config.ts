import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || '3004',
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET_KEY || 'secret',
      timeExpired: {
        year: process.env.JWT_EXPIRES_IN_YEAR || 1,
      },
    },
  },
};
