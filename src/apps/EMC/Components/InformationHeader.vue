<template>
  <multi-column-view :items="patientInfo" :numberOfColumns="3" v-slot="{entries}">
    <ion-list class="his-card ion-margin-end">
      <ion-item v-for="(option, i) in entries" :key="i" :lines="i === entries.length - 1 ? 'none': ''">
        <div :style="{width: '100%', display: 'flex', justifyContent: 'space-between'}">
          <span>{{ option.label }}: </span>
          <span v-if="option.other && typeof option.other.onClickHandler === 'function'" @click="option.other.onClickHandler">
            <a><b>{{ option.value || 'N/A' }}</b></a>
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
import HisDate from "@/utils/Date";
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

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

    const getDobAndAgeAtInitiation = () => {
      const dob = props.patient.getBirthdate()
      const ageAtInitiation = props.artStartDate !== "N/A" 
        ? dayjs(props.artStartDate).diff(dob, "years")
        : ''
      
      return `${HisDate.toStandardHisDisplayFormat(dob)} (${ageAtInitiation})`
    }

    const patientInfo = computed(() => [
      { 
        label: "ARV Number", 
        value: props.patient.getArvNumber(),
        other: {
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
          onClickHandler: () => {
            emit('updatePatient', 'given_name')
          }
        },
      },
      {
        label: "Family Name",
        value: props.patient.getFamilyName(),
        other: {
          onClickHandler: () => {
            emit('updatePatient', 'given_name')
          }
        },
      },
      {
        label: "DOB and Age at Initiation",
        value: getDobAndAgeAtInitiation(),
        other: {
          onClickHandler: () => {
            emit('updatePatient', 'birthdate')
          }
        },
      },
      {
        label: "Sex",
        value: props.patient.getGender(),
        other: {
          onClickHandler: () => {
            emit('updatePatient', 'gender')
          }
        },
      },
      {
        label: "Location",
        value: props.patient.getCurrentVillage(),
        other: {
          onClickHandler: () => {
            emit('updatePatient', 'home_village')
          }
        },
      },
      { 
        label: "Landmark", 
        value: props.patient.getClosestLandmark(),
        other: {
          onClickHandler: () => {
            emit('updatePatient', 'landmarks')
          }
        },
      },
      { 
        label: "Phone Number", 
        value: props.patient.getPhoneNumber(),
        other: {
          onClickHandler: () => {
            emit('updatePatient', 'phone_number')
          }
        },
      },
      {
        label: "Guardian",
        value: props.guardians ? props.guardians : "add",
        other: {
          ...(isEmpty(props.guardians) 
            ? {
                onClickHandler: () => {
                  emit('addGuardian')
                }
              } 
            : {}
          ),
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

    const setHIVTestDate = async () => {
      const date = await props.patient.getHIVTestDate()
      if(date) hivTestDate.value = HisDate.toStandardHisDisplayFormat(date)
    }

    
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
      hivTestPlace.value = await props.patient.getHIVTestLocation()
      stagingCondition.value = await props.patient.getStagingCondition()
      await setHIVTestDate()
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
