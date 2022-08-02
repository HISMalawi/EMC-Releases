<template>
  <ion-page>
    <ion-header> 
      <ion-toolbar>
        <ion-title> 
          <ion-label :style="{fontWeight: 'bolder', fontSize: '1.9em'}"> 
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
      <inputs :useVirtualInput="useVirtualInputOnly"/>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <span>
          <img
            id="coat"
            :src="coatImg"
            alt="Malawi Coat of Arms logo"
          />
          <img
            id="pepfar"
            :src="pepfarImg"
            alt="PEPFAR logo"
          />
        </span>
        <select v-model="activePlatformProfile" slot="end" class="devices">
          <option
            v-for="(profile, index) in deviceProfiles" 
            :key="index"
            :value="profile.value"
            :selected="profile.isChecked">
            {{ profile.label }}
          </option>
        </select>
        <ion-button
          slot="end"
          class="config"
          router-link="/settings/host"
          v-if="showConfig">
          Configuration
        </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>
<script lang="ts">
import Inputs from "./LoginCustomPage.vue";
import { 
  IonButton, 
  IonPage, 
  IonContent, 
  IonFooter,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
} from "@ionic/vue";
import img from '@/utils/Img';
import { onMounted, ref } from '@vue/runtime-core';
import { AuthService } from '@/services/auth_service';
import usePlatform from '@/composables/usePlatform';
import { computed } from 'vue';
import { KeyboardType } from "@/composables/usePlatform"

export default {
  name: "login",
  components: {
    Inputs,
    IonButton,
    IonTitle,
    IonLabel,
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
  },
  setup() {
    const {
      activePlatformProfile,
      platformProfiles
    } = usePlatform()
    const version = ref('')
    const useVirtualInputOnly = computed(
      () => activePlatformProfile.value.keyboard === KeyboardType.HIS_KEYBOARD_ONLY
    )
    const deviceProfiles = Object.keys(platformProfiles.value).map(key => ({
      label: key,
      value: { profileName: key, ...platformProfiles.value[key] },
      isChecked: key === activePlatformProfile.value.profileName
    }))
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
      deviceProfiles,
      useVirtualInputOnly,
      activePlatformProfile,
      coatImg: img('login-logos/Malawi-Coat_of_arms_of_arms.png'),
      pepfarImg: img('login-logos/PEPFAR.png'),
      showConfig: localStorage.getItem("useLocalStorage") === "true"
    }
  }
}
</script>
<style scoped>
#coat {
  width: 8vw;
  height: 8vw;
}
#pepfar {
  width: 6vw;
  height: 6vw;
}
.devices {
  background-color: var(--ion-color-primary);
  color: #fff;
  border: 1px solid lightblue;
  font-size: 1.3em;
  padding: 1rem;
  margin-right: .5rem;
}
.devices>option {
  background: #fff;
  color: black;
}
</style>
