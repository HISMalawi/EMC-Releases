<template>
  <ion-card>
    <ion-card-body class="ion-padding">
      <ion-card-title class="ion-padding">{{ label }}</ion-card-title>
      <ion-card-subtitle v-if="isLoading" class="ion-padding">
        <ion-spinner name="bubbles" color="light"></ion-spinner>
      </ion-card-subtitle>
      <ion-card-subtitle class="ion-padding" v-else>{{
        value
      }}</ion-card-subtitle>
      <ion-icon :icon="icon"></ion-icon>
    </ion-card-body>
  </ion-card>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { alertCircle } from "ionicons/icons";

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
      default: alertCircle,
    },
  },
  setup(props) {
    const isLoading = computed(() => props.value === -1);
    return {
      isLoading,
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