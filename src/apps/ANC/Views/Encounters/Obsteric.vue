<template>
  <ion-page> 
    <his-standard-form 
      :fields="fields"
      :skipSummary="true"
      :onFinishAction="onFinish"
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
                beforeNext: async (v: Option) => {
                    if (parseInt(`${v.value}`) > 9) {
                        const ok = await alertConfirmation(
                            'The value is bigger than maximum 9. Are you sure about this value?'
                        )
                        if (!ok) {
                            return false
                        } 
                    }
                    return true
                },
                computedValue: (v: Option) => this.service.buildValueNumber('Gravida', v.value),
                validation: (v: Option) => this.validateSeries([
                    () => Validation.required(v),
                    () => Validation.rangeOf(v, 1, 19)
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
                    () => Validation.rangeOf(v, 0, f.gravida.value - 1)
                ])
            },
            {
                id: 'known_pregnancies',
                helpText: 'Pregnancies with available information',
                type: FieldType.TT_ANC_PREGNANCY_INPUT_CONFIG,
                condition: (f: any) => f.gravida.value > 1 && f.para.value > 0,
                config: {
                  pregnancyCount: (f: any) => parseInt(`${f.gravida.value}`) - parseInt(`${f.para.value}`)
                }
            },
            {
				id: 'pregnancy_details',
				helpText: 'Pregnancy details',
				type: FieldType.TT_ANC_PREGNANCY_DETAILS_INPUT,
				condition: (f: any) => f.gravida.value > 1,
				options: (f: any) => {
					const abortionCount = parseInt(`${f.gravida.value}`) - parseInt(`${f.para.value}`)
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
											field: {
												id: 'place_of_abortion',
												helpText: 'Place of abortion',
												type: FieldType.TT_SELECT,
												computedValue: (v: Option) => {
													return this.service.buildValueText('Place of abortion', v.value)
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
											field: {
												id: 'gestation_weeks',
												helpText: 'Gestation (weeks)',
												type: FieldType.TT_NUMBER,
												computedValue: (v: Option) => {
													return this.service.buildValueNumber('Gestation', v.value)
												},
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v),
													() => Validation.rangeOf(v, 0, 30)
												])
											}
										}
									]
								]
							}
						})
					}
					const successfulPregnancyData = (f.known_pregnancies || [])
						.filter((p: Option) => p.isChecked)
						.map((p: Option, index: number) => {
						const num = index + 1
						const data: any = []
						for(let i=0; i < p.value; ++i) {
							data.push([
								{
									label: 'Year of birth',
									value: '',
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
									field: {
										id: 'gestation_weeks',
										helpText: 'Gestation (weeks)',
										type: FieldType.TT_NUMBER,
										computedValue: (v: Option) => {
											return this.service.buildValueNumber('Gestation', v.value)
										},
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v),
											() => Validation.rangeOf(v, 5, 42)
										])
									}
								},
								{
									label: 'Method of delivery',
									value: '',
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
									field: {
										id: 'condition_at_birth',
										helpText: 'Condition at birth',
										type: FieldType.TT_SELECT,
										computedValue: (v: Option) => {
											return this.service.buildValueText('Condition at Birth', v.value)
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
									field: {
										id: 'birth_weight',
										helpText: 'Birth weight',
										type: FieldType.TT_NUMBER,
										computedValue: (v: Option) => {
											return this.service.buildValueText('Birth weight', v.value)
										},
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v),
											() => Validation.rangeOf(v, 1, 5)
										])
									}
								},
								{
									label: 'Alive now',
									value: '',
									field: {
										id: 'alive_now',
										helpText: 'Alive now',
										type: FieldType.TT_SELECT,
										computedValue: (v: Option) => {
											return this.service.buildValueCoded('Alive', v.value)
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
									field: {
										id: 'age_at_death',
										helpText: 'Age at death',
										type: FieldType.TT_NUMBER,
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
						p.label = `${num}<sup>${getNumberOrdinal(num)}</sup> delivery`
						p.other = { data }
						return p
					})
					return [...successfulPregnancyData, ...knownAbortions] as Option[]
				}
            }
        ]
    }
  }
})
</script>
