export type EmployeeStatus = 'active' | 'inactive' | 'on_leave';
export type Department = 'Engineering' | 'HR' | 'Finance' | 'Marketing' | 'Sales' | 'Operations';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: Department;
  position: string;
  joinDate: string;
  status: EmployeeStatus;
  imageUrl?: string;
  managerId?: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: 'annual' | 'sick' | 'personal' | 'unpaid';
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}