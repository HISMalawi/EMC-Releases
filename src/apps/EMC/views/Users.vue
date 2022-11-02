<template>
  <base-report-table
    title="Users"
    report-icon="patient-type.png"
    :columns="columns"
    :rows="rows"
    :rowActionButtons="rowActionBtns"
    :action-buttons="actionBtns"
    :canExportCsv="false"
    :canExportPDF="false"
    :showRefreshButton="false"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import BaseReportTable from "@/apps/EMC/Components/tables/BaseReportTable.vue";
import { ActionButtonInterface, RowActionButtonInterface, TableColumnInterface } from '@uniquedj95/vtable';
import { UserService } from "@/services/user_service";
import get from "lodash/get";
import { alertConfirmation, toastSuccess, toastWarning } from "@/utils/Alerts";
import { personRemove, personAdd, pencil } from "ionicons/icons";
import { modal } from "@/utils/modal";
import UserModalVue from "../Components/modals/UserModal.vue";
import { User } from "@/interfaces/user";
import HisDate from "@/utils/Date";
import { isEmpty } from "lodash";

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
      { path: "deactivated_on", label: "Deactivated On", formatter: HisDate.toStandardHisDisplayFormat },
    ]

    const toSummaryDetails = (user: User) => ({
      "given_name": get(user, 'person.names[0].given_name', 'Unknown'),
      "family_name": get(user, 'person.names[0].family_name', 'Unknown'),
      "role": user.roles.map((r: any) => r.role).join(', '),
      ...user,
    })

    const rowActionBtns: RowActionButtonInterface[] = [
      { 
        icon: pencil,
        action: async (row: any) => {
          const updatedUser = await modal.show(UserModalVue, { user: row })
          if(isEmpty(updatedUser)) return
          Object.assign(row, toSummaryDetails(updatedUser))
        }
      },
      {
        color: "danger",
        icon: personRemove,
        condition: (row: any) => row.deactivated_on === null,
        action: async (row: any) => {
          if(!(await alertConfirmation("Are you sure you want to deactivate this user?"))) return
          try {
            const { user } = await UserService.deactivateUser(row['user_id'])
            row['deactivated_on'] = user['deactivated_on']
            toastSuccess("User deactivated");
          } catch (e) {
            toastWarning(`Deactivation Failed: ${e}`)
          }
        }
      },
      {
        color: "warning",
        icon: personAdd,
        condition: (row: any) => row.deactivated_on !== null,
        action: async (row: any) => {
          try {
            await UserService.activateUser(row['user_id'])
            row["deactivated_on"] = null
          } catch (e) {
            toastWarning(`Activation Failed: ${e}`)
          }
        }
      },
    ]

    const actionBtns: ActionButtonInterface[] = [
      {
        label: "Add New User",
        action: async () => {
          const { user } = await modal.show(UserModalVue)
          if(isEmpty(user)) return
          rows.value.push(toSummaryDetails(user))
        }
      }
    ]

    onMounted(async () => {
      const users: User[] = await UserService.getAllUsers({paginate: false})
      const authUser = await UserService.getCurrentUser();
      rows.value = users
        .filter(user => user['person_id'] !== authUser!['person_id'])
        .map(user => toSummaryDetails(user))
    })

    return {
      rows,
      columns,
      rowActionBtns,
      actionBtns,
    }
  }
})
</script>