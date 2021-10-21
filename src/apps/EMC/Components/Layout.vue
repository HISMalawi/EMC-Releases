<template>
  <ion-menu menu-id="app-menu" content-id="main-content" type="push">
    <ion-header>
      <ion-toolbar>
        <ion-title class="main-title">
          <img :src="logo" alt="Master card logo" style="max-width: 14%"/>
          <span class="ion-padding-start">
            E-MASTERCARD
          </span>
        </ion-title>
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
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="false" menu="start"> </ion-menu-button>
        </ion-buttons>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <slot> </slot>
    </ion-content>
    <ion-footer>
      <ion-toolbar color="light"> 
        <ion-button slot="end" size="large"> Applications </ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import HisApp from "@/apps/EMC/app"
import Img from "@/utils/Img"
import { defineComponent } from "vue";
import {
  IonPage,
  IonFooter,
  IonContent,
  IonItem,
  IonList,
  IonMenu,
  IonButtons,
  IonMenuButton,
  menuController,
  IonMenuToggle,
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
    IonButtons,
    IonFooter,
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