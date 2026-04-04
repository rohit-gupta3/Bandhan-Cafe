import "dotenv/config";
import express from "express";
import path from "path";
import { createAndConfigureApp } from "./server/index";

const PORT = process.env.PORT || 9000;

const { app } = createAndConfigureApp();

const server = app
  .listen(PORT, () => {
    const address = server.address();
    const listenPort =
      typeof address === "object" && address ? address.port : PORT;
    console.log(
      `🚀 Bandhan Cafe server running on http://localhost:${listenPort}`,
    );
    console.log(`📱 Frontend proxied via: http://localhost:8080`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || "development"}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${PORT} is in use, trying a random available port...`);
      app.listen(0, () => {
        const address = (app as any).address();
        const runtimePort =
          typeof address === "object" && address ? address.port : "unknown";
        console.log(
          `🚀 Bandhan Cafe server running on http://localhost:${runtimePort}`,
        );
      });
    } else {
      console.error(err);
      process.exit(1);
    }
  });

process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
