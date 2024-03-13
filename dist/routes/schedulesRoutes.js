"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataStore_1 = require("../dataStore");
// Create a router for schedule
const router = express_1.default.Router();
// Define your CRUD operations
// GET request for listing schedules
router.get("/", (req, res) => {
    return res.send({
        message: "",
        results: [dataStore_1.schedulesState],
        errorCodes: [],
    });
});
exports.default = router;
