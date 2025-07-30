export interface SalaryRecord {
  email: string;
  salaryMonth: string;
  salaryAmount: number;
  netSalary: number;
  advances?: number;
  description?: string;
  dateReceived: string;
  status: string;
}