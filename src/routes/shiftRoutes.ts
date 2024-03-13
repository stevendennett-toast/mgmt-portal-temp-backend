import express, { Request, Response } from "express";
import { shiftsState } from "../dataStore";

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

export default router;
