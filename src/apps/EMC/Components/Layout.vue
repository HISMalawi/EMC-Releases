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
import HisApp from "@/apps/EMC/app"
import Img from "@/utils/Img"
import { defineComponent } from "vue";
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
  IonLabel
} from "@ionic/vue";
export default defineComponent({
  name: "App",
  props: {
    title: {
      type: String,
      default: 'Master card' 
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
    IonLabel
  },
  mounted() {
    menuController.open('start')
  },
  setup() {
    const logo = Img(HisApp.applicationIcon)
    const appPages = [
      {
        title: "Dashboard",
        url: "/emc/home",
      },
      {
        title: "Search/ Create client",
        url: "/emc/newpatient",
      },
      {
        title: "Reports",
        url: "/emc/reports",
      },
      {
        title: "Data cleaning tools",
        url: "/emc/cleaningtools",
      },
      {
        title: "Users",
        url: "/emc/users",
      },
    ];
    return {
      appPages,
      logo
    }
  },
});
</script>
<style scoped>
  .toolbar-size {
    height: 9vh;
  }
</style>