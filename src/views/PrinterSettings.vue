<template>
  <his-standard-form
    :fields="fields"
    :onFinishAction="onFinish"
    :skipSummary="true"
    :key="refreshKey"
  />
</template> 
<script lang="ts">
import { defineComponent } from "vue";
import { FieldType } from "@/components/Forms/BaseFormElements";
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import { PrintoutService } from "@/services/printout_service";
import { toastSuccess } from "@/utils/Alerts";
import { refresh } from "ionicons/icons";
import { isEmpty } from "lodash";

export default defineComponent({
  components: { HisStandardForm },
  methods: {
    async onFinish() {
      this.$router.back();
    },
    getFields() {
      return [
        {
          id: "printer_settings",
          helpText: "Printer Settings",
          type: FieldType.TT_SUMMARY,
          options: () => [
            {
              label: "Printer name",
              value: this.defaultPrinter.name
            },
            {
              label: "Printer address",
              value: this.defaultPrinter.address
            },
          ],
          config: {
            hiddenFooterBtns: ["Clear"],
            footerBtns: [
              {
                name: "Select Printer",
                size: "large",
                slot: "end",
                color: "primary",
                visible: true,
                onClick: async () => {
                  const printer = await this.printerService.selectDefaultPrinter();
                  if (isEmpty(printer)) return;
                  this.defaultPrinter = printer;
                  await this.printerService.printTestLbl();
                  this.refreshKey = Math.random() * 10000;
                },
              },
            ],
          },
        },
      ];
    },
  },
  data() {
    return {
      printerService: {} as any,
      defaultPrinter: {} as any,
      refreshKey: 0,
      fields: [] as any,
    };
  },
  async mounted() {
    this.printerService = new PrintoutService();
    this.defaultPrinter = await this.printerService.getDefaultPrinter();
    this.fields = this.getFields();
  },
});
</script>
