import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [PrismaModule, AuthModule, EmployeeModule],
})
export class AppModule {}
