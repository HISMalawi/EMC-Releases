<template>
    <his-standard-form :cancelDestinationPath="cancelDestination" :fields="fields" :onFinishAction="onSubmit"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FieldType } from "@/components/Forms/BaseFormElements"
import { Field, Option } from "@/components/Forms/FieldInterface"
import Validation from "@/components/Forms/validations/StandardValidations"
import StagingMixin from "@/apps/ART/views/encounters/StagingMixin.vue"
import {ClinicRegistrationService} from "@/apps/ART/services/registration_service"
import { CD4_COUNT_PAD_LO } from "@/components/Keyboard/KbLayouts"
import { toastWarning, toastSuccess} from "@/utils/Alerts"
import { VitalsService } from "@/apps/ART/services/vitals_service";
import { BMIService } from "@/services/bmi_service"
import { generateDateFields, EstimationFieldType } from "@/utils/HisFormHelpers/MultiFieldDateHelper"
import { infoActionSheet } from "@/utils/ActionSheets"
import HisDate from "@/utils/Date"
import dayjs from "dayjs";
import { PrescriptionService } from '../../services/prescription_service'
import { find, isEmpty } from 'lodash'
import { RegimenService } from '@/services/regimen_service'
import { DispensationService } from "@/apps/ART/services/dispensation_service"

export default defineComponent({
    mixins: [StagingMixin],
    data: () => ({
        registration: {} as any,
        prescription: {} as any,
        dispensation: {} as any,
        regimens: [] as Option[],
        customRegimens: [] as Option[],
        vitals: {} as any,
    }),
    watch: {
        patient: {
            async handler(patient: any){
                // Hide staging fields defined in StagingMixin by Default
                this.canShowStagingFields = false
                this.registration = new ClinicRegistrationService(patient.getID(), this.providerID)
                this.prescription = new PrescriptionService(patient.getID(), this.providerID)
                this.dispensation = new DispensationService(patient.getID(), this.providerID)
                this.vitals = new VitalsService(patient.getID(), this.providerID)
                await this.initStaging(this.patient)

                this.showStagingWeightChart = false
                this.fields = this.getRegistrationFields()
            },
            deep: true
        }
    },
    methods: {
        async onSubmit(formData: any, computedData: any) {
            const fObs = {...computedData}

            await this.registration.createEncounter()

            if (this.hasStaging(formData)) {
                await this.submitStaging(computedData)
                await this.vitals.createEncounter()
                await this.vitals.saveObservationList(
                    (await this.resolveObs(fObs, 'vitals'))
                )
            }

            await this.registration.saveObservationList(
                (await this.resolveObs(fObs, 'reg'))
            )

            if (formData['received_arvs'].value.match(/yes/i)) {
                await this.createArvDispensationAndTreatment(computedData)
            }

            toastSuccess('Clinic registration complete!')

            this.nextTask()
        },
        /**
         * For tranfer in patients, this method creates both treatment and dispensation
         * Encounters and drug orders. This will ensure continuation of treatment
         */
        async createArvDispensationAndTreatment(computedData: any) {
            const { arvDrugOrders, buildDispensationOrders } = computedData.arv_quantities

            await this.prescription.createEncounter()

            const orders = await this.prescription.createDrugOrder(arvDrugOrders)

            await this.dispensation.saveDispensations(
                buildDispensationOrders(orders)
            )
        },
        buildDateObs(conceptName: string, date: string, isEstimate: boolean) {
            let obs = {}
            if (date.match(/unknown/i)) {
                obs = this.registration.buildValueText(conceptName, 'Unknown')
            } else if (isEstimate) {
                obs = this.registration.buildValueDateEstimated(conceptName, date)
            } else {
                obs = this.registration.buildValueDate(conceptName, date)
            }
            return obs
        },
        getRegistrationFields() {
            return [
                {
                    id: 'followup_agreement',
                    helpText: 'Agrees to follow-up',
                    type: FieldType.TT_MULTIPLE_YES_NO,
                    summaryMapValue: ({value, label}: Option) => ({
                        value,
                        label: `${label} followup`
                    }),
                    validation: (v: any) => this.validateSeries([
                       () => Validation.required(v), 
                       () => Validation.anyEmpty(v)
                    ]),
                    computedValue: (d: Array<Option>) => {
                        const obs: any = []
                        d.forEach(({ label, value }: Option) => {
                            obs.push(this.registration.buildValueCoded(label, value))
                            obs.push(this.registration.buildValueCoded('Agrees to followup', label))
                        })
                        return { tag:'reg', obs }
                    },
                    options: () => ([
                        {
                            label: 'Phone',
                            value: '',
                            other: {
                                values: this.yesNoOptions(),
                            }
                        },
                        {
                            label: 'Home visit',
                            value: '',
                            other: {
                                values: this.yesNoOptions()
                            }
                        }
                    ])
                },
                {
                    id: 'received_arvs',
                    helpText: 'Ever received ARVs for treatment or prophylaxis?',
                    type: FieldType.TT_SELECT,
                    computedValue: ({value}: Option) => ({
                        tag:'reg',
                        obs: this.registration.buildValueCoded(
                            'Ever received ART', value
                        )
                    }),
                    validation: (v: any) => Validation.required(v),
                    options: () => this.yesNoOptions()
                },
                ...generateDateFields({
                    id: 'date_last_taken_arvs',
                    helpText: 'Last taken ARVS',
                    required: true,
                    minDate: () => this.patient.getBirthdate(),
                    maxDate: () => this.staging.getDate(),
                    condition: (f: any) => f.received_arvs.value === 'Yes',
                    estimation: {
                        allowUnknown: true
                    },
                    computeValue: (date: string, isEstimate: boolean) => {
                        return {
                            date,
                            tag:'reg',
                            isEstimate,
                            obs: this.buildDateObs('Date ART last taken', date, isEstimate) 
                        }
                    }
                }, this.registration.getDate()),
                {
                    id: 'taken_art_in_last_two_months',
                    helpText: 'Taken ARVs in the last two months?',
                    type: FieldType.TT_SELECT,
                    validation: (v: any) => Validation.required(v),
                    computedValue: ({value}: Option) => {
                        return {
                            tag:'reg',
                            obs: [
                                this.registration.buildValueCoded(
                                    'Has the patient taken ART in the last two months', value
                                )
                            ]
                        }
                    },
                    options: () => this.yesNoUnknownOptions(),
                    condition: (f: any) => f.year_date_last_taken_arvs.value === 'Unknown'
                },
                {
                    id: 'taken_art_in_last_two_weeks',
                    helpText: "Taken ARV's in the last two weeks?",
                    type: FieldType.TT_SELECT,
                    computedValue: ({ value }: Option, f: any) => {
                        let date = ''
                        const obs = []
                        let duration = -1

                        if (value === 'Yes') {
                            duration = 14
                        } else if (f.taken_art_in_last_two_months.value === 'Yes') {
                            duration = 60
                        }

                        if (duration > 0) {
                            date = HisDate.getDateBeforeByDays(this.registration.getDate(), duration)
                            obs.push(this.registration.buildValueDateEstimated('Date ART last taken', date))
                        }
                        return {
                            date,
                            tag:'reg',
                            obs: [
                                ...obs,
                                this.registration.buildValueCoded(
                                    'Has the patient taken ART in the last two weeks', value
                                )
                            ]
                        }
                    },
                    validation: (v: any) => Validation.required(v),
                    condition: (f: any) => f.taken_art_in_last_two_months.value === 'Yes',
                    options: () => this.yesNoUnknownOptions()
                },
                {
                    id: 'ever_registered_at_art_clinic',
                    helpText: 'Ever registered at an ART clinic?',
                    type: FieldType.TT_SELECT,
                    computedValue: ({ value }: Option) => ({
                        tag:'reg',
                        obs: this.registration.buildValueCoded(
                            'Ever registered at ART clinic', value
                        )
                    }),
                    validation: (v: any) => Validation.required(v),
                    condition: (f: any) => f.received_arvs.value === 'Yes',
                    options: () => this.yesNoOptions()
                },
                {
                    id: 'location_of_art_initialization',
                    helpText: 'Location of ART initiation',
                    type: FieldType.TT_SELECT,
                    computedValue: ({label}: Option) => ({
                        tag:'reg',
                        obs: this.registration.buildValueText(
                            'Location of ART initiation', label
                        )
                    }),
                    validation: (val: any) => Validation.required(val),
                    condition: (f: any) => f.ever_registered_at_art_clinic.value === 'Yes',
                    options: (_: any, filter='') => this.getFacilities(filter),
                    config: {
                        showKeyboard: true,
                        isFilterDataViaApi: true
                    }
                },
                ...generateDateFields({
                    id: 'date_started_art',
                    helpText: 'Started ART',
                    required: true,
                    unload: (d: any, state: string, f: any, computedData: any) => {
                        if (state === 'next') {
                            const age = dayjs(computedData.date_started_art.date)
                                .diff(this.patient.getBirthdate(), 'years')
                            this.staging.setAge(age)
                            this.stagingFacts.age = age
                            this.stagingFacts.ageInMonths = age * 12
                        } else {
                            this.staging.setAge(this.patient.getAge())
                            this.stagingFacts.age = this.patient.getAge()
                            this.stagingFacts.ageInMonths = this.patient.getAgeInMonths()
                        }
                    },
                    condition: (f: any) => f.ever_registered_at_art_clinic.value === 'Yes',
                    minDate: () => this.patient.getBirthdate(),
                    maxDate: () => this.staging.getDate(),
                    estimation: {
                        allowUnknown: true,
                        estimationFieldType: EstimationFieldType.MONTH_ESTIMATE_FIELD
                    },
                    computeValue: (date: string, isEstimate: boolean) => {
                        this.staging.setDate(date)
                        this.vitals.setDate(date)
                        return {
                            date,
                            tag:'reg',
                            isEstimate,
                            obs: this.buildDateObs('Drug start date', date, isEstimate) 
                        }
                    },
                }, this.registration.getDate()),
                {
                    id: 'previous_art_number',
                    helpText: 'ART number at previous location',
                    type: FieldType.TT_TEXT,
                    condition: (f: any) => f.ever_registered_at_art_clinic.value === 'Yes',
                    computedValue: (d: Option) => ({
                        tag:'reg',
                        obs: this.registration.buildValueText(
                            'ART number at previous location', d.value
                        )
                    }),
                    validation: (val: Option) => Validation.required(val)
                },
                /**
                 * DRUG TRANSFER IN INITIATION 
                 */
                ...generateDateFields({
                    id: 'date_last_received_arvs',
                    helpText: 'Last ARV Dispensation',
                    required: true,
                    condition: (f: any) => `${f.received_arvs.value}`.match(/yes/i) ? true : false,
                    minDate: (f: any, c: any) => c['date_started_art'].date,
                    maxDate: () => this.registration.getDate(),
                    computeValue: (date: string) => {
                        this.prescription.setDate(date)
                        this.dispensation.setDate(date)
                        return date
                    },
                    estimation: {
                        allowUnknown: false,
                    },
                }, this.registration.getDate()),
                {
                    id: 'arv_regimen_selection',
                    proxyID: 'arvs_received',
                    helpText: 'Last ARV Regimen dispensed',
                    type: FieldType.TT_ART_REGIMEN_SELECTION,
                    computedValue: (v: Option) => v.other,
                    options: async () => {
                        if (!isEmpty(this.regimens)) return this.regimens
                        const regimens = await RegimenService.getAllArvRegimens()
                        const options = Object.keys(regimens)
                            .map((r: string) => {
                                const drugs = regimens[r]
                                const label = drugs.map((d: any) => 
                                    d.alternative_drug_name || d.concept_name)
                                    .join(' + ')
                                return { 
                                    label,
                                    value: r,
                                    other: drugs
                                }
                            })
                        this.regimens = [ ...options, this.toOption('Other')]
                        return this.regimens
                    },
                    validation: (v: Option) => Validation.required(v),
                    condition: (f: any) => `${f.received_arvs.value}`.match(/yes/i) ? true : false
                },
                {
                    id: 'other_arv_regimens_received',
                    proxyID: 'arvs_received',
                    helpText: 'Other Last ARV drugs dispensed',
                    type: FieldType.TT_MULTIPLE_SELECT,
                    validation: (v: Option[]) => Validation.required(v),
                    computedValue: (v: Option[]) => v.map(d => d.other),
                    options: async () => {
                        if (!isEmpty(this.customRegimens)) return this.customRegimens
                        const p = new PrescriptionService(this.patientID, this.providerID)
                        this.customRegimens = (await p.getCustomIngridients())
                            .map((drug: any ) => ({
                                label: drug.name,
                                value: drug.drug_id,
                                other: { ...drug }
                            })) as Option[]
                        return this.customRegimens
                    },
                    config: {
                        showKeyboard: true
                    },
                    condition: (f: any) => `${f.arv_regimen_selection.value}`.match(/other/i)
                },
                {
                    id: 'arv_quantities',
                    helpText: 'Amount of drugs dispensed',
                    type: FieldType.TT_ADHERENCE_INPUT,
                    validation: (v: Option[]) => this.validateSeries([
                        () => Validation.required(v),
                        () => {
                            return v.map((i: Option) => i.value === '')
                                .some(Boolean) ? ['Some Drugs are missing values'] : null
                        }
                    ]),
                    computedValue: (v: Option[]) => {
                        // Prescription object for creating treatment encounter and orders
                        const arvDrugOrders = v.map(
                            d => this.prescription.toOrderObj(
                                d.other['drug_id'],
                                d.label,
                                d.other['units'],
                                1, // should probably get this from the drug source
                                0, // Should probably get this from the drug source
                                'Daily (QOD)' // Should probably get this from the drug source 
                            )
                        )
                        // callback function that builds dispensation orders based on OrderID
                        const buildDispensationOrders = (orders: Array<any>) => {
                            return v.map( d => {
                                const drugID: number = d.other['drug_id']
                                const order: any = find(orders, { drug: { 'drug_id' : drugID } })
                                const packs: any = this.dispensation.getDrugPackSizes(drugID)
                                const tabs: number = parseInt(d.value as string)
                                const totalPacks: number = tabs / (packs[0] || 30)
                                return this.dispensation.buildDispensations(
                                    order['order_id'], tabs, totalPacks
                                )
                            }).reduce((accum, cur) => accum.concat(cur), [])
                        }
                        return { arvDrugOrders, buildDispensationOrders }
                    },
                    options: (_: any, c: any, listData: Option) => {
                        return c.arvs_received
                            .map((d: any) => {
                                const drugName = d['alternative_drug_name'] || d['drug_name'] || d['name']
                                const prevValue = find(listData, { label: drugName })
                                return {
                                    label: drugName,
                                    value: prevValue ? prevValue.value : '',
                                    other: d
                                } 
                            })
                    },
                    condition: (f: any) => `${f.received_arvs.value}`.match(/yes/i),
                    config: {
                        titles: {
                            label: 'Drugs',
                            value: 'Amount Received'
                        }
                    }
                },
                {
                    id: 'drug_interval',
                    helpText: 'Interval for last received ARVs',
                    type: FieldType.TT_NEXT_VISIT_INTERVAL_SELECTION,
                    condition: (f: any) => `${f.received_arvs.value}`.match(/yes/i),
                    validation: (val: Option) => Validation.required(val),
                    unload: (v: Option) => {
                        this.prescription.setNextVisitInterval(v.value)
                    },
                    options: () => {
                        const intervals = [
                            { label: '2 weeks', value: 14 },
                            { label: '1 month', value: 28 },
                            { label: '2 months', value: 56 },
                            { label: '3 months', value: 84 },
                            { label: '4 months', value: 112 },
                            { label: '5 months', value: 140 },
                            { label: '6 months', value: 168 },
                            { label: '7 months', value: 196 },
                            { label: '8 months', value: 224 },
                            { label: '9 months', value: 252 },
                            { label: '10 months', value: 280 },
                            { label: '11 months', value: 308 },                        
                            { label: '12 months', value: 336 },
                        ]
                        return intervals.map(({label, value}: Option) => {
                            this.prescription.setNextVisitInterval(value)
                            const nextAppointment = this.prescription.calculateDateFromInterval()
                            return {
                                label,
                                value,
                                other: {
                                    label: 'Medication run-out date:',
                                    value: HisDate.toStandardHisDisplayFormat(nextAppointment),
                                    other: {
                                        label: "",
                                        value: []
                                    }
                                }
                            }
                        })
                    },
                    config: {
                        showRegimenCardTitle: false
                    }
                },
                /**
                 * END OF DRUG TRANSFER IN
                 */
                {
                    id: 'has_transfer_letter',
                    helpText: 'Has staging information?',
                    type: FieldType.TT_SELECT,
                    validation: (v: any) => Validation.required(v),
                    computedValue: ({ value }: Option) => ({
                        tag:'reg',
                        obs: this.registration.buildValueCoded(
                            'Has transfer letter', value
                        )
                    }),
                    options: () => this.yesNoOptions(),
                    condition: (f: any) => f.ever_registered_at_art_clinic.value === 'Yes',
                },
                {
                    id: 'height',
                    helpText: 'Height (CM)',
                    type: FieldType.TT_NUMBER,
                    condition: (f: any) => f.has_transfer_letter.value === 'Yes',
                    computedValue: ({ value }: Option) => ({
                        tag:'vitals',
                        obs: this.vitals.buildValueNumber('Height', value)
                    }),
                    validation: (val: any) => this.validateSeries([
                        () => Validation.required(val),
                        () => Validation.isNumber(val),
                        () => Validation.rangeOf(val, 40, 222)
                    ])
                },
                {
                    id: 'weight',
                    helpText: 'Weight (Kg)',
                    type: FieldType.TT_TEXT,
                    unload: async (d: any, s: string, f: any) => {
                        const weight = f.weight.value
                        const height = f.height.value
                        const bmi = await BMIService.getBMI(
                            weight, height, 
                            this.patient.getGender(),
                            this.patient.getAge()
                        )

                        this.stagingFacts.bmi = bmi['index']

                        if (!this.staging.isPedaid()) return

                        const medianWh = await this.patient.getMedianWeightHeight()

                        try {
                            //TODO: this calculation is already defined in patient_service.. must refactor it to make it reusable here
                            this.stagingFacts.weightPercentile = parseFloat(weight) / (parseFloat(medianWh["weight"])) * 100
                        } catch (e) {
                            this.stagingFacts.weightPercentile = 0
                        }
                    },
                    computedValue: ({ value }: Option) => ({
                        tag:'vitals',
                        obs: this.vitals.buildValueNumber('weight', value)
                    }),
                    condition: (f: any) => f.has_transfer_letter.value === 'Yes',
                    validation: (val: any) => this.validateSeries([
                        () => {
                            const fullValue = {
                                ...val, other: { modifier: '.' }
                            }
                            return this.vitals.isNotEmptyandFloat(fullValue)
                        },
                        () => Validation.rangeOf(val, 1, 300)
                    ]),
                    config: {
                        customKeyboard: [
                            [
                                ['1', '2', '3', ''],
                                ['4', '5', '6', ''],
                                ['7', '8', '9', '.'],
                                ['',  '0', '' , '']
                            ],
                            [
                                ['Delete']
                            ]
                        ]
                    }
                },
                /*** 
                    Start Staging Fields
                ***/
                ...this.getStagingFields(),
                /** 
                    End Staging Fields
                ***/
                {
                    id: 'new_cd4_percent_available',
                    helpText: 'CD4 percent available',
                    type: FieldType.TT_SELECT,
                    options: () => this.yesNoOptions(),
                    condition: (f: any) => f.has_transfer_letter.value === 'Yes',
                    validation: (val: any) => Validation.required(val)
                },
                {
                    id: 'cd4_percent',
                    helpText: 'CD4 Percent',
                    type: FieldType.TT_TEXT,
                    condition: (f: any) => f.new_cd4_percent_available.value === 'Yes',
                    computedValue: ({ value }: Option) => ({
                        tag:'staging',
                        obs: this.registration.buildValueNumber(
                            'CD4 percent', parseInt(value.toString().substring(1)), '%'
                        )
                    }),
                    onValue: (d: Option) => {
                        if (d.value && !this.staging.cd4CountIsValid(d.value)) {
                            toastWarning('Cd4 percentage invalid. Use one modifier or start with either of these symbols: >, < or =')
                            return false
                        }
                        return true
                    },
                    validation: (val: any) => Validation.required(val),
                    config: {
                        customKeyboard: [
                            CD4_COUNT_PAD_LO,
                            [
                                ['Delete']
                            ]
                        ]
                    }
                },
                {
                    id: 'type_of_confirmatory_hiv_test',
                    helpText: 'Confirmatory HIV test',
                    type: FieldType.TT_SELECT,
                    validation: (val: any) => Validation.required(val),
                    onValue: async (val: Option) => {
                        if (val.value === 'Not done') {
                            await infoActionSheet(
                                'Reminder',
                                'UNKNOWN HIV CONFIRMATORY TEST',
                                'Please arrange for a confirmatory test',
                                [
                                    { name: 'Agreed', color: 'success', slot: 'start'}
                                ]
                            )
                        }
                        return true
                    },
                    computedValue: ({ value }: Option) => ({
                        tag:'reg',
                        obs: this.registration.buildValueCoded(
                            'Confirmatory hiv test type', value
                        )
                    }),
                    options: () => ([
                        { label: 'Rapid antibody test', value: 'HIV rapid test'},
                        { label: 'DNA PCR', value: 'HIV DNA polymerase chain reaction'},
                        { label: 'Not done', value: 'Not done' }
                    ])
                },
                {
                    id: 'confirmatory_hiv_test_location',
                    helpText: 'Location of confirmatory HIV test',
                    type: FieldType.TT_SELECT,
                    computedValue: (d: Option) => ({
                        tag:'reg',
                        obs: this.registration.buildValueText(
                            'Confirmatory HIV test location', d.label
                        ) 
                    }),
                    validation: (val: any) => Validation.required(val),
                    condition: (f: any) => f.type_of_confirmatory_hiv_test.value != 'Not done',
                    options: (_: any, filter='') => this.getFacilities(filter),
                    config: {
                        showKeyboard: true,
                        isFilterDataViaApi: true
                    }
                },
                ...generateDateFields({
                    id: 'date_of_confirmatory_hiv_test',
                    helpText: 'Confirmatory HIV test',
                    beforeNext: async (date: string, formData: any) => {
                        if (formData.received_arvs.value != 'Yes') {
                            const timeElapsed = dayjs(this.staging.getDate()).diff(date, 'days')
                            if (timeElapsed >= 20) {
                                const action = await infoActionSheet(
                                    'Data inconsistency warning',
                                    `Confirmatory Date for newly initiated ART patient is ${timeElapsed} days ago`,
                                    'Are you sure this is accurate?',
                                    [
                                        { name: 'No, Re-enter date', slot: 'start', color: 'success'},
                                        { name: 'Yes, its accurate', slot: 'end', color: 'danger'}
                                    ]
                                )
                                return action === 'Yes, its accurate'
                            }
                        }
                        return true
                    },
                    condition: (f: any) => f.confirmatory_hiv_test_location.value,
                    required: true,
                    minDate: () => this.patient.getBirthdate(),
                    maxDate: () => this.staging.getDate(),
                    estimation: {
                        allowUnknown: true,
                        estimationFieldType: EstimationFieldType.MONTH_ESTIMATE_FIELD
                    },
                    computeValue: (date: string, isEstimate: boolean) => {
                        return {
                            date,
                            tag:'reg',
                            isEstimate,
                            obs: this.buildDateObs('Confirmatory HIV test date', date, isEstimate) 
                        }
                    },
                }, this.registration.getDate()),
                this.getStagingSummaryField('Staging summary')
            ]
        }
    }
})
</script>
