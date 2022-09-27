<template>
  <base-report-table 
    :title="title" 
    report-icon="reports/stats.png" 
    :columns="columns" 
    :rows="rows" 
    :period="period" 
    useDateRangeFilter 
    @custom-filter="getData"
    @drilldown="onDrilldown"
    @regenerate="onRegenerate"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { ClinicReportService } from "@/apps/ART/services/reports/clinic_report_service";
import { Patientservice } from "@/services/patient_service";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { modal } from "@/utils/modal";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";

export default defineComponent({
  name: "TptOutcomes",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const title = ref("TPT Outcomes Clinic Report");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "number", label: "#", initialSort: true, initialSortOrder: 'asc' },
      { path: "age_group", label: "Age Group", exportable: false },
      { path: "tpt_type", label: "TPT Type", exportable: false },
      { path: "started_tpt", label: "Started TPT", drillable: true, sortable: false },
      { path: "completed_tpt", label: "Completed TPT", drillable: true, sortable: false },
      { path: "not_completed_tpt", label: "Not completed TPT", drillable: true, sortable: false },
      { path: "died", label: "Died", drillable: true, sortable: false },
      { path: "defaulted", label: "Defaulted", drillable: true, sortable: false },
      { path: "stopped", label: "Stopped ART", drillable: true, sortable: false },
      { path: "transfer_out", label: "Transfered Out", drillable: true, sortable: false },
      { path: "confirmed_tb", label: "Confirmed TB", drillable: true, sortable: false },
      { path: "pregnant", label: "Pregnant", drillable: true, sortable: false },
    ]

    const getData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new ClinicReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any[] = await report.getTtpOutcomes() || []
      rows.value = data.sort((a, b) => a.tpt_type > b.tpt_type ? 1 : 0).map((_data, index) => ({
        ..._data,
        number: index
      }))
      await loader.hide();
    }

    const onRegenerate = async () => {
      const [ start, end ] = period.value.split('-')
      if(start && end ) {
        getData({dateRange: {
          startDate: dayjs(start).format("YYYY-MM-DD"), 
          endDate: dayjs(end).format("YYYY-MM-DD")
        }})
      }
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "birthdate", label: "Date of Birth", formatter: (date) => dayjs(date).format(DISPLAY_DATE_FORMAT)},
        { path: "gender", label: "Gender", formatter: (gender) => toGenderString(gender) },
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
      title,
      columns,
      period,
      getData,
      onDrilldown,
      onRegenerate,
    }
  }
})
</script>