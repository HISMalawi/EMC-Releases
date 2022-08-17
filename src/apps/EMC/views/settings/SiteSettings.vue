<template>
<Layout>
  <ion-grid>
    <ion-row>
      <ion-col size="10" offset="1" class=" ion-padding" >
        <div class="his-card">
          <h2>Site Settings</h2>
          <ion-row>
            <ion-col size="11" class="ion-margin-vertical">
              <SelectInput v-model="nameForm.name" :asyncOptions="getFacilities" searchable />
            </ion-col>
            <ion-col size="1" class="ion-margin-vertical">
              <br>
              <IonButton class="ion-margin-top ion-float-end" @click="updateName">Submit</IonButton>
            </ion-col>
            <ion-col size="11" class="ion-margin-vertical">
              <TextInput v-model="prefixForm.prefix" />
            </ion-col>
            <ion-col size="1" class="ion-margin-vertical">
              <br>
              <IonButton class="ion-margin-top ion-float-end" @click="updatePrefix">Submit</IonButton>
            </ion-col>
            <ion-col size="11" class="ion-margin-vertical">
              <TextInput v-model="uuidForm.uuid" />
            </ion-col>
            <ion-col size="1" class="ion-margin-vertical">
              <br>
              <IonButton class="ion-margin-top ion-float-end" @click="updateUUID">Submit</IonButton>
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
import { User } from "@/interfaces/user";
import TextInput from "@/apps/EMC/Components/inputs/TextInput.vue";
import SelectInput from "@/apps/EMC/Components/inputs/SelectInput.vue";
import { DTForm } from "@/apps/EMC/interfaces/dt_form_field";
import { isValidForm, resolveFormValues } from "@/apps/EMC/utils/form";
import { loader } from "@/utils/loader";
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
        value: Service.getSiteUUID() || '',
        label: 'Site UUID',
        required: true,
      },
    });

    const updateName = async () => {
      if(!(await isValidForm(nameForm))) return
      loader.show();
      const data = resolveFormValues(nameForm, true).formData;
      await GLOBAL_PROP.setHealthCenterID(data.name);
      toastSuccess('Site name updated successfully');
      loader.hide();
    }

    const updatePrefix = async () => {
      if(!(await isValidForm(prefixForm))) return
      loader.show();
      const data = resolveFormValues(prefixForm, true).formData;
      await GLOBAL_PROP.setSitePrefix(data.prefix);
      toastSuccess('Site Prefix updated successfully');
      loader.hide();
    }

    const updateUUID = async () => {
      if(!(await isValidForm(uuidForm))) return
      loader.show();
      const data = resolveFormValues(uuidForm, true).formData;
      await GLOBAL_PROP.setSiteUUID(data.uuid);
      toastSuccess('Site Prefix updated successfully');
      loader.hide();
    } 

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