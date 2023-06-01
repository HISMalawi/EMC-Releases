<template>
  <base-report-table 
    :title="title" 
    report-icon="reports/stats.png" 
    :columns="columns" 
    :rows="rows" 
    :period="period" 
    :show-indices="true"
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
import { TableColumnInterface } from "@uniquedj95/vtable";
import { ClinicReportService } from "@/apps/ART/services/reports/clinic_report_service";
import { Patientservice } from "@/services/patient_service";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { modal } from "@/utils/modal";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import HisDate from "@/utils/Date";
import { sortByARV } from "@/apps/EMC/utils/common"; 

export default defineComponent({
  name: "TptOutcomes",
  components: { BaseReportTable },
  setup() {
    const period = ref("");
    const title = ref("TPT Outcomes Clinic Report");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "age_group", label: "Age Group" },
      { path: "tpt_type", label: "TPT Type" },
      { path: "started_tpt", label: "Started TPT", drillable: true, sortable: false },
      { path: "completed_tpt", label: "Completed TPT", drillable: true, sortable: false },
      { path: "not_completed_tpt", label: "Not completed TPT", drillable: true, sortable: false },
      { path: "died", label: "Died", drillable: true, sortable: false },
      { path: "defaulted", label: "Defaulted", drillable: true, sortable: false },
      { path: "stopped", label: "Stopped ART", drillable: true, sortable: false },
      { path: "transfer_out", label: "Transfered Out", drillable: true, sortable: false },
      { path: "confirmed_tb", label: "Confirmed TB", drillable: true, sortable: false },
      { path: "pregnant", label: "Pregnant", drillable: true, sortable: false },
      { path: "breast_feeding", label: "Breastfeeding", drillable: true, sortable: false },
      { path: "skin_rash", label: "Skin rash", drillable: true, sortable: false },
      { path: "peripheral_neuropathy", label: "Peripheral neuropathy", drillable: true, sortable: false },
      { path: "yellow_eyes", label: "Yellow eyes", drillable: true, sortable: false },
      { path: "nausea", label: "Nausea", drillable: true, sortable: false },
      { path: "dizziness", label: "Dizziness", drillable: true, sortable: false },
    ]

    const getData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new ClinicReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any[] = await report.getTtpOutcomes() || []
      rows.value = data.sort((a, b) => a.tpt_type > b.tpt_type ? 1 : 0)
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
        { path: "arvNumber", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "gender", label: "Gender", formatter: toGenderString },
        { path: "address", label: "Address" },
        { path: "artStartDate", label: "Art Start Date", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "tptStartDate", label: "TPT Initiation Date", formatter: HisDate.toStandardHisDisplayFormat },
        { path: "tptCompleteDate", label: "TPT Completion Date", formatter: HisDate.toStandardHisDisplayFormat },
      ]
      const patients = data.row[data.column.path]
      const rows = ref<Array<any>>([])
      for(const patient of patients) {
        Patientservice.findByID(patient).then(data => {
          const p = new Patientservice(data)
          rows.value.push({
            "arvNumber": p.getArvNumber(),
            "birthdate": p.getBirthdate(),
            "gender": p.getGender(),
            "address": `${p.getCurrentVillage()}`,
            artStartDate: data.art_start_date,
            tptStartDate: data.tpt_status?.tpt_init_date,
            tptCompleteDate: data.tpt_status?.tpt_complete_date,
          })
        })
      }

      await modal.show(DrilldownTableVue, {
        title: `${data.row.age_group} ${data.column.label} ${data.row.gender}s`,
        columns,
        rows: rows.value,
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
