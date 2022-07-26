<template>
  <layout>
    <home-folder :items="appReports"></home-folder>
  </layout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import HomeFolder from "@/components/HomeComponents/HomeFolders.vue"
import Layout from "../../Components/Layout.vue";
import HisApp from "@/apps/app_lib";
import { AppInterface } from "@/apps/interfaces/AppInterface";

export default defineComponent({
  name: "Reports",
  components: {
    HomeFolder,
    Layout,
  },
  setup() {
    const app = reactive<AppInterface>(HisApp.getActiveApp() || {} as AppInterface);
    const appReports = computed(() => app.programReports || []);

    return {
      appReports,
    };
  }
})
</script>