import { CashflowItem } from "../../types";
import { supabaseClient } from "../infra/supabase";

export class CashflowService {
  public async getAllCashFlow() {
    return await supabaseClient.from("Cashflow").select("*");
  }

  public async insertCashFlowEntry(entry: Omit<CashflowItem, "id">) {
    return  await supabaseClient
      .from("Cashflow")
      .insert(entry)
      .select("*")
      .single();
  }

    public async updateCashFlowEntry(id: number, updatedEntry: Partial<CashflowItem>) {
    return await supabaseClient
      .from("Cashflow")
      .update(updatedEntry)
      .eq("id", id)
      .select("*")
      .single();
  }

  public async deleteCashFlowEntry(id: number) {
    return await supabaseClient
      .from("Cashflow")
      .delete()
      .eq("id", id);
  }
}

export const cashflowService = new CashflowService();
