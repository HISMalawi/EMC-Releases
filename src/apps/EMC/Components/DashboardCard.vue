<template>
  <ion-card>
    <ion-card-body class="ion-padding">
      <ion-card-title class="ion-padding">{{ label }}</ion-card-title>
      <ion-card-subtitle class="ion-padding">{{ value }}</ion-card-subtitle>
      <ion-icon v-if="icon" :icon="icon"></ion-icon>
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
      default: -1
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const loading = computed(() => props.value === -1)
    return {
      loading
    }
  }
})
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