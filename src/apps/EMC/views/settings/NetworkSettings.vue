<template>
  <Layout v-if="isLoggedIn">
    <ion-grid>
      <ion-row>
        <ion-col size="10" offset="1" class=" ion-padding">
          <div class="his-card">
            <ion-title>Network Settings / API Host configuration</ion-title>
            <NetworkForm @submit="submit" />
          </div>
        </ion-col>
      </ion-row>
    </ion-grid>
  </Layout>
  <ion-page v-else>
    <ion-header>
      <ion-toolbar>
        <ion-title>Network Settings / API Host configuration</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="10" offset="1" class=" ion-padding">
            <div class="his-card">
              <NetworkForm @submit="submit" />
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/vue";
import { loader } from "@/utils/loader";
import { toastWarning } from "@/utils/Alerts";
import { Service } from "@/services/service";
import ApiClient from "@/services/api_client";
import { infoActionSheet } from "@/utils/ActionSheets";
import { useRouter } from "vue-router";
import { AuthService } from "@/services/auth_service";
import Layout from "@/apps/EMC/Components/Layout.vue";
import NetworkForm from "../../Components/NetworkForm.vue";

const router = useRouter();
const isLoggedIn = AuthService.isLoggedIn();

const clearLocalStorage = () => {
  ApiClient.removeOnly([
    'useLocalStorage',
    'apiURL',
    'apiPort',
    'apiProtocol'
  ]);
}

const submit = async ({ protocol, ipAddress, port }: any) => {
  loader.show();
  ApiClient.setLocalStorage(protocol.value, ipAddress, port);
  const res = await ApiClient.healthCheck();
  await loader.hide();
  if (!(res && res.status === 200)) {
    toastWarning(`Unable to connect to: ${protocol.value}://${ipAddress}: ${port}`)
    clearLocalStorage()
    return;
  }
  router.back();
}

const showConfigNotice = async () => {
  if (Service.isUsingLocalStorage()) {
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
</script>