import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const dateStringSchema = () =>
  z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format. Use YYYY-MM-DD',
  });

const baseEmployeeSchema = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  mobilePhone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile phone number'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .optional(),
  placeOfBirth: z.string().optional(),
  birthdate: dateStringSchema(),
  gender: z.enum(['Male', 'Female']),
  maritalStatus: z.string().optional(),
  bloodType: z.string().optional(),
  religion: z.string().optional(),
  nik: z.string().length(16, 'NIK must be 16 characters long'),
  passportNumber: z.string().optional(),
  passportExpiry: dateStringSchema().optional(),
  postalCode: z.string().optional(),
  citizenIdAddress: z.string().optional(),
  residentialAddress: z.string().optional(),
  employeeId: z.string().min(1, 'Employee ID is required'),
  barcode: z.string().optional(),
  groupStructure: z.string().min(1, 'Group structure is required'),
  employmentStatus: z.string().min(1, 'Employment status is required'),
  joinDate: dateStringSchema(),
  branch: z.string().min(1, 'Branch is required'),
  department: z.string().min(1, 'Department is required'),
  jobPosition: z.string().min(1, 'Job position is required'),
  jobLevel: z.string().min(1, 'Job level is required'),
  grade: z.string().min(1, 'Grade is required'),
  class: z.string().min(1, 'Class is required'),
  schedule: z.string().min(1, 'Schedule is required'),
  approvalLine: z.string().min(1, 'Approval line is required'),
  manager: z.string().optional(),
  sbu: z.string().min(1, 'SBU is required'),
});

export class EmployeeCreateRequest extends createZodDto(baseEmployeeSchema) {}
export class EmployeeUpdateRequest extends createZodDto(baseEmployeeSchema) {}
