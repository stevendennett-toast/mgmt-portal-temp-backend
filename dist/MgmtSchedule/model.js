"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MgmtScheduleCloneEndpoints = exports.MgmtScheduleEndpoints = exports.MgmtSchedulesEndpoints = void 0;
var MgmtSchedulesEndpoints;
(function (MgmtSchedulesEndpoints) {
    MgmtSchedulesEndpoints["GET"] = "/v1/mgmt/schedules";
    MgmtSchedulesEndpoints["UPDATE"] = "/v1/mgmt/schedules";
    MgmtSchedulesEndpoints["POST"] = "/v1/mgmt/servicePeriod";
})(MgmtSchedulesEndpoints || (exports.MgmtSchedulesEndpoints = MgmtSchedulesEndpoints = {}));
var MgmtScheduleEndpoints;
(function (MgmtScheduleEndpoints) {
    MgmtScheduleEndpoints["GET"] = "v1/mgmt/schedule/{scheduleGuid}";
    MgmtScheduleEndpoints["POST"] = "v1/mgmt/schedule";
    MgmtScheduleEndpoints["PATCH"] = "v1/mgmt/schedule/{scheduleGuid}";
    MgmtScheduleEndpoints["DELETE"] = "v1/schedule/{scheduleGuid}";
})(MgmtScheduleEndpoints || (exports.MgmtScheduleEndpoints = MgmtScheduleEndpoints = {}));
var MgmtScheduleCloneEndpoints;
(function (MgmtScheduleCloneEndpoints) {
    MgmtScheduleCloneEndpoints["POST"] = "v1/mgmt/schedule/clone/{scheduleGuid}";
})(MgmtScheduleCloneEndpoints || (exports.MgmtScheduleCloneEndpoints = MgmtScheduleCloneEndpoints = {}));
