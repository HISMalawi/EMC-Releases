import { ArtReportService } from "./art_report_service";
import Url from "@/utils/Url";
import { get, uniq } from "lodash";
import { AGE_GROUPS } from "./patient_report_service";

const genders = ["F", "M"];
export const txMlIndicators = [
    'Died',
    'IIT <3 mo',
    'IIT 3-5 mo',
    'IIT 6+ mo',
    'Transferred out',
    'Refused (Stopped)'
]

export class TxReportService extends ArtReportService {
    org: string;
    initializeArvRefillReportTables: boolean;
    constructor() {
        super()
        this.org = 'pepfar'
        this.initializeArvRefillReportTables = true
    }

    initArvRefillPeriod(isInit: boolean) {
        this.initializeArvRefillReportTables = isInit
    }

    setOrg(org: string) {
        this.org = org
    }

    getClinicTxRtt() {
        return this.getReport(`programs/${this.programID}/reports/clinic_tx_rtt`)
    }

    getTxMMDClientLevelData(patients: Array<number>) {
        const params = Url.parameterizeObjToString({
            'start_date': this.startDate,
            'end_date': this.endDate,
            'program_id': this.programID,
            'date': this.date,
            'org': this.org
        })
        const url = `tx_mmd_client_level_data?${params}`
        return ArtReportService.postJson(url, { 'patient_ids': patients })
    }

    remapTxClientLevelData(clientData: Array<any>) {
        return clientData.map((d: any) => {
            let patient: any = null
            const drugs: Array<any> = []
            for(const regimenID in d) {
                const data: any = Object.values(d[regimenID])
                data.forEach((regimen: any) => {
                    for (const regimenIndex in regimen) {
                        const order = regimen[regimenIndex]
                        if (!patient) {
                            patient = {
                                id: order.arv_number,
                                dob: order.birthdate,
                                dispenseDate: order.start_date,    
                            }
                        }
                        drugs.push({
                            name: order.drug_name, 
                            quantity: order.quantity,
                            dose: order.dose_per_day
                        })
                    }
                })
            }
            return { ...patient, drugs }
        })
    }

    getTxCurrMMDReport(minAge: number, maxAge: number) {
        return this.getReport('arv_refill_periods', {
            'org': this.org,
            'min_age': `${minAge}`,
            'max_age': `${maxAge}`,
            'initialize_tables': `${this.initializeArvRefillReportTables}`
        })
    }

    getTxMlReport() {
        return this.getReport('tx_ml')
    }

    getTxRttReport() {
        return this.getReport('tx_rtt')
    }

    buildTxMlReportData (cohort: Record<string, any>) {
        const data: Record<string, any>[] = [];
        genders.forEach(gender => {
            AGE_GROUPS.forEach(group => {
                const tmp: Record<string, any> = { gender, 'age_group': group }
                txMlIndicators.forEach((indicator, index) => {
                    tmp[indicator] = get(cohort, `${group}.${gender}[${index}]`, [])
                })
                data.push(tmp)
            })
        })
        return data
    }

    aggregateTxML(cohort: Record<string, any>, gender: 'M' | 'F', indicator: string): Array<any> {
        return Object.values(cohort).reduce((patients: any, c: any) => {
            return c[gender] ? [...c[gender][txMlIndicators.indexOf(indicator)], ...patients] : patients
        }, []) as Array<any>
    }

    getAggregatedTxMLMaleData (cohort: Record<string, any>) {
        const data: Record<string, any> = { gender: "Male", 'age_group': "All" }
        for (const indicator of txMlIndicators) {
            data[indicator] = this.aggregateTxML(cohort, 'M', indicator)
        }
        return data;
    }

    async getAggregatedTxMLMaternalStatus(cohort: Record<string, any>) {
        const aggregated = txMlIndicators.reduce((aggregated: any, indicator: string) => [
            ...aggregated,
            { indicator, data: this.aggregateTxML(cohort, 'F', indicator) },
        ], [])

        const allFemales = uniq<number>(aggregated.reduce((totals: any, cur: any) => [...totals, ...cur.data], []).map((d: any) => d.patient_id))
        const maternalStatus = await this.getMaternalStatus(allFemales)
        const allPregnant = maternalStatus.FBf.concat(maternalStatus.FP)
        const data: Record<string, any>[] = [];

        for (const gender of ['FP', 'FNP', 'FBf']) {
            const tmp: Record<string, any> = { gender, 'age_group': 'All' }
            for (const indicator of txMlIndicators) {
                tmp[indicator] = aggregated
                    .reduce((all: any, i: any) => i.indicator === indicator ? [...all, ...i.data] : all, [])
                    .filter((p: any) => gender === 'FNP' ? !allPregnant.includes(p.patient_id) : maternalStatus[gender].includes(p.patient_id))
            }
            data.push(tmp)
        }

        return data;
    }
}
