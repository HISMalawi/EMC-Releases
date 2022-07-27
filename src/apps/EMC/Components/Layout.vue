<template>
  <ion-menu menu-id="app-menu" content-id="main-content" type="overlay">
    <ion-header class="toolbar-size">
      <ion-toolbar>
        <ion-item lines="none"> 
          <ion-thumbnail slot="start"> 
            <img :src="logo" class="logo" alt="Master card logo"/>
          </ion-thumbnail>
          <ion-label>E-MASTERCARD </ion-label>
        </ion-item>
        <ion-label class="ion-margin-start">{{ description }}</ion-label>
      </ion-toolbar>
    </ion-header >
    <ion-content>
      <multi-level-menu :items="menuItems" />
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header class="toolbar-size">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="true"></ion-menu-button>
          <ion-button @click="selectApp" >
            <ion-icon :icon="apps"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ facility }}</ion-title>
        <ion-buttons slot="end" size="large">
          <ion-button @click="showAuthUserMenu" style="text-transform:none" >
            <span style="font-size: 20px;">{{ user }}</span> 
            <ion-icon :icon="caretDown" class="ion-margin-start"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <slot> </slot>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import HisApp from "@/apps/app_lib"
import Img from "@/utils/Img"
import { computed, defineComponent, onMounted, ref } from "vue";
import {
  IonPage,
  IonContent,
  IonItem,
  IonMenu,
  IonThumbnail,
  IonButtons,
  IonMenuButton,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonLabel,
  popoverController,
  IonIcon,
IonButton,
} from "@ionic/vue";
import { menuItems } from "../Config/appMenu";
import { apps, caretDown } from "ionicons/icons";
import { useRouter } from "vue-router";
import AuthUserMenuVue from "./AuthUserMenu.vue";
import { Service } from "@/services/service";
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";
import MultiLevelMenu from "./MultiLevelMenu.vue";

export default defineComponent({
  name: "Layout",
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonMenu,
    IonTitle,
    IonThumbnail,
    IonButtons,
    IonButton,
    IonToolbar,
    IonHeader,
    IonMenuButton,
    IonLabel,
    IonIcon,
    MultiLevelMenu
},
  setup() {
    const facility = ref('')
    const user = ref('')
    const router = useRouter()
    const app = ref(HisApp.getActiveApp())
    const logo = computed(() => Img(app.value?.applicationIcon || '' ))
    const description = computed(() => app.value?.applicationDescription || '')
    const selectApp = async () => {
      const data = await HisApp.selectApplication("HomePage");
      if (data && data.applicationName !== app.value?.applicationName) {
        const userLocation = sessionStorage.userLocation;
        return !userLocation
          ? router.push("/select_hc_location")
          : data.appLandingPage 
          ? router.push(data.appLandingPage)
          : router.push('/')
      }
    }

    const showAuthUserMenu = async (e: Event) => {
      const authMenu = await popoverController.create({
        component: AuthUserMenuVue,
        cssClass: 'my-class',
        event: e,
        translucent: true,
      })

      authMenu.present();
      const { data } = await authMenu.onDidDismiss();
    }

    const getFacility = async () => {
      const locationID = await GLOBAL_PROP.healthCenterID();
      if(!locationID) return ''
      const data = await Service.getJson("locations/" + locationID);
      sessionStorage.location = data.name;
      sessionStorage.locationName = data.name;
      return data.name
    }

    onMounted(async () => {
      facility.value = await getFacility()
      user.value = await Service.getUserName();
    })
    return {
      menuItems,
      logo,
      apps,
      caretDown,
      selectApp,
      showAuthUserMenu,
      facility,
      user,
      description,
    }
  },
});
</script>
<style scoped>
  .toolbar-size {
    height: 5vh;
  }
</style>