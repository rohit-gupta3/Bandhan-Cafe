import { supabaseClient } from "../infra/supabase";
import { MenuItem } from "../../types";

export class MenuService {
  public async getAllMenus() {
    return await supabaseClient.from("Menu").select("*");
  }

  public async insertMenuEntry(entry: Omit<MenuItem, "id">) {
    return await supabaseClient.from("Menu").insert(entry).select("*").single();
  }

  public async updateMenuEntry(id: number, updatedEntry: Partial<MenuItem>) {
    return await supabaseClient
      .from("Menu")
      .update(updatedEntry)
      .eq("id", id)
      .select("*")
      .single();
  }

  public async deleteMenuEntry(id: number) {
    return await supabaseClient.from("Menu").delete().eq("id", id);
  }
}

export const menuService = new MenuService();
