<template>
  <ion-page>
    <TSLoginForm v-if="useVirtualInput" :version="version" @login="doLogin" />
    <DTLoginForm v-else @login="doLogin" :version="version" :showConfigBtn="showConfig" />
  </ion-page>
</template>
<script lang="ts">
import TSLoginForm from "@/components/Forms/TSLoginForm.vue";
import { IonPage } from "@ionic/vue";
import { onMounted, ref } from "@vue/runtime-core";
import { AuthService, InvalidCredentialsError } from "@/services/auth_service";
import usePlatform from "@/composables/usePlatform";
import { defineComponent } from "vue";
import DTLoginForm from "@/components/Forms/DesktopForms/DTLoginForm.vue";
import HisApp from "@/apps/app_lib";
import { useRouter } from "vue-router";
import { toastDanger, toastWarning } from "@/utils/Alerts";

export default defineComponent({
  name: "login",
  components: {
    TSLoginForm,
    IonPage,
    DTLoginForm,
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
      const auth = new AuthService()
      await auth.loadConfig()
      const appV = await auth.getHeadVersion()
      auth.setActiveVersion(appV)
      const apiV = await auth.getApiVersion()
      version.value = `${appV} / ${apiV}`
    })
    return {
      version,
      useVirtualInput,
      showConfig: localStorage.getItem("useLocalStorage") === "true",
      doLogin,
    };
  },
});
</script>
