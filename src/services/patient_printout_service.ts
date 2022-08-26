import { PrintoutService } from "./printout_service";
import Url from "@/utils/Url";

export class PatientPrintoutService extends PrintoutService {
    patient: number
    baseUrl: string
    constructor(patientId: number){
        super()
        this.patient = patientId
        this.baseUrl = `patients/${this.patient}/labels/`
    }

    getLblUrl(resource: string, params = {} as Record<string, string>) {
        const urlParams = Url.parameterizeObjToString(params)
        return `${this.baseUrl}${resource}${urlParams ? '?' + urlParams : ''}`
    }

    printPatientLbl(resource: string, params = {} as Record<string, string>) {
        return this.printLbl(this.getLblUrl(resource, params))
    }

    printFilingNumberLbl() {
        return this.printPatientLbl('filing_number')
    }

    printNidLbl(useQR=false) {
        return this.printPatientLbl(`national_health_id?qr_code=${useQR}`)
    }

    printVisitSummaryLbl(date = PrintoutService.getSessionDate() ) {
        const url = `programs/${PrintoutService.getProgramID()}/${this.baseUrl}/visits?date=${date}`
        return this.printLbl(url)
    }

    printDemographicsLbl() {
        const url = `programs/${PrintoutService.getProgramID()}/${this.baseUrl}/patient_history`
        return this.printLbl(url)
    }

    printTransferOutLbl() {
        return this.printPatientLbl('transfer_out')
    }

    printLabOrderLbl(orderID: number) {
        return this.printLbl(`lab/labels/order?order_id=${orderID}`)
    }
}
