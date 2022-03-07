import { Service } from "@/services/service";

export default class DashboardService {

  static getVisits (startDate: string, endDate: string) {
    return Service.getJsonSWR('programs/1/reports/visits', {
      'name': 'visits',
      'start_date': startDate,
      'end_date': endDate
    })
  }

  static getMissedAppointments (today: string, range: Record<string, string>) {
    return Service.getJsonSWR('missed_appointments', {
      'date': today,
      'start_date': range.start,
      'end_date': range.end,
      'program_id': 1
    })
  }
}