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
import GLOBAL_PROP from "@/apps/GLOBAL_APP/global_prop";

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
      const savedObsData = await this.radiologyService.saveObservationList(data)
      await this.printOrders(data)
      await this.submitToPacs(savedObsData)
      this.nextTask()     
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
      let showLbl = true
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
      const callPrint = async (order: any) => {
        count++
        await delay(2000 * count)
        this.print(order,showLbl)
      }
      let ordersCount = 0
      await orders.forEach(async (order: any) => {
        if (ordersCount == 0) {
          this.print(order,showLbl)
        } else {
          callPrint(order)
          showLbl = false
        }
        ordersCount++
      })
    },
    async print(order: any, showLbl: boolean) {
      const p = new PrintoutService()
      let url = `/radiology/barcode`
          url += `?accession_number=${await this.getAccesionNumber()}`
          url += `&patient_national_id=${this.patient.getNationalID()}`
          url += `&patient_name=${this.patient.getFullName()}`
          url += `&radio_order=${await this.getConceptName(order.child.value_coded)}`
          url += `&date_created=${moment(order.obs_datetime)}`
      await p.printLbls(url,showLbl)
    },
    async getConceptName(conceptId: any) {
      const name = await ConceptService.getConceptNameFromApi(conceptId)
      return name
    },
    async getOrdersObj(savedObsData: any){
      const arryObj: any = []
        savedObsData.forEach(async (order: any) => {
          arryObj.push(
            {
              "main_value_text": await this.getConceptName(order.value_coded),
              "obs_id": order.obs_id,
              "sub_value_text": await this.getConceptName(order.children[0].value_coded)
            }
          )
        })
      return arryObj
    },
    async submitToPacs(savedObsData: any) {
      const isPACsEnabled = await GLOBAL_PROP.isPACsEnabled()
      if (isPACsEnabled) {
        await this.getOrdersObj(savedObsData).then(
          async (data: any)=> {
            await this.getPatientDataObj(data).then(
              async(dat: any) => {
                const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
                await delay(20000)          
                await ApiClient.post(`radiology/radiology_orders`,dat)
              }
            )
          }
        )
      }
    },
    async  getPatientDataObj(arryObj: any) {
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
        "accession_number": await this.getAccesionNumber(),
        },
        'physician_details': {
          "username": sessionStorage.getItem("username"),
          "userID": sessionStorage.getItem("userID"),
          "userRoles": sessionStorage.getItem("userRoles"),
        },
        'radiology_orders': arryObj,
      }
      return patientData
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

