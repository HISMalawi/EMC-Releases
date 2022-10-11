<template>
  <base-report-table
    title="MoH TPT Initiation Report"
    report-icon="reports/new_initiation.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="fetchData"
    @drilldown="onDrilldown"
    @regenerate="onRegenerate"
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
import { RegimenReportService } from "@/apps/ART/services/reports/regimen_report_service";
import dayjs from "dayjs";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";

export default defineComponent({
  name: "TptInitiation",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "index", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "Location", label: "District" },
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "3hp_started_new_art", label: "3H (Started New on ART)", drillable: true },
      { path: "6hp_started_new_art", label: "6H (Started New on ART)", drillable: true },
      { path: "3hp_started_previous_art", label: "3H (Started Previously on ART)", drillable: true },
      { path: "6hp_started_previous_art", label: "6H (Started Previously on ART)", drillable: true },
    ]

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new RegimenReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getTptNewInitiations()
      let index = 1;
      const rs: any[] = []
      for(const gender of ["F", "M"]) {
        for(const group of AGE_GROUPS){
          rs.push({
            index: index++,
            "age_group": group,
            gender: gender === "F" ? "Female" : "Male",
            "3hp_started_new_art": data[group]["3HP_new"][gender],
            "6hp_started_new_art": data[group]["6H_new"][gender],
            "3hp_started_previous_art": data[group]["3HP_prev"][gender],
            "6hp_started_previous_art": data[group]["6H_prev"][gender],
          })
        }
      }
      rows.value = rs
      await loader.hide();
    }

    const onRegenerate = async () => {
      const [ start, end ] = period.value.split('-')
      if(start && end ) {
        fetchData({dateRange: {
          startDate: dayjs(start).format("YYYY-MM-DD"), 
          endDate: dayjs(end).format("YYYY-MM-DD")
        }})
      }
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const formatter = (v: any) => dayjs(v).format(DISPLAY_DATE_FORMAT) 
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "dispensation_date", label: "Dispensation Date", formatter },
        { path: "art_start_date", label: "Art Start Date", formatter },
        { path: "tpt_start_date", label: "TPT Start Date",formatter }
      ]
      const rows = get(data, `row.${data.column.path}`, [])

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
      onRegenerate,
    }
  }
})
</script>