<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Network Settings / API Host configuration</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="10" offset="1" class=" ion-padding" >
            <div class="his-card">
              <ion-row>
                <ion-col size="12" class="ion-margin-vertical">
                  <SelectInput v-model="form.protocol" :options="protocols" />
                </ion-col>
                <ion-col size="12" class="ion-margin-vertical">
                  <TextInput v-model="form.ipAddress" />
                </ion-col>
                <ion-col size="12" class="ion-margin-vertical">
                  <TextInput v-model="form.port" />
                </ion-col>
                <ion-col size="12" class="ion-margin-vertical">
                  <IonButton class="ion-margin-top ion-float-right" color="success" @click="submit">Submit</IonButton>
                  <IonButton class="ion-margin-top ion-float-right" @click="$router.back()">Back</IonButton>
                </ion-col>
              </ion-row>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/vue";
import TextInput from "@/apps/EMC/Components/inputs/TextInput.vue";
import SelectInput from "@/apps/EMC/Components/inputs/SelectInput.vue";
import { DTForm } from "@/apps/EMC/interfaces/dt_form_field";
import { isValidForm, resolveFormValues } from "@/apps/EMC/utils/form";
import { loader } from "@/utils/loader";
import { toastWarning } from "@/utils/Alerts";
import { Service } from "@/services/service";
import { Option } from "@/components/Forms/FieldInterface";
import ApiClient from "@/services/api_client";
import { infoActionSheet } from "@/utils/ActionSheets";
import StandardValidations from "@/components/Forms/validations/StandardValidations";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "DTNetworkSettings",
  components: {
    IonButton,  
    IonGrid,
    IonRow,
    IonCol,  
    TextInput,
    SelectInput,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },

  setup(){
    const router = useRouter();
    const protocols: Option[] = [
      {
        label: "HTTP",
        value: "http"
      },
      {
        label: "HTTPS",
        value: "https"
      }
    ]

    const form = reactive<DTForm>({
      protocol: {
        value: '',
        label: 'Select Protocol',
        required: true,
      },
      ipAddress: {
        value: '',
        label: 'IP Address',
        placeholder: 'Enter IP Address e.g. 127.0.0.1',
        required: true,
        validation: async (address) => StandardValidations.isIPAddress(address)
      },
      port: {
        value: '',
        label: 'Port',
        placeholder: 'Enter Port e.g. 3000',
        required: true,
      },
    });

    const clearLocalStorage = () => {
      ApiClient.removeOnly([
        'useLocalStorage',
        'apiURL',
        'apiPort',
        'apiProtocol'
      ]);
    }

    const submit = async () => {
      if(!(await isValidForm(form))) return
      loader.show();
      const {protocol, ipAddress, port} = resolveFormValues(form).formData;
      ApiClient.setLocalStorage(protocol.value, ipAddress, port);
      const res = await ApiClient.healthCheck();
      await loader.hide();
      if(!(res && res.status === 200)) {
        toastWarning(`Unable to connect to: ${protocol.value}://${ipAddress}: ${port}`)
        clearLocalStorage()
        return;
      }
      router.back();  
    }

    const showConfigNotice = async () => {
      if(Service.isUsingLocalStorage()) {
        const action = await infoActionSheet(
          "Config notice",
          `The system is currently using user specified configurations. \
                Do you wish to reset back to server configurations?`,
          "",
          [
            { name: "Reset configurations", slot: "start", color: "success" },
            { name: "New configurations", slot: "end" },
          ]
        );

        if (action === "Reset configurations") {
          clearLocalStorage();
          router.back();
        }
      }
    }

    onMounted(async () => {
      await showConfigNotice();
    })

    return {
      protocols,
      form,
      submit,
    }
  }
})
</script>