import { mockComboTablesData } from "./MgmtComboTable/mockComboTablesData";
import { mockSchedulesData } from "./MgmtSchedule/mockSchedulesData";
import { mockShiftsData } from "./MgmtShift/mockShiftsData";

export const schedulesState = [...mockSchedulesData];
export const shiftsState = { ...mockShiftsData };
export const comboTablesState = [...mockComboTablesData];
