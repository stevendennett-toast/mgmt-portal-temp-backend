"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftsState = exports.schedulesState = void 0;
const mockSchedulesData_1 = require("./MgmtSchedule/mockSchedulesData");
const mockShiftsData_1 = require("./MgmtShift/mockShiftsData");
exports.schedulesState = [...mockSchedulesData_1.mockSchedulesData];
exports.shiftsState = Object.assign({}, mockShiftsData_1.mockShiftsData);
