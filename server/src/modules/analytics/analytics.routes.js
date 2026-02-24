import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { validateQuery } from "../../validators/validate.js";
import { dashboard } from "./analytics.controller.js";
import { dashboardQuerySchema } from "../../validators/analytics/analytics.query.shema.js";
const router = Router();

/*
GET /api/analytics/dashboard?from=YYYY-MM-DD&to=YYYY-MM-DD&by=category
*/

router.get(
  "/dashboard",
  authMiddleware,
  validateQuery(dashboardQuerySchema),
  dashboard,
);

export default router;
