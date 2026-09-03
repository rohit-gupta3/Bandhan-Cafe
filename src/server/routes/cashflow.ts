import express, { type Router } from "express";
import { cashflowService } from "../service/Cashflow";
import { adminKeyService } from "../service/AdminKey";

export const cashflowRoutes = (): Router => {
  const app = express.Router();

  app.get("/", async (_req, res) => {
    try {
      const { data, error } = await cashflowService.getAllCashFlow();
      if (error) {
        console.error("Supabase error:", error);
        return res.json({ error });
      }

      const entries = Array.isArray(data) ? data : [];
      // sort by date descending (newest first)
      entries.sort((a: any, b: any) => {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        return db - da;
      });

      res.json({ cashflow: entries });
    } catch (err) {
      console.error("Error fetching cashflow:", err);
      res.json({ error: err });
    }
  });

  app.post("/", async (req, res) => {
    try {
      console.log("Received cashflow entry:", req.body);
      const entry = req.body as any;

      const { data, error } = await cashflowService.insertCashFlowEntry(entry);
      if (error) {
        console.error("Supabase error:", error);
        return res.status(502).json({ error: "Failed to insert entry" });
      }
      res.status(201).json({ entry: data });
    } catch (err) {
      console.error("Error inserting cashflow entry:", err);
      res.json({ error: err });
    }
  });

  app.put("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { pin, ...updated } = req.body as any;
      if (!pin) {
        return res.status(400).json({ error: "pin required" });
      }

      const {
        valid,
        name,
        error: keyErr,
      } = await adminKeyService.verifyPin(+pin);
      if (keyErr || !valid) {
        console.error("AdminKey verification failed:", keyErr);
        return res.status(401).json({ error: "Invalid admin pin" });
      }

      const { data, error } = await cashflowService.updateCashFlowEntry(id, {
        ...updated,
        updated_by: name,
      });
      if (error) {
        console.error("Supabase error:", error);
        return res.status(502).json({ error: "Failed to update entry" });
      }
      res.json({ entry: data });
    } catch (err) {
      console.error("Error updating cashflow entry:", err);
      res.json({ error: err });
    }
  });

  app.delete("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { pin } = req.body as any;
      if (!pin) {
        return res.status(400).json({ error: "pin required" });
      }

      const { valid, error: keyErr } = await adminKeyService.verifyPin(pin);
      if (keyErr || !valid) {
        console.error("AdminKey verification failed:", keyErr);
        return res.status(401).json({ error: "Invalid admin pin" });
      }

      const { error } = await cashflowService.deleteCashFlowEntry(id);
      if (error) {
        console.error("Supabase error:", error);
        return res.status(502).json({ error: "Failed to delete entry" });
      }
      res.json({ message: "Cashflow entry deleted successfully" });
    } catch (err) {
      console.error("Error deleting cashflow entry:", err);
      res.json({ error: err });
    }
  });

  return app;
};
