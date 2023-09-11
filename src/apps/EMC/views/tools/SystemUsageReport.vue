<template>
  <base-report-table
    title="User System Usage Report"
    report-icon="reports/line-chart.png"
    :columns="columns"
    :rows="rows"
    :period="period"
    useDateRangeFilter
    @custom-filter="getData"
    @regenerate="getData"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { loader } from "@/utils/loader";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { TableColumnInterface } from "@uniquedj95/vtable";
import HisDate from "@/utils/Date";
import { toastWarning } from "@/utils/Alerts";
import { computed } from "vue";
import { UserService } from "@/services/user_service";


const startDate = ref("");
const endDate = ref("");
const period = computed(() => {
  if (startDate.value && endDate.value) {
    return `${HisDate.toStandardHisDisplayFormat(startDate.value)} - 
      ${HisDate.toStandardHisDisplayFormat(endDate.value)}`
  }
  return ''
})

const rows = ref<any[]>([]);
const columns: TableColumnInterface[] = [
  { path: "given_name", label: "First name" },
  { path: "family_name", label: "Last name" },
  { path: "role", label: "Role" },
  { path: "registered_on", label: "Registered on", formatter: HisDate.toStandardHisDisplayFormat },
  { path: "encounters", label: "Encounters Created" },
]

const getData = async (filters?: Record<string, any>) => {
  if(filters && "dateRange" in filters) {
    startDate.value = filters.dateRange.startDate;
    endDate.value = filters.dateRange.endDate;
  }

  if(!startDate.value && !endDate.value) return toastWarning("Invalid report date");
  loader.show()
  try{
    rows.value = await UserService.getSystemUsageByUsers(startDate.value, endDate.value);
  } catch (e) {
    toastWarning("Failed to load report data");
    console.error(e)
  }
  loader.hide();
}
</script>