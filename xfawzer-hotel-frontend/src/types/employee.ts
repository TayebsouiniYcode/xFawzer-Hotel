export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    department: Department;
    hireDate: string;
    status: EmployeeStatus;
    profileImage: string;
    address?: string;
    birthDate?: string;
    nationality?: string;
    manager?: string;
    notes?: string;
  }
  
  export type Department = 'reception' | 'housekeeping' | 'restaurant' | 'management' | 'maintenance' | 'security';
  
  export type Role = 'manager' | 'receptionist' | 'housekeeper' | 'chef' | 'waiter' | 'technician' | 'security';
  
  export type EmployeeStatus = 'active' | 'on-leave' | 'inactive';
  
  export interface EmployeeStats {
    total: number;
    active: number;
    onLeave: number;
    inactive: number;
  }
  
  export interface EmployeeFilters {
    department?: Department;
    role?: Role;
    status?: EmployeeStatus;
    search?: string;
  }
  
  export interface EmergencyContact {
    name: string;
    relation: string;
    phone: string;
  }
  
  export interface EmployeeSkills {
    education: string;
    languages: string;
    certifications: string;
  }
  
  export interface EmployeeFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    department: Department;
    hireDate: string;
    status: EmployeeStatus;
    address?: string;
    birthDate?: string;
    nationality?: string;
    manager?: string;
    notes?: string;
  }