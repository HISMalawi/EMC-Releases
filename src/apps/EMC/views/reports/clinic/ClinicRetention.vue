<template>
  <base-report-table 
    :title="title" 
    report-icon="reports/retention.png" 
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
import { TableColumnInterface } from "@uniquedj95/vtable";
import { Patientservice } from "@/services/patient_service";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { modal } from "@/utils/modal";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";
import HisDate from "@/utils/Date";
import { sortByARV } from "@/apps/EMC/utils/common"; 
import { AGE_GROUPS, PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import { get } from "lodash";

export default defineComponent({
  name: "ClinicRetention",
  components: { BaseReportTable },
  setup() {
    const { toStandardHisDisplayFormat } = HisDate
    const period = ref("");
    const title = ref("Clinic Retention Report");
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "age_group", label: "Age Group" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "initiated_1", label: "Initiated one month", drillable: true, sortable: false },
      { path: "completed_1", label: "Completed one month", drillable: true, sortable: false },
      { path: "initiated_3", label: "Initiated Three months", drillable: true, sortable: false },
      { path: "completed_3", label: "Completed Three months", drillable: true, sortable: false },
      { path: "initiated_6", label: "Initiated Six months", drillable: true, sortable: false },
      { path: "completed_6", label: "Completed Six months", drillable: true, sortable: false },
    ]

    const getValue = (cohort: Record<string, any>, month: string, gender: string, group: string, prop: 'all' | 'retained') => {
      return (get(cohort, `${month}.${prop}`, []) as any[])
        .filter((d: any) => d.gender === gender && d.age_group === group)
        .map((d: any) => d.patient_id);
    }

    const buildRows = (cohort: Record<string, any>, genders = ["F", "M"]) => {
      const rows = [] as Array<any>;
      genders.forEach(gender => {
        AGE_GROUPS.forEach(age_group => {
          const row: Record<string, any> = { age_group, gender }
          Object.keys(cohort).forEach(month => {
            row[`initiated_${month}`] = getValue(cohort, month, gender, age_group, "all");
            row[`completed_${month}`] = getValue(cohort, month, gender, age_group, "retained");
          })
          rows.push(row)
        })
      })
      return rows;
    }

    const getData = async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new PatientReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any[] = await report.getClientRentention();
      rows.value = buildRows(data);
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
        { path: "arv_number", label: "ARV Number", preSort: sortByARV, initialSort: true },
        { path: "birthdate", label: "Date of Birth", formatter: toStandardHisDisplayFormat },
        { path: "gender", label: "Gender", formatter: toGenderString },
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
