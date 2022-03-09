import { Service } from "@/services/service";

export default class DashboardService {

  static getVisits (dateRange: Record<string, string>) {
    return Service.getJson('programs/1/reports/visits', {
      'name': 'visits',
      'start_date': dateRange.start,
      'end_date': dateRange.end
    })
  }

  static getMissedAppointments (today: string, range: Record<string, string>) {
    return Service.getJson('missed_appointments', {
      'date': today,
      'start_date': range.start,
      'end_date': range.end,
      'program_id': 1
    })
  }

  static getAppointmentsDue(dueDate: string) {
    return Service.getJson('programs/1/booked_appointments', {
      date: dueDate
    })
  }

  static getPatientsDueForVL(dateRange: Record<string, string>){
    return Service.getJson('programs/1/reports/vl_due', {
      'start_date': dateRange.start,
      'endDate': dateRange.end
    })
  }

  static getDefaulters(today: string, dateRange: Record<string, string>) {
    return Service.getJson('defaulter_list', {
      'date': today,
      'start_date': dateRange.start,
      'end_date': dateRange.end,
      'pepfar': 'true',
      'program_id': 1
    })
  }

  static getPatientsOnDTG(dateRange: Record<string, string>){
    return Service.getJson('programs/1/reports/patients_on_dtg', {
      'start_date': dateRange.start,
      'end_date': dateRange.end
    })
  }

  static getTXCurrent(dateRange: Record<string, string>){
    return Service.getJson('programs/1/reports/tx_curr', {
      'start_date': dateRange.start,
      'end_date': dateRange.end
    })
  }
}