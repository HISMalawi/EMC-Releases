<template>
  <multi-column-view :items="patientInfo" :numberOfColumns="3" v-slot="{entries}">
    <ion-list class="his-card ion-margin-end">
      <ion-item v-for="(option, i) in entries" :key="i" :lines="i === entries.length - 1 ? 'none': ''">
        <div :style="{width: '100%', display: 'flex', justifyContent: 'space-between'}">
          <span>{{ option.label }}: </span>
          <span v-if="option.other && option.other.editable" @click="option.other.onClickHandler">
            <a><b>{{ option.value }}</b></a>
          </span>
          <span v-else><b>{{ option.value || 'N/A'}}</b></span>
        </div>
      </ion-item>
    </ion-list>
  </multi-column-view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import MultiColumnView from "@/components/containers/MultiColumnView.vue";
import { PatientObservationService } from '@/services/patient_observation_service';

export default defineComponent({
  components: {
    MultiColumnView
  },
  props: {
    patient: {
      type: Object as PropType<PatientObservationService>,
      required: true,
    },
    artStartDate: {
      type: String,
      required: true,
    },
    guardians: {
      type: String,
      default: '',
    }
  },
  emits: ['updatePatient','updateARVNumber', 'addGuardian'],
  setup(props, { emit }) {
    const initWeight = ref(0)
    const initHeight = ref(0)
    const initBmi = ref(0)
    const initTBStatus = ref('')
    const breastFeedingAtInitiation = ref('')
    const pregnantAtInitiation = ref('')
    const receivedART = ref('')
    const agreesToFollowUp = ref('')
    const reasonForStartingART = ref('')
    const hivTestDate = ref('')
    const hivTestPlace = ref('')
    const stagingCondition = ref('')

    const patientInfo = computed(() => [
      { 
        label: "ARV Number", 
        value: props.patient.getArvNumber(),
        other: {
          editable: true,
          onClickHandler: () => {
            emit('updateARVNumber')
          }
        }
      },
      { label: "National Patient ID", value: props.patient.getNationalID() },
      {
        label: "Given Name",
        value: props.patient.getGivenName(),
        other: {
          editable: true,
          onClickHandler: () => {
            emit('updatePatient', 'given_name')
          }
        },
      },
      {
        label: "Family Name",
        value: props.patient.getFamilyName(),
        other: {
          editable: true,
          onClickHandler: () => {
            emit('updatePatient', 'family_name')
          }
        },
      },
      {
        label: "Age",
        value: props.patient.getAge(),
        other: {
          editable: true,
          onClickHandler: () => {
            emit('updatePatient', 'year_birth_date')
          }
        },
      },
      {
        label: "Sex",
        value: props.patient.getGender(),
        other: {
          editable: true,
          onClickHandler: () => {
            emit('updatePatient', 'gender')
          }
        },
      },
      {
        label: "Location",
        value: props.patient.getCurrentVillage(),
        other: {
          editable: true,
          onClickHandler: () => {
            emit('updatePatient', 'current_region')
          }
        },
      },
      { 
        label: "Landmark", 
        value: props.patient.getClosestLandmark(),
        other: {
          editable: true,
          onClickHandler: () => {
            emit('updatePatient', 'default_landmarks')
          }
        },
      },
      { 
        label: "Phone Number", 
        value: props.patient.getPhoneNumber(),
        other: {
          editable: true,
          onClickHandler: () => {
            emit('updatePatient', 'cell_phone_number')
          }
        },
      },
      {
        label: "Guardian",
        value: props.guardians ? props.guardians : "add",
        other: {
          editable: !props.guardians,
          onClickHandler: () => {
            emit('addGuardian')
          }
        },
      },
      { label: "Date of starting first line ARV Regimen", value: props.artStartDate },
      { label: "Initial Weight (KG)", value: initWeight.value },
      { label: "Initial Height (CM)", value: initHeight.value },
      { label: "BMI", value: initBmi.value },
      { label: "Initial TB Status", value: initTBStatus.value },
      { label: "Pregnant at Initiation", value: pregnantAtInitiation.value },
      { label: "Breastfeeding at Initiation", value: breastFeedingAtInitiation.value },
      { label: "TI", value: receivedART.value },
      { label: "Agrees to follow up", value: agreesToFollowUp.value },
      { label: "Reason for starting ART", value: reasonForStartingART.value },
      { label: "HIV test date", value: hivTestDate.value },
      { label: "HIV test place", value: hivTestPlace.value },
      { label: "Staging codition", value: stagingCondition.value },
    ])
    
    onMounted(async () => {
      initWeight.value = await props.patient.getInitialWeight()
      initHeight.value = await props.patient.getInitialHeight()
      initBmi.value = await props.patient.getInitialBMI()
      initTBStatus.value = await props.patient.getInitialTBStatus()
      pregnantAtInitiation.value = await props.patient.hasPregnancyAtARTInitiation()
      breastFeedingAtInitiation.value = await props.patient.breastFeedingAtARTInitiation()
      receivedART.value = await props.patient.everReceivedART()
      agreesToFollowUp.value = await props.patient.agreesToFollowUp()
      reasonForStartingART.value = await props.patient.getReasonForStartingART()
      hivTestDate.value = await props.patient.getHIVTestDate() || ''
      hivTestPlace.value = await props.patient.getHIVTestLocation() || ''
      stagingCondition.value = await props.patient.getStagingCondition() || ''
    })

    return {
      patientInfo,
    }
  },
})
</script>

<style scoped>
ion-list {
  height: 100%;
}
</style>
