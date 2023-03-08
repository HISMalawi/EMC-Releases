<template>
  <his-standard-form
    :fields="fields"
    :activeField="activeField"
    :onFinishAction="onFinish"
    :skipSummary="true"
  >
  </his-standard-form>
</template> 
<script lang="ts">
import { defineComponent } from "vue";
import { Field, Option } from "@/components/Forms/FieldInterface";
import { FieldType } from "@/components/Forms/BaseFormElements";
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import Validation from "@/components/Forms/validations/StandardValidations";
import HisDate from "@/utils/Date";
import  { StockService } from "./stock_service";
import { toastDanger, toastSuccess } from "@/utils/Alerts";
import { toNumString } from "@/utils/Strs";

export default defineComponent({
  components: { HisStandardForm },
  data: () => ({
    activeField: "",
    fields: [] as any,
    drugs: [] as any,
    selectedDrugs: [] as any,
    barcode: "",
    stockService: {} as any
  }),

  methods: {
    async onFinish(formData: any) {
      console.log(formData)
      const items = this.prepDrugs(formData);
      const errors = [];
      console.log({
        verification_date: formData.date.value,
        reason: formData.reason.value,
        items,
      });
      // for (let index = 0; index < items.length; index++) {
      //   const element = items[index].value;
      //   const vals = {
      //           "current_quantity": element['current_quantity'] * StockService.getPackSize(element.drug_id),
      //           "reason": formData.reason.value
      //       };
      //       const f = await this.stockService.updateItem(element['id'], vals)
      //       if(!f) {
      //         errors.push('could not stock for ' + items[index].shortName);
      //       }
      // }
      // if (errors.length === 0) {
      //   toastSuccess("Stock succesfully updated");
      //   this.$router.push("/");
      // } else {
      //   toastDanger("Could not save stock");
      // }
    },
    getFields(): Array<Field> {
      return [
        {
          id: "date",
          helpText: "Verfication Date",
          type: FieldType.TT_FULL_DATE,
          validation: (val: Option) => Validation.required(val),
        },
        {
          id: "enter_batches",
          helpText: "Batch entry",
          type: FieldType.TT_BATCH_VERIFICATION,
          options: () => this.drugs,
          validation: (val: Option) => Validation.required(val),
        },
        {
          id: "reason",
          helpText: "Select reason",
          type: FieldType.TT_SELECT,
          validation: (val: Option) => Validation.required(val),
          options: () => [
            {
              label: "Monthly stock take",
              value: "Monthly stock take",
            },
            {
              label: "Audit",
              value: "Audit",
            },
            {
              label: "Adhoc (due to stock imbalance)",
              value: "Adhoc (due to stock imbalance)",
            },
            {
              label: "Supervision",
              value: "Supervision",
            },
            {
              label: "Handover",
              value: "Handover",
            },
          ],
        },
        {
          id: "verification_summary",
          helpText: "Summary",
          type: FieldType.TT_TABLE_VIEWER,
          options: (d: any) => this.buildResults(d.enter_batches),
          config: {
            hiddenFooterBtns: ["Clear"],
          },
        },
      ];
    },
    buildResults(drugs: any) {
      const columns = [
        "Drug",
        "Tins/Pallets",
        "Reason for Modification",
        "Expiry date",
      ];
      const rows = drugs.map((j: any) => {
        const d = j.value;
        return [
          d.shortName,
          toNumString(d['current_quantity']),
          d.reason,
          HisDate.toStandardHisDisplayFormat(d.expiry_date),
        ];
      });
      return [
        {
          label: "Confirm entry",
          value: "Table",
          other: { columns, rows },
        },
      ];
    },
    prepDrugs(formdata: any) {      
      return formdata.enter_batches.map((element: any) => ({
        'drug_id': element.value.drugID,
        'expiry_date': element.value.expiry_date,
        'quantity': parseInt(element.value.pack_size) * parseInt(element.value.current_quantity),
        "pack_size": element.value.pack_size,
        "reason": element.value.reason,
        "batch_number": element.value.batch_number,      
      }));
    },
    selectAll(listData: Array<Option>) {
      return listData.map((l) => {
        l.isChecked = true;
        return l;
      });
    },
    formatDrugs() {
      return this.stockService.drugList().map((drug: any) => {
        return {
          label: drug.shortName,
          value: drug,
        };
      });
    },
  },
  created() {
    this.stockService = new StockService();
    this.fields = this.getFields();
    this.drugs = this.formatDrugs();
  },
});
</script>