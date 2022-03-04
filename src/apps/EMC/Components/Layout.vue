<template>
  <ion-menu menu-id="app-menu" content-id="main-content" type="push">
    <ion-header class="toolbar-size">
      <ion-toolbar>
        <ion-item lines="none"> 
          <ion-thumbnail slot="start"> 
            <img :src="logo" class="logo" alt="Master card logo"/>
          </ion-thumbnail>
          <ion-label> E-MASTERCARD </ion-label>
        </ion-item>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          v-for="(p, i) in appPages" :key="i"
          :router-link="p.url" 
          detail="true" 
          class="hydrated"
          >
          <ion-label>{{ p.title }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header class="toolbar-size">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="false"> </ion-menu-button>
          <ion-button @click="selectApp" >
            <ion-icon :icon="apps"></ion-icon>
          </ion-button>
          <ion-button @click="showAuthUserMenu" >
            <ion-icon :icon="person"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
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
  IonList,
  IonMenu,
  IonThumbnail,
  IonButtons,
  IonMenuButton,
  menuController,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonLabel,
  popoverController
} from "@ionic/vue";
import { appPages } from "../Config/appPages";
import { apps, person } from "ionicons/icons";
import { useRouter } from "vue-router";
import AuthUserMenuVue from "./AuthUserMenu.vue";

export default defineComponent({
  name: "App",
  props: {
    title: {
      type: String,
      default: 'Dashboard' 
    }
  },
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonThumbnail,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonMenuButton,
    IonLabel,
  },
  setup() {
    const router = useRouter()
    const app = ref(HisApp.getActiveApp())
    const logo = computed(() => Img(app.value?.applicationIcon || '' ))
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
      console.log(data)
    }

    onMounted(() => {
      menuController.open('start')
    })
    return {
      appPages,
      logo,
      apps,
      person,
      selectApp,
      showAuthUserMenu,
    }
  },
});
</script>
<style scoped>
  .toolbar-size {
    height: 9vh;
  }
</style>