<template>
  <ion-page>
    <template v-if="useVirtualInput">
      <ion-header>
        <ion-toolbar>
          <ion-title>
            <ion-label :style="{ fontWeight: 'bolder', fontSize: '1.9em' }">
              <b style="color: #8b4513">National </b>
              <b style="color: #cd853f">EMR</b>
            </ion-label>
          </ion-title>
          <ion-label class="ion-padding" slot="end">
            Version: <b>{{ version }}</b>
          </ion-label>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen="false">
        <inputs :useVirtualInput="useVirtualInput" />
      </ion-content>
      <LoginFooter
        :showConfigBtn="showConfig"
      ></LoginFooter>
    </template>
    <template v-else>
      <DTLoginForm
        @login="doLogin"
        :showConfigBtn="showConfig"
      ></DTLoginForm>
    </template>
  </ion-page>
</template>
<script lang="ts">
import Inputs from "./TSLoginForm.vue";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
} from "@ionic/vue";
import { onMounted, ref } from "@vue/runtime-core";
import { AuthService, InvalidCredentialsError } from "@/services/auth_service";
import usePlatform from "@/composables/usePlatform";
import { defineComponent } from "vue";
import DTLoginForm from "@/components/Forms/DesktopForms/DTLoginForm.vue";
import HisApp from "@/apps/app_lib";
import { useRouter } from "vue-router";
import { toastDanger, toastWarning } from "@/utils/Alerts";
import LoginFooter from "@/components/LoginFooter.vue";

export default defineComponent({
  name: "login",
  components: {
    Inputs,
    IonTitle,
    IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    DTLoginForm,
    LoginFooter,
  },
  setup() {
    const router = useRouter();
    const auth = new AuthService();
    const { useVirtualInput } = usePlatform();
    const version = ref("");

    const doLogin = async (user: any) => {
      if (user.username && user.password) {
        auth.setUsername(user.username);
        try {
          await auth.login(user.password);
          auth.startSession();
          const app = await HisApp.selectApplication();
          if (app) {
            app.isPocApp
              ? router.push("/select_hc_location")
              : app.appLandingPage
              ? router.push(app.appLandingPage)
              : router.push("/");
          }
        } catch (e) {
          if (e instanceof InvalidCredentialsError) {
            toastWarning("Invalid username or password");
          } else {
            toastDanger(e);
          }
        }
      } else {
        toastWarning("Complete form to log in");
      }
    };

    onMounted(async () => {
      const auth = new AuthService();
      const appV = await auth.getHeadVersion();
      auth.setActiveVersion(appV);
      const apiV = await auth.getApiVersion();
      version.value = `${appV} / ${apiV}`;
    });

    return {
      version,
      useVirtualInput,
      showConfig: localStorage.getItem("useLocalStorage") === "true",
      doLogin,
    };
  },
});
</script>
