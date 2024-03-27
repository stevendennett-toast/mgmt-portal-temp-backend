import express, { Request, Response } from "express";
import { schedulesState, shiftsState } from "../dataStore";
import { v4 as uuidv4 } from "uuid";
import { MgmtSchedule } from "../MgmtSchedule/model";
import { cloneDeep } from "lodash";

// Create a router for schedule
const router = express.Router();

// Get a schedule
router.get("/:scheduleGuid", (req: Request, res: Response) => {
  const { scheduleGuid } = req.params;

  const schedule = schedulesState.find(
    (schedule) => schedule.guid === scheduleGuid,
  );

  if (!schedule) {
    return res.status(404).send({
      message: "Schedule not found",
      results: [],
      errorCodes: [],
    });
  }

  // get full shift config object and add to schedule
  const shiftGuids = schedule.shifts.map(({ guid }) => guid);

  const updatedShifts = Object.values(shiftsState).filter((shift) =>
    shiftGuids.includes(shift.guid),
  );

  const updatedSchedule = { ...schedule, shifts: updatedShifts };

  return res.send({
    message: "",
    results: [updatedSchedule],
    errorCodes: [],
  });
});

// Creating an empty schedule
router.post("/", (req, res) => {
  const { name } = req.body;

  // new schedule guid
  const scheduleGuid = uuidv4();

  const scheduleWithGuid: MgmtSchedule = {
    name,
    guid: scheduleGuid,
    enabled: false,
    current: false,
    datesActive: null,
    default: false,
    memo: null,
    shifts: [],
  };

  // add schedule
  schedulesState.push(scheduleWithGuid);

  return res.status(200).send({
    message: "",
    results: [{ scheduleGuid }],
    errorCodes: [],
  });
});

// Duplicating a schedule
router.post("/clone/:scheduleGuid", (req, res) => {
  const { scheduleGuid } = req.params;

  const scheduleToDuplicate = schedulesState.find(
    (schedule) => schedule.guid === scheduleGuid,
  );

  if (!scheduleToDuplicate) {
    return res.status(404).send({
      message: "Schedule not found",
      results: [],
      errorCodes: [],
    });
  }

  const duplicatedSchedule = {
    ...cloneDeep(scheduleToDuplicate),
    name: scheduleToDuplicate.name + ` Copy`,
    guid: uuidv4(),
  };

  for (const [index, shift] of duplicatedSchedule.shifts.entries()) {
    const newShiftGuid = uuidv4();
    const duplicatedShift = cloneDeep(shiftsState[shift.guid]);
    duplicatedShift.name = duplicatedShift.name + " Copy";
    duplicatedShift.guid = newShiftGuid;

    duplicatedSchedule.shifts[index] = duplicatedShift;

    shiftsState[newShiftGuid] = duplicatedShift;
  }

  schedulesState.push(duplicatedSchedule);

  return res.status(200).send({
    message: "",
    results: [{ scheduleGuid }],
    errorCodes: [],
  });
});

// Updating a schedule
router.patch("/default", (req, res) => {
  const data = req.body;
  const { guid } = data;

  const scheduleIndex = schedulesState.findIndex(
    (schedule) => schedule.guid === guid,
  );

  if (scheduleIndex === -1) {
    return res.status(404).send({
      message: "Schedule not found",
      results: [],
      errorCodes: [],
    });
  }

  for (const schedule of schedulesState) {
    if (schedule.guid === guid) {
      schedule.default = true;
    } else {
      schedule.default = false;
    }
  }

  return res.status(200).end();
});

// Updating a schedule
router.patch("/:scheduleGuid", (req, res) => {
  const { scheduleGuid } = req.params;
  const data = req.body;

  const scheduleIndex = schedulesState.findIndex(
    (schedule) => schedule.guid === scheduleGuid,
  );

  if (scheduleIndex === -1) {
    return res.status(404).send({
      message: "Schedule not found",
      results: [],
      errorCodes: [],
    });
  }

  schedulesState[scheduleIndex] = data;

  return res.status(200).end();
});

// Deleting a schedule
router.delete("/:scheduleGuid", (req, res) => {
  const { scheduleGuid } = req.params;

  const scheduleIndex = schedulesState.findIndex(
    (schedule) => schedule.guid === scheduleGuid,
  );

  if (scheduleIndex === -1) {
    return res.status(404).send({
      message: "Schedule not found",
      results: [],
      errorCodes: [],
    });
  }

  schedulesState.splice(scheduleIndex, 1);
  return res.status(200).end();
});

export default router;
