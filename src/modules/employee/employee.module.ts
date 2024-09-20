import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [],

  providers: [
    // services
    PrismaService,

    EmployeeService,
  ],
  controllers: [EmployeeController],
  exports: [
    // services
    EmployeeService,
  ],
})
export class EmployeeModule {}
