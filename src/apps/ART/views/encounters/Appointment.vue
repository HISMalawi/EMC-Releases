<template>
  <his-standard-form
    :fields="fields"
    :onFinishAction="onFinish"
    :skipSummary="true"
    :cancelDestinationPath="cancelDestination"
  >
  </his-standard-form>
</template> 
<script lang="ts">
import { defineComponent } from "vue";
import { Field, Option } from "@/components/Forms/FieldInterface"
import { FieldType } from "@/components/Forms/BaseFormElements";
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import Validation from "@/components/Forms/validations/StandardValidations";
import { alertConfirmation, toastWarning } from "@/utils/Alerts"
import EncounterMixinVue from '../../../../views/EncounterMixin.vue';
import {AppointmentService} from '@/apps/ART/services/appointment_service'
import { PatientPrintoutService } from "@/services/patient_printout_service";
import App from "@/apps/app_lib"
import { isEmpty } from "lodash";
import HisDate from "@/utils/Date"
import ART_GLOBAL_PROP from "@/apps/ART/art_global_props"
import dayjs from "dayjs";
import { delayPromise } from "@/utils/Timers";

export default defineComponent({
  mixins: [EncounterMixinVue],
  components: { HisStandardForm },
  data: () => ({
    appointment: {} as any,
  }),
  watch: {
    ready: {
      handler(ready: boolean) {
        if (ready) {
          this.appointment = new AppointmentService(this.patientID, this.providerID)
          this.fields = this.getFields()
        }
      },
      immediate: true
    }
  },
  methods: {
    async onFinish(_: any, computedData: any) {
      await this.appointment.createEncounter()
      await this.appointment.saveObservationList(
        (await this.resolveObs(computedData))
      )
      const printer = new PatientPrintoutService(this.patientID);
      // TODO: remove the program checks here
      const appsThatDoNotPrint = ['CxCa', 'ANC']
      if(!appsThatDoNotPrint.includes(`${App.getActiveApp()?.applicationName}`)) {
        await printer.printVisitSummaryLbl();
      }
      this.nextTask()
    },
    getFields(): Array<Field> {
      const d = (date: string) => HisDate.toStandardHisDisplayFormat(date)
      let clinicDays: any = []
      let appointmentLimit = -1
      let clinicHolidays: any = []
      let nextAppointment = this.appointment.date
      let drugRunoutDate: string | null = null
      const dateAppointments: Record<string, number> = {}
      const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return [
        {
          id: "set_appointment",
          helpText: "Appointments booking",
          type: FieldType.TT_DATE_PICKER,
          init: async () => {
            try {
              const res = await this.appointment.getNextAppointment()
              if (!isEmpty(res)) {
                nextAppointment = res.appointment_date
                drugRunoutDate = res.drugs_run_out_date
              } 
            } catch(e) {
              await delayPromise(400)
              if (!(await alertConfirmation('Next appointment/drug-runout date is not available, do you want to proceed anyway?'))) {
                this.gotoPatientDashboard()
              }
              console.warn(e)
            }
            const limitRes = (await ART_GLOBAL_PROP.appointmentLimit());
            if (limitRes){
              if (typeof limitRes === 'string') {
                appointmentLimit = parseInt(limitRes)
              } else {
                appointmentLimit = limitRes
              }
            }
            return true
          },
          onValue: async (date: string) => {
            if (dateAppointments[date] === undefined) {
              const res = await AppointmentService.getDailiyAppointments(date)
              dateAppointments[date] = Array.isArray(res) ? res.length : 0
            }
            if (appointmentLimit >= 1 && dateAppointments[date] >= appointmentLimit) {
              const confirm = await alertConfirmation(
                `Appointment limit reached for the selected date ${d(date)}`, 
                {
                  header: "APPOINTMENT LIMIT REACHED",
                  cancelBtnLabel: "Proceed with Selected Date",
                  confirmBtnLabel: "Select Another Date"
                }
              )
              if (confirm) return false
            }
            // Check clinic holidays
            if (isEmpty(clinicHolidays)) {
              const holidays: string = await ART_GLOBAL_PROP.clinicHolidays()
              if(holidays) {
                clinicHolidays = holidays.split(',')
              }
            }
            if(clinicHolidays.includes(date)) {
              if (!(await alertConfirmation("Selected date is a clinic holiday, do you want to set an appointment?"))) 
                return false;
            }
            //Check clinic days
            if (isEmpty(clinicDays)) {
              let days = ''
              if (this.patient.getAge() >= 18) {
                days = await ART_GLOBAL_PROP.adultClinicDays()
              } else {
                days = await ART_GLOBAL_PROP.peadsClinicDays()
              }
              if (days) clinicDays = days.split(',')
            }
            const weekDay = weekDays[dayjs(date).day()]
            if(!clinicDays.includes(weekDay)){
              const proceed = await alertConfirmation(
                `The selected date ${d(date)} is not a clinic day. Do you want to proceed with this date?`
              )
              if (!proceed) return false
            }
            return true
          },
          validation: (val: any) => Validation.required(val),
          defaultValue: () => nextAppointment,
          computedValue: (date: string) => {
            return [
              this.appointment.buildValueDate('Appointment date', date),
              this.appointment.buildValueDate('Estimated date', nextAppointment)
            ]
          },
          config: {
            hiddenFooterBtns: [
              'Clear'
            ],
            minDate: () => this.appointment.date,
            maxDate: () => drugRunoutDate,
            supValue: (date: string) => `${dateAppointments[date]}`,
            infoItems: (date: string) => {
              return [
                { 
                  label: 'Medication Run out Date',
                  value: drugRunoutDate ? d(drugRunoutDate) : 'Not available'
                },
                {
                  label: 'User set appointment date',
                  value: d(date)
                },
                {
                  label: 'Appointments',
                  value: dateAppointments[date]
                },
                {
                  label: 'Appointment limit (per/day)',
                  value: appointmentLimit
                }
              ]
            }
          }
        }
      ]
    }
  }
});
</script>
