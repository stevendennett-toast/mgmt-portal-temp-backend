import express, { Request, Response } from "express";
import { schedulesState, shiftsState } from "../dataStore";
import { v4 as uuidv4 } from "uuid";
import { mockDefaultBreakfastShift } from "../MgmtShift/mockShiftsData";

// Create a router for shift
const router = express.Router();

// Get a shift
router.get("/:shiftGuid", (req: Request, res: Response) => {
  const { shiftGuid } = req.params;

  const shift = shiftsState[shiftGuid];

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

// Creating a shift
router.post("/", (req, res) => {
  const { scheduleGuid, name, hours } = req.body;

  // new shift guid
  const shiftGuid = uuidv4();

  const shiftWithGuid = {
    ...shiftsState[mockDefaultBreakfastShift.guid],
    name,
    hours,
    guid: shiftGuid,
  };

  // add shift
  shiftsState[shiftGuid] = shiftWithGuid;

  // add shift to schedule
  for (const schedule of schedulesState) {
    if (schedule.guid === scheduleGuid) {
      schedule.shifts.push({
        guid: shiftWithGuid.guid,
        name: shiftWithGuid.name,
      });
    }
  }

  return res.status(200).send({
    message: "",
    results: [],
    errorCodes: [],
  });
});

// Updating a shift
router.patch("/:shiftGuid", (req, res) => {
  const { shiftGuid } = req.params;
  const data = req.body;

  const shift = shiftsState[shiftGuid];

  if (!shift) {
    return res.status(404).send({
      message: "Shift not found",
      results: [],
      errorCodes: [],
    });
  }

  // update shift
  shiftsState[shiftGuid] = data;

  // update shift in schedule
  for (const schedule of schedulesState) {
    for (const index in schedule.shifts) {
      if (schedule.shifts[index].guid === shiftGuid) {
        schedule.shifts[index].guid = data.guid;
        schedule.shifts[index].name = data.name;
      }
    }
  }

  return res.status(200).end();
});

// Deleting a shift
router.delete("/:shiftGuid", (req, res) => {
  const { shiftGuid } = req.params;

  const shift = shiftsState[shiftGuid];

  if (!shift) {
    return res.status(404).send({
      message: "Shift not found",
      results: [],
      errorCodes: [],
    });
  }

  // delete shift
  delete shiftsState[shift.guid];

  // delete shift from schedule
  for (const schedule of schedulesState) {
    schedule.shifts = schedule.shifts.filter(
      (innerShift) => innerShift.guid !== shiftGuid,
    );
  }

  return res.status(200).end();
});

export default router;
