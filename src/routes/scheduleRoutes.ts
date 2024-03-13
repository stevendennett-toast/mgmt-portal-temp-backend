import express, { Request, Response } from "express";
import { schedulesState, shiftsState } from "../dataStore";
import { v4 as uuidv4 } from "uuid";

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
  const scheduleGuid = uuidv4();

  const scheduleWithGuid = { ...data, guid: scheduleGuid };

  // add schedule
  schedulesState.push(scheduleWithGuid);

  // add any shifts from schedule
  for (const shift of scheduleWithGuid.shifts) {
    shiftsState[shift.guid] = scheduleWithGuid;
  }

  return res.status(200);
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

  return res.status(200);
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

  return res.status(200);
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
  return res.status(200);
});

export default router;
