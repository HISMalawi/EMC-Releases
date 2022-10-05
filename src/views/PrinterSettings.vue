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
import { isEmpty } from "lodash";
import { PrinterDescription } from "@/interfaces/PrintServiceInterfaces";

export default defineComponent({
  components: { HisStandardForm },
  methods: {
    async onFinish() {
      this.$router.back();
    },
    isDefaultPrinter(printer: PrinterDescription) {
      return printer.id === this.defaultPrinter.id;
    },
    sortPrinters(printers: PrinterDescription[]) {
      return printers.sort((a, b) => {
        if (this.isDefaultPrinter(a) && !this.isDefaultPrinter(b)) {
          return -1;
        } else if (!this.isDefaultPrinter(a) && this.isDefaultPrinter(b)) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    },
    defaultPrinterStyle(){
      const rowColors: any[] = [];
      if(!isEmpty(this.defaultPrinter)){
        rowColors.push({indexes: [0], class: 'adherence-txt-good adherence-col-bg bold'});
      }
      return rowColors;
    },
    getFields() {
      return [
        {
          id: "printer_settings",
          helpText: "Printer Settings",
          type: FieldType.TT_TABLE_VIEWER,
          config: { hiddenFooterBtns: ["Clear"]},
          options: async () => {
            const printers: PrinterDescription[] = await this.printerService.getAllPrinters();
            const sortedPrinters = this.sortPrinters(printers);
            return [{
              other: {
                rowColors: this.defaultPrinterStyle(),
                columns: ["Available Devices"],
                rows: sortedPrinters.map((printer: any) => [
                  printer.id,
                  {
                    type: "button",
                    name: "Test Printer",
                    action: () => this.printerService.printTestLbl(printer)
                  },
                  (this.isDefaultPrinter(printer) ? "Default Printer" : {
                    type: 'button',
                    name: 'Set as Default',
                    visible: !this.isDefaultPrinter(printer),
                    action: () => {
                      this.printerService.setDefaultPrinter(printer);
                      this.defaultPrinter = printer;
                      this.refreshKey = Math.random() * 10000;
                    }
                  })
                ])
              }
            }]
          }
        },
      ];
    },
  },
  data() {
    return {
      printerService: {} as PrintoutService,
      defaultPrinter: {} as Record<string, any>,
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
