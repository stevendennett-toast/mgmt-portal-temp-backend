import express, { Request, Response } from "express";
import { comboTablesState } from "../dataStore";
import { v4 as uuidv4 } from "uuid";
import { MgmtCombinedTableBookable } from "../MgmtComboTable/model";

// Create a router for combo table
const router = express.Router();

// Get a combo table
router.get("/:comboTableGuid", (req: Request, res: Response) => {
  const { comboTableGuid } = req.params;

  const comboTable = comboTablesState.find(
    (comboTable) => comboTable.guid === comboTableGuid,
  );

  if (!comboTable) {
    return res.status(404).send({
      message: "Combo table not found",
      results: [],
      errorCodes: [],
    });
  }

  return res.send({
    message: "",
    results: [comboTable],
    errorCodes: [],
  });
});

// Creating a combo table
router.post("/", (req, res) => {
  const { existingComboTables, ...data } = req.body;

  // new combo table guid
  const comboTableGuid = uuidv4();

  const tablesWithNames = data.tables.map((tableGuid: string) => ({
    guid: tableGuid,
    name: `table ${tableGuid}`,
  }));

  const comboTableWithGuid: MgmtCombinedTableBookable = {
    ...data,
    guid: comboTableGuid,
    tables: tablesWithNames,
  };

  // add combo table
  comboTablesState.push(comboTableWithGuid);

  return res.status(200).send({
    message: "",
    results: [{ comboTableGuid }],
    errorCodes: [],
  });
});

// Updating a combo table
router.patch("/:comboTableGuid", (req, res) => {
  const { comboTableGuid } = req.params;
  const data = req.body;

  const comboTableIndex = comboTablesState.findIndex(
    (comboTable) => comboTable.guid === comboTableGuid,
  );

  if (comboTableIndex === -1) {
    return res.status(404).send({
      message: "Combo table not found",
      results: [],
      errorCodes: [],
    });
  }

  comboTablesState[comboTableIndex] = {
    ...data,
    tables: data.tables.map((tableGuid: string) => ({
      guid: tableGuid,
      name: tableGuid.slice(0, 3),
    })),
  };

  return res.status(200).end();
});

// Deleting a combo table
router.delete("/:comboTableGuid", (req, res) => {
  const { comboTableGuid } = req.params;

  const comboTableIndex = comboTablesState.findIndex(
    (comboTable) => comboTable.guid === comboTableGuid,
  );

  if (comboTableIndex === -1) {
    return res.status(404).send({
      message: "Combo table not found",
      results: [],
      errorCodes: [],
    });
  }

  comboTablesState.splice(comboTableIndex, 1);
  return res.status(200).end();
});

export default router;
