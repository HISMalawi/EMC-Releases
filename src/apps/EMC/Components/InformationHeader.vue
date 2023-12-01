<template>
  <multi-column-view :items="patientInfo" :numberOfColumns="3" v-slot="{entries}">
    <ion-list class="his-card ion-margin-end">
      <ion-item v-for="(option, i) in entries" :key="i" :lines="i === entries.length - 1 ? 'none': ''" :button="clickable(option)" @click="onClickHandler(option)">
        <div :style="{width: '100%', display: 'flex', justifyContent: 'space-between'}">
          <span v-if="option.label">{{ option.label }}: </span>
          <span v-else></span>
          <span v-if="clickable(option)">
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
import { toGenderString } from '@/utils/Strs';
import { modal } from '@/utils/modal';
import VLResultTrail from './modals/VLResultTrail.vue';
import { GuardianDetails } from '@/interfaces/relationship';

interface InfoItem {
  label: string;
  value: string | number;
  other?: {
    onClickHandler: () => Promise<void> | void;
  };
}

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
      type: Array as PropType<Array<GuardianDetails>>,
      default: () => [],
    }
  },
  emits: ['updatePatient','updateARVNumber', 'updateGuardian'],
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

    const clickable = (item: InfoItem) => {
      return item.other && typeof item.other.onClickHandler === 'function';
    }

    const hasGuardians = computed(() => !isEmpty(props.guardians));

    const onClickHandler = async (item: InfoItem) => {
      if(clickable(item)){
        await item.other?.onClickHandler()
      }
    }

    const getDobAndAgeAtInitiation = () => {
      const dob = props.patient.getBirthdate()
      const ageAtInitiation = props.artStartDate !== "N/A" 
        ? dayjs(props.artStartDate).diff(dob, "years")
        : ''
      
      return `${HisDate.toStandardHisDisplayFormat(dob)} (${ageAtInitiation})`
    }

    const setLatestVLResult = (force = false) => {
      if(force) ApiStore.invalidate('PATIENT_LAB_ORDERS')
      ApiStore.get('PATIENT_LAB_ORDERS', { patientID: props.patient.getID() }).then(orders => {
        const results = orders.reduce((rs: any[], order: any) => {
        const r = order.tests
          .filter((t: any) => t.name.match(/hiv/i) && !isEmpty(t.result))
          .map((t: any) => t.result);
          return rs.concat(r.reduce((a: any, c: any) => a.concat(c), []));
        }, [])
        .sort((a: any, b: any) => new Date(a.date) > new Date(b.date) ? -1 : 1);
        latestVLResult.value = isEmpty(results) 
          ? '' 
          : `${results[0].value_modifier}${results[0].value} (${HisDate.toStandardHisDisplayFormat(results[0].date)})`;
      });
    }

    const updateStagingInfo = () => {
      router.push(`/emc/registration/${props.patient.getID()}/false`)
    }

    const formattedRelations = ()  => {
      return hasGuardians.value
        ? props.guardians.map(r => {
            return `${r.name} (${r.relationshipType})`
          })
          .join(",")
        :"Add";
    }

    const patientInfo = computed(() => [
      { label: "ARV Number", value: props.patient.getArvNumber(), other: {
        onClickHandler: () => emit('updateARVNumber')
      }},
      { label: "National Patient ID", value: props.patient.getNationalID() },
      { label: "Name", value: props.patient.getGivenName() + " " + props.patient.getFamilyName(), other: {
        onClickHandler: () =>   emit('updatePatient', 'given_name')
      }},
      { label: "DOB and Age at Initiation", value: getDobAndAgeAtInitiation(), other: {
          onClickHandler: () => emit('updatePatient', 'birthdate')
      }},
      {
        label: "Sex",
        value: toGenderString(props.patient.getGender()),
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
        value: formattedRelations(),
        other: {
          onClickHandler: () => emit("updateGuardian")
        } 
      },
      { label: "Agrees to follow up", value: agreesToFollowUp.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Date of starting first line ARV Regimen", value: props.artStartDate, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Initial Weight (KG)", value: initWeight.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Initial Height (CM)", value: initHeight.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Initial BMI", value: initBmi.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Initial TB Status", value: initTBStatus.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Pregnant at Initiation", value: pregnantAtInitiation.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Breastfeeding at Initiation", value: breastFeedingAtInitiation.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Latest VL Result and Result Date", value:  latestVLResult.value, other: {
        onClickHandler: () => modal.show(VLResultTrail, {
          patient: props.patient
        })
      }},
      { label: "TI", value: receivedART.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "HIV test place", value: hivTestPlace.value, other: {
        onClickHandler: updateStagingInfo
      }},
      {  label: "HIV test date", value: hivTestDate.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "WHO stage", value: whoSTage.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Reason for starting ART", value: reasonForStartingART.value, other: {
        onClickHandler: updateStagingInfo
      }},
      { label: "Staging codition", value: stagingCondition.value, other: {
        onClickHandler: updateStagingInfo
      }},
    ])

    const setHIVTestDate = async () => {
      const date = await props.patient.getHIVTestDate()
      if(date) hivTestDate.value = HisDate.toStandardHisDisplayFormat(date)
    }

    const setStagingInfo = () => {
      props.patient.getInitialWeight().then(v => initWeight.value = v)
      props.patient.getInitialHeight().then(v => initHeight.value = v)
      props.patient.getInitialBMI().then(v => initBmi.value = v)
      props.patient.getInitialTBStatus().then(v => initTBStatus.value = v)
      props.patient.hasPregnancyAtARTInitiation().then(v => pregnantAtInitiation.value = v)
      props.patient.breastFeedingAtARTInitiation().then(v => breastFeedingAtInitiation.value = v)
      props.patient.everReceivedART().then(v => receivedART.value = v)
      props.patient.agreesToFollowUp().then(v => agreesToFollowUp.value = v)
      props.patient.getReasonForStartingART().then(v => reasonForStartingART.value = v)
      props.patient.getHIVTestLocation().then(v => hivTestPlace.value = v)
      props.patient.getStagingCondition().then(v => stagingCondition.value = v)
      props.patient.getWhoStage().then(v => whoSTage.value = v)
      setHIVTestDate()
    }

   onMounted(() => {
    setStagingInfo();
    setLatestVLResult();
    EventBus.on(EmcEvents.RELOAD_LATEST_VL_RESULT,  () =>  setLatestVLResult(true))
    EventBus.on(EmcEvents.RELOAD_STAGING_INFORMATION, () => setStagingInfo())
   })

    return {
      patientInfo,
      onClickHandler,
      clickable,
    }
  },
})
</script>

<style scoped>
ion-list {
  height: 100%;
}
</style>
