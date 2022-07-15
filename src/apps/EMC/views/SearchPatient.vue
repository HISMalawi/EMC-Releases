<template>
  <Layout>
    <ion-grid>
      <ion-row class="his-card">
        <ion-col size="10" style="display: flex; justify-content: flex-start">
          <ion-searchbar 
            style="width: 450px" 
            class="box-input ion-no-padding ion-margin-end"
            placeholder="Search by Name or ARV Number"
            v-model="searchText"
            v-on:keyup.enter="searchPatient"
          />
          <ion-item class="ion-margin-end box" lines="none">
            <ion-label class="ion-padding-end">Select Gender </ion-label>
            <ion-select v-model="gender">
              <ion-select-option value="M">Male</ion-select-option>
              <ion-select-option value="F">Female</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button class="searchBtn" @click="searchPatient">Search</ion-button>
          <ion-button class="searchBtn" @click="resetQuery" color="secondary">Reset</ion-button>
        </ion-col>
        <ion-col>
          <ion-button class="searchBtn" href="/emc/patient/registration" color="success" style="float: right;">
            Add New Patient
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row class="his-card ion-margin-top" style="padding: 0 !important">
        <ion-col size="12" style="min-height: 320px;" class="ion-no-padding">
          <h1 class="ion-margin">Patients Search Results</h1>
          <report-data-table
            :rows="tableRows"
            :columns="tableColumns"
            :config="tableConfig"
          />
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, loadingController, IonItem, IonInput, IonSelect, IonSelectOption, IonSearchbar, IonLabel, IonButton } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { toastWarning } from "@/utils/Alerts";
import ReportDataTable from "@/components/DataViews/tables/ReportDataTable.vue";
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonButton,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    ReportDataTable
  },
  setup() {
    const router = useRouter()
    const searchText = ref("");
    const gender = ref("");
    const tableRows = ref<RowInterface[][]>([])
    const tableColumns: ColumnInterface[][] = [[
      table.thTxt('ARV Number'),
      table.thTxt('First Name'),
      table.thTxt('Last Name'),
      table.thTxt('Gender'),
      table.thTxt('Date of Birth'),
      table.thTxt('Actions', {colspan: 2}),
    ]]
    const tableConfig = { 
      showIndex: false,
      tableCssTheme: "emc-datatable-theme"
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
        const loader = await loadingController.create({});
        loader.present();
        try {
          const { type, value } = await parseSearchText(searchText.value);
          const results: any[] = (type === "name")
            ? await Patientservice.search(buildSearchByNameQuery(value, gender.value))
            : (type === 'arv_number')
            ? await Patientservice.findByOtherID(4, value)
            : []
          tableRows.value = results.map(r => {
            const patient = new Patientservice(r)
            return [
              table.td(patient.getArvNumber() || 'N/A'),
              table.td(patient.getGivenName()),
              table.td(patient.getFamilyName()),
              table.td(patient.getGender()),
              table.tdDate(patient.getBirthdate().toString()),
              table.tdBtn('Select', () => router.push({
                name: "EMC Mastercard", params: {
                  patientId: patient.getID()
                }
              })),
              table.tdBtn('Void', () => console.log(patient), {}, 'danger')
            ]
          })
        } catch (error) {
          toastWarning(error)
        } finally {
          loader.dismiss()
        }
      }
    };

    const resetQuery = () => {
      searchText.value = ''
      gender.value = ''
      tableRows.value = []
    }

    return {
      searchText,
      gender,
      tableRows,
      tableColumns,
      tableConfig,
      searchPatient,
      resetQuery
    };
  },
});
</script>

<style>
.box {
  border-color: #a3a3a3;
  border-width: thin;
  border-style: solid;
  border-radius: 3px;
}

.searchBtn {
  height: 50px !important;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: .5rem;
}

.sc-ion-searchbar-md-h{
  --box-shadow: none !important;
}

</style>
