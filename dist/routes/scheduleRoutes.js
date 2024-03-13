"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataStore_1 = require("../dataStore");
const uuid_1 = require("uuid");
// Create a router for schedule
const router = express_1.default.Router();
// Get a schedule
router.get("/:scheduleGuid", (req, res) => {
    const { scheduleGuid } = req.params;
    const schedule = dataStore_1.schedulesState.find((schedule) => schedule.guid === scheduleGuid);
    if (!schedule) {
        return res.status(404).send({
            message: "Schedule not found",
            results: [],
            errorCodes: [],
        });
    }
    return res.send({
        message: "",
        results: [schedule],
        errorCodes: [],
    });
});
// Creating a schedule
router.post("/", (req, res) => {
    const data = req.body;
    // new shift guid
    const scheduleGuid = (0, uuid_1.v4)();
    const scheduleWithGuid = Object.assign(Object.assign({}, data), { guid: scheduleGuid });
    // add schedule
    dataStore_1.schedulesState.push(scheduleWithGuid);
    // add any shifts from schedule
    for (const shift of scheduleWithGuid.shifts) {
        dataStore_1.shiftsState[shift.guid] = scheduleWithGuid;
    }
    return res.status(200);
});
// Duplicating a schedule
router.post("/clone/:scheduleGuid", (req, res) => {
    const { scheduleGuid } = req.params;
    const schedule = dataStore_1.schedulesState.find((schedule) => schedule.guid === scheduleGuid);
    if (!schedule) {
        return res.status(404).send({
            message: "Schedule not found",
            results: [],
            errorCodes: [],
        });
    }
    dataStore_1.schedulesState.push(Object.assign(Object.assign({}, schedule), { name: schedule.name + ` Copy`, guid: (0, uuid_1.v4)() }));
    for (const shift of schedule.shifts) {
        const shiftToDuplicate = dataStore_1.shiftsState[shift.guid];
        const newShiftGuid = (0, uuid_1.v4)();
        dataStore_1.shiftsState[newShiftGuid] = Object.assign(Object.assign({}, shiftToDuplicate), { name: shiftToDuplicate.name + " Copy" });
    }
    return res.status(200);
});
// Updating a schedule
router.patch("/:scheduleGuid", (req, res) => {
    const { scheduleGuid } = req.params;
    const data = req.body;
    const scheduleIndex = dataStore_1.schedulesState.findIndex((schedule) => schedule.guid === scheduleGuid);
    if (scheduleIndex === -1) {
        return res.status(404).send({
            message: "Schedule not found",
            results: [],
            errorCodes: [],
        });
    }
    dataStore_1.schedulesState[scheduleIndex] = data;
    return res.status(200);
});
// Deleting a schedule
router.delete("/:scheduleGuid", (req, res) => {
    const { scheduleGuid } = req.params;
    const scheduleIndex = dataStore_1.schedulesState.findIndex((schedule) => schedule.guid === scheduleGuid);
    if (scheduleIndex === -1) {
        return res.status(404).send({
            message: "Schedule not found",
            results: [],
            errorCodes: [],
        });
    }
    delete dataStore_1.schedulesState[scheduleIndex];
    return res.status(200);
});
exports.default = router;
