import express, { Request, Response } from "express";
import { schedulesState, shiftsState } from "../dataStore";
import { v4 as uuidv4 } from "uuid";
import { MgmtSchedule } from "../MgmtSchedule/model";

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

  return res.status(200).send({ scheduleGuid });
});

// Duplicating a schedule
router.post("/clone/:scheduleGuid", (req, res) => {
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

  schedulesState.push({
    ...schedule,
    name: schedule.name + ` Copy`,
    guid: uuidv4(),
  });

  for (const shift of schedule.shifts) {
    const shiftToDuplicate = shiftsState[shift.guid];
    const newShiftGuid = uuidv4();
    shiftsState[newShiftGuid] = {
      ...shiftToDuplicate,
      name: shiftToDuplicate.name + " Copy",
    };
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

  delete schedulesState[scheduleIndex];
  return res.status(200).end();
});

export default router;
