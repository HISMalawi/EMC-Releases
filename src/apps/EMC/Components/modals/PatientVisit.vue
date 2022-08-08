<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Patient Visit</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class=" ion-padding">
    <ion-grid style="width: 100%">
      <ion-row>
        <ion-col size="6" class="ion-margin-vertical">
          <DateInput v-model="form.visitDate" :form="form" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <NumberInput v-model="form.weight" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical" v-if="showHeightField">
          <NumberInput v-model="form.height" :form="form" :min="1"/>
        </ion-col>
        <ion-col class="ion-margin-vertical" :size="showHeightField ? 6 : 12">
          <SelectInput v-model="form.tbStatus" :options="tbStatuses" />
        </ion-col>
        <template v-if="isFemale">
          <ion-col size="6" class="ion-margin-vertical ion-padding-vertical">
            <yes-no-input v-model="form.isPregnant" inline />
          </ion-col>
          <ion-col size="6" class="ion-margin-vertical ion-padding-vertical">
            <yes-no-input v-model="form.isBreastfeeding"  inline />
          </ion-col>
        </template>
        <ion-col :size="hasContraindications ? 6 : 12 " class="ion-margin-vertical" >
          <yes-no-input v-model="form.hasContraindications"  inline />
          <multi-column-view :items="contraIndications" :numberOfColumns="2" v-slot="{ entries }" v-if="hasContraindications">
            <ion-item lines="none" v-for="entry in entries" :key="entry.value">
              <ion-label>{{ entry.label }}</ion-label>
              <ion-checkbox slot="start" v-model="entry.isChecked" />
            </ion-item>
          </multi-column-view>
        </ion-col>
        <ion-col class="ion-padding-start" size="6" v-if="hasContraindications">
          <yes-no-input v-model="form.hasSideEffects" inline />
          <multi-column-view :items="sideEffects" :numberOfColumns="2" v-slot="{ entries }" v-if="hasSideEffects">
            <ion-item lines="none" v-for="entry in entries" :key="entry.value">
              <ion-label>{{ entry.label }}</ion-label>
              <ion-checkbox slot="start" v-model="entry.isChecked" />
            </ion-item>
          </multi-column-view>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <SelectInput v-model="form.regimen" :options="regimens" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <NumberInput v-model="form.totalArvsGiven" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <NumberInput v-model="form.totalCPTGiven" :form="form" :min="1"/>
        </ion-col>
         <ion-col size="6" class="ion-margin-vertical">
          <SelectInput v-model="form.tbMed" :options="tbMeds" />
        </ion-col>
        <ion-col :size="hasGivenRFP ? 6 : 12" v-if="hasGiven6H || hasGivenRFP">
          <NumberInput v-model="form.totalIPTGiven" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" v-if="hasGivenRFP">
          <NumberInput v-model="form.totalRFPGiven" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="12" v-if="hasGiven3HP">
          <NumberInput v-model="form.total3HPGiven" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <yes-no-input v-model="form.patientPresent" inline :disabled="form.patientPresent.disabled" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <yes-no-input v-model="form.guardianPresent" inline />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <NumberInput v-model="form.pillCount" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <DateInput v-model="form.nextAppointmentDate" :form="form" />
        </ion-col>
      </ion-row>   
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="modal.hide()" slot="end">Close</ion-button>
      <ion-button color="warning" @click="onClear" slot="end">Reset</ion-button>
      <ion-button color="success" @click="onSubmit" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from "vue";
import { 
  IonCol, 
  IonGrid, 
  IonRow,  
  IonContent, 
  IonFooter, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonLabel,
  IonCheckbox,
IonItem,
} from "@ionic/vue";
import { alertConfirmation, toastSuccess } from "@/utils/Alerts";
import isEmpty from "lodash/isEmpty";
import { Option } from "@/components/Forms/FieldInterface";
import YesNoInput from "../inputs/YesNoInput.vue";
import SelectInput from "../inputs/SelectInput.vue";
import DateInput from "../inputs/DateInput.vue";
import NumberInput from "../inputs/NumberInput.vue";
import { ConceptService } from "@/services/concept_service";
import MultiColumnView from "@/components/containers/MultiColumnView.vue";
import { PatientObservationService } from "@/services/patient_observation_service";
import { RegimenService } from "@/services/regimen_service";
import { DrugOrderService } from "@/services/drug_order_service";
import { VitalsService } from "@/apps/ART/services/vitals_service";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { ConsultationService } from "@/apps/ART/services/consultation_service";
import { ReceptionService } from "@/apps/ART/services/reception_service";
import { AdherenceService } from "@/apps/ART/services/adherence_service";
import { AppointmentService } from "@/apps/ART/services/appointment_service";
import { PrescriptionService } from "@/apps/ART/services/prescription_service";
import dayjs from "dayjs";
import { ObsValue } from "@/services/observation_service";
import { BMIService } from "@/services/bmi_service";
import { DispensationService } from "@/apps/ART/services/dispensation_service";
import { DTForm } from "../../interfaces/dt_form_field";
import { isValidForm, optionsToGroupObs, resolveFormValues, resolveObs } from "../../utils/form";
import { toOptions } from "../../utils/DTFormElements";
import { loader } from "@/utils/loader";
import { modal } from "@/utils/modal";
import { EmcEvents } from "../../interfaces/emc_event";
import EventBus from "@/utils/EventBus";

export default defineComponent({
  components: {
    IonContent,
    IonFooter,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    SelectInput,
    NumberInput,
    DateInput,
    YesNoInput,
    MultiColumnView
  },
  props: {
    patient: {
      type: Object as PropType<PatientObservationService>,
      required: true
    },
  },
  setup(props) {
    const patientId = computed(() => props.patient.getID())
    const vitals = new VitalsService(patientId.value, -1)
    const consultations = new ConsultationService(patientId.value, -1)
    const prescription = new PrescriptionService(patientId.value, -1)
    const dispensation = new DispensationService(patientId.value, -1)
    const reception = new ReceptionService(patientId.value, -1)
    const adherence = new AdherenceService(patientId.value, -1)
    const appointment = new AppointmentService(patientId.value, -1)
    const prevHeight = ref<number>()
    const regimens = ref<Option[]>([])
    const contraIndications = ref<Option[]>([]);
    const sideEffects = ref<Option[]>([]);
    const prevDrugs = ref<any[]>([]);
    const showHeightField = computed(() => !(prevHeight.value && props.patient.getAge() > 18))
    const isFemale = computed(() => props.patient.isFemale())

    const form = reactive<DTForm>({
      visitDate: {
        value: undefined as string | undefined,
        label: "Visit Date",
        required: true,
        validation: async (date: Option) => {
          if(dayjs(date.value).isAfter(dayjs())) {
            return ["Visit date cannot be after today's date"]
          }
          if(dayjs(date.value).isBefore(dayjs(props.patient.getBirthdate()))) {
            return ["Visit date cannot be before patient's birth date"]
          }
          return null
        }
      },
      weight: {
        value: undefined as number | undefined,
        label: "Weight",
        required: true,
        computedValue: (weight: number) => ({
          tag: 'vitals',
          obs: vitals.buildValueNumber('Weight', weight)
        }),
        validation: (weight: Option) => vitals.validator({...weight, label: 'Weight'})
      },
      height: {
        value: undefined as number | undefined,
        label: "Height",
        computedValue: (height: number) => ({
          tag: 'vitals',
          obs: vitals.buildValueNumber('Height', height)
        }),
        validation: (height: Option) => showHeightField.value && vitals.validator({...height, label: 'Height'})
      },
      isPregnant: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the patient pregnant?',
        computedValue: (isPregnant: "Yes" | "No") => ({
          tag: 'consultation',
          obs: consultations.buildValueCoded('Is patient pregnant', isPregnant)
        }),
        validation: async (state: Option) => isFemale.value && StandardValidations.required(state)
      },
      isBreastfeeding: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the patient breastfeeding?',
        computedValue: (isBreastfeeding: "Yes" | "No") => ({
          tag: 'consultation',
          obs: consultations.buildValueCoded('Is patient breast feeding', isBreastfeeding)
        }),
        validation: async (state: Option) => isFemale.value && StandardValidations.required(state)
      },
      nextAppointmentDate: {
        value: undefined as string | undefined,
        label: "Next Appointment Date",
        required: true,
        computedValue: (nextAppointmentDate: string) => ({
          tag: 'appointment',
          obs: appointment.buildValueDate('Appointment date', nextAppointmentDate)
        }),
        validation: async (date, form) => {
          if(dayjs(date.value).isBefore(dayjs(form.visitDate.value))) {
            return ["Appointment date cannot be before visit date"]
          }
          return null
        }
      },
      patientPresent: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the patient present?',
        required: true,
        computedValue: (patientPresent: "Yes" | "No") => ({
          tag: 'reception',
          obs: reception.buildValueCoded('Patient present', patientPresent)
        }),
      },
      guardianPresent: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the guardian present?',
        required: true,
        computedValue: (guardianPresent: "Yes" | "No") => ({
          tag: 'reception',
          obs: reception.buildValueCoded('Guardian present', guardianPresent)
        }),
      },
      pillCount: {
        value: undefined as number  | undefined,
        label: "Pill Count",
        required: true,
        validation: async (pills: Option) => StandardValidations.isNumber(pills)
      },
      regimen: {
        value: undefined as string | undefined,
        label: "Regimen",
        placeholder: "Select a regimen",
        computedValue: () => ({
          tag: 'consultation',
          obs: prescription.buildValueCoded("Medication orders", "Antiretroviral drugs")
        }),
      },
      totalCPTGiven: {
        value: undefined as number  | undefined,
        label: "Total CPT Given",
        computedValue: () => ({
          tag: 'consultation',
          obs: prescription.buildValueCoded("Medication orders", "CPT")
        }),
      },
      totalIPTGiven: {
        value: undefined as number  | undefined,
        label: "Total IPT Given",
        computedValue: () => ({
          tag: 'consultation',
          obs: prescription.buildValueCoded("Medication orders", "INH")
        }),
        validation: async (drugs: Option, form: any) => {
          return (form.tbMed.value === '6H' || form.tbMed.value?.label === '3HP (RFP + INH)') && 
            StandardValidations.isNumber(drugs)
        }
      },
      totalRFPGiven: {
        value: undefined as number  | undefined,
        label: "Total RFP Given",
        computedValue: () => ({
          tag: 'consultation',
          obs: prescription.buildValueCoded("Medication orders", "3HP (RFP + INH)")
        }),
        validation: async (drugs: Option, form: any) => {
          return form.tbMed.value === '3HP (RFP + INH)' && 
            StandardValidations.isNumber(drugs)
        }
      },
      total3HPGiven: {
        value: undefined as number  | undefined,
        label: "Total 3HP Given",
        computedValue: () => ({
          tag: 'consultation',
          obs: prescription.buildValueCoded("Medication orders", "INH 300 / RFP 300 (3HP)")
        }),
        validation: async (drugs: Option, form: any) => {
          return form.tbMed.value === '3HP (INH 300 / RFP 300)' && 
            StandardValidations.isNumber(drugs)
        }
      },
      totalArvsGiven: {
        value: undefined as number  | undefined,
        label: "Total ARVs Given",
        validation: async (drugs: Option, form: any) => form.regimen.value && StandardValidations.isNumber(drugs)
      },
      tbMed: {
        value: undefined as string | undefined,
        label: "TB Medication",
        placeholder: "Select a TB medication",
      },
      hasContraindications: {
        value: undefined as "Yes" | "No"  | undefined,
        label: "Has Side Effects / Contraindications ?",
        validation: async (state: Option) => {
          if(state.value === "Yes" && contraIndications.value.some(x => !x.isChecked))
            return ["Please select at least one side effect"]
          return StandardValidations.required(state)
        }
      },
      hasSideEffects: {
        value: undefined as "Yes" | "No"  | undefined,
        label: "Has Other Side Effects ?",
        validation: async (state: Option, form: any) => {
          if(form.hasContraindications.value === "No") return null
          if(state.value === "Yes" && sideEffects.value.some(x => !x.isChecked))
            return ["Please select at least one side effect"]
          return StandardValidations.required(state)
        }
      },
      tbStatus: {
        value: undefined as string | undefined,
        label: "TB Status",
        computedValue: (status: string) => ({
          tag: 'consultation',
          obs: consultations.buildValueCoded('TB Status', status)
        }),
        validation: async (state) => StandardValidations.required(state)
      },
    })

    watch(form.patientPresent, isPresent => {
      if(isPresent.value === "No") {
        form.guardianPresent.value = "Yes"
      }
    })

    watch(form.guardianPresent, isPresent => {
      if(isPresent.value === "No") {
        form.patientPresent.value = "Yes"
      }
    })

    watch([form.weight, form.tbStatus], async () => {
      if(form.weight.value) {
        const regs = await RegimenService.getRegimensByWeight(form.weight.value)
        if(!isEmpty(regs)) {
          regimens.value = Object.keys(regs).map(key => ({
            label: key, 
            value: key, 
            other: regs[key] 
          }))
        }

        form.patientPresent.value = "Yes"
        form.patientPresent.disabled = true
      }
    })

    const hasGiven3HP = computed(() => form.tbMed.value === '3HP (INH 300 / RFP 300)')
    const hasGivenRFP = computed(() => form.tbMed.value === '3HP (RFP + INH)')
    const hasGiven6H = computed(() => form.tbMed.value === '6H')
    const hasContraindications = computed(() => form.hasContraindications.value === 'Yes')
    const hasSideEffects = computed(() => form.hasSideEffects.value === 'Yes')

    const tbStatuses = toOptions([
      'Confirmed TB Not on treatment', 
      'Confirmed TB on treatment', 
      'TB Not Suspected',
      'TB Suspected'
    ]);

    const tbMeds = toOptions(['6H', '3HP (RFP + INH)', '3HP (INH 300 / RFP 300)'])
    
    const setPatientPresent = (state: "Yes" | "No") => {
      form.patientPresent.value = state 
      if(state === 'No') {
        form.guardianPresent.value = "Yes"
      }
    }

    const setGuardianPresent = (state: "Yes" | "No") => {
      form.guardianPresent.value = state
      if(state === 'No') {
        form.patientPresent.value = "Yes"
      }
    }

    const buildBmiObs = async (formData: any): Promise<ObsValue> => {
      const height = formData.height || prevHeight.value
      const bmi = BMIService.calculateBMI(formData.weight, height)
      return vitals.buildValueNumber('BMI', bmi)
    }

    const buildFpmObs = async () => {
      const obs: ObsValue[] = [
        await consultations.buildValueCoded('Patient using family planning', 'No')
      ]
      const methods = consultations.getFamilyPlanningMethods()
      methods.forEach(async (method) => {
        obs.push(await consultations.buildValueCoded(method, "No"))
      })
      return obs
    }

    const getTbSymptomsObs = async () => {
      return await Promise.all(ConceptService.getConceptsByCategory("tb_symptom", true).map(async (concept) => {
        return await consultations.buildGroupValueCoded(concept.name, concept.name, "No")
      }))
    }

    const toDrugOrder = (drug: any, quantity: number, duration: number, startDate: string) => {
      return {
        "drug_inventory_id": drug.drug_id,
        "equivalent_daily_dose": prescription.calculateEquivalentDosage(drug.am, drug.pm),
        "dose": prescription.calculateDosage(drug.am, drug.pm),
        'start_date': startDate,
        "auto_expire_date": dayjs(startDate).add(duration, 'days').format('YYYY-MM-DD'), 
        "units": drug.units,
        "qty": quantity,
        "frequency": drug.frequency,
        "instructions": prescription.getInstructions(drug.drug_name, drug.am, drug.pm, drug.units),
      }
    }

    const onSubmit = async () => {
      await loader.show()
      if(!(await isValidForm(form))) return loader.hide()
      await PatientObservationService.setSessionDate(form.visitDate.value)
      vitals.setDate(form.visitDate.value)
      consultations.setDate(form.visitDate.value)
      prescription.setDate(form.visitDate.value)
      reception.setDate(form.visitDate.value)
      adherence.setDate(form.visitDate.value)
      appointment.setDate(form.visitDate.value)
      dispensation.setDate(form.visitDate.value)

      const { formData, computedFormData } = resolveFormValues(form)
      
      await vitals.createEncounter()
      const vitalsObs = await resolveObs(computedFormData, 'vitals')
      const bmiObs = await buildBmiObs(formData)
      await vitals.saveObservationList([...vitalsObs, bmiObs])

      await consultations.createEncounter()
      const consultationObs = await resolveObs(computedFormData, 'consultation')
      if(isFemale.value) consultationObs.concat(await buildFpmObs())
      if(hasContraindications.value) 
        consultationObs.concat(await optionsToGroupObs("Malawi ART side effects", contraIndications.value))
      if(hasSideEffects.value) 
        consultationObs.concat(await optionsToGroupObs("Other side effect", sideEffects.value))
      consultationObs.concat(await getTbSymptomsObs())
      await consultations.saveObservationList(consultationObs)

      await prescription.createEncounter()
      const drugOrders: any[] = []
      let duration = 0
      if(formData.regimen && formData.totalArvsGiven) {
        const arvDrugs: any[] = regimens.value.find(x => x.label === formData.regimen)?.other || []
        duration = Math.min(...arvDrugs.map(drug =>(formData.totalArvsGiven / (drug.am + drug.pm)) + 2))
        arvDrugs.forEach((drug: any) => drugOrders.push(
          toDrugOrder(drug, formData.totalArvsGiven, duration, formData.visitDate)
        ))
      }

      if(formData.totalCPTGiven) {
        const cptRegimens = await RegimenService.getRegimenExtras('Cotrimoxazole', formData.weight)
        cptRegimens.forEach((drug: any) => {
          if(drug.drug_name !== "Cotrimoxazole (480mg tablet)") {
            drugOrders.push(toDrugOrder(drug, formData.totalCPTGiven, duration, formData.visitDate))
          }
        })
      }

      if(formData.totalIPTGiven) {
        const iptRegimens = await RegimenService.getRegimenExtras('INH', formData.weight)
        iptRegimens.forEach((drug: any) => {
          drugOrders.push(toDrugOrder(drug, formData.totalIPTGiven, duration, formData.visitDate))
        })
      }

      if(formData.totalRFPGiven) {
        const rfpRegimens = await RegimenService.getRegimenExtras('Rifapentine', formData.weight)
        rfpRegimens.forEach((drug: any) => {
          drugOrders.push(toDrugOrder(drug, formData.totalRFPGiven, duration, formData.visitDate))
        })
      }

      if(formData.total3HPGiven) {
        const threeHPRegimens = await RegimenService.getRegimenExtras('INH / RFP', formData.weight)
        threeHPRegimens.forEach((drug: any) => {
          drugOrders.push(toDrugOrder(drug, formData.total3HPGiven, duration, formData.visitDate))
        })
      }

      const orders: any[] = await prescription.createDrugOrder(drugOrders)
      const dispensations = orders.map(order => {
        const drug = drugOrders.find(drug => drug.drug_inventory_id === order.drug_inventory_id)
        return dispensation.buildDispensations(order.order_id, drug.qty, 1)
      })
      await dispensation.saveDispensations(dispensations.flat(1))

      await reception.createEncounter()
      const receptionObs = await resolveObs(computedFormData, 'reception')
      await reception.saveObservationList(receptionObs)

      await adherence.createEncounter()
      const adherenceObs = await Promise.all(prevDrugs.value.map(async (drug: any) => {
        const expected = adherence.calculateExpected(drug.quantity, drug.equivalent_daily_dose, drug.order.start_date)
        const adh = adherence.calculateAdherence(drug.quantity, formData.pillCount, expected)
        return [
          await adherence.buildAdherenceObs(drug.order_id, drug.drug_inventory_id, adh),
          await adherence.buildPillCountObs(drug.order_id, formData.pillCount)
        ]
      }))
      await adherence.saveObservationList(adherenceObs.flat(1))

      await appointment.createEncounter()
      const appointmentObs = await resolveObs(computedFormData, 'appointment')
      await appointment.saveObservationList(appointmentObs)
      await toastSuccess('Patient visit saved successfully')

      await PatientObservationService.resetSessionDate()

      await loader.hide()
      await modal.hide()
      EventBus.emit(EmcEvents.RELOAD_PATIENT_VISIT_DATA);
    }

    const onClear = async () => {
      const confirm = await alertConfirmation('Are you sure you want to clear all fields?')
      if(confirm) {
        for(const key in form) {
          form[key].value = ''
          form[key].error = ''
        }
      }
    }

    onMounted (async () => {
      prevHeight.value = await props.patient.getRecentHeight()
      const recentWeight = await props.patient.getRecentWeight()
      if (recentWeight) {
        const regs = await RegimenService.getRegimensByWeight(recentWeight)
        if(!isEmpty(regs)) {
          regimens.value = Object.keys(regs).map(key => ({ 
            label: key, 
            value: key, 
            other: regs[key] 
          }))
        }
      }
      prevDrugs.value = await DrugOrderService.getLastDrugsReceived(props.patient.getID())
      contraIndications.value = ConceptService
        .getConceptsByCategory("contraindication", true)
        .map(concept => ({
          value: concept.concept_id,
          label: concept.name,
          other: concept
        }));
      sideEffects.value = ConceptService
        .getConceptsByCategory("side_effect", true)
        .map(concept => ({
          value: concept.concept_id,
          label: concept.name,
          other: concept
        }));
    });

    return {
      form,
      regimens,
      contraIndications,
      sideEffects,
      tbStatuses,
      tbMeds,
      hasGiven3HP,
      hasGivenRFP,
      hasGiven6H,
      showHeightField,
      isFemale,
      modal,
      hasContraindications,
      hasSideEffects,
      onSubmit,
      setPatientPresent,
      setGuardianPresent,
      onClear,
    };
  },
})
</script>

<style scoped>
ion-label {
  font-weight: bold;
}

ion-checkbox {
  --size: 20px!important;
}
</style>