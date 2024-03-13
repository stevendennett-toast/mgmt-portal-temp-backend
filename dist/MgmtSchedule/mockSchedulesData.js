"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockSchedulesData = void 0;
const mockShiftsData_1 = require("../MgmtShift/mockShiftsData");
exports.mockSchedulesData = [
    {
        activeDates: ["2024-03-12", "2024-03-13"],
        default: true,
        enabled: true,
        memo: "This is the default schedule",
        guid: "default-123",
        name: "Default",
        shifts: [
            {
                guid: mockShiftsData_1.mockDefaultBreakfastShift.guid,
                name: mockShiftsData_1.mockDefaultBreakfastShift.name,
            },
        ],
    },
    {
        activeDates: ["2024-03-11", "2024-03-16", "2024-03-17"],
        default: false,
        enabled: true,
        memo: "This is the today schedule",
        guid: "today-123",
        name: "Today",
        shifts: [
            {
                guid: mockShiftsData_1.mockTodayBreakfastShift.guid,
                name: mockShiftsData_1.mockTodayBreakfastShift.name,
            },
        ],
    },
    {
        activeDates: ["2024-03-11", "2024-03-13"],
        default: false,
        enabled: true,
        memo: "This is the yesterday schedule",
        guid: "yesterday-123",
        name: "Yesterday",
        shifts: [
            {
                guid: mockShiftsData_1.mockYesterdayBreakfastShift.guid,
                name: mockShiftsData_1.mockYesterdayBreakfastShift.name,
            },
        ],
    },
];
