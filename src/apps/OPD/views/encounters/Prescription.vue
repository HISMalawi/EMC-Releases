<template>
  <his-standard-form 
    :cancelDestinationPath="cancelDestination" 
    :fields="fields" 
    :activeField="activeField" 
    :onFinishAction="onSubmit"
    :skipSummary="true"
  />
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import HisStandardForm from "@/components/Forms/TouchScreenForm.vue";
import EncounterMixinVue from '@/views/EncounterMixin.vue';
import Validation from '@/components/Forms/validations/StandardValidations';
import { Field, Option } from '@/components/Forms/FieldInterface';
import { FieldType } from '@/components/Forms/BaseFormElements';
import { isEmpty } from 'lodash';
import { ANTI_MALARIA_DRUGS, DrugPrescriptionService, DRUG_FREQUENCIES } from '../../services/drug_prescription_service';
import HisDate from "@/utils/Date"
import { alertConfirmation, toastSuccess, toastWarning } from '@/utils/Alerts';
import { loadingController } from '@ionic/core';

export default defineComponent({
  components: { HisStandardForm },
  mixins: [EncounterMixinVue],
  data: () => ({
    activeField: '',
    prescriptionService: {} as any,
    showMalariaDrugs: false,
    hasMalaria: false,
  }),
  watch: {
    ready: {
      async handler(isReady: boolean) {
        if(isReady){
          this.prescriptionService = new DrugPrescriptionService(this.patientID, this.providerID)  
          this.hasMalaria = await this.prescriptionService.hasMalaria()
          this.fields = this.getFields()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async onSubmit(formData: any){   
      const drugOrders = this.mapToOrders(formData['drugs_details'])
      const encounter = await this.prescriptionService.createEncounter()
      if (!encounter) return toastWarning('Unable to create treatment encounter')   
      const drugOrder = await this.prescriptionService.createDrugOrder(drugOrders);
      if(!drugOrder) return toastWarning('Unable to create drug orders!')
      toastSuccess('Drug order has been created')
      this.nextTask()       
    },
    calculateExpireDate(startDate: string | Date, duration: number ) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + duration)
      return HisDate.toStandardHisFormat(date)
    },
    mapToOrders(drugs: Option[]): any[] {
      return drugs.map(drug => {
        const startDate = DrugPrescriptionService.getSessionDate()
        const frequency = DRUG_FREQUENCIES.find(f => f.label === drug.other.frequency)
        return {
          'drug_inventory_id': drug.other.drug_id,
          'equivalent_daily_dose': drug.other.dosage * frequency!.value,
          'start_date': startDate,
          'auto_expire_date': this.calculateExpireDate(startDate, drug.other.duration), 
          'units': drug.other.units,
          'instructions': `${drug.label}: ${frequency!.value} ${frequency!.code} for ${drug.other.duration}`,          'dose': drug.other.dosage,
          'frequency': frequency!.code,
        }
      })
    },
    isOrderComplete(drugs: Option[]): boolean {
      return drugs.every(drug => drug.other.frequency && drug.other.duration && drug.other.dosage)
    },
    getFields(): Array<Field>{
      return [
        {
          id: 'malaria_drugs',
          helpText: "select Malaria Drugs",
          validation: (data: any) => Validation.required(data),
          type: FieldType.TT_SELECT,
          condition: () => this.activeField === 'malaria_drugs' && this.showMalariaDrugs,
          unload: () => {
            this.showMalariaDrugs = false
            this.activeField = 'drugs_details'
          },
          options: () => ANTI_MALARIA_DRUGS.map(drug => ({
            label: `${drug.name}, ${drug.frequency} time(s) a day, for ${drug.duration} days`,
            value: drug.name,
            other: drug
          }))
        },
        {
          id: 'drugs',
          helpText: 'Select drugs',
          type: FieldType.TT_INFINITE_SCROLL_MULTIPLE_SELECT,
          validation: (data: any) => Validation.required(data),
          options: async (_: any, filter = '', page=1, limit=10) => 
            await this.prescriptionService.loadDrugs(filter, page, limit),
          onload: () => this.activeField = '',
          config: {
            showKeyboard: true,
            hiddenFooterBtns: ["Back"],
            footerBtns: [
              {
                name: 'Predefined Malaria Drugs',
                color: 'primary',
                size: 'large',
                visible: false,
                slot: 'end',
                onClick: async () => {
                  if(!this.hasMalaria && !(await alertConfirmation('Patient has no malaria. Do you still want to prescribe anti malaria drugs?'))) {
                    return;
                  }
                  this.activeField = 'malaria_drugs'
                  this.showMalariaDrugs = true
                }
              },
            ]
          }
        },
        {
          id: 'drugs_details',
          helpText: 'Complete prescribed drug details',
          type: FieldType.TT_PRESCRIPTION_INPUT,
          validation: (data: any) => Validation.required(data),
          options: (f: any) => [...f.drugs, ...(f.malaria_drugs ? [f.malaria_drugs] : [])],
          beforeNext: (data: Option[]) => {
            if(isEmpty(data)) return false
            if(this.isOrderComplete(data)) return true
            toastWarning('Please complete all fields')
            return false
          }
        },
        {
          id: 'summary',
          helpText: 'Summary',
          type: FieldType.TT_TABLE_VIEWER,
          options: (f: any) => {
            const drugs: Option[] = f['drugs_details']
            const columns = [ 'Drug Name','Frequency','Dosage','Duration'];
            const rows: any[] = drugs.map(drug => [
              drug.other.name,
              drug.other.frequency,
              `${drug.other.dosage} ${drug.other.units}`,
              `${drug.other.duration} days`
            ])
            return [
              {
                label: '',
                value: '',
                other: { columns, rows},
              },
            ];
          },

        }
      ]
    }
  }
})
</script>

