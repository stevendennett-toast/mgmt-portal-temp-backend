import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import shiftRoutes from "./routes/shiftRoutes";
import schedulesRoutes from "./routes/schedulesRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add routes
app.use("/v1/mgmt/shift", shiftRoutes);
app.use("/v1/mgmt/schedules", schedulesRoutes);
app.use("/v1/mgmt/schedule", scheduleRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
