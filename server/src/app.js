import express from "express";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());

app.get("/health",(req,res)=>{
res.json({status:"OK",app:"MoNNi"});
})

app.use(errorHandler);

export default app;