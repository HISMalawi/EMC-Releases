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
import { TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { modal } from "@/utils/modal";
import DrilldownTableVue from "@/apps/EMC/Components/tables/DrilldownTable.vue";
import { AGE_GROUPS } from "@/apps/ART/services/reports/patient_report_service";
import { get } from "lodash";
import { TxReportService } from "@/apps/ART/services/reports/tx_report_service";
import { Patientservice } from "@/services/patient_service";

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
      { path: "died.total", label: "Died", drillable: true },
      { path: "iit_less_than_3_mo.total", label: "IIT <3 mo", drillable: true },
      { path: "iit_3_to_5_mo.total", label: "IIT 3-5 mo", drillable: true },
      { path: "iit_6_plus_mo.total", label: "IIT 6+ mo", drillable: true },
      { path: "transferred_out.total", label: "Transferred out", drillable: true },
      { path: "refused.total", label: "Refused (Stopped)", drillable: true },
    ]

    const makeCell = (patients: any[]) => ({
      total: patients.length,
      patients,
    })

    const fetchData =  async ({ dateRange }: Record<string, any>) => {
      await loader.show()
      const report = new TxReportService()
      report.setStartDate(dateRange.startDate)
      report.setEndDate(dateRange.endDate)
      period.value = report.getDateIntervalPeriod()
      const data: any = await report.getTxMlReport()
      let index = 1;
      const rs: any[] = []
      for(const gender of ["F", "M"]) {
        for(const group of AGE_GROUPS){
          const exists = group in data && gender in data[group]
          rs.push({
            "index": index++,
            "age_group": group,
            "gender": gender === "F" ? "Female" : "Male",
            "died": exists ? makeCell(data[group][gender][0]) : makeCell([]),
            "iit_less_than_3_mo": exists ? makeCell(data[group][gender][1]) : makeCell([]),
            "iit_3_to_5_mo": exists ? makeCell(data[group][gender][2]) : makeCell([]),
            "iit_6_plus_mo": exists ? makeCell(data[group][gender][3]) : makeCell([]),
            "transferred_out": exists ? makeCell(data[group][gender][4]) : makeCell([]),
            "refused": exists ? makeCell(data[group][gender][5]) : makeCell([]),
          })
        }
      }
      rows.value = rs
      await loader.hide();
    }

    const onDrilldown = async (data: {column: TableColumnInterface; row: any}) => {
      const columns: TableColumnInterface[] = [
        { path: "arv_number", label: "ARV Number", initialSort: true, initialSortOrder: 'asc' },
        { path: "birthdate", label: "Date of Birth", date: true },
        { path: "gender", label: "Gender" },
        { path: "address", label: "Address" }
      ]
      const column = data.column.path.split(".")[0]
      const patients = data.row[column].patients
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
      columns,
      period,
      fetchData,
      onDrilldown,
    }
  }
})
</script>