import { isCacheEnabled, StoreDef } from "@/apps/GLOBAL_APP/global_store";
import isEmpty from "lodash/isEmpty";
import DashboardService from "../services/dashboard.service";
import HisDate from '@/utils/Date';
import { STANDARD_DATE_FORMAT } from '@/utils/Date';

export enum EmcStore {
  PATIENT_ON_DTG = "PATIENT_ON_DTG",
  PATIENT_VISITS = "PATIENT_VISITS",
  APPOINTMENTS_DUE = "APPOINTMENTS_DUE",
  MISSED_APPOINTMENTS = "MISSED_APPOINTMENTS",
  TX_CURRENT_30 = "TX_CURRENT_30",
  TX_CURRENT_60 = "TX_CURRENT_60",
  DEFAULTERS = "DEFAULTERS",
  DUE_FOR_VL = "DUE_FOR_VL"
}

export const emcStore: Record<string, StoreDef> = {
  [EmcStore.PATIENT_ON_DTG] : {
    get: async (params) => DashboardService.getPatientsOnDTG(params.quarter),
    canReloadCache: data => !isCacheEnabled() || data.params.reload || isEmpty(data.state)
  },
  [EmcStore.PATIENT_VISITS] : {
    get: async (params) => DashboardService.getVisits(params.quarter),
    canReloadCache: data => !isCacheEnabled() || data.params.reload || isEmpty(data.state)
  },
  [EmcStore.APPOINTMENTS_DUE] : {
    get: async (params) => DashboardService.getAppointmentsDue(params.date),
    canReloadCache: data => !isCacheEnabled() || data.params.reload || isEmpty(data.state)
  },
  [EmcStore.MISSED_APPOINTMENTS] : {
    get: async ({date, quarter}) => DashboardService.getMissedAppointments(date, quarter),
    canReloadCache: data => !isCacheEnabled() || data.params.reload || isEmpty(data.state)
  },
  [EmcStore.TX_CURRENT_30] : {
    get: async ({ quarter }) => {
      const startDate = HisDate.subtract(quarter.end, 'days', 30).format(STANDARD_DATE_FORMAT)
      return DashboardService.getTXCurrent({ start: startDate, end: quarter.end })
    },
    canReloadCache: data => !isCacheEnabled() || data.params.reload || isEmpty(data.state)
  },
  [EmcStore.TX_CURRENT_60] : {
    get: async ({ quarter }) => {
      const startDate = HisDate.subtract(quarter.end, 'days', 60).format(STANDARD_DATE_FORMAT)
      return DashboardService.getTXCurrent({ start: startDate, end: quarter.end })
    },
    canReloadCache: data => !isCacheEnabled() || data.params.reload || isEmpty(data.state)
  },
  [EmcStore.DEFAULTERS] : {
    get: async ({ today, quarter }) => DashboardService.getDefaulters(today, quarter),
    canReloadCache: data => !isCacheEnabled() || data.params.reload || isEmpty(data.state)
  },
  [EmcStore.DUE_FOR_VL] : {
    get: async (params) => DashboardService.getPatientsDueForVL(params.quarter),
    canReloadCache: data => !isCacheEnabled() || data.params.reload || isEmpty(data.state)
  },
}