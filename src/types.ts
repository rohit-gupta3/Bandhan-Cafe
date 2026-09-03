import { CashflowType } from "./contants";

export enum PaymentMethod {
  Cash = "cash",
  Online = "online",
}

export type CashflowItem = {
  id: number;
  type: CashflowType;
  category: string;
  amount: number;
  description: string;
  date: string;
  paymentMethod: PaymentMethod;
  updated_by?: string;
  isDeleted?: boolean;
};

export type MenuItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  full_price: number;
  half_price: number | null;
};

export type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  hire_date: string | Date;
  status: "active" | "inactive";
  address?: string;
  emergency_contact?: string;
};

export type DashboardStats = {
  totalRevenue: number;
  totalExpenses: number;
  totalBeverageExpenses: number;
  totalPayout: number;
  totalRoomRevenue: number;
  netProfit: number;
};