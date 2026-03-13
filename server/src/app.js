import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import routes from "./routes.js";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { cleanupExpiredRegistrations } from "./services/cleanup.service.js";

const app = express();
app.use(helmet());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: ["http://localhost:5173","https://monni-one.vercel.app","https://www.monni.tech","https://monni.tech"],
    methods: ["PUT", "GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.get("/health", (req, res) => {
  res.json({ status: "OK", app: "MoNNi" });
});

// application routes
app.use("/api", routes);

// Cleanup Task of Pending registrations.
// Clean Every 12 Hours
setInterval(cleanupExpiredRegistrations,12*60*60*1000)

// global error handler
app.use(errorHandler);

export default app;
