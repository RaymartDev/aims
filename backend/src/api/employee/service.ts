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
      where: { id, deleted: false },
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
      where: { employee_no, deleted: false },
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


export async function searchEmployeeByEmployeeNoOrName(ref: string = '**--**'): Promise<EmployeeType[]> {
  try {
    const employees: any[] = await prisma.$queryRaw`
      SELECT 
        e.*, 
        d.\`name\` AS department_name,  -- Select specific columns from the Department table
        c.\`name\` AS company_name      -- Select specific columns from the Company table
      FROM \`Employee\` e
      LEFT JOIN \`Department\` d ON e.\`department_id\` = d.\`id\`
      LEFT JOIN \`Company\` c ON e.\`company_id\` = c.\`id\`
      WHERE 
        (e.\`employee_no\` LIKE ${ref + '%'} OR CONCAT(e.\`first_name\`, ' ', e.\`last_name\`) LIKE ${'%' + ref + '%'})
        AND e.\`deleted\` = 0
        AND e.\`effective_from\` <= NOW()  
        AND e.\`effective_to\` >= NOW()  
      ORDER BY e.\`employee_no\`
      LIMIT 10
    `;
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
      return employeesFinal;
    }
    return [];
  } catch (error) {
    throw new Error('Database error');
  }
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