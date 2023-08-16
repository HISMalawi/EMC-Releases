<template>
  <base-report-table 
    title="PEPFAR TX TB Report" 
    report-icon="reports/tb.png" 
    :columns="columns" 
    :rows="rows" 
    :period="period" 
    useDateRangeFilter 
    @custom-filter="fetchData" 
    @drilldown="onDrilldown"
    @regenerate="fetchData(undefined, true)" 
    showIndices 
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { Patientservice } from "@/services/patient_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { TxTbReportService, indicators } from "@/apps/ART/services/reports/tx_tb_report_service";

const report = new TxTbReportService()
const period = ref("-");
const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "age_group", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toGenderString },
  ...Object.entries(indicators).map(([path, label])=> ({ path, label, drillable: true })),
]

const fetchData = async (filters?: Record<string, any>, rebuildOutcome = false) => {
  await loader.show()
  if(filters){
    report.setStartDate(filters?.dateRange.startDate)
    report.setEndDate(filters?.dateRange.endDate)
    period.value = report.getDateIntervalPeriod()
  }
  rows.value = await report.getTxTbReport(rebuildOutcome);
  rows.value.push(report.getAggregatedMaleData())
  rows.value.push(...(await report.getAggregatedMaternalStatus()))
  await loader.hide();
}

const onDrilldown = async (data: { column: TableColumnInterface; row: any }) => {
  const columns: TableColumnInterface[] = [
    { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
    { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
    { path: "gender", label: "Gender", formatter: toGenderString },
    { path: "address", label: "Address" }
  ]

  const drillRows = ref<any[]>([])
  const fetchDrilldownData = async () => {
    for (const patient of data.row[data.column.path]) {
      const data = await Patientservice.findByID(patient)
      const p = new Patientservice(data)
      drillRows.value.push({
        "arv_number": p.getArvNumber(),
        "birthdate": p.getBirthdate(),
        "gender": p.getGender(),
        "address": `${p.getCurrentVillage()}`
      })
    }
  }

  fetchDrilldownData();

  await modal.show(DrilldownTableVue, {
    columns,
    rows: drillRows.value,
    title: `${data.row.age_group} ${data.column.label} ${data.row.gender}s`,
  })
}
</script>