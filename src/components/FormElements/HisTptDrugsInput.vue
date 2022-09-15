<template>
  <ion-grid>
    <ion-row class="his-card section drug-section-style">
      <ion-col>
        <table>
          <thead>
            <tr>
              <th style="text-align: left;">Drug Name</th>
              <th>Tablets received</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(drug, drugIndex) in drugs" :key="drugIndex">
              <td>
                <b>{{ drug.label }}</b>
              </td>
              <td>
                <ion-input
                  readonly
                  @click="launchKeyPad(drug)"
                  :value="drug.value"
                  placeholder="tablets received"
                  class="dosage-input"
                />
              </td>              
            </tr>
          </tbody>
        </table>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FieldMixinVue from "./FieldMixin.vue";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonInput,
  IonIcon,
  modalController,
} from "@ionic/vue";
import { Option } from "../Forms/FieldInterface";
import HisKeypad from "@/components/Keyboard/HisKeypad.vue";

export default defineComponent({
  components: {
    IonInput,
    IonGrid,
    IonCol,
    IonRow,
  },
  mixins: [FieldMixinVue],
  data: () => ({
    drugs: [] as Option[],
  }),
  activated() {
    this.init()  
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.$emit("onFieldActivated", this);
      this.drugs = await this.options(this.fdata, this.cdata);
    },
    async launchKeyPad(drug: Option) {
      const modal = await modalController.create({
        component: HisKeypad,
        backdropDismiss: false,
        cssClass: "keypad-modal",
        componentProps: {
          title: drug.label,
          preset: drug.value,
          strictNumbers: true,
          onKeyPress(val: string) {
            drug.value = parseInt(val);
          },
        },
      });
      modal.present();
    },
  },
  watch: {
    clear() {
      this.drugs = this.drugs.map((d: any) => {
        return {...d, value: ""};
      });
    },
    drugs: {
      async handler() {
        this.$emit("onValue", this.drugs);
      },
      immediate: true,
      deep: true,
    },
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
<style scoped>
.dosage-input {
  text-align: center;
  border: solid 1px #ccc;
  height: 50px;
  width: 100%;
  background-color: rgb(252, 252, 241);
}
table {
  width: 100%;
}
.drug-section-style {
  padding: 0;
  background: #ffffff;
}
td,
th {
  border: solid 1px #3333;
}
th {
  padding: 0.8em;
}
td {
  padding: 0.4em;
  font-size: 0.9rem;
}
</style>