import { Employee } from '@prisma/client';

export class EmployeeResponse {
  id: string;
  fullname: string;
  address: string;
  branch: string;
  birthdate: Date;
  gender: string;
  maritalStatus: string;
  email: string;
  barcode: string;

  static fromEntity(data: Employee): EmployeeResponse {
    return {
      address: data.citizenIdAddress,
      barcode: data.barcode,
      birthdate: data.birthdate,
      branch: data.branch,
      email: data.email,
      fullname: `${data.firstName} ${data.lastName}`,
      gender: data.gender,
      id: data.id,
      maritalStatus: data.maritalStatus,
    };
  }

  static fromEntities(data: Employee[]): EmployeeResponse[] {
    return data.map((item) => EmployeeResponse.fromEntity(item));
  }
}
