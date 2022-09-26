import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import recommendationRouter from "./routers/recommendationRouter.js";
import dotenv from "dotenv";
import acssBank from "./routers/acssBankRouter.js";
dotenv.config();
const nodeEnv = process.env.NODE_ENV;
console.log(nodeEnv);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);
app.use(errorHandlerMiddleware);
if (nodeEnv === "test") {
  app.use(acssBank);
} else {
  console.log("else");
}

export default app;
