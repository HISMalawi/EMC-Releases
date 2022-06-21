<template>
  <div class="center">
    <p class="text">
      {{ value }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FieldMixinVue from "./FieldMixin.vue";

export default defineComponent({
  mixins: [FieldMixinVue],
  data: () => ({
    value: "",
  }),
  methods: {
    async init() {
      this.$emit("onFieldActivated", this);
      const data = await this.options();
      this.value = data[0].value;
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
  }
})
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.text {
  font-size: 2rem;
}
</style>