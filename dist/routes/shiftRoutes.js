"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataStore_1 = require("../dataStore");
// Create a router for shift
const router = express_1.default.Router();
// Get a shift
router.get("/:shiftGuid", (req, res) => {
    const { shiftGuid } = req.params;
    const shift = dataStore_1.shiftsState[shiftGuid];
    if (!shift) {
        return res.status(404).send({
            message: "Shift not found",
            results: [],
            errorCodes: [],
        });
    }
    return res.send({
        message: "",
        results: [shift],
        errorCodes: [],
    });
});
exports.default = router;
