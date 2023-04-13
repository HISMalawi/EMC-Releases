<template>
  <view-port>
    <his-text-input readonly :value="fullSelectedDrugName"/> 
    <ion-grid style="background: white;">
      <ion-row>
        <ion-col size="4" class="border-right scroll-list">
          <ion-list v-for="(drug, index) in drugs" :key="index">
            <ion-item 
              detail
              :color="index === selectedDrug ? 'secondary' : ''"
              @click="selectDrug(index)">
              {{ `${drug.short_name} (${drug.pack_size})` }}
            </ion-item>
          </ion-list>
        </ion-col>
        <ion-col>
          <ion-grid v-if="selectedDrug !== null" class="scroll-list"> 
            <ion-row v-for="(entry, ind) in drugs[selectedDrug].entries" :key="ind">
              <ion-col> 
                <ion-item> 
                  <ion-label position="floating">Pack Size</ion-label>
                  <ion-input readonly placeholder="0" :value="fmtNumber(entry.tabs)" @click="selectPackSize(ind)"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col> 
                <ion-item> 
                  <ion-label position="floating">Tins/Pallets</ion-label>
                  <ion-input readonly placeholder="0" :value="fmtNumber(entry.tins)" @click="enterTins(ind)"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col> 
                <ion-item> 
                  <ion-label position="floating">Expiry Date</ion-label>
                  <ion-input readonly placeholder="DD/MM/YYYY" :value="fmtDate(entry.expiry)" @click="enterExpiry(ind)"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col> 
                <ion-item> 
                  <ion-label position="floating">Batch Number</ion-label>
                  <ion-input readonly placeholder="e.g. 'ABC-123'" :value="entry.batchNumber" @click="enterBatch(ind)"></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row> 
              <ion-col>
                <ion-button @click="addRow" siz="large">Add row</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-col>
      </ion-row>
    </ion-grid>
  </view-port>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ViewPort from "@/components/DataViews/ViewPort.vue";
import FieldMixinVue from "./FieldMixin.vue";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonList,
  IonInput,
  IonLabel,
  IonItem,
  modalController,
} from "@ionic/vue";
import { find, isEmpty } from "lodash";
import TouchField from "@/components/Forms/SIngleTouchField.vue"
import { Field, Option } from "../Forms/FieldInterface";
import { FieldType } from "../Forms/BaseFormElements";
import Validation from "@/components/Forms/validations/StandardValidations"
import { Service } from "@/services/service";
import HisTextInput from "@/components/FormElements/BaseTextInput.vue";
import { toDate, toNumString } from "@/utils/Strs";
import { StockService } from "@/apps/ART/views/ARTStock/stock_service";
import { MultiStepPopupForm } from "@/utils/PopupKeyboard";

export default defineComponent({
  components: { HisTextInput, ViewPort, IonInput, IonLabel, IonList, IonItem, IonGrid, IonCol, IonRow, IonButton },
  mixins: [FieldMixinVue],
  data: () => ({
    drugs: [] as any,
    allDrugsByName: [] as string[],
    selectedDrug: null as any,
  }),
  mounted() {
    this.init()
  },
  async activated() {
    this.init()
  },
  methods: {
    fmtNumber(num: number | string) {
      return toNumString(num)
    },
    fmtDate(date: string) {
      return toDate(date)
    },
    async init() {
      this.$emit("onFieldActivated", this);
      await this.setDefaultValue();
    },
    async setDefaultValue() {
      const incomingDrugs = await this.options();
      // detect if some drugs are still available as options
      this.drugs = this.drugs.filter((d: any) =>
        incomingDrugs.map((i: any) => i.label).includes(d.label)
      )
      incomingDrugs.forEach((element: any) => {
        const val = {
          tabs: null,
          tins: null,
          expiry: null,
          batchNumber: null,
        };
        const d = {
          label: element.label,
          entries: [{ ...val }, { ...val }, { ...val }],
          ...element.value,
        };
        // Append if incoming drug is new
        const drugExists = find(this.drugs, { label: element.label })
        if (!drugExists) this.drugs.push(d)
      })
      // initialise drug selection
      if (this.drugs.length >= 1) this.selectDrug(0)
    },
    getModalTitle(context: string) {
      return `${context} (${this.drugs[this.selectedDrug].short_name})`
    },
    getDrugValue(index: number, type: string) {
      return this.drugs[this.selectedDrug].entries[index][type]
    },
    setDrugValue(index: number, type: string, data: Option | null) {
      this.drugs[this.selectedDrug].entries[index][type] = data ? data.value : ''
    },
    useCustomPackSize (form: any) {
      return isEmpty(this.packSizes) || form.standard_pack_size.label.includes("Other")
    },
    async selectPackSize (index: number) {
      await MultiStepPopupForm([
        {
          id: 'standard_pack_size',
          helpText: "Select Pack Size",
          type: FieldType.TT_SELECT,
          condition: () => !isEmpty(this.packSizes),
          defaultValue: () => this.getDrugValue(index, 'tabs'),
          options: () => [
              ...this.packSizes.map(p => ({label: `${p}`, value: p })),
              {label: "Other (specify)", value: "Other"}
          ]
        },
        {
          id: 'custom_pack_size',
          helpText: 'Input quantity',
          type: FieldType.TT_NUMBER,
          defaultValue: () => this.getDrugValue(index, 'tabs'),
          validation: (val: any) => Validation.required(val),
          condition: (f: any) => this.useCustomPackSize(f),
          config: {
            showKeyboard: true,
          }
        }
      ],
      async (form: any) => {
        this.setDrugValue(index, 'tabs', this.useCustomPackSize(form) 
          ? form.custom_pack_size
          : form.standard_pack_size
        )
        await modalController.dismiss();
      })
    },
    enterTins(index: number) {
      this.launchKeyPad({
        id: 'tins',
        helpText: this.getModalTitle('Enter number of tins/pallets'),
        type: FieldType.TT_NUMBER,
        defaultValue: () => this.getDrugValue(index, 'tins'),
        validation: (v: Option) => {
          if (!v || v && !v.value) {
            return null
          } 
          return Validation.validateSeries([
            () => Validation.isNumber(v),
            () => v.value as number <= 0 ? ['Number of tins must be greater than 1'] : null
          ])
        }
      }, 
      (v: Option) => this.setDrugValue(index, 'tins', v))
    },
    enterBatch(index: number) {
      this.launchKeyPad({
        id: 'batch',
        helpText: this.getModalTitle('Enter batch number'),
        type: FieldType.TT_TEXT,
        config: {
          initialkb: 'qwerty'
        },
        defaultValue: () => this.getDrugValue(index, 'batchNumber'),
      }, 
      (v: Option) => {
        const batch = {...v}
        const value = `${batch.value}`.toUpperCase()
        batch.label = value
        batch.value = value
        this.setDrugValue(index, 'batchNumber', batch)
      })
    },
    enterExpiry(index: number) {
      this.launchKeyPad({
        id: 'expiry',
        helpText: this.getModalTitle('Enter expiry date'),
        type: FieldType.TT_FULL_DATE,
        defaultValue: () => this.getDrugValue(index, 'expiry'),
        validation: (v: Option) => {
          if (v && v.value) {
            return new Date(v.value) < new Date(Service.getSessionDate()) 
            ? ['You are not allowed to enter expired drugs']
            : null
          }
        }
      },
      (v: Option) => this.setDrugValue(index, 'expiry', v))
    },
    async launchKeyPad(currentField: Field, onFinish: (value: Option) => any) {
      const modal = await modalController.create({
        component: TouchField,
        backdropDismiss: false,
        cssClass: "full-modal",
        componentProps: {
          dismissType: 'modal',
          currentField,
          onFinish
        }
      });
      modal.present();
    },
    addRow() {
      this.drugs[this.selectedDrug].entries.push({
        tabs: null,
        tins: null,
        expiry: null,
        batchNumber: null
      });
    },
    selectDrug(index: any) {
      this.selectedDrug = index;
    },
    validateEntry(drug: any) {
      return (
        !isEmpty(drug.tins) &&
        !isEmpty(drug.expiry) &&
        !isEmpty(drug.batchNumber) &&
        !isEmpty(drug.tabs.toString())
      );
    },
  },
  computed: {
    packSizes () : Array<number> {
      if(this.selectedDrug === null) return [];
      return StockService.getPackSizes(this.drugs[this.selectedDrug].drug_inventory_id)
    },
    fullSelectedDrugName(): string {
      try {
        return this.drugs[this.selectedDrug].fullName
      } catch (e) {
        return 'N/A'
      }
    },
    enteredDrugs(): any {
      const f: any = [];
      this.drugs.forEach((element: any) => {
        const entries = element.entries.filter((el: any) => this.validateEntry(el));
        entries.forEach((e: any) => {
          f.push({label: element.short_name, value: {...element, ...e, tabs: e.tabs }});
        });
      });
      return f;
    },
  },
  watch: {
    clear() {
      this.drugs = this.drugs.map((d: any) => {
        d.entries = d.entries.map((e: any) => {
          e.tins = null
          e.expiry = null
          e.batchNumber = null
          return e
        })
        return d
      })
    },
    drugs: {
      handler() {
        this.$emit("onValue", this.enteredDrugs )
      },
      immediate: true,
      deep: true
    }
  },
});
</script>
<style scoped>
ion-label {
  font-weight: bold;
}
.border-right {
  border-right: solid 1px #ccc;
}
.scroll-list {
  height: 70vh;
  overflow: auto;
}
.input_display {
  font-size: 1.3em;
}
</style>