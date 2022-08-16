<template>
  <Layout>
    <ion-grid>
      <ion-row>
        <ion-col size="12" class="padding">
          <h2 class="ion-margin-start">
            Patient Merging
            <ion-button class="ion-float-end ion-margin-end" :disabled="!enableMergeBtn" @click="merge">
              Merge Selected Patients
            </ion-button>
          </h2>
        </ion-col>
        <ion-col size="6" v-for="patient of patients" :key="patient.category" >
          <ion-card>
            <ion-card-header color="light">
              <ion-card-title class="ion-margin-bottom">
                {{ patient.category }} patients
              </ion-card-title>
              <ion-searchbar 
                style="width: 100%; height: 45px;" 
                class="box-input ion-no-padding ion-margin-end"
                placeholder="Type Name or ARV Number and press enter"
                v-model="patient.query"
                v-on:keyup.enter="searchPatient(patient)"
              />
            </ion-card-header>
            <ion-card-content color="light" style="height: 70vh; overflow-y: auto;">
              <patient-card
                @click="onPatient(result, patient.category)"
                v-for="(result, index) in patient.results" :key="index"
                :patient="result"
                :isActive="result.isChecked"
              />
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, IonSearchbar } from "@ionic/vue";
import { Patientservice } from "@/services/patient_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { useRouter } from "vue-router";
import  PatientCard from "@/components/DataViews/ArtPatientCard.vue"
import { alertConfirmation, toastDanger } from "@/utils/Alerts";

interface MergePatient {
  query: string;
  results: any[];
  category: "primary" | "secondary";
}

export default defineComponent({
  components: {
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    // IonButton,
    PatientCard,
    IonSearchbar,
  },
  setup() {
    const router = useRouter()
    const patients = reactive<MergePatient[]>([
      {
        category: "primary",
        query: "",
        results: [],
      },
      {
        category: "secondary",
        query: "",
        results: [],
      },
    ]);

    const enableMergeBtn = computed(() => {
      return patients.every((patient) => patient.results.length > 0 && patient.results.some((result) => result.isChecked));
    })

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

    const buildSearchByNameQuery = (name: string) => {
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

      return query;
    }

    const searchPatient = async (patient: MergePatient) => {
      if (patient.query) {
        try {
          const { type, value } = await parseSearchText(patient.query);
          const results: any[] = (type === "name")
            ? await Patientservice.search(buildSearchByNameQuery(value))
            : (type === 'arv_number')
            ? await Patientservice.findByOtherID(4, value)
            : []
          patient.results = results.map((p: any, i: number) => {
            const patient = new Patientservice(p)
            return {
              index: i,
              id: patient.getID(),
              name: patient.getFullName(),
              docID: patient.getDocID(),
              birthdate: patient.getBirthdate(),
              arvNum: patient.getArvNumber(),
              npid: patient.getNationalID(),
              gender: patient.getGender(),
              homeDistrict: patient.getHomeDistrict(),
              homeVillage: patient.getHomeVillage(),
              currentDistrict: patient.getCurrentDistrict(),
              currentVillage: patient.getCurrentVillage(),
              isChecked: false
            }
          })
        } catch (error) {
          console.log(`${error}`)
        } 
      }
    };

    const onPatient = (result: any, category: "primary" | "secondary") => {
      if(category === 'primary') {
        patients[0].results.forEach(p => {
          if(p.id === result.id) {
            p.isChecked = !p.isChecked
          } else {
            p.isChecked = false
          }
        })
        if(result.isChecked){
          // uncheck the patient in the secondary list
          patients[1].results.forEach(p => {
            if(p.id === result.id) {
              p.isChecked = false
            }
          })
        }
      } else {
        if(result.isChecked) return result.isChecked = false
        // check only if the patient is not already checked in the primary list
        result.isChecked = !patients[0].results.some(p => p.isChecked && p.id === result.id)
      }
    }

    const merge = async () => {
      if(!(await alertConfirmation("Are you sure you want to merge these patients?"))) return
      try {
        const primaryPatient = patients[0].results.find(p => p.isChecked)
        const mergedPatient = await Patientservice.mergePatients({
          primary: {
            'patient_id': primaryPatient.id,
            'doc_id': primaryPatient.docID,
          },
          secondary: patients[1].results.filter(p => p.isChecked).map(p => ({
            'patient_id': p.id,
            'doc_id': p.docID,
          }))
        })
        router.push({ name: "EMC Mastercard", params: { patientId: mergedPatient['patient_id'] } })
      } catch (e) {
        toastDanger(`${e}`)
      }
    }

    return {
      patients,
      enableMergeBtn,
      searchPatient,
      onPatient,
      merge,
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
