<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Viral Load Results</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid style="width: 100%">
      <ion-row>
        <ion-col size="12" class="ion-margin-vertical">
          <DateInput v-model="form.orderDate" :form="form" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <SelectInput v-model="form.reason" :options="reasons" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <SelectInput v-model="form.specimenConcept" :options="specimens" />
        </ion-col>
        <ion-col size="12" class="ion-margin-vertical">
          <DateInput v-model="form.resultDate" :form="form" />
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <SelectInput v-model="form.modifier" :options="modifiers"/>
        </ion-col>
        <ion-col size="6" class="ion-margin-vertical">
          <NumberInput v-model="form.result" :form="form" :min="1"/>
        </ion-col>
      </ion-row>
      <ion-row class="ion-margin-top">
        <ion-col size="12">
          <ion-label class="ion-padding-vertical bold">Other Results Options: </ion-label>
          <ion-item>
            <ion-label>LDL</ion-label>
            <ion-checkbox slot="start" v-model="ldl" />
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="modal.hide()" slot="end">Close</ion-button>
      <ion-button color="warning" @click="resetResults" slot="end">Reset</ion-button>
      <ion-button color="success" @click="saveResults" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref, watch } from "vue";
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
  IonItem
} from "@ionic/vue";
import { toastWarning } from "@/utils/Alerts";
import { DTForm } from "../../interfaces/dt_form_field";
import { Patientservice } from "@/services/patient_service";
import DateInput from "../inputs/DateInput.vue";
import SelectInput from "../inputs/SelectInput.vue";
import NumberInput from "../inputs/NumberInput.vue";
import dayjs from "dayjs";
import { toOptions } from "../../utils/DTFormElements";
import { OrderService } from "@/services/order_service";
import { LabOrderService } from "@/apps/ART/services/lab_order_service";
import { Option } from "@/components/Forms/FieldInterface";
import { ConceptName } from "@/interfaces/conceptName";
import { loader } from "@/utils/loader";
import { isValidForm, resolveFormValues } from "../../utils/form";
import { PatientLabResultService } from "@/services/patient_lab_result_service";
import { ConceptService } from "@/services/concept_service";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../../interfaces/emc_event";
import { modal } from "@/utils/modal";

export default defineComponent({
  components: {
    IonContent,
    IonFooter,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    IonItem,
    DateInput,
    SelectInput,
    NumberInput,
  },
  props: {
    patient: {
      type: Object as PropType<Patientservice>,
      required: true
    },
  },
  setup(props) {
    const ldl = ref(false);
    const modifiers = toOptions(['=', '>', '<', '>=', '<=']);
    const reasons = toOptions(["Routine", "Targeted", "Confirmatory", "Stat", "Repeat / Missing"])
    const specimens = ref<Option[]>([])

    const form = reactive<DTForm>({
      orderDate: {
        value: '',
        label: 'Order Date',
        required: true,
        validation: async (date) => {
          if (!dayjs(date.value).isValid()) {
            return ['Invalid date'];
          }
          if(dayjs(date.value).isAfter(dayjs())) {
            return ['Order date cannot be in the future'];
          }
          if(dayjs(date.value).isBefore(dayjs(props.patient.getBirthdate()))) {
            return ['Order date cannot be before patient\'s date of birth'];
          }
          return null
        }
      },
      resultDate: {
        value: '',
        label: 'Result Date',
        required: true,
        validation: async (date, form) => {
          if (!dayjs(date.value).isValid()) {
            return ['Invalid date'];
          }
          if(dayjs(date.value).isAfter(dayjs())) {
            return ['Result date cannot be in the future'];
          }
          if(dayjs(date.value).isBefore(dayjs(form.orderDate.value))) {
            return ['Result date cannot be before order date'];
          }
          if(dayjs(date.value).isBefore(dayjs(props.patient.getBirthdate()))) {
            return ['Result date cannot be before patient\'s date of birth'];
          }
          return null
        }
      },
      specimenConcept: {
        value: '',
        label: 'Specimen',
        placeholder: 'Select a specimen',
        required: true,
      },
      modifier: {
        value: '',
        label: 'Modifier',
        placeholder: 'Select a modifier',
        required: true,
      },
      reason: {
        value: '',
        label: 'Reason',
        placeholder: 'Select a reason',
        required: true,
      },
      result: {
        value: '',
        label: 'Result Value',
        placeholder: 'Enter a result value',
        required: true,
      }
    });

    const saveResults = async () => {
      await loader.show();
      if(!(await isValidForm(form))) return loader.hide();
      try {
        const { formData } = resolveFormValues(form);
        await LabOrderService.setSessionDate(formData.orderDate)
        const orderService = new LabOrderService(props.patient.getID(), -1)
        const vlConceptId = await ConceptService.getConceptID("HIV viral load")
        const encounter = await orderService.createEncounter();
        if(!encounter) throw new Error('Unable to create lab order encounter');
        const formattedOrders  = await OrderService.buildLabOrders(encounter, [{
          'specimenConcept': formData.specimenConcept.value,
          'reason': formData.reason.value,
          'concept_id': vlConceptId
        }]);
        const orders = await  OrderService.saveOrdersArray(encounter.encounter_id, formattedOrders);
        if(!orders) throw new Error('Unable to save lab orders');

        await PatientLabResultService.setSessionDate(formData.resultDate)
        const resultService = new PatientLabResultService(props.patient.getID())
        resultService.setTestID(orders[0].tests[0].id)
        resultService.setResultDate(formData.resultDate)
        const resultEnc = await resultService.createEncounter()
        if(!resultEnc) throw new Error("Unable to create lab result encounter")
        await resultService.createLabResult([{
          "indicator": {
            "concept_id": vlConceptId,
          },
          "value": ldl.value ? "LDL" : parseInt(formData.result),
          "value_modifier": ldl.value ? "=" : formData.modifier.value,
          "value_type": ldl.value ? "text" : "numeric"
        }])

        await PatientLabResultService.resetSessionDate()
        await loader.hide()
        await modal.hide()
        EventBus.emit(EmcEvents.RELOAD_PATIENT_VISIT_DATA)
      } catch (error) {
        toastWarning(`${error}`)
        return loader.hide()
      }
    }

    const resetResults = () => {
      for(const key in form) {
        form[key].value = '';
        form[key].error = ''
      }
    };

    watch(ldl, (isLDL) => {
      if(isLDL) {
        form.modifier.value = "";
        form.result.value = undefined;
        form.modifier.error = ''
        form.result.error = ''
      }
      form.modifier.disabled = isLDL;
      form.modifier.required = !isLDL;
      form.result.disabled = isLDL;
      form.result.required = !isLDL;
    });

    onMounted(async () => {
      specimens.value = (await OrderService.getSpecimens("HIV viral load"))
        .map((specimen: ConceptName) => ({
          label: specimen.name,
          value: specimen['concept_id']
        })
      )
    })

    return {
      form,
      modifiers,
      reasons,
      specimens,
      ldl,
      modal,
      resetResults,
      saveResults,
    };
  },
})
</script>