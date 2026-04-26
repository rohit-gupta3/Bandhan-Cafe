import { Router } from "express";
import { cashflowRoutes } from "./cashflow";
import { employeeRoutes } from "./employee";
import { salaryRoutes } from "./salary";
import { cashflowService } from "../service/Cashflow";

export const apiRouter = (): Router => {
  const router = Router();

  router.get("/dashboard/stats", async (req, res) => {
    const { data: cashflow } = await cashflowService.getAllCashFlow();
    if (!cashflow) {
      return res.json({
        totalRevenue: 0,
        totalExpenses: 0,
      });
    }
    const totalRevenue = cashflow
      .filter((item) => item.type === "revenue")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = cashflow
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    res.json({
      totalRevenue,
      totalExpenses,
    });
  });

  router.use("/salaries", salaryRoutes());
  router.use("/cashflow", cashflowRoutes());
  router.use("/employees", employeeRoutes());

  return router;
};
