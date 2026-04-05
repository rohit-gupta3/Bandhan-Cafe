import { Router } from "express";

export let salaries = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "John Doe",
    baseSalary: 45000,
    bonus: 2000,
    deductions: 500,
    netSalary: 46500,
    paymentDate: "2024-04-01",
    status: "paid",
    month: "April 2024",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Jane Smith",
    baseSalary: 32000,
    bonus: 500,
    deductions: 200,
    netSalary: 32300,
    paymentDate: "2024-04-01",
    status: "paid",
    month: "April 2024",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Mike Johnson",
    baseSalary: 28000,
    bonus: 0,
    deductions: 150,
    netSalary: 27850,
    paymentDate: null,
    status: "pending",
    month: "April 2024",
  },
];

export const salaryRoutes = (): Router => {
  const app = Router();

  app.get("/", (req, res) => {
    res.json({ salaries });
  });

  app.post("/", (req, res) => {
    const newSalary = {
      id: salaries.length + 1,
      ...req.body,
      netSalary:
        req.body.baseSalary +
        (req.body.bonus || 0) -
        (req.body.deductions || 0),
    };
    salaries.push(newSalary);
    res.json({ salary: newSalary });
  });

  app.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const salaryIndex = salaries.findIndex((sal) => sal.id === id);
    if (salaryIndex === -1) {
      return res.status(404).json({ error: "Salary record not found" });
    }
    const updatedSalary = {
      ...salaries[salaryIndex],
      ...req.body,
      netSalary:
        req.body.baseSalary +
        (req.body.bonus || 0) -
        (req.body.deductions || 0),
    };
    salaries[salaryIndex] = updatedSalary;
    res.json({ salary: updatedSalary });
  });

  app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const salaryIndex = salaries.findIndex((sal) => sal.id === id);
    if (salaryIndex === -1) {
      return res.status(404).json({ error: "Salary record not found" });
    }
    salaries.splice(salaryIndex, 1);
    res.json({ message: "Salary record deleted successfully" });
  });

  return app;
};
