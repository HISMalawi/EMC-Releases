<template>
<ion-footer style="position:absolute; width: 100%; bottom: 0; left: 0; padding-right: 1rem; padding-left: 1rem;">
  <ion-toolbar>
    <span>
      <img id="coat" :src="coatImg" alt="Malawi Coat of Arms logo" />
      <img id="pepfar" :src="pepfarImg" alt="PEPFAR logo" />
    </span>

    <ion-item slot="end" color="primary" size="large" v-if="isPocSite">
      <ion-label>Select Platform: </ion-label>
      <ion-select :value="platform" v-model="platform" >
        <ion-select-option
          v-for="(device, index) in platformOptions"
          :key="index"
          :value="device"
        >
          {{ device }}
        </ion-select-option>
      </ion-select>
    </ion-item>
    <ion-button
      slot="end"
      :router-link="settingsUrl"
      v-if="showConfigBtn"
    >
      Configuration
    </ion-button>
  </ion-toolbar>
</ion-footer>
</template>

<script lang="ts">
import usePlatform from '@/composables/usePlatform'
import img from '@/utils/Img'
import { computed, defineComponent, ref, watch } from 'vue'
import { IonFooter, IonToolbar, IonButton, IonSelect, IonSelectOption } from "@ionic/vue";

export default defineComponent({
  name: "LoginFooter",
  components: {
    IonFooter, IonToolbar, IonButton, IonSelect, IonSelectOption
  },
  props: {
    showConfigBtn: {
      type: Boolean,
      default: false,
    },
    isPocSite: {
      type: Boolean,
      default: true,
    }
  },
  setup() {
    const { platformType, setPlatformType } = usePlatform()
    const platform = ref(platformType.value || "Platform")
    const settingsUrl = computed(() => platformType.value === "desktop" ?
      "/settings/network_settings" : "/settings/host"
    )
    const platformOptions = ref([
      "mobile", "desktop"
    ])

    watch(platform, (p) => {
      if (["mobile", "desktop"].includes(p))
        setPlatformType(p as "mobile" | "desktop");
    });

    return {
      coatImg: img("login-logos/Malawi-Coat_of_arms_of_arms.png"),
      pepfarImg: img("login-logos/PEPFAR.png"),
      platformOptions,
      platform,
      settingsUrl,
    }
  },
})
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
</style>
