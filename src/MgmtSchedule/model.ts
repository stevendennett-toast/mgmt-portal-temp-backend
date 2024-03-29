export enum MgmtSchedulesEndpoints {
  GET = "/v1/mgmt/schedules",
  UPDATE = "/v1/mgmt/schedules",
  POST = "/v1/mgmt/servicePeriod",
}

export enum MgmtScheduleEndpoints {
  GET = "v1/mgmt/schedule/{scheduleGuid}",
  POST = "v1/mgmt/schedule",
  PATCH = "v1/mgmt/schedule/{scheduleGuid}",
  DELETE = "v1/mgmt/schedule/{scheduleGuid}",
}

export enum MgmtScheduleCloneEndpoints {
  POST = "v1/mgmt/schedule/clone/{scheduleGuid}",
}

export type MgmtSchedule = {
  datesActive: string[] | null;
  default: boolean;
  current: boolean;
  enabled: boolean;
  guid: string;
  name: string;
  memo: {
    title: string | null;
    description: string | null;
  } | null;
  shifts: {
    guid: string;
    name: string;
  }[];
};
