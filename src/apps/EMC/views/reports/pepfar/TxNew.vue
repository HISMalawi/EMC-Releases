<template>
  <base-report-table 
    title="PEPFAR TX New Report" 
    report-icon="reports/px.png" 
    report-type="PEPFAR"
    :columns="columns" 
    :rows="rows" 
    :period="period" 
    useDateRangeFilter 
    @custom-filter="fetchData" 
    @drilldown="onDrilldown"
    @regenerate="fetchData" 
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
import HisDate from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { TxReportService } from "@/apps/ART/services/reports/tx_report_service";
import { toastWarning } from "@/utils/Alerts";
import { uniq } from "lodash";

const report = new TxReportService();
const period = ref("");
const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "age_group", label: "Age group" },
  { path: "gender", label: "Gender", formatter: toGenderString },
  { path: "cd4_less_than_200", label: "Tx new CD4 < 200", drillable: true },
  { path: "cd4_greater_than_equal_to_200", label: "Tx new CD4 >= 200", drillable: true },
  { path: "cd4_unknown_or_not_done", label: "Tx new CD4 Unknown", drillable: true },
  { path: "transfer_in", label: "Transfer-ins", drillable: true },
]

async function fetchData (filters?: Record<string, any>) {
  if(filters){
    report.setStartDate(filters?.dateRange.startDate)
    report.setEndDate(filters?.dateRange.endDate)
    period.value = report.getDateIntervalPeriod()
  }
  if(!period.value) {
    return toastWarning("Invalid report period");
  }
  await loader.show();
  const data = await report.getTxNewReport();
  const disaggregatedData = getDisaggregatedData(data);
  rows.value = buildRows(disaggregatedData)
  rows.value.push(...(await buildMaternityRows(disaggregatedData.F.aggregate)))
  await loader.hide();
}

function getDisaggregatedData(data: Array<any>){
  const GENDER_MAP: any = { F: "Female", M: "Male" }
  return data.reduce((a: any, c: any) => {
    if (c.age_group ==='Unknown') return a
    a[c.gender].rows.push({ ...c, gender: GENDER_MAP[c.gender as any] })
    a[c.gender].aggregate = Object.keys(c).reduce((a: any, k: any) => {
      if(Array.isArray(c[k])) {
        return { ...a, [k] : [...a[k] || [], ...c[k]]}
      }
      return a
    }, a[c.gender].aggregate)
    return a
  },
  { 
    M: { rows: [], aggregate: {} },
    F: { rows: [], aggregate: {} }
  })
}

function buildRows(disagregatedData: Record<string, any>) {
  return [
    ...disagregatedData.F.rows,
    ...disagregatedData.M.rows,
    {
      age_group: "All",
      gender: "Male",
      ...disagregatedData.M.aggregate
    }
  ]
}

async function buildMaternityRows(aggregatedFemales: Record<string, any>) {
  const allFemales = Object.values(aggregatedFemales).flat(1);
  const mStatus = await report.getMaternalStatus(uniq(allFemales))
  const allFp = mStatus.FBf.concat(mStatus.FP);
  return ['FP', 'FNP', 'FBf'].map(gender => 
    Object.keys(aggregatedFemales).reduce((a: any, k: any) => ({
      ...a, [k]: aggregatedFemales[k].filter(
          (id: number) => gender === 'FNP' 
              ? !allFp.includes(id)
              : mStatus[gender].includes(id)
      )
    }), 
    {
      age_group: "All", 
      gender 
    })
  )
}

async function onDrilldown(data: { column: TableColumnInterface; row: any }) {
  const columns: TableColumnInterface[] = [
    { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
    { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
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