<template>
  <div>
    <div style="width: 97.8%;margin:auto;">
      <div id="cummulative" class="cummulative_hight" style="border: 1px solid #999;border-bottom: none; 
            background-color: #f6f2ca; height: 224px;
            overflow: auto; padding: 5px;">
          <table style="width:100%;">
            <thead>
              <tr>
                <th>Drug</th>
                <th>Frequency</th>
                <th>Dosage</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in checkedItems" :key="index">
                <td class="dosage-input">
                  <b>{{ item.label }}</b>
                </td>
                <td class="dosage-input">
                  <ion-input
                    readonly
                    placeholder="Add frequency.."
                    :value="item.other.frequency"
                  />
                </td>
                <td class="dosage-input">
                  <ion-input
                    readonly
                    placeholder="Add dosage.."
                    :value="item.other.dosage"
                  />
                </td>
                <td class="dosage-input">
                  <ion-input
                    readonly
                    placeholder="Add duration.."
                    :value="item.other.duration"
                  />
                </td>
                <td class="dosage-input" @click="unCheck(item)">
                  <ion-button color="danger">
                    <ion-icon :icon="trash"></ion-icon>
                  </ion-button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
    <view-port style="margin-top:0px;" v-if="switchKeyboard">
      <his-text-input :value="selected" @onValue="onKBValue"/>
      <ion-content style="width: 100%;" class="ion-padding-bottom">
        <div class="ion-content-scroll-host" :class="{'ion-margin-bottom ion-padding-bottom': disableScroll}">
          <ion-list class='view-port-content' :class="{'ion-margin-bottom': disableScroll}">
            <ion-item v-for="(entry, index) in listData" :key="index" :color="entry.isChecked ? 'lightblue':''" :lines="entry.isChecked ? 'none':''">
              <ion-label> 
                <ion-text class="his-md-text">{{ entry.label }} </ion-text>
                <ion-text :color="entry.description?.color" v-if="entry.description && entry.isChecked"> 
                  <p><i>{{ entry.description.text }}</i></p>
                </ion-text>
              </ion-label>
              <ion-checkbox
                slot="start"
                v-model="entry.isChecked"
                @ionChange="onSelect(entry, $event)"
                :disabled="entry.disabled"
              />
            </ion-item>
          </ion-list>
          <ion-infinite-scroll @ionInfinite="pushData($event)" threshold="100px" :disabled="disableScroll" >
            <ion-infinite-scroll-content loading-spinner="crescent" loading-text="Loading more data..." />
          </ion-infinite-scroll>
        </div>
      </ion-content >
    </view-port>
    <his-keyboard v-if="switchKeyboard"  :kbConfig="keyboard" :onKeyPress="keypress"/>
    <div class="content" v-if="!switchKeyboard">
      <prescription-frequency :list="list" :onClick="frequencyKeypress" @click="isComplete" />
      <prescription-keypad :onKeyPress="dosageKeypress" :title="'Dosage'" @click="isComplete" />
      <prescription-keypad :onKeyPress="durationKeypress" :title="'Duration'" @click="isComplete" />
    </div>
  </div>
  <ion-footer style="position: absolute; bottom:0"> 
      <ion-toolbar color="dark">
          <ion-button :router-link="cancelDestination" slot="start" size="large" color="danger">
              Cancel
          </ion-button>
          <ion-button @click="predefinedMalariaDrug" slot="end" size="large" color="primary" v-if="switchKeyboard"> 
            Predefined Malaria Drugs
          </ion-button>
          <ion-button @click="clearPrescription" slot="end" size="large" color="warning" > 
              Clear
          </ion-button>
          <ion-button :disabled="disableNextBtn"  @click="savePrescription" slot="end" size="large" color="success" > 
              Finish 
          </ion-button>
      </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Option } from "../../../../components/Forms/FieldInterface";
import { QWERTY } from "../../../../components/Keyboard/HisKbConfigurations";
import ViewPort from "../../../../components/DataViews/ViewPort.vue";
import handleVirtualInput from "@/components/Keyboard/KbHandler"
import HisTextInput from "@/components/FormElements/BaseTextInput.vue";
import PredefinedMalariaDrugModal from "@/apps/OPD/components/PredefinedMalariaDrug.vue";
import FieldMixinVue from '../../../../components/FormElements/FieldMixin.vue';
import HisKeyboard from "@/components/Keyboard/HisKeyboard.vue"
import { trash } from "ionicons/icons";
import PrescriptionFrequency from "@/apps/OPD/components/PrescriptionFrequency.vue"
import PrescriptionKeypad from "@/apps/OPD/components/PrescriptionKeypad.vue";
import { DRUG_FREQUENCIES ,ANTI_MALARIA_DRUGS} from "@/apps/OPD/services/drug_prescription_service";
import EncounterMixinVue from '@/views/EncounterMixin.vue'
import { nextTask } from "@/utils/WorkflowTaskHelper"
import { modalController } from "@ionic/vue";
import { 
  IonCheckbox, 
  IonText, 
  IonButton,
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonInfiniteScroll, 
  IonFooter,
  IonToolbar,
  IonInfiniteScrollContent 
} from "@ionic/vue";
import { alertConfirmation, toastSuccess, toastWarning } from '@/utils/Alerts';

import { DrugPrescriptionService } from '../../services/drug_prescription_service';
import HisDate from "@/utils/Date"
import { PatientPrintoutService } from "@/services/patient_printout_service"

export default defineComponent({
  name: "HisInfiniteScrollMultipleSelect",
  mixins: [FieldMixinVue,EncounterMixinVue],
  components: { 
    PrescriptionKeypad,
    IonCheckbox, 
    IonText, 
    IonButton,
    ViewPort,
    HisTextInput,
    IonContent, 
    IonList, 
    IonItem, 
    IonLabel, 
    HisKeyboard,
    IonInfiniteScroll, 
    IonInfiniteScrollContent,
    IonFooter,
    IonToolbar,
    PrescriptionFrequency
  },
  data: () => ({
    switchKeyboard: true,
    keyboard: QWERTY,
    listData: [] as Array<Option>,
    checkedItems: [] as Array<Option>,
    disableScroll: false,
    filter2: '',
    selected: '',
    selectedItems: [] as any,
    malariaDrug: [],
    prescriptionService: {} as any,
   
    page: 1,
    limit: 10,
    trash,
    
    list: DRUG_FREQUENCIES.map(f => f.label),
    showMalariaDrugs: false,
    hasMalaria: false,
    disableNextBtn:true
  
  }),
  watch: {
    checkedItems: {
      handler(newValue: Array<Option>) {
        this.listData.forEach(entry => {
          if (newValue.find(item => item.value === entry.value)) {
            entry.isChecked = true;
          } else {
            entry.isChecked = false;
          }
        });
        this.$emit("onValue", newValue);
      },
      deep: true,
      immediate: true
    },
    filter2: {
      async handler() {
        this.page = 1;
        this.disableScroll = false;
        const data = await this.getListData();
        [...this.checkedItems].forEach(item => {
          const index = data.findIndex(entry => entry.value === item.value);
          if(index === -1) {
            data.push(item);
          } else {
            data[index].isChecked = true;
          }
        })
        this.listData = data;
      },
    },
  },
  mounted() {
    this.init()
  },
  activated() {
    this.init()
  },
  methods: {
    async init() {
      this.listData = await this.getListData();
    },
    async getListData(): Promise<Array<Option>> {
      this.prescriptionService = new DrugPrescriptionService(this.patientID, this.providerID) 
      return await this.prescriptionService.loadDrugs(this.filter2, this.page, this.limit)
    },

    async dosageKeypress(value: string) { this.checkedItems[0].other["dosage"] = value },
    
    async frequencyKeypress(value: any){ this.checkedItems[0].other["frequency"] = value.target._value },

    async durationKeypress(value: string) {
      if (value.match(/Confirm/i)){
        this.inputFieldType()
      }else
      this.checkedItems[0].other["duration"] = value
    },
    
    async keypress(value: string) {
      if (!this.filter2) this.selected = ''
      this.filter2 = handleVirtualInput(value, this.selected)
      this.selected = this.filter2
    },
    async onKBValue(value: string) {
      if (!this.listData || this.selected === value) return
      this.filter2 = value
      this.selected = this.filter2
    },
    async pushData(event: any) {
      this.page++;
      const data = await this.getListData();
      if (data.length > 0) {
        this.listData = [
          ...this.listData, 
          ...data.filter(entry => !this.listData.find(item => item.value === entry.value))
        ];
      } else {
        this.disableScroll = true;
      }
      event.target.complete();
    },
    isComplete(){
      const value = this.checkedItems[0]
      if(!value.other["frequency"]  || !value.other["duration"] || !value.other["dosage"]){
        this.disableNextBtn = true
            // toastWarning(`complete prescription details for ${value.label}`)
        return false
      }
      this.disableNextBtn = false
      return true
    },
    inputFieldType(){
      if(!this.switchKeyboard  && this.isComplete()){
        this.switchKeyboard = true
        return true
      }
      else{
        this.switchKeyboard = false
        return false
      }
    },
    async predefinedMalariaDrug(){
      this.hasMalaria = await this.prescriptionService.hasMalaria()
      if(!this.hasMalaria && !(await alertConfirmation('Patient has no malaria. Do you still want to prescribe anti malaria drugs?'))) {
        return;
      }
      const modal = await modalController.create({
        component: PredefinedMalariaDrugModal,
        backdropDismiss: false,
        cssClass: "lager-modal",
        componentProps: { items: ANTI_MALARIA_DRUGS.map(drug => ({
          label: `${drug.name}, ${drug.frequency} time(s) a day, for ${drug.duration} days`,
          value: [drug.name,drug.frequency,drug.duration,drug.dose_strength,drug.units,drug.drug_id],
          other: drug
        })),
        submitData: async(data: any) => {
          const value = data.target.attributes.value.nodeValue.split(',')
          const malariaDrug = {
            "isChecked": true,
            "label":value[0],
            "other":{
              'frequency':"TWICE A DAY (BD)",
              'units':value[4],
              'drug_id':value[5],
              'duration':value[2],
              'dosage':value[3],
            },
            "value":value[0],
          }
          this.checkedItems = this.checkedItems.filter(x  => 
            x.value != 'Lumefantrine + Arthemether 1 x 6' &&
            x.value != 'Lumefantrine + Arthemether 2 x 6' &&
            x.value != 'Lumefantrine + Arthemether 3 x 6' &&
            x.value != 'Lumefantrine + Arthemether 4 x 6'
          )
          this.checkedItems.unshift(malariaDrug)
        }},
      });
      modal.present();
    },
    onSelect(entry: Option, event: Event) {
      this.$nextTick(async () => {
        if (entry.isChecked) {
          if((this.checkedItems.findIndex(item => item.value === entry.value)) === -1) {
            this.checkedItems.unshift(entry);
            this.inputFieldType()
            this.isComplete()
          }
        } else {
          this.unCheck(entry);
        }
      });
    },
    unCheck(entry: Option) {
      if(this.checkedItems.length == 1){
        this.disableNextBtn = true
        this.switchKeyboard = true
      }
      this.checkedItems = this.checkedItems.filter(item => item.value !== entry.value);
    },
    clearPrescription(){
      this.checkedItems = [],
      this.filter2 = ''
      this.selected = ''
    },
    async savePrescription() {
      const drugOrders = this.mapToOrders()
      const encounter = await this.prescriptionService.createEncounter()
      if (!encounter) return toastWarning('Unable to create treatment encounter')   
      const drugOrder = await this.prescriptionService.createDrugOrder(drugOrders);
      if(!drugOrder) return toastWarning('Unable to create drug orders!')
      toastSuccess('Drug order has been created')
      this.printVisitSummary()
      nextTask(this.patientID, this.$router)
    },
     mapToOrders(): any[] {
      return this.checkedItems.map(drug => {
        const startDate = DrugPrescriptionService.getSessionDate()
        const frequency = DRUG_FREQUENCIES.find(f => f.label === drug.other.frequency)
        return {
          'drug_inventory_id': drug.other.drug_id,
          'equivalent_daily_dose': drug.other.dosage=='Unknown'?0 : drug.other.dosage * frequency!.value,
          'start_date': startDate,
          'auto_expire_date': this.calculateExpireDate(startDate, drug.other.duration), 
          'units': drug.other.units,
          'instructions': `${drug.label}: ${drug.other.dosage} ${drug.other.units} ${frequency!.code} for ${drug.other.duration} days`,
          'dose': drug.other.dosage,
          'frequency': frequency!.code,
        }
      })
    },
    calculateExpireDate(startDate: string | Date, duration: any ) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + parseInt(duration))
      return HisDate.toStandardHisFormat(date)
    },
    printVisitSummary(){
      const lbl = new PatientPrintoutService(this.patientID)
      return lbl.printVisitSummaryLbl(DrugPrescriptionService.getSessionDate())
    }
  },
  created() {
    this.keyboard = QWERTY;
    this.page =  1;
    this.limit =  10;
  },
  
});
</script>
<style scoped> 

  .table {
    display: table;
    border-spacing: 1px;
    width: 100%;
  }


  .dosage-input{
    background: #fff;
    border: solid 1px #3333;
    padding-left: 10px;
    padding-right: 10px;

  }
  input{
    padding: 0;
  }
  .sc-ion-input-md-h {
  --padding-top: 0px;
  --padding-bottom: 0px;
}
.content{
  width: 97.8%;
  margin: auto;
}
#view-port{
  height: 60vh;
}
.his-floating-keyboard{
  bottom:70px;
}

</style>