<template>
  <ion-page> 
    <his-standard-form 
      :fields="fields"
      :skipSummary="true"
      :onFinishAction="onFinish"
      :cancelDestinationPath="cancelDestination" 
    />
  </ion-page>
</template>

<script lang="ts">
import EncounterMixinVue from '@/views/EncounterMixin.vue'
import { FieldType } from "@/components/Forms/BaseFormElements"
import { defineComponent } from 'vue'
import { AncObstericService } from "@/apps/ANC/Services/anc_obsteric_service"
import { Field, Option } from '@/components/Forms/FieldInterface'
import Validation from "@/components/Forms/validations/StandardValidations"
import { IonPage } from "@ionic/vue"
import { ObsValue } from '@/services/observation_service'
import { alertConfirmation } from '@/utils/Alerts'
import { getNumberOrdinal } from "@/utils/Strs"

export default defineComponent({
  components: { IonPage },
  mixins: [EncounterMixinVue],
  data: () => ({
    service: {} as any
  }),
  watch: {
    ready: {
      async handler(ready: boolean) {
        if (ready) {
            this.service = new AncObstericService(this.patientID, this.providerID)
			await this.service.initData()
            this.fields = this.getFields()
        } 
      },
      immediate: true
    }
  },
  methods: {
    async onFinish(_: any, computedData: any) {
      const obs = await this.resolveObs(computedData)
      await this.service.createEncounter()
      await this.service.saveObservationList(obs as ObsValue[])
      this.nextTask()
    },
    getFields(): Field[] {
        return [
            {
                id: 'gravida',
                helpText: 'Gravida',
                type: FieldType.TT_NUMBER,
				defaultValue: () => this.service.nextGravida > 0 ? this.service.nextGravida : null,
                beforeNext: async (v: Option) => {
                    if (parseInt(`${v.value}`) > 9) {
                        if (!(await alertConfirmation(
							'The value is greater than maximum 9. Are you sure about this value?'
							))) {
                            return false
                        }
                    }
                    return true
                },
                computedValue: (v: Option) => this.service.buildValueNumber('Gravida', v.value),
                validation: (v: Option) => this.validateSeries([
                    () => Validation.required(v),
                    () => Validation.rangeOf(v, this.service.nextGravida || 1, 19)
                ])
            },
            {
                id: 'para',
                helpText: 'Para',
                type: FieldType.TT_NUMBER,
                condition: (f: any) => f.gravida.value > 1,
                computedValue: (v: Option) => this.service.buildValueNumber('Parity', v.value), 
                validation: (v: Option, f: any) => this.validateSeries([
                    () => Validation.required(v),
                    () => Validation.rangeOf(v, this.service.para, f.gravida.value - 1)
                ])
            },
            {
                id: 'known_pregnancies',
                helpText: 'Pregnancies with available information',
                type: FieldType.TT_ANC_PREGNANCY_INPUT_CONFIG,
                condition: (f: any) => f.gravida.value > 1 && f.para.value > 0,
                config: {
					hiddenFooterBtns: ['Clear'],
					pregnancyCount: (f: any) => f.para.value
                }
            },
            {
				id: 'pregnancy_details',
				helpText: 'Pregnancy details',
				type: FieldType.TT_ANC_PREGNANCY_DETAILS_INPUT,
				condition: (f: any) => {
					const abortionCount = (parseInt(`${f.gravida.value}`) - parseInt(`${f.para.value}`)) - 1
					return f.gravida.value > 1 && (abortionCount >= 1 || f.known_pregnancies.some(
						(p: Option) => p.isChecked
					))
				},
				validation: (v: Option[]) => this.validateSeries([
					() => Validation.required(v),
					() => this.inArray(v, (i: Option) => i.label === '_INCOMPLETE_RECORD_ERROR_')
						? ['Pregnancy details incomplete!!']
						: null
				]),
				config: {
					hiddenFooterBtns: ['Clear']
				},
				computedValue: (v: Option[]) => v.filter(d => d?.other?.obs || false).map((d: Option) => d.other.obs),
				options: (f: any) => {
					const abortionCount = (parseInt(`${f.gravida.value}`) - parseInt(`${f.para.value}`)) - 1
					const knownAbortions: Option[] = []
					for(let i=0; i < abortionCount; ++i) {
						const num = i + 1
						knownAbortions.push({
							label: `<span style="color:red;">${num}<sup>${getNumberOrdinal(num)}</sup> Abortion</span>`,
							value: -1,
							other: {
								data: [
									[
										{
											label: 'Year of abortion',
											value: '',
											required: true,
											field: {
												id: 'year',
												helpText: 'Year of abortion',
												type: FieldType.TT_NUMBER,
												computedValue: (v: Option) => {
													return this.service.buildValueNumber('Year of abortion', v.value)
												},
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v),
													() => {
														const [minY] = this.patient.getBirthdate().split('-')
														const [maxY] = this.service.getDate().split('-')
														return Validation.rangeOf(v, minY, maxY)
													}
												])
											}
										},
										{
											label: 'Place of abortion',
											value: '',
											required: true,
											field: {
												id: 'place_of_abortion',
												helpText: 'Place of abortion',
												type: FieldType.TT_SELECT,
												computedValue: (v: Option) => {
													// concept taken as is from old anc system
													return this.service.buildValueText('Place of birth', v.value)
												},
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v)
												]),
												options: () => {
													return this.mapStrToOptions([
														"Health facility", 
														"In transit", 
														"TBA", 
														"Home", 
														"Other"
													])
												}
											}
										},
										{
											label: 'Type of abortion',
											value: '',
											required: true,
											field: {
												id: 'type_of_abortion',
												helpText: 'Type of abortion',
												type: FieldType.TT_SELECT,
												computedValue: (v: Option) => {
													return this.service.buildValueCoded('Type of Abortion', v.value)
												},
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v)
												]),
												options: () => {
													return this.mapStrToOptions([
														"Complete abortion", 
														"Incomplete abortion"
													])
												}
											}
										},
										{
											label: 'Procedure done',
											value: '',
											required: true,
											field: {
												id: 'procedure_done',
												helpText: 'Procedure done',
												type: FieldType.TT_SELECT,
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v)
												]),
												computedValue: (v: Option) => {
													return this.service.buildValueText('Procedure done', v.value)
												},
												options: () => {
													return this.mapStrToOptions([
														"Manual Vacuum Aspiration (MVA)", 
														"Evacuation", 
														"None"
													])
												}
											}
										},
										{
											label: 'Gestation (weeks)',
											value: '',
											required: true,
											field: {
												id: 'gestation_weeks',
												helpText: 'Gestation (weeks)',
												type: FieldType.TT_NUMBER,
												computedValue: (v: Option) => {
													return this.service.buildValueNumber('Gestation', v.value)
												},
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v),
													() => Validation.rangeOf(v, 0, 28)
												])
											}
										}
									]
								]
							}
						})
					}
					const successfulPregnancyData = (f.known_pregnancies || []).filter((p: Option) => p.isChecked).map((p: Option) => {
						const data: any = []
						const rowTitles = []
						for(let i=0; i < p.value; ++i) {
							rowTitles.push(`${i+1}<sup>${getNumberOrdinal(i+1)}</sup> born in ${p.label} pregnancy`)
							data.push([
								{
									label: 'Year of birth',
									value: '',
									required: true,
									field: {
										id: 'year',
										helpText: 'Year of birth',
										type: FieldType.TT_NUMBER,
										computedValue: (v: Option) => {
											return this.service.buildValueNumber('Year of Birth', v.value)
										},
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v),
											() => {
												const [minY] = this.patient.getBirthdate().split('-')
												const [maxY] = this.service.getDate().split('-')
												return Validation.rangeOf(v, minY, maxY) 
											}
										])
									}
								},
								{
									label: 'Place of birth',
									value: '',
									required: true,
									field: {
										id: 'place_of_birth',
										helpText: 'Place of birth',
										type: FieldType.TT_SELECT,
										computedValue: (v: Option) => {
											return this.service.buildValueText('Place of birth', v.value)
										},
										validation: (v: Option) => Validation.required(v), 
										options: () => {
											return this.mapStrToOptions([
												"Health facility", 
												"In transit", 
												"TBA", 
												"Home"
											])
										}
									}
								},
								{
									label: 'Gestation (weeks)',
									value: '',
									required: true,
									field: {
										id: 'gestation_weeks',
										helpText: 'Gestation (weeks)',
										type: FieldType.TT_NUMBER,
										computedValue: (v: Option) => {
											return this.service.buildValueNumber('Gestation', v.value)
										},
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v),
											() => Validation.rangeOf(v, 24, 42)
										])
									}
								},
								{
									label: 'Method of delivery',
									value: '',
									required: true,
									field: {
										id: 'method_of_delivery',
										helpText: 'Method of delivery',
										type: FieldType.TT_SELECT,
										computedValue: (v: Option) => {
											return this.service.buildValueText('Method of delivery', v.value)
										},
										validation: (v: Option) => Validation.required(v),
										options: () => {
											return this.mapStrToOptions([
												"Spontaneous Vertex", 
												"Caesarean Section", 
												"Vacuum extraction delivery", 
												"Breech", 
												"Forceps", 
												"Others"
											])
										}
									}
								},
								{
									label: 'Condition at birth',
									value: '',
									required: true,
									field: {
										id: 'condition_at_birth',
										helpText: 'Condition at birth',
										type: FieldType.TT_SELECT,
										computedValue: (v: Option) => {
											return this.service.buildValueText('Condition at Birth', v.value)
										},
										onValueUpdate: (v: Option, rowItems: any) => {
											rowItems.forEach((i: any) => {
												if (i.label === 'Alive now') {
													i.required = v.value === 'Alive'
													i.disabled = v.value != 'Alive'
												}
											})
										},
										validation: (v: Option) => Validation.required(v),
										options: () => {
											return this.mapStrToOptions([
												"Alive", 
												"Macerated Still Birth (MSB)", 
												"Fresh Still Birth (FSB)"
											])
										}
									}
								},
								{
									label: 'Birth weight',
									value: '',
									required: true,
									field: {
										id: 'birth_weight',
										helpText: 'Birth weight',
										type: FieldType.TT_TEXT,
										computedValue: (v: Option) => {
											return this.service.buildValueText('Birth weight', v.value)
										},
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v),
											() => {
												if (v.value != 'Unknown' && !(`${v.value}`.match(/^\d{1,3}\.\d{1,5}$/))) {
													return [`Invalid weight ${v.value}. Don't forget decimal point`]
												}
												return null
											},
											() => !['N/A', 'Unknown'].includes(`${v.value}`) 
												? Validation.rangeOf(v, 1, 5) 
												: null,
										]),
										config: {
											customKeyboard: [
												[
													['1', '2', '3'],
													['4', '5', '6'],
													['7', '8', '9'],
													['', '0', '.']
												],
												[
													['Unknown', 'Delete']
												]
											],
											onUnknownEstimateField: () => { 
												return {
													id: 'birth_weight_estimate',
													helpText: 'Birth weight estimate',
													type: FieldType.TT_SELECT,
													validation: (v: Option) => Validation.required(v),
													options: () => {
														return this.mapOptions([
															'Normal',
															'Big baby',
															'Small baby'
														])
													}
												}
											},
											noChars: false
										}
									}
								},
								{
									label: 'Alive now',
									value: '',
									disabled: true,
									required: false,
									field: {
										id: 'alive_now',
										helpText: 'Alive now',
										type: FieldType.TT_SELECT,
										computedValue: (v: Option) => {
											return this.service.buildValueCoded('Alive', v.value)
										},
										onValueUpdate: (v: Option, rowItems: any) => {
											rowItems.forEach((i: any) => {
												if (i.label === 'Age at death') {
													i.required = v.value === 'No'
													i.disabled = v.value === 'Yes'
												}
											})
										},
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v)
										]),
										options: () => {
											return this.yesNoOptions()
										}
									}
								},
								{
									label: 'Age at death',
									value: '',
									disabled: true,
									required: false,
									field: {
										id: 'age_at_death',
										helpText: 'Age at death',
										type: FieldType.TT_AGE_INPUT,
										computedValue: (v: Option) => {
											return this.service.buildValueText('Age at Death', v.value)
										},
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v)
										])
									}
								}
							])
						}
						p.label = `${p.label} delivery`
						p.other = { data, rowTitles }
						return p
					})
					return [...successfulPregnancyData, ...knownAbortions] as Option[]
				}
            },
			{
				id: 'previous_complications',
				helpText: 'Previous complications',
				type: FieldType.TT_MULTI_SELECT_GRID,
				condition: (f: any) => f.gravida.value > 1,
				validation: (v: Option[]) => this.validateSeries([
					() => Validation.required(v),
					() => {
						const hasMissingValues = v.map(v => v.value==='').some(Boolean)
						return hasMissingValues 
							? ['Please complete Complication selection!!'] 
							: null
					}
				]),
				computedValue: (v: Option[]) => {
					return v.filter(d => d.value != '')
						.map(d => this.service.buildValueCoded(d.label, d.value))
				},
				config: {
					hiddenFooterBtns: ['Clear']
				},
				options: () => {
					return [
						{ 
							label: 'Episiotomy', 
							value: '',
							other: {
								options: this.yesNoOptions()
							}
						},
						{ 
							label: 'Hemorrhage', 
							value: '',
							other: {
								options: this.mapStrToOptions([
									'No',
									'APH',
									'PPH'
								])
							}
						},
						{ 
							label: 'Pre-eclampsia', 
							value: '',
							other: {
								onClick: (option: Option, listData: Option[]) => {
									listData.forEach(l => {
										if (l.label === 'Eclampsia') {
											l.other.visible = option.value === 'Yes'
										}
									})
								},
								options: this.yesNoOptions()
							}
						},
						{
							label: 'Eclampsia',
							value: '',
							other: {
								visible: false,
								options: this.yesNoOptions()
							}
						}
					]
				}
			}
        ]
    }
  }
})
</script>
