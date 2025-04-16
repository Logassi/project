import express, { Application } from "express";
import membershipRoutes from "./routes/membership.routes";

const app: Application = express();

// app.use(
//   cors({
//     origin: BASE_WEB_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(express.json());

app.use("/", membershipRoutes);
// app.use("/", informationRoutes);
// app.use("/", transactionRoutes);
// app.use("/module-membership", membershipRoutes)
// app.use("/module-information", informationRoutes)

export default app;
