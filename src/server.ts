import express, { Application } from "express";
import membershipRoutes from "./routes/membership.routes";
import informationRoutes from "./routes/information.routes";
import transactionRoutes from "./routes/transaction.routes";
import ErrorMiddleware from "./middlewares/error.middleware";

const app: Application = express();

// app.use(
//   cors({
//     origin: BASE_WEB_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(express.json());

app.use("/", membershipRoutes);
app.use("/", informationRoutes);
app.use("/", transactionRoutes);

app.use(ErrorMiddleware);

export default app;
