import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import routes from "./routes.js";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173"],
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

// global error handler
app.use(errorHandler);

export default app;
