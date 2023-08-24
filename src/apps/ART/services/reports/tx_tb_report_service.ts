import { get, uniq } from "lodash";
import { AGE_GROUPS } from "./patient_report_service";
import { TxReportService } from "./tx_report_service";

export const indicators = {
    'tx_curr': 'TX_CURR',
    'sceen_pos_new': 'Screen Pos_New on ART',
    'sceen_neg_new': 'Screen Neg_New on ART',
    'sceen_pos_prev': 'Screen Pos_Prev on ART',
    'sceen_neg_prev': 'Screen Neg_Prev on ART',
    'started_tb_new': 'Started TB RX_New on ART',
    'started_tb_prev': 'Started TB RX_Prev on ART'
}

export class TxTbReportService extends TxReportService {
    reportData: Array<any>;
    constructor() {
        super();
        this.reportData = [];
    }

    async getTxTbReport(rebuild_outcome: boolean) {
        const data = await this.getReport(`programs/${this.programID}/reports/tx_tb`, { rebuild_outcome })
        this,this.reportData = this.buildReportData(data);
        return this.reportData
    }

    buildReportData (data: Record<string, any>) {
        const males: Array<any> = [];
        const females: Array<any>  = [];
        AGE_GROUPS.forEach(age_group => {
            males.push({
                age_group,
                gender: "Male",
                ...get(data, `${age_group}.M`)
            })
            females.push({
                age_group,
                gender: "Female",
                ...get(data, `${age_group}.F`)
            })
        })
        return [...females, ...males]
    }

    aggregate(gender: 'Male' | 'Female', indicator: string): Array<any> {
        return this.reportData.reduce((totals: any, cur: any) => {
            return cur.gender === gender && cur[indicator] ? [...totals, ...cur[indicator]] : totals
        }, [])
    }

    getAggregatedMaleData () {
        const data: Record<string, any> = { gender: "Male", 'age_group': "All" }
        Object.keys(indicators).forEach(indicator => data[indicator] = this.aggregate('Male', indicator))
        return data;
    }

    async getAggregatedMaternalStatus() {
        const aggregated = Object.keys(indicators).reduce((aggregated: any, indicator: string) => [
            ...aggregated,
            { indicator, data: this.aggregate('Female', indicator) },
        ], [])

        const allFemales: number[] = uniq(aggregated.reduce((totals: any, cur: any) => [...totals, ...cur.data], []))
        const maternalStatus = await this.getMaternalStatus(allFemales)
        const allPregnant = maternalStatus.FBf.concat(maternalStatus.FP)
        const data: Record<string, any>[] = [];

        for (const gender of ['FP', 'FNP', 'FBf']) {
            const tmp: Record<string, any> = { gender, 'age_group': 'All' }
            for (const indicator of Object.keys(indicators)) {
                tmp[indicator] = aggregated
                    .reduce((all: any, i: any) => i.indicator === indicator ? [...all, ...i.data] : all, [])
                    .filter((p: any) => gender === 'FNP' ? !allPregnant.includes(p) : maternalStatus[gender].includes(p))
            }
            data.push(tmp)
        }

        return data;
    }
}
