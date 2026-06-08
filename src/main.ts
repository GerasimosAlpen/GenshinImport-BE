import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import weaponRoutes from "./routes/weapon.routes";
import artifactRoutes from "./routes/artifact.routes";
import purchaseRoutes from "./routes/purchase.routes";
import profileRoutes from "./routes/profile.routes";
import adminRoutes from "./routes/admin.routes";
import uploadRoutes from "./routes/upload.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { env } from "./config/env";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for uploaded images
app.use("/uploads", express.static("uploads"));

// Health check
app.get("/health", (_req: express.Request, res: express.Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Domain Routes
app.use("/api/auth", authRoutes);
app.use("/api/weapons", weaponRoutes);
app.use("/api/artifacts", artifactRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

// Centralized error handler — must be last
app.use(errorHandler);

const PORT = env.PORT || 3000;

if (env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
