<template>
  <base-report-table
    title="Clients Due For Viral Load Clinic Report"
    report-icon="reports/viral_load.png"
    report-type="Clinic"
    :columns="columns"
    :rows="rows"
    :period="period"
    :rowActionButtons="rowActionBtns"
    useSecureExport
    useDateRangeFilter
    @custom-filter="getData"
    @regenerate="getData"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@uniquedj95/vtable";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import HisDate from "@/utils/Date";
import { sortByARV } from "@/apps/EMC/utils/common";
import { toastWarning } from "@/utils/Alerts";
import { toGenderString } from "@/utils/Strs";

export default defineComponent({
  name: "ClientsDueForVL",
  components: { BaseReportTable },
  setup() {
    const period = ref("-");
    const rows = ref<any[]>([]);
    const report = new PatientReportService();
    const columns: TableColumnInterface[] = [
      { path: "arv_number", label: "ARV #", preSort: sortByARV, initialSort: true, initialSortOrder: "asc" },
      { path: "given_name", label: "First name", exportable: false },
      { path: "family_name", label: "Last name", exportable: false },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Age", formatter: (v) => v ? HisDate.calculateAge(v) : "" },
      { path: "appointment_date", label: "App.", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "start_date", label: "Art started", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "months_on_art", label: "Months on ART" },
      { path: "mile_stone", label: "Milestone", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "last_result_order_date", label: "Ordered", formatter: HisDate.toStandardHisDisplayFormat },
      { path: "last_result", label: "Result" },
      { path: "last_result_date", label: "Released", formatter: HisDate.toStandardHisDisplayFormat },
    ]

    const getData = async (config?: Record<string, any>) => {
      if (config && "dateRange" in config) {
        const {startDate, endDate} = config.dateRange;
        report.setStartDate(startDate);
        report.setEndDate(endDate);
        period.value = report.getDateIntervalPeriod()
      }
      if (period.value === '-') return toastWarning("Invalid report period");
      loader.show()
      rows.value = await report.getClientsDueForVl();
      loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [{ 
      label: "Select", 
      default: true, 
      action: (row) => {
        router.push(`/emc/patient/${row['patient_id']}`)
      } 
    }]

    return {
      rows,
      columns,
      rowActionBtns,
      period,
      getData,
    }
  }
})
</script>
