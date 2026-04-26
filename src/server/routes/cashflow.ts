import express, { type Router } from "express";
import { cashflowService } from "../service/Cashflow";

export const cashflowRoutes = (): Router => {
  const app = express.Router();

  app.get("/", async (req, res) => {
    try {
      const { data, error } = await cashflowService.getAllCashFlow();
      if (error) {
        console.error("Supabase error:", error);
        return res.json({ error });
      }

      res.json({ cashflow: data });
    } catch (err) {
      console.error("Error fetching cashflow:", err);
      res.json({ error: err });
    }
  });

  app.post("/", async (req, res) => {
    try {
      const { data, error } = await cashflowService.insertCashFlowEntry(
        req.body,
      );
      if (error) {
        console.error("Supabase error:", error);
        return res.json({ error });
      }
      res.json({ entry: data });
    } catch (err) {
      console.error("Error inserting cashflow entry:", err);
      res.json({ error: err });
    }
  });

  app.put("/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { data, error } = await cashflowService.updateCashFlowEntry(
        id,
        req.body,
      );
      if (error) {
        console.error("Supabase error:", error);
        return res.json({ error });
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
      const { error } = await cashflowService.deleteCashFlowEntry(id);
      if (error) {
        console.error("Supabase error:", error);
        return res.json({ error });
      }
      res.json({ message: "Cashflow entry deleted successfully" });
    } catch (err) {
      console.error("Error deleting cashflow entry:", err);
      res.json({ error: err });
    }
  });

  return app;
};
