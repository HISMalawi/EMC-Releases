import { Service } from "@/services/service";
import { PrintoutService } from "@/services/printout_service";
import { GlobalPropertyService } from "@/services/global_property_service";

export class FilingNumberService extends Service {
    patientID: number;
    activePrefix: string;
    dormantPrefix: string;

    constructor() {
        super()
        this.patientID = 0
        this.activePrefix = ''
        this.dormantPrefix = ''
    }

    getActivePrx() {
        return this.activePrefix
    }

    getDormantPrx() {
        return this.dormantPrefix
    }

    getPatientID() {
        return this.patientID
    }

    setPatientID(patientID: number) {
        this.patientID = patientID
    }

    async loadFilingPrefix() {
        const prx = await GlobalPropertyService.get('filing.number.prefix')
        if (prx) {
            const [activePrefix, dormantPrefix] = prx.split(',')
            this.activePrefix = activePrefix
            this.dormantPrefix = dormantPrefix
        }
    }

    async assignFilingNumber() {
        return Service.postJson(`patients/${this.patientID}/filing_number`, {})
    }

    async canUseFilingNumber() {
        const req = await Service.getJson('filing_number/type=activate')
        if (req && req['use.filing.numbers'] === 'true') {
            return true
        }
        return false
    }

    getFilingNumber(filingNumber: string) {
        return Service.getJson(`search/patients/by_identifier`, {
            'type_id': 18, 'identifier': `${this.dormantPrefix}${filingNumber}`
        })
    }

    archiveFilingNumber() {
        return Service.getJson(`archive_active_filing_number`, {
            'patient_id': this.patientID
        })
    }

    archivePatient(secondaryPatient: number, identifier: string | number) {
        return Service.postJson('swap_active_number', {
            'primary_patient_id': this.patientID,
            'secondary_patient_id': secondaryPatient,
            identifier
        })
    }

    getArchivingCandidates(page=0, pageSize=10) {
        return Service.getJson(`archiving_candidates`, {
            page,'page_size': pageSize
        })
    }

    getArchived() {
        return Service.getJson(``)
    }

    getPastFilingNumbers() {
        return Service.getJson(`patients/${this.patientID}/past_filing_numbers`)
    }

    printFilingNumber() {
        const printer = new PrintoutService()
        return printer.printLbl(`patients/${this.patientID}/labels/filing_number`) 
    }
}