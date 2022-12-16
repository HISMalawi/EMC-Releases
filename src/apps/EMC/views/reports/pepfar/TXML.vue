<template>
  <base-report-table
    title="PEPFAR TX ML Report"
    subtitle="Clients that were Alive and on treatment before the reporting period and their “next appointment date / drug runout” date falls within the reporting period. 30 or more days have gone between their appointment date and the end of the reporting period without any clinical dispensation visit"
    report-icon="reports/tx-ml.png"
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
import { txMlIndicators, TxReportService } from "@/apps/ART/services/reports/tx_report_service";
import { Patientservice } from "@/services/patient_service";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "TBPrev",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      ...txMlIndicators.map(indicator => ({ path: indicator, label: indicator, drillable: true })),
    ]

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new TxReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getTxMlReport();
      rows.value = report.buildTxMlReportData(data);
      rows.value.push(report.getAggregatedTxMLMaleData(data))
      rows.value.push(...(await report.getAggregatedTxMLMaternalStatus(data)))
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" }
      ]

      const drillRows = ref<any[]>([])
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