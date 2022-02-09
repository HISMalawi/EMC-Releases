<template>
  <tool-bar-medium-card>
    <ion-img v-if="icon" :src="icon" id="logo"></ion-img>
    <div style='font-size:0.7em;font-weight:bold;' class="ion-text-center">{{version}}</div>
  </tool-bar-medium-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ToolBarMediumCard from "@/components/Cards/ToolbarMediumCard.vue"
import {
  IonImg
} from "@ionic/vue"
export default defineComponent({
  name: "AppIcon",
  components: { IonImg, ToolBarMediumCard },
  props: {
    icon: {
      type: String,
      required: true
    },
    version: {
      type: String,
      default: '-/-'
    }
  }
});
</script>
<style scoped>
  #logo {
    margin: auto;
    width: 120px;
    height: 70px;
  }
</style>