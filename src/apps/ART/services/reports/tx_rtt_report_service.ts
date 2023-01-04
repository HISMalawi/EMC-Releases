import { get, uniq } from "lodash";
import { AGE_GROUPS } from "./patient_report_service";
import { TxReportService } from "./tx_report_service";

const genders = ["F", "M"];
export const txRttIndicators = [
    '<3 months',
    '3-5 months',
    '6+ months'
]

export class TxRttReportService extends TxReportService {
    aggregations: Array<any>;
    constructor() {
        super();
        this.aggregations = [];
    }

    getClinicTxRtt() {
        return this.getReport(`programs/${this.programID}/reports/clinic_tx_rtt`)
    }

    getTxRttReport() {
        return this.getReport('tx_rtt')
    }

    buildReportData (cohort: Record<string, any>) {
        genders.forEach(gender => {
            AGE_GROUPS.forEach(group => {
                const patients = get(cohort, `${group}.${gender}`, []);
                this.aggregations.push({
                    gender,
                    "age_group": group,
                    '<3 months': this.filterBy(patients, (months: number) => months < 3),
                    '3-5 months': this.filterBy(patients, (months: number) => months >= 3 && months < 6),
                    '6+ months': this.filterBy(patients, (months: number) => months >= 6),
                })
            })
        })
        return this.aggregations
    }

    filterBy(ls: Array<any>, comparator: (months: number) => boolean){
        return ls.filter(i => comparator(i.months)).map(i => i.patient_id)
    }

    aggregate(gender: 'M' | 'F', indicator: string): Array<any> {
        return this.aggregations.reduce((totals: any, cur: any) => {
            return cur.gender === gender && cur[indicator] ? [...totals, ...cur[indicator]] : totals
        }, [])
    }

    getAggregatedMaleData () {
        const data: Record<string, any> = { gender: "Male", 'age_group': "All" }
        txRttIndicators.forEach(indicator => data[indicator] = this.aggregate('M', indicator))
        return data;
    }

    async getAggregatedMaternalStatus() {
        const aggregated = txRttIndicators.reduce((aggregated: any, indicator: string) => [
            ...aggregated,
            { indicator, data: this.aggregate('F', indicator) },
        ], [])

        const allFemales = uniq<number>(aggregated.reduce((totals: any, cur: any) => [...totals, ...cur.data], []).map((d: any) => d.patient_id))
        const maternalStatus = await this.getMaternalStatus(allFemales)
        const allPregnant = maternalStatus.FBf.concat(maternalStatus.FP)
        const data: Record<string, any>[] = [];

        for (const gender of ['FP', 'FNP', 'FBf']) {
            const tmp: Record<string, any> = { gender, 'age_group': 'All' }
            for (const indicator of txRttIndicators) {
                tmp[indicator] = aggregated
                    .reduce((all: any, i: any) => i.indicator === indicator ? [...all, ...i.data] : all, [])
                    .filter((p: any) => gender === 'FNP' ? !allPregnant.includes(p) : maternalStatus[gender].includes(p))
            }
            data.push(tmp)
        }

        return data;
    }
}
