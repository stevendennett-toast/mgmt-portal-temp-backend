import express, { Request, Response } from "express";
import { schedulesState } from "../dataStore";

// Create a router for schedule
const router = express.Router();

// Define your CRUD operations

// GET request for listing schedules
router.get("/", (req: Request, res: Response) => {
  return res.send({
    message: "",
    results: [schedulesState],
    errorCodes: [],
  });
});

export default router;
