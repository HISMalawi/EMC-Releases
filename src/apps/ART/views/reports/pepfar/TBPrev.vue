<template>
    <ion-page>
        <report-template
            :title="title"
            :period="period"
            :rows="rows" 
            :fields="fields"
            :columns="columns"
            reportPrefix="PEPFAR"
            :config="{
                showIndex: true
            }"
            :onReportConfiguration="onPeriod"
            > 
        </report-template>
    </ion-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ReportMixin from "@/apps/ART/views/reports/ReportMixin.vue"
import { TbPrevReportService } from '@/apps/ART/services/reports/tb_prev_report_service'
import ReportTemplate from "@/apps/ART/views/reports/TableReportTemplate.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service"

export default defineComponent({
    mixins: [ReportMixin],
    components: { ReportTemplate },
    data: () => ({
        title: 'TB PREV Report',
        cohort: {} as any,
        rows: [] as Array<any>,
        columns: [
            [
                table.thTxt('', { 
                    colspan: 3,
                    sortable: false,
                    exportable: false 
                }),
                table.thTxt('Started new on ART', { 
                    colspan: 2, 
                    sortable: false,
                    exportable: false 
                }),
                table.thTxt('Started previously on ART', { 
                    colspan: 2, 
                    sortable: false,
                    exportable: false 
                }),
                table.thTxt('Completed New on ART', { 
                    colspan: 2, 
                    sortable: false,
                    exportable: false 
                }),
                table.thTxt('Completed previously on ART', { 
                    colspan: 2, 
                    sortable: false,
                    exportable: false
                })
            ],
            [
                table.thTxt('Age group'),
                table.thTxt('Gender'),
                table.thNum('3HP',{ value: '3HP(Started New on ART)'}),
                table.thNum('6H', { value: '6H(Started New on ART)'}),
                table.thNum('3HP',{ value: '3HP(Started Previously on ART)'}),
                table.thNum('6H', { value: '6H(Started Previously on ART)'}),
                table.thNum('3H', { value: '3HP(Completed New on ART)'}),
                table.thNum('6H', { value: '6H(Completed New on ART)'}),
                table.thNum('3H', { value: '3HP(Completed Previously on ART)'}),
                table.thNum('6H', { value: '6H(Completed Previously on ART)'})
            ]
        ]
    }),
    created() {
        this.fields = this.getDateDurationFields()
    },
    methods: {
        async onPeriod(_: any, config: any) {
            this.rows = []
            this.report = new TbPrevReportService()
            this.report.setStartDate(config.start_date)
            this.report.setEndDate(config.end_date)
            this.period = this.report.getDateIntervalPeriod()
            this.cohort = await this.report.getTBPrevReport()
            this.setRows('F')
            this.setRows('M')
            this.setTotalMaleRow()
        },
        makeDrilldown(data: Array<any>, context: string) {
            if (data.length) {
                const columns = [
                    [
                        table.thTxt('ARV#'),
                        table.thTxt('Birthdate'),
                        table.thTxt('TPT Initiation Date'),
                        table.thTxt('Outcome')
                    ]
                ]
                const asyncRows = () => {
                    return this.sortByArvNumber(data, 'arv_number')
                        .map((p: any) => ([
                            table.td(p.arv_number),
                            table.tdDate(p.birthdate),
                            table.tdDate(p.tpt_initiation_date),
                            table.td(p.outcome)
                        ]))
                }
                return table.tdLink(data.length, () => this.drilldownAsyncRows(context, columns, asyncRows))
            }
            return table.td(0)
        },
        aggregate(gender: 'M' | 'F', group: '6H' | '3HP', indicator: string): Array<any> {
            return Object.values(this.cohort).reduce((patients: any, c: any) => {
                return [...c[gender][group][indicator], ...patients]
            }, []) as Array<any>
        },
        setTotalMaleRow() {
            this.rows.push([
                table.td('All'),
                table.td('Male'),
                this.makeDrilldown(this.aggregate('M', '3HP', 'started_new_on_art'), 
                    'All male started new on 3HP'),
                this.makeDrilldown(this.aggregate('M', '6H', 'started_new_on_art'), 
                    `All male started new on ART 6H`),
                this.makeDrilldown(this.aggregate('M', '3HP', 'started_previously_on_art'), 
                    `All male started previously on ART 3HP`),
                this.makeDrilldown(this.aggregate('M', '6H', 'started_previously_on_art'),
                    `All male started previously on ART 6H`
                ),
                this.makeDrilldown(this.aggregate('M', '3HP', 'completed_new_on_art'),
                    `All male completed new on ART 3HP`
                ),
                this.makeDrilldown(this.aggregate('M', '6H', 'completed_new_on_art'),
                    `All male completed new on ART 6H`
                ),
                this.makeDrilldown(this.aggregate('M', '3HP', 'completed_previously_on_art'),
                    `All male completed previously on ART 3HP`
                ),
                this.makeDrilldown(this.aggregate('M', '6H', 'completed_previously_on_art'),
                    `All male completed previously on ART 6H`
                )
            ])
        },
        async setRows(gender: string) {
            for(const i in AGE_GROUPS) {
                const group = AGE_GROUPS[i]
                const cohortData = this.cohort[group][gender]
                const fullGender =  this.formatGender(gender)
                this.rows.push([
                    table.td(group),
                    table.td(fullGender),
                    this.makeDrilldown(cohortData['3HP']['started_new_on_art'],
                        `${group} started new on ART 3HP (${fullGender}s)`
                    ),
                    this.makeDrilldown(cohortData['6H']['started_new_on_art'],
                        `${group} started new on ART 6H (${fullGender}s)`
                    ),
                    this.makeDrilldown(cohortData['3HP']['started_previously_on_art'],
                        `${group} started previously on ART 3HP (${fullGender}s)`
                    ),
                    this.makeDrilldown(cohortData['6H']['started_previously_on_art'],
                        `${group} started previously on ART 6H (${fullGender}s)`
                    ),
                    this.makeDrilldown(cohortData['3HP']['completed_new_on_art'],
                        `${group} completed new on ART 3HP (${fullGender}s)`
                    ),
                    this.makeDrilldown(cohortData['6H']['completed_new_on_art'],
                        `${group} completed new on ART 6H (${fullGender}s)`
                    ),
                    this.makeDrilldown(cohortData['3HP']['completed_previously_on_art'],
                        `${group} completed previously on ART 3HP (${fullGender}s)`
                    ),
                    this.makeDrilldown(cohortData['6H']['completed_previously_on_art'],
                        `${group} completed previously on ART 6H (${fullGender}s)`
                    )
                ])
            }
        }
    }
})
</script>
