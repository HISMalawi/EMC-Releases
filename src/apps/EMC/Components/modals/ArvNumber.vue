<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>ARV NUMBER</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="modal.hide()">
          <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
          <text-input v-model="form.arvNumber" :form="form" :prefix="`${sitePrefix}-ARV-`" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
  <ion-footer>
    <ion-toolbar>
      <ion-button color="primary" @click="modal.hide()" slot="end">Close</ion-button>
      <ion-button color="danger" @click="voidARV" v-if="hasValidARVNumber" slot="end">Void ARV Number</ion-button>
      <ion-button class="ion-margin-end" color="success" @click="onFinish" slot="end">Save</ion-button>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import { Option } from "@/components/Forms/FieldInterface";
import { DTForm } from "@/apps/EMC/interfaces/dt_form_field";
import TextInput from "../inputs/TextInput.vue";
import { submitForm } from "@/apps/EMC/utils/form";
import { loader } from "@/utils/loader";
import EventBus from "@/utils/EventBus";
import { EmcEvents } from "../../interfaces/emc_event";
import { Patientservice } from "@/services/patient_service";
import { isEmpty } from "lodash";
import { ProgramService } from "@/services/program_service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { modal } from "@/utils/modal";
import { alertConfirmation } from "@/utils/Alerts";

export default defineComponent({
  components: {
    IonGrid,
    IonRow,
    IonCol,
    TextInput,
  },
  props: {
    patient: {
      type: Object as PropType<Patientservice>,
      required: true,
    }
  },
  setup(props) { 
    const sitePrefix = ref("");
    const arvNumber = computed(() => props.patient.getArvNumber());
    const hasValidARVNumber = computed(() => {
      return !isEmpty(arvNumber.value) && arvNumber.value !== "Unknown";
    });

    const form = reactive<DTForm>({
      arvNumber: {
        value: hasValidARVNumber.value ? arvNumber.value.split("-")[2] : "",
        label: `${hasValidARVNumber.value ? "Edit" : "Add New"} ARV Number`,
        placeholder: "Enter ARV Number",
        required: true,
        validation: async (arv: Option) => {
          if(arv.value === arvNumber.value.split("-")[2]) return null
          const patients = await Patientservice.findByOtherID(4, `${sitePrefix.value}-ARV-${arv.value}`);
          return isEmpty(patients) ?  null : ['ARV Number already exists'];
        },
      },
    })

    const onFinish = async () => submitForm(form, async (formData) => {
      if(formData.arvNumber !== arvNumber.value.split("-")[2]){
        if(hasValidARVNumber.value) {
          await props.patient.updateARVNumber(`${sitePrefix.value}-ARV-${formData.arvNumber}`);
        } else {
          await props.patient.createArvNumber(`${sitePrefix.value}-ARV-${formData.arvNumber}`);
        }
        await modal.hide();
        EventBus.emit(EmcEvents.RELOAD_PATIENT_DATA)
      }
    }) 

    const voidARV = async () => {
      const confirm = await alertConfirmation(`Are you sure you want to void this ARV Number ${arvNumber.value}?`);
      if(!confirm) return;
      await loader.show("Voiding ARV Number...");
      try {
        await ProgramService.voidARVNumber(arvNumber.value);
        await loader.hide();
        await modal.hide();
        EventBus.emit(EmcEvents.RELOAD_PATIENT_DATA)
      } catch (error) {
        await loader.hide();
        console.log(error)
      } 
    }

    onMounted(async () => {
      sitePrefix.value = await GLOBAL_PROP.sitePrefix();
      if (!hasValidARVNumber.value) {
        const suggestedNumber = await ProgramService.getNextSuggestedARVNumber();
        form.arvNumber.value = suggestedNumber.arv_number.replace(/^\D+|\s/g, "");
      }
    }) 
 
    return {
      form,
      modal,
      sitePrefix,
      arvNumber,
      hasValidARVNumber,
      onFinish,
      voidARV,
    };
  },
});
</script>
