<template>
    <ion-grid>
      <ion-row class="his-card">
        <ion-col size="12" v-if="isReady">
          <keep-alive>
            <component 
              :is="activeForm" 
              :patient="patient" 
              :isNewPatient="isNewPatient"
              :sitePrefix="sitePrefix"
              :initialVisitDate="initialVisitDate"
              :artStartDate="artStartDate"
              :observations="observations"
              @onValue="onValue"
              @onNext="onNext"
              @onPrevious="onPrevious"
              @onFinish="onFinish"
            ></component>
          </keep-alive>
        </ion-col>
      </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
import { EncounterService } from '@/services/encounter_service';
import { isEmpty, get } from 'lodash';
import { Encounter } from '@/interfaces/encounter';
import { Observation } from '@/interfaces/observation';
import { ConceptService } from '@/services/concept_service';
import EventBus from '@/utils/EventBus';
import { EmcEvents } from '../interfaces/emc_event';
import { 
  HIV_CLINIC_CONSULTATION_ENCOUNTER, 
  HIV_CLINIC_REGISTRATION_ENCOUNTER, 
  HIV_STAGING_ENCOUNTER, 
  REGISTRATION_ENCOUNTER, 
  VITALS_ENCOUNTER 
} from '@/constants';

export default defineComponent({
  components: {
    ClinicRegistration: defineAsyncComponent(() => import('@/apps/EMC/Components/ClinicRegistration.vue')),
    Staging: defineAsyncComponent(() => import('@/apps/EMC/Components/Staging.vue')),
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
    const initialVisitDate = ref('')
    const artStartDate = ref('');
    const firstVisitEncounters = ref([] as number[])
    const observations = reactive({} as Record<string, any>)
    const isEnrolled = ref(false);

    const setEnrollementStatus = () => {
      const programService = new PatientProgramService(patientId);
      programService.getPrograms().then((programs: any[]) => {
        isEnrolled.value = programs.some(p => p.program.name === "HIV PROGRAM")
      })
    }
    
    const onValue = (form: any) => data[form.type] = form.data;
    const onNext = () => activeForm.value = "Staging"
    const onPrevious = () => activeForm.value = "ClinicRegistration"

    const onFinish = async () => {
      const { arvNumberEditable, formData, computedData } = data.registration
      const { computedData: stagingData } = data.staging
      
      try {
        loader.show();
        
        // Void first visit encounters
        if(!isNewPatient && !isEmpty(firstVisitEncounters.value)) {
          for(const encounter of firstVisitEncounters.value) {
            await EncounterService.voidEncounter(encounter, 'Duplicate')
          }
        }

        // ARV Number
        if(arvNumberEditable && formData.arvNumber) {
          await patient.value.createArvNumber(`${sitePrefix.value}-ARV-${formData.arvNumber}`)
        }

        // Patient Type Encunter      
        const patientTypeService = new PatientTypeService(patientId, -1);
        await patientTypeService.createEncounter()
        const pTypeObs = await resolveObs(computedData, 'patient type')
        await patientTypeService.saveObservationList(pTypeObs)

        // Registration Encounter
        const registrationService = new ClinicRegistrationService(patientId, -1)
        await registrationService.createEncounter()
        const regObs = await resolveObs(computedData, 'registration')
        await registrationService.saveObservationList(regObs)

        // Vitals and Consultation Encounters
        if(formData.everRegisteredAtClinic === 'Yes') {
          const vitalsService = new VitalsService(patientId, -1)
          await vitalsService.createEncounter()
          const vitalsObs = await resolveObs(computedData, 'vitals')
          await vitalsService.saveObservationList(vitalsObs)

          const consultationService = new ConsultationService(patientId, -1)
          await consultationService.createEncounter()
          const consultationObs = await resolveObs(computedData, 'consultation')
          await consultationService.saveObservationList(consultationObs)
        }

        // Staging encounter
        const stagingService = new StagingService(patientId, patient.value.getAge(), -1)
        await stagingService.createEncounter()
        const obs = await resolveObs(stagingData)
        await stagingService.saveObservationList(obs)        
        
        // enroll patient into HIV program
        if(isNewPatient || !isEnrolled.value) {
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

    const parseObs = async (obs: Observation[]) => {
      for (const v of obs) {
        if(!firstVisitEncounters.value.includes(v.encounter_id)) firstVisitEncounters.value.push(v.encounter_id)
        const concept = await ConceptService.getConceptName(v.concept_id);
        let value = '' as any
        if(v.value_datetime) value = v.value_datetime;
        else if(v.value_drug) value = v.value_datetime;
        else if(v.value_text) value = v.value_text;
        else if(v.value_numeric) value = v.value_numeric;
        else if(v.value_coded) value = await ConceptService.getConceptName(v.value_coded);
        if(v.value_modifier) value = v.value_modifier + value;
        observations[concept] = value
      }
    }

    const initializeFacts = async () => {
      try {
        const registrationEncounters: Array<Encounter> = await EncounterService.getEncounters(patientId, {
          "encounter_type_id": HIV_CLINIC_REGISTRATION_ENCOUNTER
        })
        if(isEmpty(registrationEncounters)) return;
        initialVisitDate.value = get(registrationEncounters, '[0].encounter_datetime', '');
        if(initialVisitDate.value) {
          await parseObs(registrationEncounters[0].observations);
          const encounters: Encounter[] = await  EncounterService.getEncounters(patientId, { 
            date: initialVisitDate.value 
          });
          for (const encounter of encounters){
            let encounterTypes = [REGISTRATION_ENCOUNTER, HIV_STAGING_ENCOUNTER];
            if(/yes/i.test(`${observations['Ever registered at ART clinic']}`)){
              encounterTypes = [...encounterTypes, HIV_CLINIC_CONSULTATION_ENCOUNTER, VITALS_ENCOUNTER]
            }
            if(encounterTypes.includes(encounter.encounter_type))
              await parseObs(encounter.observations)
          }
        } 
      } catch (error) {
        toastWarning("Unable to load previous observations");
      }
    }
    
    onMounted(async () => {
      setEnrollementStatus()
      patient.value = await Store.get("ACTIVE_PATIENT", { patientID: patientId });
      Store.get('SITE_PREFIX').then(prefix => sitePrefix.value = prefix);      
      if(!isNewPatient) await initializeFacts();
      isReady.value = true;
      EventBus.on(EmcEvents.ON_INITIAL_VISIT_DATE, (date: string) => {
        initialVisitDate.value = date
      });
      EventBus.on(EmcEvents.ON_ART_START_DATE, (date: string) => {
        artStartDate.value = date
      });
    })

    return {
      activeForm,
      patient,
      isNewPatient,
      isStaging,
      isRegistration,
      sitePrefix,
      isReady,
      initialVisitDate,
      observations,
      artStartDate,
      onValue,
      onFinish,
      onNext,
      onPrevious,
    }
  },
})
</script>
