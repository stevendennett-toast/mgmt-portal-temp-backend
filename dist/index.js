"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const shiftRoutes_1 = __importDefault(require("./routes/shiftRoutes"));
const schedulesRoutes_1 = __importDefault(require("./routes/schedulesRoutes"));
const scheduleRoutes_1 = __importDefault(require("./routes/scheduleRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
// Middleware to parse JSON and URL-encoded data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// add routes
app.use("/v1/mgmt/shift", shiftRoutes_1.default);
app.use("/v1/mgmt/schedules", schedulesRoutes_1.default);
app.use("/v1/mgmt/schedule", scheduleRoutes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
