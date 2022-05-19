import { OpdReportService } from "./opd_report_service";
import { Service } from "@/services/service";
import HisDate from "@/utils/Date"
import { Patientservice } from "@/services/patient_service";

export interface CohortValidationInterface {
    param: number | string;
    error: (indicator: number, param: number) => string;
    check: (indicator: number, param: number) => boolean;
}

export interface CommonInterface {
    name: string;
    start: string;
    end: string;
}

export class HMISReportService extends OpdReportService {
    regenerate: boolean;
    constructor() {
        super()
        this.regenerate = false
    }

    private HMIS15Url() {
        return `generate_hmis_15_report`
    }

    private OPDVistisUrl() {
        return `registration`
    }

    setRegenerate(regenerate: boolean) {
        this.regenerate = regenerate
    }

    requestHMIS15(params: any) {
        return OpdReportService.ajxGet(
            this.HMIS15Url(), params
        )
    }

    RequestParams() {      
        return { 
            'start_date': this.startDate,
            'end_date': this.endDate,
            request: 'true'
        }
    }

    registrationRequestParams() {
        return { 
            'start_date': this.startDate,
            'end_date': this.endDate,
            'date': Service.getApiDate,
            'program_id': Service.getProgramID()
        }
    }

    async getPatientsDetails(patientIds: Array<[]>) {
        const patients = []
        for(const patientID of patientIds) {
            const potentialPatient = await Patientservice.findByID(patientID as any)
            const patient = new Patientservice(potentialPatient)
              const personObj = {
                'givenName': patient.getGivenName(),
                'familyName': patient.getFamilyName(),
                'gender': patient.getGender(),
                'age': HisDate.getAgeInYears(patient.getBirthdate()),
                'address': patient.getCurrentDistrict()+", "+ patient.getCurrentVillage() +", "+ patient.getClosestLandmark(),
                'phone': this.resolvePhone(potentialPatient.person.person_attributes),
                'personId': patient.getID()
              }
              patients.push(personObj)
            }
        return patients
    }

    resolvePhone(attributes: any ) {
        let number
        let other
        if (attributes.length > 0) {
            for(const attribute of attributes) {
                if (parseInt(attribute.value)) {
                    if (this.isEmpty(number)) {
                        number = attribute.value
                    } else
                    number+=' '+attribute.value
                }
                other = attribute.value
            }
            if(!this.isEmpty(number)) {
                return number
            } else return other
        } else return 'N/A'
    }

    isEmpty(val: any){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

    renderResults(params: any) {
        const all = []
        let count = 1
        for (const [key, value] of Object.entries(params)) {
            const temp: any = []
            const condition: any = value
            const item = {
                id: 0,
                name: '',
                total: 0,
                totalPatientIds: ''
            }
            item.name = key
            let total = 0
            item.id = count
            count += 1 
            for (const [key1, value1] of Object.entries(condition)) {
                key1
                const conditionDetails: any = value1
                if (conditionDetails != null) {
                    total +=conditionDetails.length;
                    item.total = total
                    if(conditionDetails.length) {
                        temp.push(...conditionDetails)
                        item.totalPatientIds = temp
                    }
            }
          }
          all.push(item)
        }
        return all
    }
    getIdsArrayObj(patientIds: string) {
        patientIds = patientIds + ''
        return patientIds.split(',') as []
    }

    Span(startDate: string, endDate: string) {
        const separator = "  -  "
        return (HisDate.toStandardHisDisplayFormat(startDate) 
        +separator+ 
        HisDate.toStandardHisDisplayFormat(endDate))
    }

    async getOPDVisits(params: any) {
        return OpdReportService.ajxGet(
            this.OPDVistisUrl(), params
        )
    }

    getCSVString(IDSRConditionsObj: any) {
        let CSVString = `Diseases/Events/Conditions, #,\n`
        for(const condition of IDSRConditionsObj) {
          const row = `${condition.name},${condition.total},\n`
          CSVString+=row
        }
        return {CSVString}
    }
}
