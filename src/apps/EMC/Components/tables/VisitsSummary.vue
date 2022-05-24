<template>
  <ion-card class="his-card" style="padding: 0 !important">
    <ion-card-header>
      <ion-card-title>
        <span class="title">Summary of Visits</span>
        <span class="ion-float-right ion-margin-end ion-margin-bottom">
          <ion-button v-for="btn in actionButtons" :key="btn.label" @click="btn.action" :color="btn.color || 'primary'">
            <ion-icon v-if="btn.icon" :icon="btn.icon" class="ion-margin-right" />
            {{ btn.label }}
          </ion-button>
        </span>
      </ion-card-title>
    </ion-card-header>
    <ion-card-content class="ion-no-padding" style="min-height: 45vh;">
      <report-table
        :asyncRows="getPatientVisits"
        :columns="columns"
        :config="tableConfig"
        :key="refreshKey"
      />
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import DrillTableModalVue from '@/components/DataViews/DrillTableModal.vue';
import table, { ColumnInterface, RowInterface } from '@/components/DataViews/tables/ReportDataTable';
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import { EncounterService } from '@/services/encounter_service';
import { ObservationService } from '@/services/observation_service';
import { Patientservice } from '@/services/patient_service';
import { ProgramService } from '@/services/program_service';
import popVoidReason from '@/utils/ActionSheetHelpers/VoidReason';
import HisDate from "@/utils/Date";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, modalController } from '@ionic/vue';
import dayjs from 'dayjs';
import { defineComponent, reactive, ref } from 'vue';
import ViralLoadInput from '@/apps/EMC/Components/modals/ViralLoadInput.vue';
import OutcomeStatus from '@/apps/EMC/Components/modals/OutcomeStatus.vue';
import PatientVisit from '@/apps/EMC/Components/modals/PatientVisit.vue';

interface ActionButtonInterface {
  label: string;
  icon?: string;
  action: () => any;
  color?: string;
}

export default defineComponent({
  props: {
    patientId: {
      type: Number,
      required: true
    },
    startDate:{
      type: String,
      required: true
    },
  },
  components: {
    ReportTable,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  },
  setup(props) {
    const refreshKey = ref(1000);
    const tableConfig = reactive({
      showIndex: false,
      tableCssTheme: "emc-datatable-theme"
    })

    const showModal = async (component: any, componentProps?: Record<string, any>) => {
      const modal = await modalController.create({
        component,
        cssClass: 'custom-modal',
        componentProps,
      });
      modal.present();
      const { data } = await modal.onWillDismiss();
      if(data) return data;
    }

    const actionButtons = ref<ActionButtonInterface[]>([
      {
        label: "Add Visit",
        action: async () => {
          const refresh = await showModal(PatientVisit, {
            patientId: props.patientId,
          })
          if(refresh) refreshKey.value++;
        }
      },
      {
        label: "Update Outcome",
        action:async () => {
          const refresh = await showModal(OutcomeStatus, {
            patientId: props.patientId,
          })
          if(refresh) refreshKey.value++;
        }
      },
      {
        label: "Enter VL Results",
        action: async () => {
          const result = await showModal(ViralLoadInput, {
            patientId: props.patientId,
          });
          if(result) refreshKey.value++
        }
      }
    ])

    const columns = ref<ColumnInterface[][]>([[
      table.thTxt('Visit Date'),
      table.thTxt("Given To"),
      table.thTxt('Weight (Kg)'),
      table.thTxt('Height (cm)'),
      table.thTxt('BMI'),
      table.thTxt('Preg'),
      table.thTxt('B/F'),
      table.thTxt('TB STATUS'),
      table.thTxt('Side Effects'),
      table.thTxt('ART Regimen'),
      table.thTxt('Next Appointment'),
      table.thTxt('Outcome'),
      table.thTxt('Viral Load'),
      table.thTxt('Void Visit')
    ]])

    const formatVisitDate = (date: string) => {
      const monthsElapsed = props.startDate !== "N/A" 
          ? '(' + dayjs(date).diff(props.startDate, 'months') + 'M)' 
          : ''
      return `${HisDate.toStandardHisDisplayFormat(date)} ${monthsElapsed}`
    }

    const showDrugsDispensed = async (drugs = [] as any[], date: string) => {
      (await modalController.create({
        component: DrillTableModalVue,
        cssClass: "custom-modal",
        componentProps: {
          title: `Drugs dispensed on ${HisDate.toStandardHisDisplayFormat(date)}`,
          columns: ['DRUG NAME', 'QUANTITY', 'UNITS' ],
          onRows: () => drugs.map((drug: any) => [drug[0], drug[1], 'tab(s)' ]),
        },
      })).present();
    }

    const removeEncounters = async (date: string, index: number, activeRows: any[]) => {
      popVoidReason(async (reason: string) => {
        const encounters = await EncounterService.getEncounters(props.patientId, {date});
        encounters.forEach(async (encounter: any) => {
          await EncounterService.voidEncounter(encounter.encounter_id, reason);
        })
        activeRows.splice(index, 1);
      }, 'small-modal');
    }
        

    const getPatientVisits = async () => {
      const dates = await Patientservice.getPatientVisits(props.patientId, true);
      const rows: RowInterface[][] = [];

      for (const date of dates) {
        const data =  await ProgramService.getCurrentProgramInformation(props.patientId,  date)
        let nextAppointment = '';
        let pregnant = '';
        let breastfeeding = '';
        let vlResult = ''

        if (data.outcome !== 'Defaulted') {
          const nDate = await ObservationService.getFirstValueDatetime(props.patientId, 'appointment date', date);
          if(nDate) nextAppointment = HisDate.toStandardHisDisplayFormat(nDate)
          pregnant = await ObservationService.getFirstValueCoded(props.patientId, 'Is patient pregnant', date);
          breastfeeding = await ObservationService.getFirstValueCoded(props.patientId, 'Is patient breast feeding', date);
          if(data['viral_load'] === 'N/A') {
            const vlObs = await ObservationService.getFirstObs(props.patientId, "HIV viral load", date)
            if(vlObs && vlObs.value_text && vlObs.value_numeric) {
              vlResult = vlObs.value_numeric === 1 ? "LDL" : vlObs.value_text + vlObs.value_numeric.toString()
            }
          } else {
            vlResult = data['viral_load']
          }
        }
        data && rows.push([
          table.td(formatVisitDate(date)),
          table.td(data['visit_by'].match(/Unk/i) ? "" : data['visit_by']),
          table.td(data.outcome === 'Defaulted' ? '' : data.weight),
          table.td(data.outcome === 'Defaulted' ? '' : data.height),
          table.td(data.outcome === 'Defaulted' ? '' : data.bmi),
          table.td(pregnant || ''),
          table.td(breastfeeding ||''),
          table.td(data['tb_status'].match(/Unknown/i) || data.outcome === 'Defaulted' ? '' : data['tb_status']),
          table.td(data['side_effects'].length ? 'Yes' : data.outcome !== 'Defaulted' ? 'No' : ''),
          table.tdLink(data.outcome === 'Defaulted' ? '' : data.regimen, () => showDrugsDispensed(data.pills_dispensed, date)),
          table.td(nextAppointment || ''),
          table.td(data.outcome.match(/Unk/i) ? "" : data.outcome),
          table.td(vlResult),
          table.tdBtn('X', (index: number, activeRows: any[]) => removeEncounters(date, index, activeRows), {}, 'danger')
        ])
      }
      return rows;
    }

    return {
      refreshKey,
      actionButtons,
      tableConfig,
      columns,
      getPatientVisits,
    }
  },
})
</script>

<style scoped>
.title {
  font-weight: bold;
}
</style>
