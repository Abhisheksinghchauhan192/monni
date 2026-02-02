import express from "express";
import errorHandler from "./middlewares/error.middleware.js";
import routes from "./routes.js";

const app = express();
app.use(express.json());

app.get("/health",(req,res)=>{
res.json({status:"OK",app:"MoNNi"});
})

// application routes 
app.use("/api",routes);

// global error handler 
app.use(errorHandler);

export default app;