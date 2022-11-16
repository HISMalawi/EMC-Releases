<template>
<Layout>
  <ion-grid>
    <ion-row>
      <ion-col size="10" offset="1" class=" ion-padding" >
        <div class="his-card">
          <h2>Site Settings</h2>
          <ion-row>
            <ion-col size="11" class="ion-margin-vertical">
              <SelectInput v-model="nameForm.name" :asyncOptions="getFacilities" />
            </ion-col>
            <ion-col size="1" class="ion-margin-vertical">
              <br>
              <IonButton class="ion-margin-top ion-float-right" @click="updateName">Submit</IonButton>
            </ion-col>
            <ion-col size="11" class="ion-margin-vertical">
              <TextInput v-model="prefixForm.prefix" />
            </ion-col>
            <ion-col size="1" class="ion-margin-vertical">
              <br>
              <IonButton class="ion-margin-top ion-float-right" @click="updatePrefix">Submit</IonButton>
            </ion-col>
            <ion-col size="11" class="ion-margin-vertical">
              <TextInput v-model="uuidForm.uuid" />
            </ion-col>
            <ion-col size="1" class="ion-margin-vertical">
              <br>
              <IonButton class="ion-margin-top ion-float-right" @click="updateUUID">Submit</IonButton>
            </ion-col>
          </ion-row>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</Layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/vue";
import TextInput from "@/apps/EMC/Components/inputs/TextInput.vue";
import SelectInput from "@/apps/EMC/Components/inputs/SelectInput.vue";
import { DTForm } from "@/apps/EMC/interfaces/dt_form_field";
import { submitForm } from "@/apps/EMC/utils/form";
import { toastSuccess } from "@/utils/Alerts";
import Layout from "@/apps/EMC/Components/Layout.vue";
import { getFacilities } from "@/utils/HisFormHelpers/LocationFieldOptions";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import { Service } from "@/services/service";

export default defineComponent({
  name: "UserModal",
  components: {
    IonButton,  
    IonGrid,
    IonRow,
    IonCol,  
    TextInput,
    SelectInput,
    Layout
  },

  setup(){
    const nameForm = reactive<DTForm>({
      name: {
        value: Service.getLocationName() || '',
        label: 'Site Name',
        required: true,
      },
    });

    const prefixForm = reactive<DTForm>({
      prefix: {
        value: '',
        label: 'Site Prefix',
        required: true,
      },
    });

    const uuidForm = reactive<DTForm>({
      uuid: {
        value: '',
        label: 'Site UUID',
        required: true,
      },
    });

    const updateName = () => submitForm(nameForm, async ({ name }) => {
      await GLOBAL_PROP.setHealthCenterID(name.value);
      await toastSuccess('Site name updated successfully');
      sessionStorage.setItem('locationName', name.label);
      document.location.reload();
    })

    const updatePrefix = async () => submitForm(prefixForm, async ({ prefix }) => {
      await GLOBAL_PROP.setSitePrefix(prefix);
      await toastSuccess('Site Prefix updated successfully');
      document.location.reload();
    })

    const updateUUID = async () => submitForm(uuidForm, async ({ uuid }) => {
      await GLOBAL_PROP.setSiteUUID(uuid);
      await toastSuccess('Site Prefix updated successfully');
      document.location.reload();
    })

    onMounted( async () => {
      prefixForm.prefix.value = await GLOBAL_PROP.sitePrefix();
      uuidForm.uuid.value = await GLOBAL_PROP.siteUUID();
    })

    return {
      nameForm,
      prefixForm,
      uuidForm,
      getFacilities,
      updateName,
      updatePrefix,
      updateUUID,
    }
  }
})
</script>