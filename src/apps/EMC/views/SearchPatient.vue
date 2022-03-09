<template>
  <Layout>
    <ion-grid>
      <ion-row>
        <ion-col size="12" style="display: flex; justify-content: center">
          <ion-item class="ion-margin-horizontal box" lines="none">
            <ion-input
              style="min-width: 350px"
              placeholder="Search by Name or ARV Number"
              v-model="searchText"
              v-on:keyup.enter="searchPatient"
            />
          </ion-item>
          <ion-item class="ion-margin-horizontal box" lines="none">
            <label class="ion-padding-end">Select Gender </label>
            <ion-select v-model="gender">
              <ion-select-option value="M">Male</ion-select-option>
              <ion-select-option value="F">Female</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button class="searchBtn" @click="searchPatient">Search</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, loadingController, IonItem, IonInput, IonSelect, IonSelectOption } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { toastWarning } from "@/utils/Alerts";

export default defineComponent({
  components: {
    Layout,
    IonGrid, 
    IonRow, 
    IonCol,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption
  },
  setup() {
    const searchText = ref("");
    const gender = ref("");

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
          const results = (type === "name")
            ? await Patientservice.search(buildSearchByNameQuery(value, gender.value))
            : (type === 'arv_number')
            ? await Patientservice.findByOtherID(4, value)
            : []
            console.log(results)
        } catch (error) {
          toastWarning(error)
        } finally {
          loader.dismiss()
        }
      }
    };

    return {
      searchText,
      gender,
      searchPatient,
    };
  },
});
</script>

<style scoped>
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
}
</style>
