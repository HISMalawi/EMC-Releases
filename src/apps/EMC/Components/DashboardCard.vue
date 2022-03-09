<template>
  <ion-card :color="color">
    <ion-card-body class="ion-padding">
      <ion-card-title class="ion-padding">{{ label }}</ion-card-title>
      <ion-card-subtitle v-if="isLoading" class="ion-padding">
        <ion-spinner name="bubbles" :color="loaderColor"></ion-spinner>
      </ion-card-subtitle>
      <ion-card-subtitle class="ion-padding" v-else>{{
        value
      }}</ion-card-subtitle>
      <ion-icon :icon="icon" v-if="canShowIcon"></ion-icon>
    </ion-card-body>
  </ion-card>
</template>

<script lang="ts">
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
  top: 0;
  font-size: 126px;
  margin-top: 1rem;
  margin-right: 1rem;
}
</style>