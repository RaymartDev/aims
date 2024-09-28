import { Employee } from '@prisma/client';
import prisma from '../../lib/prisma';
import { activeStatus } from '../../lib';

export async function insertEmployee(employee: any): Promise<Employee | null> {
  try {
    const createEmployee = await prisma.employee.create({
      data: {
        ...employee,
      },
    });
    return createEmployee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateEmployee(employee: any, id: number): Promise<Employee | null> {
  try {
    const createEmployee = await prisma.employee.update({
      data: {
        ...employee,
      },
      where: { id },
    });
    return createEmployee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateEmployeeAndUser(employee: any, id: number): Promise<Employee | null> {
  try {
    const createEmployee = await prisma.employee.update({
      data: {
        ...employee,
      },
      where: { id },
    });

    const user = await prisma.user.findFirst({
      where: {
        employee_id: id,
      },
    });
    if (user) {
      await prisma.user.update({
        data: {
          ...employee,
        },
        where: {
          id: user.id,
        },
      });
    }
    return createEmployee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findEmployeeById(id: number): Promise<Employee | null> {
  try {
    const employee = await prisma.employee.findFirst({
      where: { id },
    });
    return employee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function deleteEmployeeById(id: number): Promise<Employee | null> {
  return updateEmployeeAndUser({ deleted: true }, id);
}

export async function findEmployeeByEmployeeNo(employee_no: string): Promise<Employee | null> {
  try {
    const employee = await prisma.employee.findFirst({
      where: { employee_no },
    });
    return employee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateEmployeeRegistration(status: boolean, id: number): Promise<Employee | null> {
  try {
    const updatedEmployee = await prisma.employee.update({
      data: {
        registered: status,
      },
      where: { id },
    });
    return updatedEmployee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchEmployeeByEmployeeNoOrName(employee: string = '**--**'): Promise<Employee[]> {
  try {
    const employees: Employee[] = await prisma.$queryRaw`
      SELECT * FROM \`Employee\`
      WHERE \`employee_no\` LIKE ${employee + '%'}
      OR CONCAT(\`first_name\`, ' ', \`last_name\`) LIKE ${'%' + employee + '%'}
      ORDER BY \`employee_no\`
      LIMIT 10
    `;
    return employees;
  } catch (error) {
    throw new Error('Database error');
  }
}

interface EmployeeType {
  id: number;
  first_name: string;
  last_name: string;
  division: string;
  employee_no: string;
  department_name: string;
  cost_center_code: string;
  company_name: string;
  date_hired: Date;
  registered_status: boolean;
}


export async function listEmployees(page: number, limit: number): Promise<{ employeesFinal: EmployeeType[], totalPages: number }> {
  try {
    // Get total count for pagination
    const totalEmployees = await prisma.employee.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalEmployees / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const employees = await prisma.employee.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        employee_no: 'asc',
      },
      include: {
        department: {
          select: {
            name: true,
          },
        },
        company: {
          select: {
            name: true,
          },
        },
      },
      where: {
        deleted: false,
      },
    });

    if (employees && employees.length > 0) {
      const employeesFinal: EmployeeType[] = employees.map((employee) => ({
        id: employee.id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        division: employee.division,
        cost_center_code: employee.cost_center_code,
        employee_no: employee.employee_no,
        department_name: employee.department?.name,
        company_name: employee.company?.name,
        date_hired: employee.date_hired,
        registered_status: employee.registered,
        active_status: activeStatus(employee),
      }));
      
      return { employeesFinal, totalPages };
    }
    return { employeesFinal: [], totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}