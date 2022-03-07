import { Service } from "@/services/service";

export default class DashboardService {

  static getVisits (startDate: string, endDate: string) {
    return Service.getJsonSWR('programs/1/reports/visits', {
      'name': 'visits',
      'start_date': startDate,
      'end_date': endDate
    })
  }
}