import { CashflowItem } from "../../types";
import { supabaseClient } from "../infra/supabase";

export class CashflowService {
  public async getAllCashFlow() {
    return await supabaseClient.from("Cashflow").select("*");
  }

  public async getCashFlowByYear(year: string) {
    const yearNum = Number(year);
    if (!yearNum || Number.isNaN(yearNum)) {
      return this.getAllCashFlow();
    }

    const startDate = `${yearNum}-01-01`;
    const endDate = `${yearNum}-12-31`;

    return await supabaseClient
      .from("Cashflow")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate);
  }

  public async getCashFlowByYearAndMonth(year: string, month: string) {
    const yearNum = Number(year);
    const monthNum = Number(month);

    if (
      !yearNum ||
      Number.isNaN(yearNum) ||
      !monthNum ||
      Number.isNaN(monthNum)
    ) {
      return this.getCashFlowByYear(year);
    }

    const startDate = new Date(yearNum, monthNum - 1, 1)
      .toISOString()
      .split("T")[0];

    const endDate = new Date(yearNum, monthNum, 0).toISOString().split("T")[0];

    return await supabaseClient
      .from("Cashflow")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate);
  }

  public async insertCashFlowEntry(entry: Omit<CashflowItem, "id">) {
    return await supabaseClient
      .from("Cashflow")
      .insert(entry)
      .select("*")
      .single();
  }

  public async updateCashFlowEntry(
    id: number,
    updatedEntry: Partial<CashflowItem>,
  ) {
    return await supabaseClient
      .from("Cashflow")
      .update(updatedEntry)
      .eq("id", id)
      .select("*")
      .single();
  }

  public async deleteCashFlowEntry(id: number) {
    return await supabaseClient.from("Cashflow").delete().eq("id", id);
  }
}

export const cashflowService = new CashflowService();
