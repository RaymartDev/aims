import { PrismaClient, Employee } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

enum Role {
  AdminRole = 1,
  EmployeeRole = 2,
}

export const findEmployeeByUser = async (username: string): Promise<Employee | null> => {
  return prisma.employee.findFirst({ where: { username } });
};

export const countAllEmployees = async (): Promise<number> => {
  const count = await prisma.employee.count();
  return count;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const createInitialAdmin = async (): Promise<Employee> => {
  const passwordHash = await bcrypt.hash('admin', 10);
  return prisma.employee.create({
    data: {
      username: 'admin',
      password: passwordHash,
      role_id: Role.AdminRole,
      first_name: 'Admin', // Add default values for missing fields
      last_name: 'Admin',
      employee_no: 'ADMIN001',
      department_id: 1, // Replace with actual department ID
      cost_code: 'ADMIN_COST',
      company_id: 1, // Replace with actual company ID
      date_hired: new Date(),
    },
  });
};
