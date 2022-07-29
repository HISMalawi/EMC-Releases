import { AppEncounterService } from "@/services/app_encounter_service"
import { PrintoutService } from "@/services/printout_service"

export class RadiologyExaminationService extends AppEncounterService {
    constructor(patientID: number, providerID: number) {
        super(patientID, 121, providerID) 
    }

    static getListOfRadiologyTests(id: string | number) {
        return super.getJson('radiology_set', { id })
    }

    createOrder(params: any) {
        return AppEncounterService.postJson('orders/radiology', params)
    }

    printExamination(accessionNumber: string) {
        const service = new PrintoutService()
        return service.printLbl(`orders/radiology?accession_number=${accessionNumber}`)
    }
}
