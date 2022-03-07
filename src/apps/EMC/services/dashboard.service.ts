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

  static getAppointmentsDue(dueDate: string) {
    return Service.getJsonSWR('programs/1/booked_appointments', {
      date: dueDate
    })
  }

  static getPatientsDueForVL(dateRange: Record<string, string>){
    return Service.getJsonSWR('programs/1/reports/vl_due', {
      'start_date': dateRange.start,
      'endDate': dateRange.end
    })
  }

  static getDefaulters(today: string, dateRange: Record<string, string>) {
    return Service.getJsonSWR('defaulter_list', {
      'date': today,
      'start_date': dateRange.start,
      'end_date': dateRange.end,
      'pepfar': 'true',
      'program_id': 1
    })
  }
}