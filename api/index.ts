import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers.ts";
import { createContext } from "../server/_core/context.ts";
import { registerOAuthRoutes } from "../server/_core/oauth.ts";
import { registerMicrosoftOAuthRoutes } from "../server/microsoftOAuth.ts";
import { registerStorageProxy } from "../server/_core/storageProxy.ts";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerStorageProxy(app);
registerOAuthRoutes(app);
registerMicrosoftOAuthRoutes(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "imcan-api" });
});

export default app;
