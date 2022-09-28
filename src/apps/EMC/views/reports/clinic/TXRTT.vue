<template>
  <base-report-table
    title="Clinic TX RTT Report"
    report-icon="reports/restart.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { get, uniq } from "lodash";
import { TxReportService } from "@/apps/ART/services/reports/tx_report_service";
import { Patientservice } from "@/services/patient_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";

export default defineComponent({
  name: "TBPrev",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const report = new TxReportService()
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender" },
      { path: "return_less_than_3_mo", label: "Returned <3 mo", drillable: true },
      { path: "return_by_3_to_5_mo", label: "Returned 3-5 mo", drillable: true },
      { path: "return_6_plus_mo", label: "Returned 6+ mo", drillable: true },
    ]

    const sortData = (ls: Array<any>, comparator: Function) => {
      return ls.filter(i => comparator(i.months)).map(i => i.patient_id)
    }

    const buildRows = async (data: any, gender: "M" | "F", index: number) => {
      for(const group of AGE_GROUPS){
        const patients = get(data, `${group}.${gender}`, []);
        rows.value.push({
          gender: toGenderString(gender),
          index: index++,
          "age_group": group,
          "return_less_than_3_mo": sortData(patients, (months: number) => months < 3),
          "return_by_3_to_5_mo": sortData(patients, (months: number) => months >= 3 && months < 6),
          "return_6_plus_mo": sortData(patients, (months: number) => months >= 6),
        })
      }
    } 

    const reducer = (rows: any[], column: string, gender: "Male" | "Female") => {
      return rows.filter(row => row.gender === gender)
        .reduce((acc, curr) => acc.concat(curr[column]), [])
    }

    const buildAllMalesRow = (data: any[], index: number) => {
      rows.value.push({
        index: index++,
        gender: 'Male',
        'age_group': 'All',
        "return_less_than_3_mo": reducer(data, 'return_less_than_3_mo', "Male"),
        "return_by_3_to_5_mo": reducer(data, 'return_by_3_to_5_mo', "Male"),
        "return_6_plus_mo": reducer(data, 'return_6_plus_mo', "Male"),
      })
    }

    const buildAllFemaleRows = async (data: any[], index: number) => {
      const columns = ['return_less_than_3_mo', 'return_by_3_to_5_mo', 'return_6_plus_mo']
      const categories = ['FP', 'FNP', 'FBf']
      const allFemales: number[] = uniq(columns.map(column => reducer(data, column, 'Female')).reduce((a, c) => a.concat(c), []))
      const maternalStatus = await report.getMaternalStatus(allFemales)
      const allFp = maternalStatus.FBf.concat(maternalStatus.FP)

      const buildColumn = (column: string, category: string) => reducer(data, column, "Female").filter((id: number) => {
        if(category === 'FNP') return !allFp.includes(id)
        return maternalStatus[category].includes(id)
      })

      for (const category of categories) {
        const row: Record<string, any> = {
          index: index++,
          gender: category,
          "age_group": "All",
        }
        columns.forEach(column => row[column] = buildColumn(column, category))
        rows.value.push(row)
      }
    }

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      loader.show()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getClinicTxRtt()
      rows.value = [];
      buildRows(data, "F", 1)
      buildRows(data, "M", 21)
      buildAllMalesRow(rows.value, 41)
      await buildAllFemaleRows(rows.value, 42)
      await loader.hide()
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" }
      ]
      const patients = data.row[data.column.path]
      const rows: any[] = []
      for(const patient of patients) {
        const data = await Patientservice.findByID(patient)
        const p = new Patientservice(data)
        rows.push({
          "arv_number": p.getArvNumber(),
          "birthdate": p.getBirthdate(),
          "gender": p.getGender(),
          "address": `${p.getCurrentVillage()}`
        })
      }

      await modal.show(DrilldownTableVue, {
        title: `${data.row.age_group} ${data.column.label} ${data.row.gender}s`,
        columns,
        rows,
      })
    }

    return {
      rows,
      columns,
      period,
      fetchData,
      onDrilldown,
    }
  }
})
</script>