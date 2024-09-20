import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
  IPaginateResponse,
  IPaginationMeta,
} from 'src/common/interface/index.interface';
import { EmployeeResponse } from '../responses/employee.respon';
import {
  EmployeeCreateRequest,
  EmployeeUpdateRequest,
} from '../requests/employee.request';
import { OrderDirectionType } from '../../../common/interface/index.interface';

@Injectable()
export class EmployeeService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    page: number = 1,
    perPage: number = 10,
  ): Promise<IPaginateResponse<EmployeeResponse>> {
    const skip = (page - 1) * perPage;

    const [total, employees] = await Promise.all([
      this.prismaService.employee.count(),
      this.prismaService.employee.findMany({
        skip,
        take: perPage,
        orderBy: {
          id: OrderDirectionType.Asc,
        },
      }),
    ]);

    const totalPage = Math.ceil(total / perPage);

    const meta: IPaginationMeta = {
      page,
      perPage,
      total,
      totalPage,
    };

    const data = EmployeeResponse.fromEntities(employees);

    return {
      meta,
      data,
    };
  }

  async create(data: EmployeeCreateRequest): Promise<EmployeeResponse> {
    const employee = await this.prismaService.employee.create({
      data: {
        approvalLine: data.approvalLine,
        birthdate: data.birthdate,
        branch: data.branch,
        class: data.class,
        department: data.department,
        email: data.email,
        employeeId: data.employeeId,
        employmentStatus: data.employmentStatus,
        firstName: data.firstName,
        gender: data.gender,
        grade: data.grade,
        groupStructure: data.groupStructure,
        jobLevel: data.jobLevel,
        jobPosition: data.jobPosition,
        joinDate: data.joinDate,
        lastName: data.lastName,
        mobilePhone: data.mobilePhone,
        nik: data.nik,
        sbu: data.sbu,
        schedule: data.schedule,
        barcode: data.barcode,
        bloodType: data.bloodType,
        citizenIdAddress: data.citizenIdAddress,
        manager: data.manager,
        maritalStatus: data.maritalStatus,
        phone: data.phone,
        passportExpiry: data.passportExpiry,
        passportNumber: data.passportNumber,
        placeOfBirth: data.placeOfBirth,
        postalCode: data.postalCode,
        religion: data.religion,
        residentialAddress: data.residentialAddress,
      },
    });
    return EmployeeResponse.fromEntity(employee);
  }

  async update(
    id: string,
    data: EmployeeUpdateRequest,
  ): Promise<EmployeeResponse> {
    const employee = await this.prismaService.employee.update({
      where: { id },
      data,
    });
    return EmployeeResponse.fromEntity(employee);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.employee.delete({
      where: { id },
    });
  }
}
