<template>
  <base-report-table
    title="PEPFAR TX RTT Report"
    subtitle="Clients that have their clinical dispensation visit falling in the reporting period and there is a difference of 30 or more days between their visit date and their previous appointment date / runout date"
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
import { get } from "lodash";
import { TxReportService } from "@/apps/ART/services/reports/tx_report_service";
import { Patientservice } from "@/services/patient_service";

export default defineComponent({
  name: "TBPrev",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender" },
      { path: "return_less_than_3_mo.total", label: "Returned <3 mo", drillable: true },
      { path: "return_by_3_to_5_mo.total", label: "Returned 3-5 mo", drillable: true },
      { path: "return_6_plus_mo.total", label: "Returned 6+ mo", drillable: true },
    ]

    const makeCell = (patients: any[]) => ({
      total: patients.length,
      patients,
    })

    const sortData = (ls: Array<any>, comparator: Function) => {
      return ls.filter(i => comparator(i.months)).map(i => i.patient_id)
    }

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new TxReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getTxRttReport()
      let index = 1;
      const rs: any[] = []
      for(const gender of ["F", "M"]) {
        for(const group of AGE_GROUPS){
          const ageGroupExists = group in data;
          const row: Record<string, any> = {
            index: index++,
            "age_group": group,
            gender: gender === "F" ? "Female" : "Male",
          }
          if(ageGroupExists) {
            const patients = data[group][gender];
            row["return_less_than_3_mo"] = makeCell(sortData(patients, (months: number) => months < 3))
            row["return_by_3_to_5_mo"] = makeCell(sortData(patients, (months: number) => months >= 3 && months < 6))
            row["return_6_plus_mo"] = makeCell(sortData(patients, (months: number) => months >= 6))
          } else {
            row["return_less_than_3_mo"] = makeCell([])
            row["return_by_3_to_5_mo"] = makeCell([])
            row["return_6_plus_mo"] = makeCell([])
          }
          rs.push(row)
        }
      }
      rows.value = rs
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "birthdate", label: "Date of Birth", date: true },
        { path: "gender", label: "Gender" },
        { path: "address", label: "Address" }
      ]
      const column = data.column.path.split(".")[0]
      const patients = data.row[column].patients
      const rows: any[] = []
      for(const patient of patients) {
        const data = await Patientservice.findByID(patient)
        const p = new Patientservice(data)
        rows.push({
          "arv_number": p.getArvNumber(),
          "birthdate": p.getBirthdate(),
          "gender": p.getGender(),
          "address": `${p.getCurrentDistrict()}, ${p.getCurrentTA()}, ${p.getCurrentVillage()}, ${p.getClosestLandmark()}`
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