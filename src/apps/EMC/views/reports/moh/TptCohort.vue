<template>
  <base-report-table 
    title="MoH TPT Cohort Report"
    report-icon="reports/cohort.png" 
    :columns="columns" 
    :rows="rows" 
    :period="period" 
    useDateRangeFilter 
    showIndices 
    @custom-filter="fetchData" 
    @drilldown="onDrilldown" 
    @regenerate="onRegenerate" 
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { Patientservice } from "@/services/patient_service";
import dayjs from "dayjs";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import { toGenderString } from "@/utils/Strs";
import { sortByARV } from "@/apps/EMC/utils/common";
import { TptReportService } from "@/apps/ART/services/reports/tpt_report_service";
import { useRouter } from "vue-router";
import usePatientStore from "@/apps/EMC/composables/usePatientStore"

export default defineComponent({
  name: "TptCohort",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const { getPatient } = usePatientStore();
    const columns: TableColumnInterface[] = [
      { path: "age_group", label: "Age group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { label: "Initiated ART", path: "initiated_art", drillable: true },
      { label: "Initiated TPT", path: "started_tpt", drillable: true },
      { label: "Completed TPT", path: "completed_tpt", drillable: true },
      { label: "Died", path: "died", drillable: true },
      { label: "Defaulted", path: "defaulted", drillable: true },
      { label: "Stopped ART", path: "stopped", drillable: true },
      { label: "TO", path: "transfer_out", drillable: true },
      { label: "Confirmed TB", path: "confirmed_tb", drillable: true },
      { label: "Pregnant", path: "pregnant", drillable: true }
    ]

    const sortByGender = (data: Array<any>) => {
      return data.sort((row1, row2) => row1.gender > row2.gender ? 1 :
        row1.gender < row2.gender ? -1 : 0
      )
    }

    const fetchData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new TptReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data = await report.getCohort();
      rows.value = sortByGender(data);
      await loader.hide();
    }

    const onRegenerate = async () => {
      const [start, end] = period.value.split('-')
      if (start && end) {
        fetchData({
          dateRange: {
            startDate: dayjs(start).format("YYYY-MM-DD"),
            endDate: dayjs(end).format("YYYY-MM-DD")
          }
        })
      }
    }

    const onDrilldown = async (data: { column: TableColumnInterface; row: any }) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true, initialSortOrder: 'asc' },
        { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" }
      ]
      const rowActionButtons: RowActionButtonInterface[] = [{
        label: "show",
        action: ({ patientId }) => useRouter().push(`/emc/patient/${ patientId }`)
      }];
      const patients = data.row[data.column.path]
      const rows = ref<Array<any>>([])
      const loadPatientDetails = async () => {
        for (const patient of patients) {
          const p = await getPatient(patient)
          rows.value.push({
            "arv_number": p.getArvNumber(),
            "birthdate": p.getBirthdate(),
            "gender": p.getGender(),
            "address": `${p.getCurrentVillage()}`,
            "patientId": p.getID()
          })
        }
      }

      loadPatientDetails();
      await modal.show(DrilldownTableVue, {
        title: `${data.row.age_group} ${data.column.label} ${data.row.gender}s`,
        rows: rows.value,
        rowActionButtons,
        columns,
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