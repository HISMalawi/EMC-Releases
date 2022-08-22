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
    const isPocSite = ref(true);
    const auth = new AuthService();
    const version = ref("");

    const doLogin = async (user: any) => {
      if (user.username && user.password) {
        auth.setUsername(user.username);
        try {
          await auth.login(user.password);
          auth.startSession();
          const nextUrl = isPocSite.value ? "/select_hc_location": "/home"
          router.push(nextUrl)
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
      isPocSite.value = (await auth.loadConfig()).isPocSite
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
