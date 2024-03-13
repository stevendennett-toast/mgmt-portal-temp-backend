import {
  mockDefaultBreakfastShift,
  mockTodayBreakfastShift,
  mockYesterdayBreakfastShift,
} from "../MgmtShift/mockShiftsData";
import { MgmtSchedule } from "./model";

export const mockSchedulesData: MgmtSchedule[] = [
  {
    datesActive: ["2024-03-12", "2024-03-13"],
    default: true,
    current: true,
    enabled: true,
    memo: "This is the default schedule",
    guid: "default-123",
    name: "Default",
    shifts: [
      {
        guid: mockDefaultBreakfastShift.guid,
        name: mockDefaultBreakfastShift.name,
      },
      {
        guid: mockYesterdayBreakfastShift.guid,
        name: mockYesterdayBreakfastShift.name,
      },
    ],
  },
  {
    datesActive: ["2024-03-11", "2024-03-16", "2024-03-17"],
    default: false,
    current: false,
    enabled: true,
    memo: "This is the today schedule",
    guid: "today-123",
    name: "Today",
    shifts: [
      {
        guid: mockTodayBreakfastShift.guid,
        name: mockTodayBreakfastShift.name,
      },
    ],
  },
  {
    datesActive: ["2024-03-11", "2024-03-13"],
    default: false,
    current: false,
    enabled: true,
    memo: "This is the yesterday schedule",
    guid: "yesterday-123",
    name: "Yesterday",
    shifts: [
      {
        guid: mockYesterdayBreakfastShift.guid,
        name: mockYesterdayBreakfastShift.name,
      },
    ],
  },
];
