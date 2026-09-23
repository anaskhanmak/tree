import { createApp } from "./app.js";
import { ENV } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { db } from "./database/connection.js";

async function startServer() {
  const app = createApp();

  // Test Database Connection
  await db.getPool();

  const server = app.listen(ENV.PORT, () => {
    logger.info("=================================================");
    logger.info(`🌲 TreeMint REST API Server running on port ${ENV.PORT}`);
    logger.info(`🚀 API Base URL: http://localhost:${ENV.PORT}${ENV.API_PREFIX}`);
    logger.info(`🩺 Health Check: http://localhost:${ENV.PORT}/health`);
    logger.info(`🛡️ Engine Mode: ${db.getEngineType()}`);
    logger.info("=================================================");
  });

  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      logger.info("HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

startServer().catch((err) => {
  logger.error("Failed to start TreeMint server:", err);
  process.exit(1);
});
