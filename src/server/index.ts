import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import { apiRouter } from "./routes/apiRouter";

export function createAndConfigureApp(): { app: express.Express } {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/admin", apiRouter());

  const publicPath = path.join(process.cwd(), "public");
  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    res.sendFile(path.join(publicPath, "index.html"));
  });

  return { app };
}
