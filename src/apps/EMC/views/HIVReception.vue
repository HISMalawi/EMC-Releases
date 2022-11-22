<template>
  <layout>
    <ion-grid>
      <ion-row class="his-card">
        <ion-col size="12" v-if="isReady">
          <keep-alive>
            <component 
              :is="activeForm" 
              :patient="patient" 
              :isNewPatient="isNewPatient"
              :sitePrefix="sitePrefix"
              @onValue="onValue"
              @onNext="onNext"
              @onPrevious="onPrevious"
              @onFinish="onFinish"
            ></component>
          </keep-alive>
        </ion-col>
      </ion-row>
    </ion-grid>
  </layout>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from "@/apps/EMC/Components/Layout.vue";
import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/vue";
import { Patientservice } from '@/services/patient_service';
import Store from "@/composables/ApiStore"
import { toastSuccess, toastWarning } from '@/utils/Alerts';
import { loader } from '@/utils/loader';
import { ClinicRegistrationService } from '@/apps/ART/services/registration_service';
import { ConsultationService } from '@/apps/ART/services/consultation_service';
import { VitalsService } from '@/apps/ART/services/vitals_service';
import { PatientTypeService } from '@/apps/ART/services/patient_type_service';
import { resolveObs } from '../utils/form';
import { PatientProgramService } from '@/services/patient_program_service';
import { StagingService } from '@/apps/ART/services/staging_service';

export default defineComponent({
  components: {
    ClinicRegistration: defineAsyncComponent(() => import('@/apps/EMC/Components/ClinicRegistration.vue')),
    Staging: defineAsyncComponent(() => import('@/apps/EMC/Components/Staging.vue')),
    Layout,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const isReady = ref(false);
    const data = reactive({} as any);
    const activeForm = ref('ClinicRegistration')
    const sitePrefix = ref('')
    const patientId = parseInt(route.params.id.toString() || '')
    const isNewPatient = route.params.new.toString().match(/true/i) ? true : false
    const isStaging = computed(() => activeForm.value === 'Staging');
    const isRegistration = computed(() => activeForm.value === 'Staging');
    const patient = ref({} as Patientservice)
    
    const onValue = (form: any) => data[form.type] = form.data;
    const onNext = () => activeForm.value = "Staging"
    const onPrevious = () => activeForm.value = "ClinicRegistration"

    const onFinish = async () => {
      const { arvNumberEditable, formData, computedData } = data.registration
      const { computedData: stagingData } = data.staging
      await ClinicRegistrationService.setSessionDate(formData.initialVisitDate)
      const registrationService = new ClinicRegistrationService(patientId, -1)
      const consultationService = new ConsultationService(patientId, -1)
      const vitalsService = new VitalsService(patientId, -1)
      const patientTypeService = new PatientTypeService(patientId, -1);
      const stagingService = new StagingService(patientId, patient.value.getAge(), -1)

      try {
        loader.show();
        

        // ARV Number
        if(arvNumberEditable && formData.arvNumber) {
          await patient.value.createArvNumber(`${sitePrefix.value}-ARV-${formData.arvNumber}`)
        }

        // Patient Type Encunter
        await patientTypeService.createEncounter()
        const pTypeObs = await resolveObs(computedData, 'patient type')
        await patientTypeService.saveObservationList(pTypeObs)

        // Registration Encounter
        await registrationService.createEncounter()
        const regObs = await resolveObs(computedData, 'registration')
        await registrationService.saveObservationList(regObs)

        // Vitals and Consultation Encounters
        if(formData.everRegisteredAtClinic === 'Yes') {
          await vitalsService.createEncounter()
          const vitalsObs = await resolveObs(computedData, 'vitals')
          await vitalsService.saveObservationList(vitalsObs)

          await consultationService.createEncounter()
          const consultationObs = await resolveObs(computedData, 'consultation')
          await consultationService.saveObservationList(consultationObs)
        }

        // Staging encounter
        await stagingService.createEncounter()
        const obs = await resolveObs(stagingData)
        await stagingService.saveObservationList(obs)        
        
        // enroll patient into HIV program
        if(isNewPatient) {
          const patientProgram = new PatientProgramService(patientId)
          patientProgram.setProgramDate(formData.initialVisitDate)
          await patientProgram.enrollProgram();
        }
        
        await loader.hide()
        await ClinicRegistrationService.resetSessionDate()
        await toastSuccess('Saved successfully')
        router.push(`/emc/patient/${patientId}`)
      } catch (error) {
        await loader.hide()
        console.log(error)
        toastWarning(`${error}`)
      }
    }
    
    onMounted(async () => {
      const p = await Patientservice.findByID(patientId);
      patient.value = new Patientservice(p);
      Store.get('SITE_PREFIX').then(prefix => sitePrefix.value = prefix);
      isReady.value = true;
    })
    return {
      activeForm,
      patient,
      isNewPatient,
      isStaging,
      isRegistration,
      sitePrefix,
      isReady,
      onValue,
      onFinish,
      onNext,
      onPrevious,
    }
  },
})
</script>
