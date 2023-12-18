<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Patient Visit</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class=" ion-padding">
    <ion-grid style="width: 100%">
      <ion-row>
        <ion-col size="12" class="ion-margin-vertical">
          <DateInput v-model="form.visitDate" :form="form" :minDate="birthdate" :maxDate="today"/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <yes-no-input v-model="form.patientPresent" inline :disabled="form.patientPresent.disabled" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <yes-no-input v-model="form.guardianPresent" inline />
        </ion-col>
        <template v-if="isFemale">
          <ion-col size="6" class="ion-margin-vertical">
            <yes-no-input v-model="form.isPregnant" inline />
          </ion-col>
          <ion-col size="6" class="ion-margin-vertical">
            <yes-no-input v-model="form.isBreastfeeding"  inline />
          </ion-col>
        </template>
        <ion-col size="6" class="ion-margin-vertical" >
          <yes-no-input v-model="form.hasContraindications"  inline />
          <multi-column-view :items="contraIndications" :numberOfColumns="2" v-slot="{ entries }" v-if="hasContraindications">
            <ion-item lines="none" v-for="entry in entries" :key="entry.value">
              <ion-label>{{ entry.label }}</ion-label>
              <ion-checkbox slot="start" v-model="entry.isChecked" />
            </ion-item>
          </multi-column-view>
        </ion-col>
        <ion-col class="ion-margin-vertical" size="6">
          <yes-no-input v-model="form.hasSideEffects" inline />
          <multi-column-view :items="sideEffects" :numberOfColumns="2" v-slot="{ entries }" v-if="hasSideEffects">
            <ion-item lines="none" v-for="entry in entries" :key="entry.value">
              <ion-label>{{ entry.label }}</ion-label>
              <ion-checkbox slot="start" v-model="entry.isChecked" />
            </ion-item>
          </multi-column-view>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <NumberInput v-model="form.weight" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical" v-if="showHeightField">
          <NumberInput v-model="form.height" :form="form" :min="1"/>
        </ion-col>        
        <ion-col class="ion-margin-vertical" :size="showHeightField ? '12' : '6'" v-if="!isOnActiveTBTreatment">
          <SelectInput v-model="form.tbStatus" :options="tbStatuses" />
        </ion-col>
        <template v-if="isOnTBTreatment">
          <ion-col size="6" class="ion-margin-vertical">
            <DateInput v-model="form.tbTreatmentStartDate" :form="form" :minDate="birthdate" :maxDate="today"/>
          </ion-col>
          <ion-col size="6" class="ion-margin-vertical">
            <NumberInput v-model="form.tbTreatmentPeriod" :form="form" :min="1"/>
          </ion-col>
        </template>
        <template v-else-if="canTestForTB">
          <ion-col size="6" class="ion-margin-vertical">
            <SelectInput v-model="form.tbScreeningMethod" :options="tbScreeningMethods" />
          </ion-col>
          <ion-col size="6" class="ion-margin-vertical">
            <SelectInput v-model="form.tbTestResults" :options="tbResultsOptions" />
          </ion-col>
        </template>
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
        <ion-col size="6" v-if="hasGiven6H || hasGivenRFP">
          <NumberInput v-model="form.totalIPTGiven" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" v-if="hasGivenRFP">
          <NumberInput v-model="form.totalRFPGiven" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" v-if="hasGiven3HP">
          <NumberInput v-model="form.total3HPGiven" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" v-if="hasGiven3HP || hasGivenRFP || hasGiven6H">
          <NumberInput v-model="form.totalPyridoxineGiven" :form="form" :min="1"/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical" v-if="prevDrugs.length > 0">
          <NumberInput v-model="form.pillCount" :form="form" :min="1"/>
        </ion-col>
        <ion-col :size="prevDrugs.length > 0 ? '6' : '12'" class="ion-margin-vertical">
          <DateInput v-model="form.nextAppointmentDate" :form="form" :minDate="form.visitDate.value" :maxDate="drugRunOutDate"/>
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

<script lang="ts" setup>
import { computed, onMounted, PropType, reactive, ref, watch, defineProps} from "vue";
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
import { optionsToGroupObs, resolveObs, submitForm } from "../../utils/form";
import { toOptions } from "../../utils/DTFormElements";
import { modal } from "@/utils/modal";
import { EmcEvents } from "../../interfaces/emc_event";
import EventBus from "@/utils/EventBus";
import { uniqueBy } from "@/utils/Arrays";
import { DISPLAY_DATE_FORMAT, STANDARD_DATE_FORMAT } from "@/utils/Date";
import { ARVDrug } from "@/interfaces/Drug";

const props = defineProps({
  patient: {
    type: Object as PropType<PatientObservationService>,
    required: true
  },
}) 
    const patientId = computed(() => props.patient.getID())
    const vitals = new VitalsService(patientId.value, -1)
    const consultations = new ConsultationService(patientId.value, -1)
    const prescription = new PrescriptionService(patientId.value, -1)
    const dispensation = new DispensationService(patientId.value, -1)
    const reception = new ReceptionService(patientId.value, -1)
    const adherence = new AdherenceService(patientId.value, -1)
    const appointment = new AppointmentService(patientId.value, -1)
    const prevHeight = ref<number>();
    const prevWeight = ref<number>();
    const regimens = ref<Option[]>([])
    const contraIndications = ref<Option[]>([]);
    const sideEffects = ref<Option[]>([]);
    const prevDrugs = ref<any[]>([]);
    const showHeightField = computed(() => !(prevHeight.value && props.patient.getAge() > 18))
    const isFemale = computed(() => props.patient.isFemale())
    const drugRunOutDate = ref<string>('');
    const today = dayjs().format(STANDARD_DATE_FORMAT);
    const birthdate = dayjs(props.patient.getBirthdate()).format(STANDARD_DATE_FORMAT);
    const isOnActiveTBTreatment = ref(false)
    
    const form = reactive<DTForm>({
      visitDate: {
        value: dayjs().format('YYYY-MM-DD') as string | undefined,
        label: "Visit Date",
        required: true,
        validation: async (date: Option) => {
          if(new Date(date.value) > new Date(today)) {
            return ["Visit date cannot be after today's date"]
          }
          if(new Date(date.value) < new Date(birthdate)) {
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
        validation: (weight: Option, form: any) => {
          if ((isEmpty(weight) || !weight.value) && form.patientPresent.value === 'No') {
            return null
          } 
          return vitals.validator({...weight, label: 'Weight'})
        } 
      },
      height: {
        value: undefined as number | undefined,
        label: "Height",
        computedValue: (height: number) => ({
          tag: 'vitals',
          obs: vitals.buildValueNumber('Height', height)
        }),
        validation: (height: Option) => {
          if(!showHeightField.value || ((isEmpty(height) || !height.value) && form.patientPresent.value === 'No')) {
            return null
          }
          return vitals.validator({...height, label: 'Height'})
        }
      },
      isPregnant: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the patient pregnant?',
        required: isFemale.value,
        computedValue: (isPregnant: "Yes" | "No") => ({
          tag: 'consultation',
          obs: consultations.buildValueCoded('Is patient pregnant', isPregnant)
        }),
        validation: async (state: Option) => isFemale.value && StandardValidations.required(state)
      },
      isBreastfeeding: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the patient breastfeeding?',
        required: isFemale.value,
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
          if(new Date(date.value) < new Date(form.visitDate.value)) {
            return ["Appointment date cannot be before visit date"]
          }
          if(new Date(date.value) > new Date(drugRunOutDate.value)) {
            return ["Appointment date cannot be after drug run out date"]
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
        required: prevDrugs.value.length > 0,
        validation: async (pills: Option) => prevDrugs.value.length > 0 && StandardValidations.isNumber(pills)
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
          return (form.tbMed.value?.label === '6H' || form.tbMed.value?.label === '3HP (RFP + INH)') && 
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
          return form.tbMed.value?.label === '3HP (RFP + INH)' && 
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
          return form.tbMed.value?.label === '3HP (INH 300 / RFP 300)' && 
            StandardValidations.isNumber(drugs)
        }
      },
      totalArvsGiven: {
        value: undefined as number  | undefined,
        label: "Total ARVs Given",
        validation: async (drugs: Option, form: any) =>  {
          if (isEmpty(form.regimen.value)) return null;
          return StandardValidations.validateSeries([
            () => StandardValidations.required(drugs),
            () => StandardValidations.isNumber(drugs)
          ])
          
        }
      },
      totalPyridoxineGiven: {
        value: undefined as number  | undefined,
        label: "Total Pyridoxine Given",
        validation: async (amount: Option, form: any) => form.tbMed.value?.label && StandardValidations.isNumber(amount)
      },
      tbMed: {
        value: undefined as Option | undefined,
        label: "TPT Medication",
        placeholder: "Select a TPT medication",
      },
      hasContraindications: {
        value: "No",
        label: "Has Side Effects / Contraindications ?",
        validation: async (state: Option) => StandardValidations.validateSeries([
          ()  => StandardValidations.required(state),
          () => {
            if(state.value === "No" || contraIndications.value.some(x => x.isChecked)) return null
            return ["Please select at least one side effect"]
          }
        ])
      },
      hasSideEffects: {
        value: "No",
        label: "Has Other Side Effects ?",
        validation: async (state: Option) => StandardValidations.validateSeries([
          ()  => StandardValidations.required(state),
          () => {
            if(state.value === "No" || sideEffects.value.some(x => x.isChecked)) return null
            return ["Please select at least one side effect"]
          }
        ])
      },
      tbStatus: {
        value: undefined as Option | undefined,
        label: "TB Status",
        required: true,
        computedValue: (status: Option) => ({
          tag: 'consultation',
          obs: consultations.buildValueCoded('TB Status', status.value)
        }),
      },
      tbTreatmentStartDate: {
        value: "" as string | undefined,
        label: "TB treatment start date",
        validation: async (date: Option) => {
          if(!isOnActiveTBTreatment.value) {
            if(new Date(date.value) > new Date(today)) {
              return ["TB treatment start date cannot be after today's date"]
            }
            if(new Date(date.value) < new Date(birthdate)) {
              return ["TB treatment start date cannot be before patient's birth date"]
            }
          }
          return null
        },
        computedValue: (date: string) => ({
          tag: "consultation",
          obs: consultations.buildValueDate("TB treatment start date", date)
        })
      },
      tbTreatmentPeriod: {
        value: undefined as number  | undefined,
        label: "TB treatment period (months)",
        computedValue: (period: number) => ({
          tag: "consultation",
          obs: consultations.buildValueNumber("TB treatment period", period)
        })
      },
      tbScreeningMethod: {
        value: "",
        label: "TB Testing Method Used for Screening",
        computedValue: (method: Option) => ({
          tag: "consultation",
          obs: consultations.buildValueCoded("TB Testing Method Used for Screening", method.value)
        })
      },
      tbTestResults: {
        value: "",
        label: "TB Testing Method Results",
        computedValue: (method: string) => ({
          tag: "consultation",
          obs: consultations.buildValueText("TB Testing Method Results", method)
        })
      }
    })

    const getRegimens = async (weight: number, onTB?: boolean): Promise<Option[]> => {
      const unknownReg = {
        label: "Unkown",
        value: "Unkown",
        other: [{
          "drug_id": 1046,
          "drug_name": "Unknown ARV",
          "am": 1,
          "pm": 0,
          "units": "",
          "frequency":	"Daily (QOD)"
        }]
      }      
      const regs = await RegimenService.getRegimensByWeight(weight, onTB)
      if(isEmpty(regs)) return [unknownReg]
      return Object.keys(regs).map(key => ({
        label: key, 
        value: key, 
        other: regs[key] 
      })).concat([unknownReg])
    }

    watch(form.patientPresent, isPresent => {
      if(isPresent.value === "No") {
        form.weight.required = false
        form.weight.error = ""
        form.guardianPresent.value = "Yes"
      } else {
        form.weight.required = true
      }
    })

    watch(form.guardianPresent, isPresent => {
      if(isPresent.value === "No") {
        form.patientPresent.value = "Yes"
      }
    })

    watch([() => form.weight.value, () => form.tbStatus.value], async ([newWeight, tbStatus]) => {
      form.regimen.value = undefined
      form.totalArvsGiven.value = undefined;
      const onTB = !isEmpty(tbStatus) && !tbStatus.label.match(/TB Not Suspected/i)
      if(newWeight) {
        regimens.value = await getRegimens(form.weight.value, onTB)
        form.patientPresent.value = "Yes"
        form.patientPresent.disabled = true
      } else if(!newWeight && form.weight.required) {
        form.patientPresent.value = undefined
        form.patientPresent.disabled = false
      }
      form.tbMed.disabled = onTB || isOnActiveTBTreatment.value
    })

    const calculateMinDuration = (totalGiven: number, drugs: Array<ARVDrug>) => {
      return Math.min(...drugs.map(drug => totalGiven / ((drug.am ?? 0) + (drug.noon ?? 0)  + (drug.pm ?? 0)) || 1))
    }

    watch([() => form.totalArvsGiven.value, () => form.pillCount.value, () => form.visitDate.value], () => {
      const remainingDrugs = parseInt(form.pillCount.value) || 0
      const duration = calculateMinDuration(form.totalArvsGiven.value ?? 1, form.regimen.value?.other ?? [])
      if(duration !== Infinity) {
        drugRunOutDate.value = dayjs(form.visitDate.value).add(duration + remainingDrugs, 'days').format(STANDARD_DATE_FORMAT)
        form.nextAppointmentDate.label = `Next Appointment Date (Drug run out date: ${dayjs(drugRunOutDate.value).format(DISPLAY_DATE_FORMAT)})`
        form.nextAppointmentDate.value = drugRunOutDate.value
      }
    })

    watch(() => form.visitDate.value, () => checkForActiveTB())

    const hasGiven3HP = computed(() => form.tbMed.value?.label === '3HP (INH 300 / RFP 300)')
    const hasGivenRFP = computed(() => form.tbMed.value?.label === '3HP (RFP + INH)')
    const hasGiven6H = computed(() => form.tbMed.value?.label === '6H')
    const hasContraindications = computed(() => form.hasContraindications.value === 'Yes')
    const hasSideEffects = computed(() => form.hasSideEffects.value === 'Yes')
    const isOnTBTreatment = computed(() => /Confirmed TB on treatment/i.test(form.tbStatus.value?.label))   
    const canTestForTB = computed(() => /Suspected/i.test(form.tbStatus.value?.label));

    const tbStatuses = toOptions([
      'Confirmed TB Not on treatment', 
      'Confirmed TB on treatment', 
      'TB Not Suspected',
      'TB Suspected'
    ]);

    const tbScreeningMethods = toOptions(["CXR chest x-ray", "mWRD (Molecular WHO Recommended Rapid Diagnostic test)"]);
    const tbResultsOptions = toOptions(["Positive", "Negative"]);
    const tbMeds = toOptions(['6H', '3HP (RFP + INH)', '3HP (INH 300 / RFP 300)'])

    const checkForActiveTB = async () => {
      await PatientObservationService.setSessionDate(form.visitDate.value);
      consultations.setDate(form.visitDate.value);
      isOnActiveTBTreatment.value = false;
      const previousTBStatus = await consultations.getFirstValueCoded("TB status");
      if(/Confirmed TB on treatment/i.test(previousTBStatus)) {
        const tbTreatmentStartDate = await consultations.getFirstValueDatetime("TB treatment start date")
        const tbTreatmentPeriod = (await consultations.getFirstValueNumber("TB treatment period")) || 6
        if(tbTreatmentStartDate) {
          const timeElapsed = dayjs(form.visitDate.value).diff(tbTreatmentStartDate, 'months');
          isOnActiveTBTreatment.value = timeElapsed <= tbTreatmentPeriod;
        }
      }
      form.tbStatus.required = !isOnActiveTBTreatment.value
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
      return Promise.all(ConceptService.getConceptsByCategory("tb_symptom", true).map(async (concept) => {
        return consultations.buildGroupValueCoded(concept.name, concept.name, "No")
      }))
    }

    const toDrugOrder = (drug: ARVDrug, quantity: number, duration: number, startDate: string) => {
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
      await PatientObservationService.setSessionDate(form.visitDate.value)
      vitals.setDate(form.visitDate.value)
      consultations.setDate(form.visitDate.value)
      prescription.setDate(form.visitDate.value)
      reception.setDate(form.visitDate.value)
      adherence.setDate(form.visitDate.value)
      appointment.setDate(form.visitDate.value)
      dispensation.setDate(form.visitDate.value)
      await submitForm (form, async (formData, computedFormData) => {
        const drugOrders: any[] = []
        let duration = 0
        if(!isEmpty(formData.regimen) && formData.totalArvsGiven) {
          const arvDrugs: any[] = formData.regimen.other
          duration = calculateMinDuration(formData.totalArvsGiven, arvDrugs);
          arvDrugs.forEach((drug: any) => drugOrders.push(
            toDrugOrder(drug, formData.totalArvsGiven, duration, formData.visitDate)
          ))
        } else {
          const confirmed = await alertConfirmation('Are you sure you want to continue without dispensing ART drugs?')
          if(!confirmed) return
        }

        if(formData.totalCPTGiven) {
          uniqueBy((await RegimenService.getRegimenExtras('Cotrimoxazole', formData.weight ?? prevWeight.value)), 'concept_name')
          .filter((drug: any) => drug.frequency === 'Daily (QOD)')
          .forEach((drug: any) => drugOrders.push(toDrugOrder(drug, formData.totalCPTGiven, duration, formData.visitDate)))
        }

        if(formData.tbMed?.value) {
          const iptRegimens = uniqueBy((await RegimenService.getRegimenExtras('INH', formData.weight ?? prevWeight.value)), ['concept_name', 'frequency'])
          const pyridoxine = iptRegimens.find((d: any) => d['concept_name'] === 'Pyridoxine')

          if(pyridoxine && formData.totalPyridoxineGiven) {
            drugOrders.push(toDrugOrder(pyridoxine, formData.totalPyridoxineGiven, duration, formData.visitDate))
          }

          if(formData.totalIPTGiven) {
            const INH = iptRegimens.find((drug: any) =>  drug['concept_name'] === "Isoniazid" && (
              (hasGiven6H.value && drug.frequency === 'Daily (QOD)') || 
              (hasGivenRFP.value && drug.frequency === 'Weekly (QW)')
            ))
            drugOrders.push(toDrugOrder(INH, formData.totalIPTGiven, duration, formData.visitDate))
          }

          if(formData.totalRFPGiven && hasGivenRFP.value) {
            const rfpRegimens = await RegimenService.getRegimenExtras('Rifapentine', formData.weight ?? prevWeight.value)
            if(rfpRegimens.length) drugOrders.push(toDrugOrder(rfpRegimens[0], formData.totalRFPGiven, duration, formData.visitDate))
          }

          if(formData.total3HPGiven && hasGiven3HP.value) {
            const threeHPRegimens = await RegimenService.getRegimenExtras('INH / RFP', formData.weight ?? prevWeight.value)
            drugOrders.push(toDrugOrder(threeHPRegimens[0], formData.total3HPGiven, duration, formData.visitDate))
          }
        }

        if(!isEmpty(drugOrders)) {
          await prescription.createEncounter()
          const orders: any[] = await prescription.createDrugOrder(drugOrders)
          const dispensations = orders.map(order => {
            const drug = drugOrders.find(drug => drug.drug_inventory_id === order.drug_inventory_id)
            return dispensation.buildDispensations(order.order_id, drug.qty, 1)
          })
          await dispensation.saveDispensations(dispensations.flat(1))
        }

        const vitalsObs = await resolveObs(computedFormData, 'vitals')
        if (!isEmpty(vitalsObs)) {
          await vitals.createEncounter()
          const bmiObs = await buildBmiObs(formData)
          await vitals.saveObservationList([...vitalsObs, bmiObs])
        }
        
        await consultations.createEncounter()
        let consultationObs = await resolveObs(computedFormData, 'consultation')
        consultationObs = [...consultationObs, ...(await optionsToGroupObs("Malawi ART side effects", contraIndications.value))]
        consultationObs = [...consultationObs, ...(await getTbSymptomsObs())]
        if(hasSideEffects.value) consultationObs = [...consultationObs, ...(await optionsToGroupObs("Other side effect", sideEffects.value))  ]
        if(isFemale.value) consultationObs = [...consultationObs, ...(await buildFpmObs())]
        await consultations.saveObservationList(consultationObs)

        await reception.createEncounter()
        const receptionObs = await resolveObs(computedFormData, 'reception')
        await reception.saveObservationList(receptionObs)

        if(prevDrugs.value.length > 0) {
          await adherence.createEncounter()
          const adherenceObs = await Promise.all(prevDrugs.value.map(async (drug: any) => {
            const expected = adherence.calculateExpected(drug.quantity, drug.equivalent_daily_dose, drug.order.start_date, drug.frequency)
            const adh = adherence.calculateAdherence(drug.quantity, formData.pillCount, expected)
            return [
              await adherence.buildAdherenceObs(drug.order_id, drug.drug_inventory_id, adh),
              await adherence.buildPillCountObs(drug.order_id, formData.pillCount)
            ]
          }))
          await adherence.saveObservationList(adherenceObs.flat(1))
        }

        await appointment.createEncounter()
        const appointmentObs = await resolveObs(computedFormData, 'appointment')
        await appointment.saveObservationList(appointmentObs)
        await toastSuccess('Patient visit saved successfully')

        await PatientObservationService.resetSessionDate()

        await modal.hide()
        EventBus.emit(EmcEvents.RELOAD_PATIENT_VISIT_DATA);
        EventBus.emit(EmcEvents.RELOAD_STAGING_INFORMATION);
      })
    }

    const onClear = async () => {
      if((await alertConfirmation('Are you sure you want to clear all fields?'))) {
        for(const key in form) {
          form[key].value = ''
          form[key].error = ''
          form[key].disabled = false;
        }
        EventBus.emit(EmcEvents.ON_CLEAR);
      }
    }

    onMounted (async () => {
      await checkForActiveTB();
      prevHeight.value = await props.patient.getRecentHeight()
      prevWeight.value = await props.patient.getRecentWeight()
      if (prevWeight.value) regimens.value = await getRegimens(prevWeight.value)
      prevDrugs.value = await DrugOrderService.getLastDrugsReceived(props.patient.getID())
      form.pillCount.required = prevDrugs.value.length > 0
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

</script>

<style scoped>
ion-label {
  font-weight: bold;
}

ion-checkbox {
  --size: 20px!important;
}
</style>
