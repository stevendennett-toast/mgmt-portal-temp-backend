export type MgmtShift = {
  guid: string;
  name: string;
  hours: MgmtBookableHours;
  onlineWaitlistEnabled: boolean;
  onlineWaitlistDisableThreshold: number;
  onlineReservationsEnabled: boolean;
  waitlistEtaTurnTime: number;
  waitlistEtaTableCount: number;
  waitlistEtaBuffer: number;
  maxCoversPerTimeslot: number;
  bookingMinHoursInAdvance: number;
  bookingMaxHoursInAdvance: number;
  timeSlotSize: number;
  serviceAreas: { [guid: string]: MgmtServiceAreaBookable };
  serviceAreaGroups: { [guid: string]: MgmtServiceAreaBookable };
  minPartySize: number;
  maxPartySize: number;
  waitlistMinPartySize: number;
  waitlistMaxPartySize: number;
};

export type MgmtDayHoursConfig = {
  enabled: boolean;
  start: string;
  end: string;
};

export type MgmtBookableHours = {
  monday: MgmtDayHoursConfig;
  tuesday: MgmtDayHoursConfig;
  wednesday: MgmtDayHoursConfig;
  thursday: MgmtDayHoursConfig;
  friday: MgmtDayHoursConfig;
  saturday: MgmtDayHoursConfig;
  sunday: MgmtDayHoursConfig;
};

export type MgmtServiceAreaBookable = {
  guid: string;
  onlineWaitlistEnabled: boolean;
  onlineReservationsEnabled: boolean;
  percentBookableOnline: number;
  turnTimes: number[];
  defaultTurnTime: number;
  tables: { [guid: string]: MgmtTableBookable };
  combinedTables: MgmtCombinedTableBookable[];
  depositBookableGuid: string | null;
};

type AvailabilityFields = {
  onlineWaitlistEnabled: boolean;
  onlineReservationsEnabled: boolean;
  inHouseWaitlistEnabled: boolean;
  inHouseReservationsEnabled: boolean;
};

export type TableAvailabilities = AvailabilityFields & {
  [key: string]: any;
};

export type MgmtTableBookable = AvailabilityFields & {
  guid: string;
};

type MgmtCombinedTableBookable = AvailabilityFields & {
  guid: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  tables: string[];
};
