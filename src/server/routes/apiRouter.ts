import { Router } from "express";
import { cashflowRoutes } from "./cashflow";
import { dashboardRoutes } from "./dashboard";
import { employeeRoutes } from "./employee";
import { salaryRoutes } from "./salary";
import menuRouter from "./menu";

export const apiRouter = (): Router => {
  const router = Router();

  router.use("/dashboard", dashboardRoutes());
  router.use("/salaries", salaryRoutes());
  router.use("/cashflow", cashflowRoutes());
  router.use("/employees", employeeRoutes());
  router.use("/menu", menuRouter);

  return router;
};
