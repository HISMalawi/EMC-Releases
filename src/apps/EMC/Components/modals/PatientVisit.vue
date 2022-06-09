<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Patient Visit</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class=" ion-padding">
    <ion-grid style="width: 100%">
      <ion-row >
        <ion-col :size="showHeightField ? 6 : 4">
          <ion-label class=" ion-padding-bottom">Visit Date: </ion-label>
          <ion-input 
            type="date" 
            class="ion-margin-top"
            :class="form.visitDate.error ? 'box-input-error'  : 'box-input'"
            v-model="form.visitDate.value" 
          />
          <ion-note v-if="form.visitDate.error" color="danger">{{ form.visitDate.error }}</ion-note>
        </ion-col>
        <ion-col :size="showHeightField ? 6 : 4">
          <ion-label class=" ion-padding-bottom">Weight: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.weight.error ? 'box-input-error'  : 'box-input'" 
            v-model="form.weight.value"
          />
          <ion-note v-if="form.weight.error" color="danger">{{ form.weight.error }}</ion-note>
        </ion-col>
        <ion-col size="6" v-if="showHeightField">
          <ion-label class="ion-padding-bottom">Height: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.height.error ? 'box-input-error'  : 'box-input'" 
            v-model="form.height.value" 
          />
          <ion-note v-if="form.height.error" color="danger">{{ form.height.error }}</ion-note>
        </ion-col>
        <ion-col :size="showHeightField ? 6 : 4">
          <ion-label class=" ion-padding-bottom">TB Status: </ion-label>
          <searchable-select-input
            class="ion-margin-top"
            :class="form.tbStatus.error ? 'box-input-error'  : 'box-input'"
            placeholder="Select TB status"
            :options="tbStatuses"
            :value="form.tbStatus.value"
            @onSelect="(status) => form.tbStatus.value = status"
            :searchable="false"
          />
          <ion-note v-if="form.tbStatus.error" color="danger">{{ form.tbStatus.error }}</ion-note>
        </ion-col>
        <template v-if="isFemale">
          <ion-col size="6" class="ion-margin-vertical ion-padding-top">
            <yes-no-input v-model="form.isPregnant" inline />
          </ion-col>
          <ion-col size="6" class="ion-margin-vertical ion-padding-top">
            <yes-no-input v-model="form.isBreastfeeding"  inline />
          </ion-col>
        </template>
        <ion-col size="12" class="ion-margin-top ion-padding-top" >
          <yes-no-input v-model="form.hasContraindications"  inline />
          <multi-column-view :items="contraIndications" :numberOfColumns="5" v-slot="{ entries }" v-if="form.hasContraindications.value === 'Yes'">
            <template v-for="entry in entries" :key="entry.value" >
             <ion-label style="font-weight: normal !important;">
                <ion-checkbox class="ion-margin-end ion-float-left" v-model="entry.isChecked" />
                <span class="ion-margin-top" style="vertical-align: middle;">{{ entry.label }}</span>
              </ion-label>
              <br><br>
            </template>
          </multi-column-view>
        </ion-col>
        <ion-col class="ion-padding-start" size="12" v-if="form.hasContraindications.value === 'Yes'">
          <yes-no-input v-model="form.hasSideEffects" inline />
          <multi-column-view :items="sideEffects" :numberOfColumns="5" v-slot="{ entries }" v-if="form.hasSideEffects.value === 'Yes'">
            <template v-for="entry in entries" :key="entry.value" >
              <ion-label style="font-weight: normal !important;">
                <ion-checkbox class="ion-margin-end ion-float-left" v-model="entry.isChecked" />
                <span class="ion-margin-top" style="vertical-align: middle;">{{ entry.label }}</span>
              </ion-label>
              <br><br>
            </template>
          </multi-column-view>
        </ion-col>
        <ion-col size="6" class="ion-padding-top ion-margin-top">
          <ion-label class=" ion-padding-bottom">Regimen: </ion-label>
          <searchable-select-input
            class="ion-margin-top"
            :class="form.regimen.error ? 'box-input-error'  : 'box-input'"
            :value="form.regimen.value"
            :options="regimens"
            :searchable="false"
            @onSelect="(reg) => form.regimen.value = reg"
          />
          <ion-note v-if="form.regimen.error" color="danger">{{ form.regimen.error }}</ion-note>
        </ion-col>
        <ion-col size="6" class="ion-padding-top ion-margin-top">
          <ion-label class="ion-padding-bottom">Quantity: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.totalArvsGiven.error ? 'box-input-error'  : 'box-input'" 
            v-model="form.totalArvsGiven.value" 
          />
          <ion-note v-if="form.totalArvsGiven.error" color="danger">{{ form.totalArvsGiven.error }}</ion-note>
        </ion-col>
        <ion-col size="6" class="ion-padding-top">
          <ion-label class=" ion-padding-bottom">CPT Quantity: </ion-label>
          <ion-input 
            type="number" :min="1" 
            class="ion-margin-top"
            :class="form.totalCPTGiven.error ? 'box-input-error'  : 'box-input'"
            v-model="form.totalCPTGiven.value" 
          />
          <ion-note v-if="form.totalCPTGiven.error" color="danger">{{ form.totalCPTGiven.error }}</ion-note>
        </ion-col>
         <ion-col size="6" class="ion-padding-top">
          <ion-label class=" ion-padding-bottom">TB Medications: </ion-label>
          <searchable-select-input
            class="ion-margin-top"
            :class="form.tbMed.error ? 'box-input-error'  : 'box-input'"
            placeholder="Select TB Medications"
            :options="tbMeds"
            :value="form.tbMed.value"
            @onSelect="(med) => form.tbMed.value = med"
            :searchable="false"
          />
          <ion-note v-if="form.tbMed.error" color="danger">{{ form.tbMed.error }}</ion-note>
        </ion-col>
        <ion-col :size="hasGivenRFP ? 6 : 12" v-if="hasGiven6H || hasGivenRFP">
          <ion-label class="ion-padding-bottom">IPT Quantity: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.tbStatus.error ? 'box-input-error'  : 'box-input'"
            v-model="form.totalIPTGiven.value" 
          />
          <ion-note v-if="form.totalIPTGiven.error" color="danger">{{ form.totalIPTGiven.error }}</ion-note>
        </ion-col>
        <ion-col size="6" v-if="hasGivenRFP">
          <ion-label class=" ion-padding-bottom">RFP Quantity: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.totalRFPGiven.error ? 'box-input-error'  : 'box-input'" 
            v-model="form.totalRFPGiven.value" 
          />
          <ion-note v-if="form.totalRFPGiven.error" color="danger">{{ form.totalRFPGiven.error }}</ion-note>
        </ion-col>
        <ion-col size="12" v-if="hasGiven3HP">
          <ion-label class=" ion-padding-bottom">3HP Quantity: </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.totalRFPGiven.error ? 'box-input-error'  : 'box-input'"  
            v-model="form.total3HPGiven.value" 
          />
          <ion-note v-if="form.total3HPGiven.error" color="danger">{{ form.total3HPGiven.error }}</ion-note>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical ion-padding-vertical">
          <yes-no-input v-model="form.patientPresent" inline />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical ion-padding-vertical">
          <yes-no-input v-model="form.guardianPresent" inline />
        </ion-col>
        <ion-col size="6"> 
          <ion-label class="ion-padding-bottom">Pill Count: (Last dispensation: {{ totalPrevDrugs }}) </ion-label>
          <ion-input 
            type="number" 
            :min="1" 
            class="ion-margin-top"
            :class="form.pillCount.error ? 'box-input-error'  : 'box-input'"  
            v-model="form.pillCount.value" 
          />
          <ion-note v-if="form.pillCount.error" color="danger">{{ form.pillCount.error }}</ion-note>
        </ion-col>
        <ion-col size="6" >
          <ion-label class=" ion-padding-bottom">Next Appointment Date: </ion-label>
          <ion-input 
            type="date"
            v-model="form.nextAppointmentDate.value"
            class="ion-margin-top"
            :class="form.nextAppointmentDate.error ? 'box-input-error'  : 'box-input'" 
          />
          <ion-note v-if="form.nextAppointmentDate.error" color="danger">{{ form.nextAppointmentDate.error }}</ion-note>
        </ion-col>
      </ion-row>   
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="closeModal" slot="end">Close</ion-button>
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
  modalController, 
  IonContent, 
  IonFooter, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonInput, 
  IonLabel,
  IonCheckbox,
IonNote,
loadingController, 
} from "@ionic/vue";
import { alertConfirmation, toastSuccess } from "@/utils/Alerts";
import isEmpty from "lodash/isEmpty";
import { Option } from "@/components/Forms/FieldInterface";
import SearchableSelectInput from "../inputs/SearchableSelectInput.vue";
import YesNoInput from "../inputs/YesNoInput.vue";
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

export default defineComponent({
  components: {
    IonContent,
    IonFooter,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    IonLabel,
    IonNote,
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    SearchableSelectInput,
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
    const totalPrevDrugs = computed(() => prevDrugs.value[0]?.quantity)
    const showHeightField = computed(() => !(prevHeight.value && props.patient.getAge() > 18))
    const isFemale = computed(() => props.patient.isFemale())

    const form = reactive<DTForm>({
      visitDate: {
        value: undefined as string | undefined,
        error: '',
        validation: async (date: Option) => {
          if (isEmpty(date.value)) {
            return ['Visit date is required']
          }
          if(dayjs(date.value).isAfter(dayjs())) {
            return ["Visit date cannot be after today's date"]
          }
          return null
        }
      },
      weight: {
        value: undefined as number | undefined,
        error: '',
        computedValue: (weight: number) => ({
          tag: 'vitals',
          obs: vitals.buildValueNumber('Weight', weight)
        }),
        validation: (weight: Option) => StandardValidations.validateSeries([
          () => StandardValidations.required(weight),
          () => vitals.validator({...weight, label: 'Weight'})
        ])
      },
      height: {
        value: undefined as number | undefined,
        error: '',
        computedValue: (height: number) => ({
          tag: 'vitals',
          obs: vitals.buildValueNumber('Height', height)
        }),
        validation: (height: Option) => showHeightField.value && vitals.validator({...height, label: 'Height'})
      },
      isPregnant: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the patient pregnant?',
        error: '',
        computedValue: (isPregnant: "Yes" | "No") => ({
          tag: 'consultation',
          obs: consultations.buildValueCoded('Is patient pregnant', isPregnant)
        }),
        validation: async (state: Option) => isFemale.value && StandardValidations.required(state)
      },
      isBreastfeeding: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the patient breastfeeding?',
        error: '',
        computedValue: (isBreastfeeding: "Yes" | "No") => ({
          tag: 'consultation',
          obs: consultations.buildValueCoded('Is patient breast feeding', isBreastfeeding)
        }),
        validation: async (state: Option) => isFemale.value && StandardValidations.required(state)
      },
      nextAppointmentDate: {
        value: undefined as string | undefined,
        error: '',
        required: true,
        computedValue: (nextAppointmentDate: string) => ({
          tag: 'appointment',
          obs: appointment.buildValueDate('Appointment date', nextAppointmentDate)
        }),
      },
      patientPresent: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the patient present?',
        error: '',
        required: true,
        computedValue: (patientPresent: "Yes" | "No") => ({
          tag: 'reception',
          obs: reception.buildValueCoded('Patient present', patientPresent)
        }),
      },
      guardianPresent: {
        value: undefined as "Yes" | "No"  | undefined,
        label: 'Is the guardian present?',
        error: '',
        required: true,
        computedValue: (guardianPresent: "Yes" | "No") => ({
          tag: 'reception',
          obs: reception.buildValueCoded('Guardian present', guardianPresent)
        }),
      },
      pillCount: {
        value: undefined as number  | undefined,
        error: '',
        validation: async (pills: Option) => StandardValidations.isNumber(pills)
      },
      regimen: {
        value: undefined as Option | undefined,
        error: '',
        required: true,
        computedValue: () => ({
          tag: 'consultation',
          obs: prescription.buildValueCoded("Medication orders", "Antiretroviral drugs")
        }),
      },
      totalCPTGiven: {
        value: undefined as number  | undefined,
        error: '',
        computedValue: () => ({
          tag: 'consultation',
          obs: prescription.buildValueCoded("Medication orders", "CPT")
        }),
      },
      totalIPTGiven: {
        value: undefined as number  | undefined,
        error: '',
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
        error: '',
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
        error: '',
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
        error: '',
        validation: async (drugs: Option, form: any) => form.regimen.value && StandardValidations.isNumber(drugs)
      },
      tbMed: {
        value: undefined as Option | undefined,
        error: '',
        validation: async (med: Option) => StandardValidations.required(med)
      },
      hasContraindications: {
        value: undefined as "Yes" | "No"  | undefined,
        label: "Has Side Effects / Contraindications ?",
        error: '',
        validation: async (state: Option) => {
          if(state.value === "Yes" && contraIndications.value.some(x => !x.isChecked))
            return ["Please select at least one side effect"]
          return StandardValidations.required(state)
        }
      },
      hasSideEffects: {
        value: undefined as "Yes" | "No"  | undefined,
        label: "Has Other Side Effects ?",
        error: '',
        validation: async (state: Option, form: any) => {
          if(form.hasContraindications.value === "No") return null
          if(state.value === "Yes" && sideEffects.value.some(x => !x.isChecked))
            return ["Please select at least one side effect"]
          return StandardValidations.required(state)
        }
      },
      tbStatus: {
        value: undefined as Option | undefined,
        error: '',
        computedValue: (status: Option) => ({
          tag: 'consultation',
          obs: consultations.buildValueCoded('TB Status', status.label)
        }),
        validation: async (state: Option) => StandardValidations.required(state)
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

    const hasGiven3HP = computed(() => form.tbMed.value?.label === '3HP (INH 300 / RFP 300)')
    const hasGivenRFP = computed(() => form.tbMed.value?.label === '3HP (RFP + INH)')
    const hasGiven6H = computed(() => form.tbMed.value?.label === '6H')
    
    const tbStatuses = ref<Option[]>([
      { label: 'Confirmed TB Not on treatment', value: 'Confirmed TB Not on treatment' },
      { label: 'Confirmed TB on treatment', value: 'Confirmed TB on treatment' },
      { label: 'TB Not Suspected', value: 'TB Not Suspected' },
      { label: 'TB Suspected', value: 'TB Suspected' },
    ]);
    const tbMeds = ref<Option[]>([
      { label: '6H', value: '6H'},
      { label: '3HP (RFP + INH)', value: '3HP (RFP + INH)'},
      { label: '3HP (INH 300 / RFP 300)', value: '3HP (INH 300 / RFP 300)'}
    ])

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


    const closeModal = (data?: any) => {
      modalController.dismiss(data);
    };

    const buildBmiObs = async (formData: any): Promise<ObsValue> => {
      const height = formData.height || prevHeight.value
      const bmi = BMIService.calculateBMI(formData.weight, height)
      return vitals.buildValueNumber('BMI', bmi)
    }

    const buildFpmObs = async () => {
      const obs: ObsValue[] = [
        await consultations.buildValueCoded('Patient using family planning', 'No')
      ]
      const methos = consultations.getFamilyPlanningMethods()
      methos.forEach(async (method) => {
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
      const loader = await loadingController.create({
        message: 'Processing data...'
      });
      await loader.present();
      if(!(await isValidForm(form))) return loader.dismiss()

      const { formData, computedFormData } = resolveFormValues(form)
      await PatientObservationService.setSessionDate(formData.visitDate)

      await vitals.createEncounter()
      const vitalsObs = await resolveObs(computedFormData, 'vitals')
      const bmiObs = await buildBmiObs(formData)
      await vitals.saveObservationList([...vitalsObs, bmiObs])

      await consultations.createEncounter()
      const consultationObs = await resolveObs(computedFormData, 'consultation')
      if(isFemale.value) consultationObs.concat(await buildFpmObs())
      if(form.hasContraindications.value === 'Yes') 
        consultationObs.concat(await optionsToGroupObs("Malawi ART side effects", contraIndications.value))
      if(form.hasSideEffects.value === 'Yes') 
        consultationObs.concat(await optionsToGroupObs("Other side effect", sideEffects.value))
      consultationObs.concat(await getTbSymptomsObs())
      await consultations.saveObservationList(consultationObs)

      await prescription.createEncounter()
      const drugOrders: any[] = []
      let duration = 0
      if(formData.regimen && formData.totalArvsGiven) {
        const arvDrugs: any[] = form.regimen.value.other
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
      loader.dismiss()
      await PatientObservationService.resetSessionDate()
      closeModal({ data: 'refresh' })
    }

    const onClear = async () => {
      const confirm = await alertConfirmation('Are you sure you want to clear all fields?')
      if(confirm) {
        for(const key in form) {
          form[key].value = undefined
        }
      }
    }

    onMounted (async () => {
      prevHeight.value = await props.patient.getRecentHeight()
      prevDrugs.value = await DrugOrderService.getLastDrugsReceived(props.patient.getID())
      const regs: Record<string, any[]> = await RegimenService.getRegimens(props.patient.getID())
      if(!isEmpty(regs)) {
        regimens.value = Object.keys(regs).map(key => ({ label: key, value: key, other: regs[key] }))
      }
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
      onSubmit,
      regimens,
      contraIndications,
      sideEffects,
      tbStatuses,
      tbMeds,
      hasGiven3HP,
      hasGivenRFP,
      hasGiven6H,
      totalPrevDrugs,
      showHeightField,
      isFemale,
      setPatientPresent,
      setGuardianPresent,
      closeModal,
      onClear,
    };
  },
})
</script>

<style scoped>
ion-label {
  font-weight: bold;
}
</style>