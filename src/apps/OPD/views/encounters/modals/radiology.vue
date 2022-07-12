<template>
  <ion-header>
    <ion-toolbar>
      <ion-title class="his-lg-text">Radiology Examination</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content style="overflow:hidden;background:grey;height:70vh;">
    <his-radiology-picker/>
  </ion-content>
  <ion-footer>
    <ion-toolbar> 
      <ion-button @click="onSubmit()" size="large" slot="end"> Place orders </ion-button>
      <ion-button @click="closeModal()" size="large" slot="start" color="danger"> Close </ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import {
  IonContent,
  IonButton,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  modalController,
  IonList,
  IonItem,
  IonFooter,
  IonCheckbox,
  IonRadioGroup,
  IonRow,
} from "@ionic/vue";
import { Option } from "@/components/Forms/FieldInterface";
import { defineComponent } from 'vue'
import HisStandardForm from "@/components/Forms/TouchScreenForm.vue";
import EncounterMixinVue from '@/views/EncounterMixin.vue';
import { PatientRadiologyService } from "@/apps/OPD/services/patient_radiology_service";
import HisRadiologyPicker from '@/components/FormElements/HisRadiologyPicker.vue'
import OPD_GLOBAL_PROP from "@/apps/OPD/opd_global_props";

export default defineComponent({
  name: "Modal",
  components: { 
    HisStandardForm,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonLabel,
    IonList,
    IonItem,
    IonCheckbox,
    IonRadioGroup,
    IonRow,
    HisRadiologyPicker
  },
  mixins: [EncounterMixinVue],
  data: () => ({
    radiologyService: {} as any,
    isPacsEnabled: false
  }),
  watch: {
    ready: {
      async handler(isReady: boolean) {
        if(isReady){
          this.radiologyService = new PatientRadiologyService(this.patientID, this.providerID)
          this.isPacsEnabled = (await OPD_GLOBAL_PROP.isPACsEnabled())
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async onSubmit(_: any, computedData: any){
      const computedValue: any = (options: Option[]) => {
        return options.map(async (option)=> ({
          ...(await this.radiologyService.buildValueCoded('Radiology Orders', option.other.parent)),
          child: (await this.radiologyService.buildValueCodedFromConceptId(option.other.parent, option.other.concept_id))
        }))
      }
      const data = await Promise.all(computedValue.radiology)
      await this.radiologyService.createEncounter()
      const obsObj = await this.radiologyService.obsObj(data) 
      const savedObsData = await this.radiologyService.saveObservationList(obsObj)
      await this.radiologyService.printOrders(data, this.patient)
      if(this.isPacsEnabled) {
        try {
          await this.radiologyService.submitToPacs(savedObsData, this.patient)
        } catch (error) {
          console.log(error)
        }
      }
      this.closeModal()
    },
    async closeModal() {
      await modalController.dismiss([])
    },
  }
})
</script>

