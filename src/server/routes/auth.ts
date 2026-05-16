import { Router } from "express";

export const authRoutes = (): Router => {
  const app = Router();

  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (username === "bandhan" && password === "rohit") {
      return res.json({ success: true, message: "Login successful" });
    }

    res.status(401).json({ success: false, message: "Invalid username or password. Please try again." });
  });
  return app;
};
