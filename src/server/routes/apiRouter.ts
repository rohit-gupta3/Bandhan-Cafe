import { Router } from "express";
import { cashflowRoutes } from "./cashflow";
import { employeeRoutes } from "./employee";
import { salaryRoutes } from "./salary";
import menuRouter from "./menu";
import { cashflowService } from "../service/Cashflow";
import { DashboardStats } from "../../types";

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
    let totalRevenue = 0;
    let totalExpenses = 0;
    let totalBeverageExpenses = 0;
    let totalPayout = 0;
    let totalRoomRevenue = 0;
    for (const item of cashflow) {
      if (item.type === "revenue") {
        if(item.category === "Room"){
          totalRoomRevenue += item.amount;
        }
        totalRevenue += item.amount;
      } else if (item.type === "expense") {
        totalExpenses += item.amount;
        if (item.category === "Beverages") {
          totalBeverageExpenses += item.amount;
        }
        if(item.category === "payout_to_owner"){
          totalPayout += item.amount;
        }
      }
    }
    
    res.json({
      totalRevenue,
      totalExpenses,
      totalBeverageExpenses,
      totalPayout,
      totalRoomRevenue
    } as DashboardStats);
  });

  router.use("/salaries", salaryRoutes());
  router.use("/cashflow", cashflowRoutes());
  router.use("/employees", employeeRoutes());
  router.use("/menu", menuRouter);

  return router;
};
