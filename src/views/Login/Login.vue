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
      <inputs :useVirtualInput="useVirtualInput"/>
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
        <select v-model="platform" slot="end" class="devices">
          <option
            v-for="(device, index) in devices" 
            :key="index"
            :value="device.value"
            :selected="device.value === platform"
          >
            {{ device.label }}
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
  IonLabel
} from "@ionic/vue";
import img from '@/utils/Img';
import { onMounted, ref } from '@vue/runtime-core';
import { AuthService } from '@/services/auth_service';
import usePlatform from '@/composables/usePlatform';
import { computed, watch } from 'vue';

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
    const { platformType, setPlatformType } = usePlatform()
    const useVirtualInput = computed(() => platformType.value === 'mobile')
    const platform = ref(platformType.value || 'Platform')
    const version = ref('')
    const devices = ref([
      {label: 'Mobile', value: 'mobile'},
      {label: "Desktop", value: "desktop"}
    ])

    watch(platform, p => {
      if (['mobile', 'desktop'].includes(p)) setPlatformType(p as 'mobile' | 'desktop')  
    })

    onMounted(async () => {
      const auth = new AuthService()
      await auth.loadConfig()
      const appV = await auth.getHeadVersion()
      auth.setActiveVersion(appV)
      const apiV = await auth.getApiVersion()
      version.value = `${appV} / ${apiV}`
    })
    return {
      devices,
      version,
      platform,
      useVirtualInput,
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
