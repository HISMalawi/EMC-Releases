<template>
  <base-report-table
    title="PEPFAR Viral Load Coverage Report"
    report-icon="reports/viral_load.png"
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
import { ViralLoadReportService } from "@/apps/ART/services/reports/viral_load_report";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";

export default defineComponent({
  name: "VLCoverage",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender" },
      { path: "tx_curr", label: "TX CURR", drillable: true },
      { path: "due_for_vl", label: "Due for VL", drillable: true },
      { path: "drawn", label: "Sample Drawn", drillable: true },
      { path: "high_vl", label: "High VL (>=1000 copies)", drillable: true },
      { path: "low_vl", label: "Low VL (<1000 copies)", drillable: true },
    ]

    const filterPateints = (patients: any[], gender: string) => {
      return patients.filter(patient => patient.gender === gender);
    }

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new ViralLoadReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getVLCoverage({ application: "emastercard" })
      const gender = ["F", "M"]
      let index = 1;
      const rs: any[] = []
      for(const g of gender) {
        for(const ageGroup of AGE_GROUPS){
          const patients = data[ageGroup]
          const ageGroupExists = ageGroup in data
          rs.push({
            index: index++,
            "age_group": ageGroup,
            gender: g === "F" ? "Female" : "Male",
            "tx_curr": filterPateints(patients['tx_curr'], g).length,
            "due_for_vl": ageGroupExists ? filterPateints(patients['due_for_vl'], g).length : 0,
            "drawn": ageGroupExists ? filterPateints([...patients['drawn']["routine"], ...patients['drawn']["targeted"]], g).length : 0,
            "high_vl": ageGroupExists ? filterPateints([...patients['high_vl']["routine"], ...patients['high_vl']["targeted"]], g).length : 0,
            "low_vl": ageGroupExists ? filterPateints([...patients['low_vl']["routine"], ...patients['low_vl']["targeted"]], g).length : 0,
            patients
          })
        }
      }
      rows.value = rs
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "birthdate", label: "Date of Birth", date: true },
        { path: "gender", label: "Gender"},
      ]
      const patients = data.column.path.match(/drawn|high_vl|low_vl/) 
        ? [...data.row.patients[data.column.path]['routine'], ...data.row.patients[data.column.path]['targeted']]
        : data.row.patients[data.column.path]

      const rows = filterPateints(
        patients, 
        data.row.gender === "Female" ? "F": "M"
      )

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