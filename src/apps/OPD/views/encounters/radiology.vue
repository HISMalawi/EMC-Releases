<template>
  <ion-page>
    <his-standard-form :cancelDestinationPath="cancelDestination" :fields="fields" :onFinishAction="onSubmit"/>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HisStandardForm from "@/components/Forms/TouchScreenForm.vue";
import EncounterMixinVue from '@/views/EncounterMixin.vue';
import { PatientRadiologyService } from "@/apps/OPD/services/patient_radiology_service";
import Validation from '@/components/Forms/validations/StandardValidations';
import { Field, Option } from '@/components/Forms/FieldInterface';
import { FieldType } from '@/components/Forms/BaseFormElements';
import { PrintoutService } from "@/services/printout_service";

export default defineComponent({
  components: { HisStandardForm },
  mixins: [EncounterMixinVue],
  data: () => ({
    radiologyService: {} as any
  }),
  watch: {
    ready: {
      async handler(isReady: boolean) {
        if(isReady){
          this.radiologyService = new PatientRadiologyService(this.patientID, this.providerID)
          this.fields = this.getFields()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async onSubmit(_: any, computedData: any){     
      const data = await Promise.all(computedData.radiology)
      console.log({data})   
      await this.radiologyService.createEncounter()    
      await this.radiologyService.saveObservationList(data)
      await this.printOrders(data)
      //this.nextTask()      
    },
    getFields(): Array<Field>{
      return [
        {
          id: 'radiology',
          helpText: 'Radiology Examination',
          type: FieldType.TT_RADIOLOGY_PICKER,
          validation: (data: any) => Validation.required(data),
          computedValue: (options: Option[]) => {
            return options.map(async (option)=> ({
              ...(await this.radiologyService.buildValueCoded('Radiology Orders', option.other.parent)),
              child: (await this.radiologyService.buildValueCodedFromConceptId(option.other.parent, option.other.concept_id))
            }))
          },
        },
      ]
    },
    async printOrders(orders: any) {
      let count = 0
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
      const callPrint = async (element: any) => {
        count++
        await delay(2000 * count)
        this.print(element)
      }
      const miliSec = 2200 * orders.length 
      const callNextTask = async () => {
        await delay(miliSec);
        this.nextTask()
      };
      let ordersCount = 0
      await orders.forEach(async (element: any) => {
        if (ordersCount == 0) {
          this.print(element)
        } else {
          callPrint(element)
        }
        ordersCount++
      })
      callNextTask()
    },
    
    async print(element: any) {
      const p = new PrintoutService();
      console.log({element})
      let url = `/radiology/barcode`
          url += `?accession_number=${null}`
          url += `?patient_national_id=${null}`
          url += `?patient_name=${'Dominic Kasanga'}`
          url += `?radio_order=${'Left ankle AP+Lat'}`
          url += `?date_created=${'Wed Mar 16 2022'}`
      await p.printLbl(url)
    },
  }
})
</script>

