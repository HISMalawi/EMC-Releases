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
      const items = this.prepDrugs(formData);
      try {
        await this.stockService.batchUpdate({
          verification_date: formData.date.value,
          reason: formData.reason.value,
          items,
        });
        toastSuccess("Stock succesfully updated");
        this.$router.push("/");

      } catch (e) {
        toastDanger("Could not save stock");
        console.error(e)
      }
    },
    getFields(): Array<Field> {
      return [
        {
          id: "date",
          helpText: "Verification Date",
          type: FieldType.TT_FULL_DATE,
          validation: (val: Option) => Validation.required(val),
        },
        {
          id: "enter_batches",
          helpText: "Batch entry",
          type: FieldType.TT_BATCH_VERIFICATION,
          options: () => this.drugs,
          validation: (val: Option) => Validation.required(val),
          init: async () => {
            const options: Map<number, Option> = new Map();
            const _drugs: Array<any> = await this.stockService.getItems()
            this.drugs = _drugs.forEach(drug => {
              if(!drug.pack_size) drug.pack_size = StockService.getPackSize(drug.drug_id)
              drug.original_quantity = drug['current_quantity'] / (drug.pack_size || 1)
              drug.current_quantity = drug.original_quantity
              if(options.has(drug.drug_id)) {
                options.get(drug.drug_id)?.other.push(drug);
              } else {
                options.set(drug.drug_id, {
                  label: `${ drug?.drug_name || drug?.drug_legacy_name } (${drug.product_code})`,
                  value: drug.drug_id,
                  other: [drug]
                })
              }
            });
            this.drugs = Array.from(options.values());
            return true;
          } 
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
        "Drug Name (BatchNumber)",
        "Tins/Pallets",
        "Reason for Modification",
        "Expiry date",
      ];
      const rows = drugs.map((j: any) => {
        const d = j.value;
        return [
          `${d.drug_name} (${d.batch_number})`,
          toNumString(d.current_quantity),
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
        'id': element.value.id,
        'current_quantity': parseInt(element.value.pack_size) * parseInt(element.value.current_quantity),
        "delivered_quantity": element.value.delivered_quantity,
        "pack_size": element.value.pack_size,
        'expiry_date': element.value.expiry_date,
        'delivery_date': element.value.delivery_date,
        'batch_number': element.value.batch_number,
        "reason": element.value.reason,
      }));
    },
    selectAll(listData: Array<Option>) {
      return listData.map((l) => {
        l.isChecked = true;
        return l;
      });
    },
  },
  async created() {
    this.stockService = new StockService();
    this.fields = this.getFields();
  },
});
</script> 