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
import { TableColumnInterface } from "@uniquedj95/vtable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { ViralLoadReportService } from "@/apps/ART/services/reports/viral_load_report";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { get } from "lodash";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "VLCoverage",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
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
      let index = 1;
      const rs: any[] = []
      for(const gender of ["F", "M"]) {
        for(const group of AGE_GROUPS){
          rs.push({
            index: index++,
            "age_group": group,
            gender: gender === "F" ? "Female" : "Male",
            "tx_curr": filterPateints(get(data, `${group}.tx_curr`, []), gender),
            "due_for_vl": filterPateints(get(data, `${group}.due_for_vl`, []), gender),
            "drawn": filterPateints([...get(data, `${group}.drawn.routine`, []), ...get(data, `${group}.drawn.targeted`, [])], gender),
            "high_vl": filterPateints([...get(data, `${group}.high_vl.routine`, []), ...get(data, `${group}.high_vl.targeted`, [])], gender),
            "low_vl": filterPateints([...get(data, `${group}.low_vl.routine`, []), ...get(data, `${group}.low_vl.targeted`, [])], gender),
          })
        }
      }
      rows.value = rs
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender"},
      ]
      
      const rows = data.row[data.column.path]

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