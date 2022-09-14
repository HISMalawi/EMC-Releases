<template>
  <ion-page>
    <TSLoginForm v-if="isPocSite" :version="version" @login="doLogin" />
    <DTLoginForm v-else @login="doLogin" :version="version" :showConfigBtn="showConfig" />
  </ion-page>
</template>
<script lang="ts">
import TSLoginForm from "@/components/Forms/TSLoginForm.vue";
import { IonPage } from "@ionic/vue";
import { onMounted, ref } from "@vue/runtime-core";
import { AuthService, InvalidCredentialsError } from "@/services/auth_service";
import { defineComponent } from "vue";
import DTLoginForm from "@/components/Forms/DesktopForms/DTLoginForm.vue";
import { useRouter } from "vue-router";
import { toastDanger, toastWarning } from "@/utils/Alerts";
import { Service } from "@/services/service";
import HisApps from '@/apps/app_lib';
import { find } from "lodash";

export default defineComponent({
  name: "login",
  components: {
    TSLoginForm,
    IonPage,
    DTLoginForm,
  },
  setup() {
    const router = useRouter();
    const isPocSite = ref(true);
    const auth = new AuthService();
    const version = ref("");

    const doLogin = async (user: any) => {
      if (user.username && user.password) {
        auth.setUsername(user.username);
        try {
          if (auth.versionLockingIsEnabled()) {
            await auth.validateIfCorrectAPIVersion()
          }
          if (!(await auth.checkTimeIntegrity())) {
            throw "Local date does not match API date. Please Update your device's date"
          }
          await auth.login(user.password);
          auth.startSession();
          const defaultApp = Service.getDefaultApp() // get app config          
          if (defaultApp && defaultApp.isPocApp !== false || Service.isPocSite()) {
            return router.push("/select_hc_location")
          }          
          const app = await HisApps.selectApplication()
          return router.push(app?.appLandingPage || '/emc/home') //TODO: use generic route that will work with desktop apps

        } catch (e) {
          if (e instanceof InvalidCredentialsError) {
            toastWarning("Invalid username or password");
          } else {
            toastDanger(`${e}`);
          }
        }
      } else {
        toastWarning("Complete form to log in");
      }
    };

    onMounted(async () => {
      const auth = new AuthService()
      await auth.loadConfig()
      isPocSite.value = Service.isPocSite()
      const appV = await auth.getHeadVersion()
      auth.setActiveVersion(appV)
      const apiV = await auth.getApiVersion()
      version.value = `${appV} / ${apiV}`
    })

    return {
      isPocSite,
      version,
      showConfig: localStorage.getItem("useLocalStorage") === "true",
      doLogin,
    };
  },
});
</script>
