import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { EmployeeResponse } from '../responses/employee.respon';
import { IPaginateResponse } from 'src/common/interface/index.interface';
import {
  EmployeeCreateRequest,
  EmployeeUpdateRequest,
} from '../requests/employee.request';
import { IApiResponse } from 'src/common/interface/response.interface';
import { LoggedInGuard } from 'src/modules/auth/guards/logged-in.guard';
import { Employee } from '@prisma/client';

@Controller('employees')
@UseGuards(LoggedInGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
    @Query('search') search?: string,
  ): Promise<IPaginateResponse<EmployeeResponse>> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const itemsPerPage = perPage ? parseInt(perPage, 10) : 10;

    return this.employeeService.findAll(pageNumber, itemsPerPage, search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IApiResponse<Employee>> {
    try {
      const data = await this.employeeService.findById(id);
      return {
        message: `Employee with ID ${id} has been found`,
        data: data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      throw error;
    }
  }

  @Post()
  async create(
    @Body() employeeData: EmployeeCreateRequest,
  ): Promise<IApiResponse<EmployeeResponse>> {
    const data = await this.employeeService.create(employeeData);
    return {
      message: 'Employee has been created',
      data: data,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    employeeData: EmployeeUpdateRequest,
  ): Promise<IApiResponse<EmployeeResponse>> {
    try {
      const data = await this.employeeService.update(id, employeeData);
      return {
        message: `Employee with ID ${id} has been updated`,
        data: data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IApiResponse<null>> {
    try {
      await this.employeeService.delete(id);
      return {
        message: `Employee with ID ${id} has been deleted`,
        data: null,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      throw error;
    }
  }
}
