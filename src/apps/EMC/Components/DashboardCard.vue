<template>
  <ion-card :color="color">
    <ion-card-content class="ion-padding">
      <ion-card-title class="ion-padding">{{ label }}</ion-card-title>
      <ion-card-subtitle v-if="isLoading" class="ion-padding">
        <ion-spinner name="bubbles" :color="loaderColor"></ion-spinner>
      </ion-card-subtitle>
      <ion-card-subtitle class="ion-padding" v-else>
        {{ value }}
      </ion-card-subtitle>
      <ion-icon :icon="icon" v-if="canShowIcon" class="ion-float-right"></ion-icon>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardTitle, IonCardSubtitle, IonSpinner, IonCardContent, IonIcon } from "@ionic/vue";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "DashboardCard",
  props: {
    value: {
      type: Number,
      default: -1,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
      default: 'light'
    }
  },
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonSpinner,
    IonIcon,
  },
  setup(props) {
    const isLoading = computed(() => props.value === -1);
    const canShowIcon = computed(() => !!props.icon?.length)
    const loaderColor = computed(() => props.color === 'light' ? 'primary' : 'light')
    return {
      isLoading,
      canShowIcon,
      loaderColor
    };
  },
});
</script>

<style scoped>
ion-card-subtitle {
  font-size: 36px;
}

ion-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: 1rem;
  margin-bottom: 2rem;
  font-size: 90px;
}
</style>