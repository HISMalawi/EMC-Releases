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
import { ActionButtonInterface, RowActionButtonInterface, TableColumnInterface } from "@/apps/EMC/Components/datatable";
import { UserService } from "@/services/user_service";
import get from "lodash/get";
import { alertConfirmation, toastSuccess, toastWarning } from "@/utils/Alerts";
import { personRemove, personAdd, pencil } from "ionicons/icons";
import { modal } from "@/utils/modal";
import UserModalVue from "../Components/modals/UserModal.vue";
import { loader } from "@/utils/loader";
import { User } from "@/interfaces/user";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";

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
      { path: "deactivated_on", label: "Deactivated On", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
    ]

    const loadUsers = async () => {
      loader.show();
      const users: User[] = await UserService.getAllUsers({paginate: false})
      const authUser = await UserService.getCurrentUser();
      rows.value = users.filter((user: any) => user['person_id'] !== authUser!['person_id'])
        .map((user: any) => {
          return {
            "given_name": get(user, 'person.names[0].given_name', 'Unknown'),
            "family_name": get(user, 'person.names[0].family_name', 'Unknown'),
            "role": user.roles.map((r: any) => r.role).join(', '),
            ...user,
          }
        })
      loader.hide();
    }

    const rowActionBtns: RowActionButtonInterface[] = [
      { 
        icon: pencil,
        action: async (user) => {
          await modal.show(UserModalVue, { user })
          await loadUsers();
        }
      },
      {
        color: "danger",
        icon: personRemove,
        condition: (row) => row.deactivated_on === null,
        action: async (row) => {
          if(!(await alertConfirmation("Are you sure you want to deactivate this user?"))) return
          await UserService.deactivateUser(row['user_id']).then(() => {
            toastSuccess("User deactivated");
          }).catch((e) => {
            toastWarning(`Deactivation Error: ${e}`);
          }).finally(() => {
            loadUsers();
          });
        }
      },
      {
        color: "warning",
        icon: personAdd,
        condition: (row) => row.deactivated_on !== null,
        action: (row) => {
          UserService.activateUser(row['user_id']).then(() => {
            toastSuccess("User activated");
          }).catch(() => {
            toastSuccess("User activation failed");
          }).finally(() => {
            loadUsers();
          });
        }
      },
    ]

    const actionBtns: ActionButtonInterface[] = [
      {
        label: "Add New User",
        action: async () => {
          await modal.show(UserModalVue)
          await loadUsers();
        }
      }
    ]

    onMounted(async () => {
      await loadUsers()
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