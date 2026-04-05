import express, { Router } from "express";
import { cashflow, cashflowRoutes } from "./cashflow";
import { employeeRoutes } from "./employee";
import { salaryRoutes } from "./salary";

export const apiRouter = (): Router => {
  const router = Router();

  router.get("/dashboard/stats", (req, res) => {
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
