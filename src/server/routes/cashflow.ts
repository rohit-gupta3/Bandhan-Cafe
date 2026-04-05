import express, { type Router } from "express";

export let cashflow = [
  {
    id: 1,
    type: "revenue",
    category: "Food Sales",
    amount: 2500,
    description: "Daily food sales",
    date: "2024-04-01",
    paymentMethod: "cash",
  },
  {
    id: 2,
    type: "revenue",
    category: "Beverage Sales",
    amount: 1800,
    description: "Coffee and tea sales",
    date: "2024-04-01",
    paymentMethod: "card",
  },
  {
    id: 3,
    type: "expense",
    category: "Ingredients",
    amount: 800,
    description: "Food and beverage supplies",
    date: "2024-04-01",
    paymentMethod: "card",
  },
  {
    id: 4,
    type: "expense",
    category: "Utilities",
    amount: 450,
    description: "Electricity and water bills",
    date: "2024-04-01",
    paymentMethod: "bank_transfer",
  },
  {
    id: 5,
    type: "expense",
    category: "Rent",
    amount: 2000,
    description: "Monthly rent payment",
    date: "2024-04-01",
    paymentMethod: "bank_transfer",
  },
];

export const cashflowRoutes = (): Router => {
  const app = express.Router();

  app.get("/", (req, res) => {
    res.json({ cashflow });
  });

  app.post("/", (req, res) => {
    const newEntry = {
      id: cashflow.length + 1,
      ...req.body,
    };
    cashflow.push(newEntry);
    res.json({ entry: newEntry });
  });

  app.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const entryIndex = cashflow.findIndex((entry) => entry.id === id);
    if (entryIndex === -1) {
      return res.status(404).json({ error: "Cashflow entry not found" });
    }
    cashflow[entryIndex] = { ...cashflow[entryIndex], ...req.body };
    res.json({ entry: cashflow[entryIndex] });
  });

  app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const entryIndex = cashflow.findIndex((entry) => entry.id === id);
    if (entryIndex === -1) {
      return res.status(404).json({ error: "Cashflow entry not found" });
    }
    cashflow.splice(entryIndex, 1);
    res.json({ message: "Cashflow entry deleted successfully" });
  });

  return app;
};
