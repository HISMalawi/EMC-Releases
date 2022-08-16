<template>
  <base-report-table
    title="Users"
    report-icon="patient-type.png"
    :columns="columns"
    :rows="rows"
    :rowActionButtons="rowActionBtns"
    :canExportCSV="false"
    :canExportPDF="false"
    :showRefreshButton="false"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { loader } from "@/utils/loader";
import router from "@/router";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { PatientReportService } from "@/apps/ART/services/reports/patient_report_service";
import { UserService } from "@/services/user_service";
import get from "lodash/get";

export default defineComponent({
  name: "Users",
  components: { BaseReportTable },
  setup() {
    const rows = ref<any[]>([]);
    const columns: TableColumnInterface[] = [
      { path: "username", label: "Username", initialSort: true, initialSortOrder: 'asc' },
      { path: "given_name", label: "First name" },
      { path: "family_name", label: "Last name" },
      { path: "role", label: "Roles" },
      { path: "deactivated_on", label: "Deactivated On", date: true },
    ]

    const rowActionBtns: RowActionButtonInterface[] = [{ 
      label: "Select", 
      default: true, 
      action: (row) => {
        router.push(`/emc/patient/${row['patient_id']}`)
      } 
    }]

    const loadUsers = async () => {
      UserService.getAllUsers({paginate: false}).then(users => {
        rows.value = users.map((user: any) => {
          return {
            "given_name": get(user, 'person.names[0].given_name', 'Unknown'),
            "family_name": get(user, 'person.names[0].family_name', 'Unknown'),
            "role": user.roles.map((r: any) => r.role).join(', '),
            ...user,
          }
        })
        console.log(rows.value)
      })
    }

    onMounted(async () => {
      loadUsers()
    })

    return {
      rows,
      columns,
      rowActionBtns,
    }
  }
})
</script>