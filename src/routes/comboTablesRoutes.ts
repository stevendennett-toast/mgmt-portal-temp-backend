import express, { Request, Response } from "express";
import { comboTablesState } from "../dataStore";

// Create a router for combo tables
const router = express.Router();

// GET request for listing combo tables
router.get("/", (req: Request, res: Response) => {
  return res.send({
    message: "",
    results: comboTablesState,
    errorCodes: [],
  });
});

export default router;
