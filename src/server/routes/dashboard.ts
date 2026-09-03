import { Router } from "express";
import { cashflowService } from "../service/Cashflow";
import { DashboardStats } from "../../types";

export const dashboardRoutes = (): Router => {
  const app = Router();

  app.get("/stats", async (req, res) => {
    const yearParam = String(req.query.year ?? "all");
    const monthParam = String(req.query.month ?? "all");

    let cashflowResult;

    if (yearParam !== "all" && monthParam !== "all") {
      cashflowResult = await cashflowService.getCashFlowByYearAndMonth(
        yearParam,
        monthParam,
      );
    } else if (yearParam !== "all") {
      cashflowResult = await cashflowService.getCashFlowByYear(yearParam);
    } else {
      cashflowResult = await cashflowService.getAllCashFlow();
    }

    const { data: cashflow } = cashflowResult;
    if (!cashflow) {
      return res.json({
        totalRevenue: 0,
        totalExpenses: 0,
      });
    }
    let totalRevenue = 0;
    let totalExpenses = 0;
    let totalBeverageExpenses = 0;
    let totalPayout = 0;
    let totalRoomRevenue = 0;
    for (const item of cashflow) {
      if (item.type === "revenue") {
        if (item.category === "Room") {
          totalRoomRevenue += item.amount;
        }
        totalRevenue += item.amount;
      } else if (item.type === "expense") {
        totalExpenses += item.amount;
        if (item.category === "Beverages") {
          totalBeverageExpenses += item.amount;
        }
        if (item.category === "payout_to_owner") {
          totalPayout += item.amount;
        }
      }
    }

    res.json({
      totalRevenue,
      totalExpenses,
      totalBeverageExpenses,
      totalPayout,
      totalRoomRevenue,
    } as DashboardStats);
  });
  return app;
};
