export enum MgmtSchedulesEndpoints {
  GET = '/v1/mgmt/schedules',
  UPDATE = '/v1/mgmt/schedules',
  POST = '/v1/mgmt/servicePeriod'
}

export enum MgmtScheduleEndpoints {
  GET = 'v1/mgmt/schedule/{scheduleGuid}',
  POST = 'v1/mgmt/schedule',
  PATCH = 'v1/mgmt/schedule/{scheduleGuid}',
  DELETE = 'v1/schedule/{scheduleGuid}'
}

export enum MgmtScheduleCloneEndpoints {
  POST = 'v1/mgmt/schedule/clone/{scheduleGuid}'
}

export type MgmtSchedule = {
  activeDates: string[] | null
  default: boolean
  enabled: boolean
  guid: string
  name: string
  memo: string | null
  shifts: {
    guid: string
    name: string
  }[]
}