import { Router } from "express";
import { cashflowService } from "../service/Cashflow";
import { DashboardStats } from "../../types";

const normalizeValue = (value?: string | null): string =>
  String(value ?? "")
    .trim()
    .toLowerCase();

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
        totalBeverageExpenses: 0,
        totalHookahRevenue: 0,
        totalHookahExpense: 0,
        totalPayout: 0,
        totalRoomRevenue: 0,
        netProfit: 0,
      } satisfies DashboardStats);
    }

    let totalRevenue = 0;
    let totalExpenses = 0;
    let totalBeverageExpenses = 0;
    let totalHookahRevenue = 0;
    let totalHookahExpense = 0;
    let totalPayout = 0;
    let totalRoomRevenue = 0;

    for (const item of cashflow) {
      const itemType = normalizeValue(item.type);
      const itemCategory = normalizeValue(item.category);

      if (itemType === "revenue") {
        totalRevenue += Number(item.amount || 0);

        if (itemCategory === "room") {
          totalRoomRevenue += Number(item.amount || 0);
        }

        if (itemCategory === "hookah") {
          totalHookahRevenue += Number(item.amount || 0);
        }
      } else if (itemType === "expense") {
        const amount = Number(item.amount || 0);
        totalExpenses += amount;

        if (itemCategory === "beverage") {
          totalBeverageExpenses += amount;
        }

        if (itemCategory === "hookah") {
          totalHookahExpense += amount;
        }

        if (itemCategory === "payout_to_owner") {
          totalPayout += amount;
        }
      }
    }

    const netProfit = totalRevenue - totalExpenses;

    res.json({
      totalRevenue,
      totalExpenses,
      totalBeverageExpenses,
      totalHookahRevenue,
      totalHookahExpense,
      totalPayout,
      totalRoomRevenue,
      netProfit,
    } as DashboardStats);
  });

  return app;
};
