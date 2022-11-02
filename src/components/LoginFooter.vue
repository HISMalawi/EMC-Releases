<template>
<ion-footer style="position:absolute; width: 100%; bottom: 0; left: 0; padding-right: 1rem; padding-left: 1rem;">
  <ion-toolbar>
    <span>
      <img id="coat" :src="coatImg" alt="Malawi Coat of Arms logo" />
      <img id="pepfar" :src="pepfarImg" alt="PEPFAR logo" />
    </span>
    <ion-item class="his-sm-text" style="width:45%" slot="end" lines="none"> 
      <template v-if="isPocSite">
        <ion-label>Device Profile</ion-label>
        <ion-select v-model="profile" :value="profile"> 
          <ion-select-option
            v-for="(p, index) in deviceProfiles" 
            :key="index"
            :value="p.label"
          > 
            {{ p.label }}
          </ion-select-option>
        </ion-select>
      </template>
      <ion-button
        color="dark"
        fill="outline"
        size="large"
        slot="end"
        :router-link="settingsUrl">
        Network
      </ion-button>
    </ion-item>
  </ion-toolbar>
</ion-footer>
</template>

<script lang="ts">
import usePlatform from '@/composables/usePlatform'
import img from '@/utils/Img'
import { computed, defineComponent, ref, watch } from 'vue'
import { IonFooter, IonToolbar, IonButton, IonSelect, IonSelectOption, IonItem, IonLabel } from "@ionic/vue";
import { find } from 'lodash';

export default defineComponent({
  name: "LoginFooter",
  components: {
    IonFooter, 
    IonToolbar, 
    IonButton, 
    IonSelect, 
    IonSelectOption,
    IonItem,
    IonLabel,
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
  setup(props) {
    const settingsUrl = computed(() => props.isPocSite ? "/settings/host" : "/settings/network_settings")
    const { activePlatformProfile, platformProfiles } = usePlatform()
    const profile = ref(activePlatformProfile.value.profileName || "")
    const deviceProfiles: any = Object.keys(platformProfiles.value).map(key => ({
      label: key,
      value: { profileName: key, ...platformProfiles.value[key] },
    }))

    watch(profile, (v: string) => {
      activePlatformProfile.value = (find(deviceProfiles, { label: v }) || {}).value
    })

    return {
      coatImg: img("login-logos/Malawi-Coat_of_arms_of_arms.png"),
      pepfarImg: img("login-logos/PEPFAR.png"),
      deviceProfiles,
      profile,
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
