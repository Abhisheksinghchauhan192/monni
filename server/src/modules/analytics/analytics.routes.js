import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { validateQuery } from "../../validators/validate.js";
import {
  dateRangeSchema,
  breakdownSchema,
  trendSchema,
  dashboardSchema,
} from "../../validators/analytics/analytics.query.shema.js";

import {
  summary,
  breakdown,
  trend,
  dashboard,
} from "./analytics.controller.js";

const router = Router();

router.get("/summary", authMiddleware, validateQuery(dateRangeSchema), summary);

router.get(
  "/breakdown",
  authMiddleware,
  validateQuery(breakdownSchema),
  breakdown,
);

router.get("/trend", authMiddleware, validateQuery(trendSchema), trend);

router.get(
  "/dashboard",
  authMiddleware,
  validateQuery(dashboardSchema),
  dashboard,
);

export default router;
