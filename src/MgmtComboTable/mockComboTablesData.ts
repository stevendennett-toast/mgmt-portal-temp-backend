import { MgmtCombinedTableBookable } from "./model";

export const mockComboTablesData: MgmtCombinedTableBookable[] = [
  {
    guid: "12345",
    name: "1,2",
    maxCapacity: 8,
    minCapacity: 4,
    tables: [
      {
        guid: "4013d961-7697-4105-a0aa-3f0c8fa986d0",
        name: "1",
      },
      {
        guid: "d50a509e-f503-4dab-b9d3-6e89c1bbf40b",
        name: "2",
      },
    ],
    serviceAreaGroups: ["262a5f8e-708a-4b79-bc95-7567f453401f"],
  },
  {
    guid: "67890",
    name: "3,4",
    maxCapacity: 8,
    minCapacity: 4,
    tables: [
      {
        guid: "df3aa14-aea0-49ba-b580-732ba2ae5e76",
        name: "3",
      },
      {
        guid: "4",
        name: "4",
      },
    ],
    serviceAreaGroups: ["262a5f8e-708a-4b79-bc95-7567f453401f"],
  },
];
