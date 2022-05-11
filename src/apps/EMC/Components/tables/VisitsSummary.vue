<template>
  <ion-card class="his-card" style="padding: 0 !important">
    <ion-card-header>
      <ion-card-title>
        Summary of Visits
        <span class="ion-float-right ion-margin-end ion-margin-bottom">
          <ion-button>Add Visit</ion-button>
          <ion-button>Update Outcome</ion-button>
          <ion-button>Viral Load</ion-button>
        </span>
      </ion-card-title>
    </ion-card-header>
    <ion-card-content class="ion-no-padding" style="min-height: 55vh;">
      <report-table
        :asyncRows="getPatientVisits"
        :columns="columns"
        :config="tableConfig"
      />
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import DrillTableModalVue from '@/components/DataViews/DrillTableModal.vue';
import table, { ColumnInterface } from '@/components/DataViews/tables/ReportDataTable';
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import { EncounterService } from '@/services/encounter_service';
import { ObservationService } from '@/services/observation_service';
import { Patientservice } from '@/services/patient_service';
import { ProgramService } from '@/services/program_service';
import popVoidReason from '@/utils/ActionSheetHelpers/VoidReason';
import HisDate from "@/utils/Date";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, modalController } from '@ionic/vue';
import dayjs from 'dayjs';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  props: {
    patientId: {
      type: Number,
      required: true
    },
    startDate:{
      type: String,
      required: true
    }
  },
  components: {
    ReportTable,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  setup(props) {
    const tableConfig = reactive({
      showIndex: false,
      tableCssTheme: "emc-datatable-theme"
    })

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
      table.thTxt('Viral Load')
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

      const rows = dates.map(async (date: string) => {
        const data =  await ProgramService.getCurrentProgramInformation(props.patientId,  date)
        let nextAppointment = '';
        if (data.outcome !== 'Defaulted') {
          const nDate = await ObservationService.getFirstValueDatetime(props.patientId, 'appointment date', date);
          if(nDate) nextAppointment = HisDate.toStandardHisDisplayFormat(nDate)
        }
        return [
          table.td(formatVisitDate(date)),
          table.td(data['visit_by'].match(/Unk/i) ? "" : data['visit_by']),
          table.td(data.weight),
          table.td(data.height),
          table.td(data.bmi),
          table.td(data.pregnant ? data.pregnant : ''),
          table.td(data['breast_feeding'] ? data['breast_feeding'] : ''),
          table.td(data['tb_status'].match(/Unknown/i) ? '' : data['tb_status']),
          table.td(data['side_effects'].length ? 'Yes' : 'No'),
          table.tdLink(data.regimen, () => showDrugsDispensed(data.pills_dispensed, date)),
          table.td(nextAppointment || ''),
          table.td(data.outcome.match(/Unk/i) ? "" : data.outcome),
          table.td(data['viral_load']),
          table.tdBtn('X', (index: number, activeRows: any[]) => removeEncounters(date, index, activeRows), {}, 'danger')
        ]
      });
      return Promise.all(rows)
    }
    return {
      tableConfig,
      columns,
      getPatientVisits,
    }
  },
})
</script>
