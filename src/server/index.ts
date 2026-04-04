import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";

export function createAndConfigureApp(): { app: express.Express } {
  const app = express();

  // Security middleware
  app.use(helmet());
  app.use(cors());

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "OK", message: "Bandhan Cafe API is running" });
  });

  app.get("/api/cafe/menu", (req, res) => {
    // Sample menu data - replace with your actual data
    const menu = {
      items: [
        { id: 1, name: "Coffee", price: 3.5, category: "beverages" },
        { id: 2, name: "Tea", price: 2.5, category: "beverages" },
        { id: 3, name: "Sandwich", price: 7.0, category: "food" },
      ],
    };
    res.json(menu);
  });

  // Serve static files from public directory (built React app)
  const publicPath = path.join(process.cwd(), "public");
  app.use(express.static(publicPath));

  // Handle React Router - send all non-API requests to React app
  app.get("*", (req, res) => {
    // Skip API routes
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    res.sendFile(path.join(publicPath, "index.html"));
  });

  return { app };
}
