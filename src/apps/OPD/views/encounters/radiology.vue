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
import { ConceptService } from "@/services/concept_service";
import ApiClient from "@/services/api_client";
import moment from "dayjs";

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
      await this.radiologyService.createEncounter()    
      await this.radiologyService.saveObservationList(data)
     //console.log( await this.radiologyService.saveObservationList(data))
      await this.printOrders(data)
      await this.submitToPacs(data)      
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
      const callPrint = async (order: any) => {
        count++
        await delay(2000 * count)
        this.print(order)
      }
      const miliSec = 2200 * orders.length 
      const callNextTask = async () => {
        await delay(miliSec);
        this.nextTask()
      };
      let ordersCount = 0
      await orders.forEach(async (order: any) => {
        if (ordersCount == 0) {
          this.print(order)
        } else {
          callPrint(order)
        }
        ordersCount++
      })
      callNextTask()
    },
    async print(order: any) {
      const p = new PrintoutService()
      //const xRayName = await ConceptService.getConceptNameFromApi(order.child.value_coded)

      let url = `/radiology/barcode`
          url += `?accession_number=${await this.getAccesionNumber()}`
          url += `?patient_national_id=${this.patient.getNationalID()}`
          url += `?patient_name=${this.patient.getFullName()}`
          url += `?radio_order=${await this.getConceptName(order.child.value_coded)}`
          url += `?date_created=${moment(order.obs_datetime)}`
      await p.printLbl(url)
    },
    async getConceptName(conceptId: any) {
      const name = await ConceptService.getConceptNameFromApi(conceptId)
      return name
    },
    async submitToPacs(orders: any) {
       //if(sessionStorage.radiology_status == 'true'){
      orders.forEach(async (order: any) => {
        const arryObj = [
          {
            "main_value_text": await this.getConceptName(order.value_coded),
            "obs_id": '',
            "sub_value_text": await this.getConceptName(order.child.value_coded), 
          }
        ]
        const patientData = {
          'patient_details': {
            "patient_name": this.patient.getFullName(),
            "patientAge": this.patient.getAge(),
            "patientDOB": this.patient.getBirthdate(),
            "patientGender": this.patient.getGender(),
            "national_id": this.patient.getNationalID(),
            "person_id": this.patient.getID(),
            "encounter_id": this.radiologyService.getEncounterID(),
            "date_created": this.radiologyService.getDate(),
            "accession_number": this.getAccesionNumber(),
          },
          'physician_details': {
            "username": sessionStorage.getItem("username"),
            "userID": sessionStorage.getItem("userID"),
            "userRoles": sessionStorage.getItem("userRoles"),
          },
          'radiology_orders': arryObj 
        }

        console.log({patientData})
      })
    },
    async getAccesionNumber() {
      let newAccessionNumber = null
      const response = await ApiClient.get(`sequences/next_accession_number`)
      if (response && response.status == 200) {
        const data = await response.json()
        newAccessionNumber = data['accession_number']
      }
      return newAccessionNumber
    },
  }
})
</script>

