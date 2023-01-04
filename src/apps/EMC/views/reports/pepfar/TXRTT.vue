<template>
  <base-report-table
    title="PEPFAR TX RTT Report"
    subtitle="Clients that have their clinical dispensation visit falling in the reporting period and there is a difference of 30 or more days between their visit date and their previous appointment date / runout date"
    report-icon="reports/restart.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    :show-refresh-button="false"
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
    showIndices
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
import { TxRttReportService } from "@/apps/ART/services/reports/tx_rtt_report_service";

export default defineComponent({
  name: "TBPrev",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "<3 months", label: "Returned <3 mo", drillable: true },
      { path: "3-5 months", label: "Returned 3-5 mo", drillable: true },
      { path: "6+ months", label: "Returned 6+ mo", drillable: true },
    ]

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new TxRttReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getTxRttReport()
      rows.value = report.buildReportData(data)
      rows.value.push(report.getAggregatedMaleData())
      rows.value.push(...(await report.getAggregatedMaternalStatus()))
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" }
      ]

      const drillRows = ref<Array<any>>([]);
      const fetchDrilldownData = async () => {
        for(const patient of data.row[data.column.path]) {
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