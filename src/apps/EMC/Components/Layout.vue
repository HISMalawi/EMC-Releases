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
      <keep-alive>
        <multi-level-menu :items="menuItems" />
      </keep-alive>

    </ion-content>
    <ion-footer class="ion-padding-vertical ion-padding-start" color="primary">
      <ion-label><b>EMC Version: </b>{{ emcVersion }}</ion-label><br>
      <ion-label><b>API Version: </b>{{ apiVersion }}</ion-label>
    </ion-footer>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header class="toolbar-size">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="true"></ion-menu-button>
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
import { caretDown } from "ionicons/icons";
import AuthUserMenuVue from "./AuthUserMenu.vue";
import { Service } from "@/services/service";
import MultiLevelMenu from "./MultiLevelMenu.vue";
import Store from "@/composables/ApiStore"

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
    const app = ref(HisApp.getActiveApp())
    const logo = computed(() => Img(app.value?.applicationIcon || '' ))
    const description = computed(() => app.value?.applicationDescription || '')
    const emcVersion = Service.getCoreVersion();
    const apiVersion = Service.getApiVersion();
    const showAuthUserMenu = async (e: Event) => {
      const authMenu = await popoverController.create({
        component: AuthUserMenuVue,
        cssClass: 'my-class',
        event: e,
        translucent: true,
      })

      authMenu.present();
    }

    const setLocation = async () => {
      const data = await Store.get('CURRENT_LOCATION') 
      facility.value = data.name;
      sessionStorage.location = data.name;
      sessionStorage.locationName = data.name;
      sessionStorage.siteUUID = data.uuid;
    }

    onMounted(async () => {
      await setLocation()
      user.value = await Service.getUserName();
    })
    
    return {
      menuItems,
      logo,
      caretDown,
      showAuthUserMenu,
      facility,
      user,
      description,
      emcVersion,
      apiVersion,
    }
  },
});
</script>
<style scoped>
  .toolbar-size {
    height: 5vh;
  }
</style>