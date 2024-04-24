export type MgmtCombinedTableBookable = {
  guid: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  tables: {
    guid: string;
    name: string;
  }[];
  serviceAreaGroups: string[];
};
