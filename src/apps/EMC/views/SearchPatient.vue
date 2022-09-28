<template>
  <Layout>
    <ion-grid>
      <ion-row class="his-card">
        <ion-col size="10" style="display: flex; justify-content: flex-start">
          <ion-searchbar 
            style="width: 350px; height: 2.75rem;" 
            class="box-input ion-no-padding ion-margin-end ion-margin-vertical"
            placeholder="Search by Name or ARV Number"
            v-model="searchText"
            v-on:keyup.enter="searchPatient"
          />
          <div style="max-width: 250px" class="ion-margin-end ion-margin-vertical">
            <SelectInput v-model="gender" :options="genderOptions" ></SelectInput>
          </div>
          <ion-button class="ion-margin-vertical" @click="searchPatient">Search</ion-button>
          <ion-button class="ion-margin-vertical" @click="resetQuery" color="secondary">Reset</ion-button>
        </ion-col>
        <ion-col>
          <ion-button class="ion-margin-vertical" href="/emc/patient/registration" color="success" style="float: right;">
            Add New Patient
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row class="his-card ion-margin-top" style="padding: 0 !important">
        <ion-col size="12" style="min-height: 320px;" class="ion-no-padding">
          <h1 class="ion-margin">Patients Search Results</h1>
          <data-table 
            :rows="tableRows"
            :columns="tableColumns"
            :config="tableConfig"
            :row-actions-buttons="TableRowActions"
            color="custom"
          />
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, IonSearchbar, IonButton } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { alertConfirmation, toastDanger, toastWarning } from "@/utils/Alerts";
import { useRouter } from "vue-router";
import { genderOptions } from "../utils/DTFormElements";
import SelectInput from "@/apps/EMC/Components/inputs/SelectInput.vue";
import { DTFormField } from "../interfaces/dt_form_field";
import { loader } from "@/utils/loader";
import DataTable, { RowActionButtonInterface, TableColumnInterface, TableConfigInterface } from "../Components/datatable";
import popVoidReason from "@/utils/ActionSheetHelpers/VoidReason";
import { DISPLAY_DATE_FORMAT } from "@/utils/Date";
import dayjs from "dayjs";
import { toGenderString } from "@/utils/Strs";

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    SelectInput,
    IonButton,
    IonSearchbar,
    DataTable,
  },
  setup() {
    const router = useRouter()
    const searchText = ref("");
    const selectInput = ref(document.getElementById('selectInput'))
    const gender = reactive<DTFormField>({ value: "", placeholder: "select gender"});
    const tableRows = ref<any[]>([])
    const tableColumns: TableColumnInterface[] = [
      { label: 'ARV Number', path: 'arv_number'},
      { path: "given_name", label: "First name" },
      { path: "family_name", label: "Last name" },
      { path: "gender", label: "Gender", formatter: toGenderString },
      { path: "birthdate", label: "Date of Birth", formatter: (v) => dayjs(v).format(DISPLAY_DATE_FORMAT) },
    ]
    const tableConfig: TableConfigInterface = { 
      showSearchField: false,
      showSubmitButton: false
    }

    const parseSearchText = async (nameOrArvNumber: string) => {
      if (nameOrArvNumber.match(/^(\w+-ARV-\w+)$/)) {
        return { type: "arv_number", value: nameOrArvNumber };
      }
      if (nameOrArvNumber.match(/^(\d+)$/)) {
        const sitePrefix = await GLOBAL_PROP.sitePrefix();
        return {
          type: "arv_number",
          value: `${sitePrefix}-ARV-${nameOrArvNumber}`,
        };
      }
      return { type: "name", value: nameOrArvNumber };
    };

    const buildSearchByNameQuery = (name: string, gender: string) => {
      const query: Record<string, any> = {};
      const tempName = name.split(" ").filter(entry => /\S/.test(entry));

      if (tempName.length > 0) {
        query['given_name'] = tempName[0];
        tempName[1] ? (query['family_name'] = tempName[1]) : null;
        if (tempName[2]) {
          query['middle_name'] = tempName[1];
          query['family_name'] = tempName[2];
        }
      }
      if (gender) {
        query.gender = gender;
      }

      return query;
    }

    const searchPatient = async () => {
      if (searchText.value) {
        loader.show()
        try {
          const { type, value } = await parseSearchText(searchText.value);
          const results: any[] = (type === "name")
            ? await Patientservice.search(buildSearchByNameQuery(value, gender.value.value))
            : (type === 'arv_number')
            ? await Patientservice.findByOtherID(4, value)
            : []
          await loader.hide()
          tableRows.value = results.map(r => {
            const patient = new Patientservice(r)
            return {
              "arv_number": patient.getArvNumber(),
              "given_name": patient.getGivenName(),
              "family_name": patient.getFamilyName(),
              "gender": patient.getGender(),
              "birthdate": patient.getBirthdate(),
              "personId": patient.getID()
            }
          })
        } catch (error) {
          toastWarning(`${error}`)
          await loader.hide()
        } 
      }
    };

    const resetQuery = () => {
      searchText.value = ''
      gender.value = ''
      tableRows.value = []
    }

    const TableRowActions: RowActionButtonInterface[] = [
      { label: "Select", action: (p) => router.push(`/emc/patient/${p.personId}`) },
      { label: "void", color: 'danger', action: async (p) => popVoidReason(async (reason: string) => {
        try {
          await Patientservice.voidPatient(p.personId, reason)
          await searchPatient()
        } catch (e) {
          toastDanger(`${e}`)
        }
      }, 'void-modal')}
    ]

    return {
      searchText,
      gender,
      tableRows,
      tableColumns,
      tableConfig,
      genderOptions,
      selectInput,
      TableRowActions,
      searchPatient,
      resetQuery
    };
  },
});
</script>

<style>
.sc-ion-searchbar-md-h{
  --box-shadow: none !important;
}

</style>
