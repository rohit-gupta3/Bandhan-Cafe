import { Router } from "express";
import { supabaseClient } from "../infra/supabase";

const EMPLOYEES_TABLE = "Employees";
export const employeeRoutes = (): Router => {
  const app = Router();

  // GET / - list employees
  app.get("/", async (_req, res) => {
    try {
      const { data, error } = await supabaseClient.from(EMPLOYEES_TABLE).select("*");
      if (error) {
        console.error("Supabase error (GET /employees):", error);
        return res
          .status(502)
          .json({ success: false, error: "Failed to fetch employees" });
      }

      return res.json({ success: true, data: data ?? [] });
    } catch (err) {
      console.error("Error fetching employees:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  });

  // POST / - create employee
  app.post("/", async (req, res) => {
    try {
      const payload = { ...req.body, status: req.body.status ?? "active" };
      const { data, error } = await supabaseClient
        .from(EMPLOYEES_TABLE)
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.error("Supabase error (POST /employees):", error);
        return res
          .status(502)
          .json({ success: false, error: "Failed to create employee" });
      }

      return res.status(201).json({ success: true, data });
    } catch (err) {
      console.error("Error creating employee:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  });

  // PUT /:id - update employee
  app.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid id" });
    }

    try {
      const { data: existing, error: fetchErr } = await supabaseClient
        .from(EMPLOYEES_TABLE)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchErr || !existing) {
        return res
          .status(404)
          .json({ success: false, error: "Employee not found" });
      }

      const { data, error } = await supabaseClient
        .from(EMPLOYEES_TABLE)
        .update(req.body)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Supabase error (PUT /employees/:id):", error);
        return res
          .status(502)
          .json({ success: false, error: "Failed to update employee" });
      }

      return res.json({ success: true, data });
    } catch (err) {
      console.error("Error updating employee:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  });

  // DELETE /:id - remove employee
  app.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid id" });
    }

    try {
      const { data: existing, error: fetchErr } = await supabaseClient
        .from(EMPLOYEES_TABLE)
        .select("*")
        .eq("id", id)
        .single();

      if (fetchErr || !existing) {
        return res
          .status(404)
          .json({ success: false, error: "Employee not found" });
      }

      const { error } = await supabaseClient
        .from(EMPLOYEES_TABLE)
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Supabase error (DELETE /employees/:id):", error);
        return res
          .status(502)
          .json({ success: false, error: "Failed to delete employee" });
      }

      return res.json({ success: true, message: "Employee deleted" });
    } catch (err) {
      console.error("Error deleting employee:", err);
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  });

  return app;
};
