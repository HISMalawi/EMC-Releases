<template>
    <his-standard-form 
        :key="hisFormKey"
        :fields="fields"
        :activeField="fieldComponent"
        :skipSummary="true"
        @onIndex="fieldComponent=''" 
        @onFinish="onFinish"
    />
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import { FieldType } from "@/components/Forms/BaseFormElements"
import { generateDateFields } from "@/utils/HisFormHelpers/MultiFieldDateHelper"
import { Field, Option } from '@/components/Forms/FieldInterface'
import { PatientLabResultService } from "@/services/patient_lab_result_service"
import Validation from "@/components/Forms/validations/StandardValidations"
import { toastWarning, toastDanger, toastSuccess, alertConfirmation } from "@/utils/Alerts"
import { find, isEmpty } from 'lodash';
import HisDate from "@/utils/Date"
import { Service } from "@/services/service"
import { OrderService } from '@/services/order_service';
import Store from "@/composables/ApiStore"

export default defineComponent({
    components: { HisStandardForm },
    data: () => ({
        fieldComponent: '' as string,
        labResult: {} as any,
        hisFormKey: 0 as number,
        patient: {} as any,
        fields: [] as Array<Field>,
        selectedTest: {} as any,
        testOptions: [] as Array<any>,
        testIndicators: [] as Array<any>
    }),
    watch: {
        '$route': {
            async handler({params}: any) {
                if (params && params.patient_id) {
                    this.patient = params.patient_id
                    this.labResult = new PatientLabResultService(this.patient)
                    await this.initData()
                    this.fields = this.getFields()
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        async onFinish(_: any, c: any) {
            try {
                const measures = Object.values(c)
                                    .filter((d: any) => d.tag === 'result_indicator' && d.measures)
                                    .map((d: any) => d.measures)
                this.labResult.setTestID(this.selectedTest.value)
                this.labResult.setResultDate(c.result_date)
                await this.labResult.createEncounter()
                await this.labResult.createLabResult(measures)
                Store.invalidate('PATIENT_LAB_ORDERS')
                this.testOptions = []
                this.selectedTest = {}
                this.testIndicators = []
                await this.initData()
                this.hisFormKey = Math.floor(Math.random() * 5000)
                toastSuccess('Lab result saved!')
            }catch(e) {
                toastDanger(`${e}`)
                console.error(e)
            }
        },
        generateTestIndicatorsFields() {
          return this.testIndicators.reduce((acc: Field[], data: any) => {
            return acc.concat(this.buildTestIndicatorFields(
              data.indicatorId,
              data.indicatorName,
              data.specimen,
              data.testId
            ))
          }, [] as Field[])
        },
        async validateVLresults(name: string, specimen: string, result: string){
            if (name !== 'HIV viral load') return true
            const modifier = result.substring(0, 1)
            const value = result.substring(1, result.length)
            if(OrderService.isValidVLResult(specimen, modifier, value)) return true
            const isOk = await alertConfirmation(`Invalid results for ${specimen} HIV viral load`, {
                cancelBtnLabel: "Process result",
                confirmBtnLabel: "Re-enter result"
            })
            return !isOk
        },
        alphaValueIsValid(value: string) {
            try {
                return value.match(/^(>|<|=)(.*)/) ? true : false
            }catch (e) {
                return false
            }
        },
        numericValueIsValid(value: string){
            try {
                return value.match(/^(=|<|>)([0-9]*)$/m) ? true : false
            }catch(e) {
                return false
            }
        },
        isMalariaResult(name: string) {
            return name.match(/mrdt|malaria/i) ? true : false
        },
        isUrineLamResult(name: string) {
            return name.match(/Lam/i) ? true : false
        },
        buildTestIndicatorFields(id: number, name: string, specimen: string, test: number): Array<Field> {
          const fieldIndex = id * test
            const condition = (f: any) => [
                this.selectedTest.value === test, 
                find(f.result_indicators, { label: name}) ? true : false
            ].every(Boolean)
            const beforeNext = (v: Option) => this.validateVLresults(name, specimen, v.value.toString())

            const computedValue = (v: any, f: any) => {
                if(v.value === 'Other' && name.match(/HIV viral load/i)) return {}
                const type = this.isMalariaResult(name) || this.isUrineLamResult(name) ? 'text' : f[`type_${fieldIndex}`].value
                const value = this.isMalariaResult(name) || this.isUrineLamResult(name) ? "=" + v.value : v.value.toString()
                const modifier = value.charAt(0)
                const result = type === 'numeric' ? parseInt(value.substring(1)) : value.substring(1)
                const test = f[`result_indicators`].filter((t: any) => t.value === id)[0]
                return {
                    tag: 'result_indicator',
                    measures: {
                        indicator: {
                            'concept_id': test.value
                        },
                        'value': result,
                        'value_modifier': modifier,
                        'value_type': type
                    },
                    result,
                    modifier,
                    test: test.label
                }
            }
            return [
                {
                    id: `type_${fieldIndex}`,
                    helpText: `Result type (${name})`,
                    type: FieldType.TT_SELECT,
                    group: 'test_indicator',
                    condition: (f: any) => condition(f) && !this.isMalariaResult(name) && !this.isUrineLamResult(name),
                    appearInSummary: () => false,
                    validation: (v: Option) => Validation.required(v),
                    options: () => [
                        {
                            label: 'Numeric (numbers only)',
                            value: 'numeric'
                        },
                        {
                            label: 'Alphanumeric(text and numbers)',
                            value: 'text'
                        }
                    ]
                },
                {
                    id: `urine_result_${fieldIndex}`,
                    helpText: `Select Test Result (${name})`,
                    type: FieldType.TT_SELECT,
                    group: 'test_indicator',
                    computedValue,
                    validation: (v: Option) => Validation.required(v),
                    condition: (f: any) => condition(f) && this.isUrineLamResult(name),
                    options: () => 
                        [
                            {   
                                label: 'Positive',
                                value: 'positive'
                            },
                            {
                                label: 'Negative',
                                value: 'negative'
                            }
                        ]
                },
                {
                    id: `num_${fieldIndex}`,
                    helpText: `Test Result (${name})`,
                    type: FieldType.TT_TEXT,
                    group: 'test_indicator',
                    computedValue,
                    beforeNext,
                    onValue: (v: Option) => {
                        if (v && v.value && !this.numericValueIsValid(v.value.toString())) {
                            toastWarning('You must enter a modifer and numbers only. i.e =90 / >19 / < 750')
                            return false
                        }
                        return true
                    },
                    validation: (v: Option) => Validation.required(v),
                    condition: (f: any) => condition(f) && f[`type_${fieldIndex}`].value === 'numeric',
                    config: {
                        customKeyboard: [
                            [
                                ['1', '2', '3'],
                                ['4', '5', '6', '=', '<', '>'],
                                ['7', '8', '9', '.'],
                                ['',  '0', '']
                            ],
                            [
                                [ 'Delete']
                            ]
                        ]
                    }
                },
                {
                    id: `alpha_${fieldIndex}`,
                    helpText: `Test Result (${name})`,
                    type: FieldType.TT_TEXT,
                    group: 'test_indicator',
                    onValue: (v: Option) => {
                        if (v && v.value && !this.alphaValueIsValid(v.value.toString())) {
                            toastWarning('You must enter a modifier plus result (for example =LDL)')
                            return false
                        }
                        return true
                    },
                    computedValue,
                    validation: (v: Option) => Validation.required(v),
                    condition: (f: any) => condition(f) && f[`type_${fieldIndex}`].value === 'text' && !name.match(/HIV viral load/i)
                },
                {
                    id: `VL_alpha_${fieldIndex}`,
                    helpText: `Select Test Result (${name})`,
                    type: FieldType.TT_SELECT,
                    group: 'test_indicator',
                    computedValue,
                    validation: (v: Option) => Validation.required(v),
                    condition: (f: any) => condition(f) && f[`type_${fieldIndex}`].value === 'text' && name.match(/HIV viral load/i),
                    options: () => [
                      {
                        label: 'Collect Another Sample',
                        value: '=Collect Another Sample'
                      },
                      {
                        label: '<LDL',
                        value: '<LDL'
                      },
                      {
                        label: '=LDL',
                        value: '=LDL'
                      },
                      {
                        value: 'Other',
                        label: 'Other'
                      }
                    ]
                },
                {
                    id: `other_VL_alpha_${fieldIndex}`,
                    helpText: `Test Result (${name})`,
                    type: FieldType.TT_TEXT,
                    group: 'test_indicator',
                    onValue: (v: Option) => {
                        if (v && v.value && !this.alphaValueIsValid(v.value.toString())) {
                            toastWarning('You must enter a modifier plus result (for example =LDL)')
                            return false
                        }
                        return true
                    },
                    computedValue,
                    validation: (v: Option) => Validation.required(v),
                    condition: (f: any) => {
                      return condition(f) && 
                        f[`type_${fieldIndex}`].value === 'text' && 
                        name.match(/HIV viral load/i)
                        && f[`VL_alpha_${fieldIndex}`].value === 'Other'
                    }
                },
                {
                    id: `malaria_result_${fieldIndex}`,
                    helpText: `Select Test Result (${name})`,
                    type: FieldType.TT_SELECT,
                    group: 'test_indicator',
                    computedValue,
                    validation: (v: Option) => Validation.required(v),
                    condition: (f: any) => condition(f) && this.isMalariaResult(name),
                    options: () => {
                        if(name.match(/mrdt/i)) {
                            return [
                                {
                                    label: 'Positive',
                                    value: 'positive'
                                },
                                {
                                    label: 'Negative',
                                    value: 'negative'
                                }
                            ]
                        }
                        return [
                            {
                                label: 'Parasites seen',
                                value: 'parasites seen'
                            },
                            {
                                label: 'No parasites seen',
                                value: 'no parasites seen'
                            }
                        ]
                    }
                },
            ]
        },
        async initData() {
            const orders = await this.labResult.getTestsWithoutResults()
            for(const i in orders) {
                const orderData = orders[i]
                for(const testIndex in orderData.tests) {
                    const test = orderData.tests[testIndex]
                    if (!isEmpty(test.result)) {
                        continue
                    }
                    this.labResult.setTestTypeID(test.concept_id)
                    const indicators = await this.labResult.getTestIndicators()
                    const testIndicators = indicators.map((i: any) =>({
                        testId: test.id,
                        indicatorName: i.name,
                        indicatorId: i.concept_id,
                        specimen: orderData.specimen.name,
                    }))
                    this.testIndicators = [...this.testIndicators, ...testIndicators]
                    this.testOptions.push({
                        label: test.name,
                        value: test.id,
                        other: {
                            accession: orderData.accession_number,
                            specimen: orderData.specimen.name,
                            test: test.name,
                            orderDate: orderData.order_date,
                            testIndicators
                        }
                    })
                }
            }
        },
        getFields(): Array<Field> {
            return [
                {
                  id: 'test_type',
                  helpText: 'Tests without results',
                  type: FieldType.TT_TABLE_VIEWER,
                  options: () => {
                    const rows = this.testOptions.map((t: Option) => ([
                        t.other.accession,
                        t.other.specimen,
                        t.other.test,
                        HisDate.toStandardHisDisplayFormat(t.other.orderDate),
                        {
                            type: 'button',
                            name: 'Select',
                            action: () => {
                                this.selectedTest = t
                                this.$nextTick(() => this.fieldComponent = 'year_result_date')
                            }
                        }
                    ]))
                    return [{
                        label: '',
                        value: '',
                        other: {
                            rows,
                            columns:[ 'Acession#', 'Specimen', 'Test', 'Order date']
                        }
                    }]
                  },
                  validation: (val: Option) => Validation.required(val),
                  config: {
                    overrideDefaultFooterBtns: {
                        nextBtn: {
                            name: 'Finish',
                            onClick: () => this.$router.back()
                        }
                    },
                    hiddenFooterBtns: [
                        'Clear',
                        'Cancel'
                    ]
                  }
                },
                ...generateDateFields({
                    id: 'result_date',
                    helpText: 'Result',
                    required: true,
                    estimation: {
                        allowUnknown: false
                    },
                    minDate: () => HisDate.toStandardHisFormat(this.selectedTest.other.orderDate),
                    maxDate: () => Service.getSessionDate(),
                    computeValue: (date: string) => date
                }),
                {
                    id: `result_indicators`,
                    helpText: `Select test result indicators`,
                    type: FieldType.TT_MULTIPLE_SELECT,
                    validation: (v: Option) => Validation.required(v),
                    options: () => {                       
                        return this.selectedTest
                                .other
                                .testIndicators
                                .map((i: any) => ({
                                    label: i.indicatorName,
                                    value: i.indicatorId
                                }))
                    },
                },
                ...this.generateTestIndicatorsFields(),
                {
                    id: 'entry_confirmation',
                    helpText: 'Confirm entry',
                    type: FieldType.TT_TABLE_VIEWER,
                    options: (_: any, c: any) => {
                        const rows = Object.values(c)
                                           .filter((d: any) => 
                                                typeof d === 'object'
                                                && d != null
                                                && d.tag === 'result_indicator'
                                            )
                                           .map((d: any) => ([d.test, d.modifier, d.result ]))
                        return [{
                            label: '',
                            value: '',
                            other: {
                                rows,
                                columns:[ 'Test', 'Modifier', 'Result']
                            }
                        }]
                    }
                }
            ]
        }
    }
})
</script>
