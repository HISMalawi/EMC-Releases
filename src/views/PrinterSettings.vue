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
import { loadingController } from "@ionic/core";
import { toastDanger, toastSuccess, toastWarning } from "@/utils/Alerts";
import { PrinterDevice } from "@/plugins/LabelPrinter";

export default defineComponent({
  components: { HisStandardForm },
  data() {
    return {
      printFieldContext: null as any,
      printerService: {} as PrintoutService,
      defaultPrinter: {} as PrinterDevice,
      refreshKey: 0,
      fields: [] as any,
      refreshInterval: null as any,
      isRefreshingDevices: false as boolean
    };
  },
  async mounted() {
    this.printerService = new PrintoutService();
    this.defaultPrinter = await this.printerService.getDefaultPrinter() || {} as PrinterDevice;
    this.fields = this.getFields();
  },
  unmounted() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval)
    }
  },
  methods: {
    async onFinish() {
      this.$router.back();
    },
    isDefaultPrinter(printer: PrinterDevice) {
      if(printer.name && this.defaultPrinter.name) return printer.name === this.defaultPrinter.name;
      return printer.deviceID === this.defaultPrinter.deviceID
    },
    sortPrinters(printers: PrinterDevice[]) {
      return printers.sort((a, b) => {
        if (this.isDefaultPrinter(a) && !this.isDefaultPrinter(b)) {
          return -1;
        } else if (!this.isDefaultPrinter(a) && this.isDefaultPrinter(b)) {
          return 1;
        } else {
          return (a.name || a.deviceID).localeCompare(b.name || b.deviceID);
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
          config: { 
            hiddenFooterBtns: ["Clear"],
            footerBtns: [
              {
                name: 'Refresh',
                size: "large",
                slot: "end",
                color: "warning",
                visible: true,
                onClick: async () => {
                  if (this.isRefreshingDevices) {
                    return toastWarning('Please wait...')
                  }
                  if (this.printFieldContext) {
                    (await loadingController.create({
                      backdropDismiss: false,
                      message: 'Please wait...'
                    })).present();
                    this.isRefreshingDevices = true
                    try {
                      await this.printFieldContext.init()
                    } catch(e) {
                      toastDanger(`${e}`)
                    }
                    this.isRefreshingDevices = false
                    loadingController.dismiss()
                  }
                }
              }
            ]
          },
          init: () => {
            this.refreshInterval = setInterval(async () => {
              if (this.printFieldContext && !this.isRefreshingDevices) {
                this.isRefreshingDevices = true
                await this.printFieldContext.init()
                this.isRefreshingDevices = false
              }
            }, 5000)
          },
          onload: (context: any) => {
            this.printFieldContext = context
          },
          options: async () => {
            const printers = await this.printerService.getAllPrinters();
            const sortedPrinters = this.sortPrinters(printers);
            return [{
              other: {
                rowColors: this.defaultPrinterStyle(),
                columns: ["Available Devices"],
                rows: sortedPrinters.map((printer: PrinterDevice) => [
                  printer.name || printer.deviceID,
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
        }
      ]
    },
  },
});
</script>
