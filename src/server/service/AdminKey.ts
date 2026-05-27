import { supabaseClient } from "../infra/supabase";

export class AdminKeyService {
  public async verifyPin(pin: number) {
    const { data, error } = await supabaseClient
      .from("AdminKey")
      .select("name")
      .eq("id", pin)
      .maybeSingle();

    return {
      valid: Boolean(data),
      name: data?.name ?? null,
      error,
    };
  }
}

export const adminKeyService = new AdminKeyService();
