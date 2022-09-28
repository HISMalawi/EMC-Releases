<template>
  <base-report-table
    title="PEPFAR TB Prev Report"
    report-icon="reports/previous.png"
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
import { TbPrevReportService } from "@/apps/ART/services/reports/tb_prev_report_service";
import { get } from "lodash";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";

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
      { path: "3hp_started_new_art", label: "3H (Started New on ART)", drillable: true },
      { path: "6hp_started_new_art", label: "6H (Started New on ART)", drillable: true },
      { path: "3hp_started_previous_art", label: "3H (Started Previously on ART)", drillable: true },
      { path: "6hp_started_previous_art", label: "6H (Started Previously on ART)", drillable: true },
      { path: "3hp_completed_new_art", label: "3H (Completed New on ART)", drillable: true },
      { path: "6hp_completed_new_art", label: "6H (Completed New on ART)", drillable: true },
      { path: "3hp_completed_previous_art", label: "3H (Completed Previously on ART)", drillable: true },
      { path: "6hp_completed_previous_art", label: "6H (Completed Previously on ART)", drillable: true },
    ]

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new TbPrevReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getTBPrevReport()
      let index = 1;
      const rs: any[] = []
      for(const gender of ["F", "M"]) {
        for(const group of AGE_GROUPS){
          rs.push({
            index: index++,
            "age_group": group,
            gender: gender === "F" ? "Female" : "Male",
            "3hp_started_new_art": get(data[group][gender], '3HP.started_new_on_art', []),
            "6hp_started_new_art": get(data[group][gender], '6H.started_new_on_art', []),
            "3hp_started_previous_art": get(data[group][gender], '3HP.started_previously_on_art', []),
            "6hp_started_previous_art": get(data[group][gender], '6H.started_previously_on_art', []),
            "3hp_completed_new_art": get(data[group][gender], '3H.completed_new_on_art', []),
            "6hp_completed_new_art": get(data[group][gender], '6H.completed_new_on_art', []),
            "3hp_completed_previous_art": get(data[group][gender], '3HP.completed_previously_on_art', []),
            "6hp_completed_previous_art": get(data[group][gender], '6H.completed_previously_on_art', []),
          })
        }
      }
      rows.value = rs
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "tpt_initiation_date", label: "TPT Initiation Date", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) }
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