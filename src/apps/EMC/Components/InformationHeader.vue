<template>
  <multi-column-view :items="patientInfo" :numberOfColumns="3" v-slot="{entries}">
    <ion-list class="his-card ion-margin-end">
      <ion-item v-for="(option, i) in entries" :key="i" :lines="i === entries.length - 1 ? 'none': ''">
        <div :style="{width: '100%', display: 'flex', justifyContent: 'space-between'}">
          <span v-if="option.label">{{ option.label }}: </span>
          <span v-else></span>
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
import router from '@/router';
import ApiStore from '@/composables/ApiStore';
import EventBus from '@/utils/EventBus';
import { EmcEvents } from '../interfaces/emc_event';

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
    const latestVLResult = ref('')
    const whoSTage = ref('')

    const getDobAndAgeAtInitiation = () => {
      const dob = props.patient.getBirthdate()
      const ageAtInitiation = props.artStartDate !== "N/A" 
        ? dayjs(props.artStartDate).diff(dob, "years")
        : ''
      
      return `${HisDate.toStandardHisDisplayFormat(dob)} (${ageAtInitiation})`
    }

    const getLatestVLResult = async () => {
      const orders = await ApiStore.get('PATIENT_LAB_ORDERS', { patientID: props.patient.getID() });
      const results = orders.reduce((rs: any[], order: any) => {
        const r = order.tests
          .filter((t: any) => t.name.match(/hiv/i) && !isEmpty(t.result))
          .map((t: any) => t.result);
        return rs.concat(r.reduce((a: any, c: any) => a.concat(c), []));
      }, [])
      .sort((a: any, b: any) => new Date(a.date) > new Date(b.date) ? -1 : 1);
      return isEmpty(results) 
        ? '' 
        : `${results[0].value_modifier}${results[0].value} (${HisDate.toStandardHisDisplayFormat(results[0].date)})`;
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
      { label: "Initial BMI", value: initBmi.value },
      { label: "Initial TB Status", value: initTBStatus.value },
      { label: "Pregnant at Initiation", value: pregnantAtInitiation.value },
      { label: "Breastfeeding at Initiation", value: breastFeedingAtInitiation.value },
      { label: "Latest VL Result and Result Date", value:  latestVLResult.value },
      { label: "TI", value: receivedART.value  },
      { label: "Agrees to follow up", value: agreesToFollowUp.value },
      { label: "HIV test place and date", value: `${hivTestPlace.value} (${hivTestDate.value})` },
      { label: "WHO stage", value: whoSTage.value },
      { label: "Reason for starting ART", value: reasonForStartingART.value },
      { label: "Staging codition", value: stagingCondition.value, other: {
        onClickHandler: () => router.push(`/emc/registration/${props.patient.getID()}/false`)
      }},
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
      latestVLResult.value = await getLatestVLResult()
      props.patient.getWhoStage().then(v => whoSTage.value = v)
      await setHIVTestDate()
      EventBus.on(EmcEvents.RELOAD_LATEST_VL_RESULT, async () => {
        ApiStore.invalidate('PATIENT_LAB_ORDERS')
        latestVLResult.value = await getLatestVLResult()
      })
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
