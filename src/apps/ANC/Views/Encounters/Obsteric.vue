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
                condition: (f: any) => f.para.value > 0,
                config: {
                  pregnancyCount: (f: any) => f.para.value
                }
            },
            {
				id: 'pregnancy_details',
				helpText: 'Pregnancy details',
				type: FieldType.TT_ANC_PREGNANCY_DETAILS_INPUT,
				condition: (f: any) => f.para.value > 0,
				options: (f: any) => {
					const abortionCount = f.knownPregnancies.length - parseInt(`${f.gravida.value}`)
					const knownAbortions: Option[] = []
					for(let i=0; i < abortionCount; ++i) {
						knownAbortions.push({
							label: `${i + 1} Abortion`,
							value: 1,
							other: {
								data: [
									{
										label: 'Year of abortion',
										value: '',
										other: {
											field: {
												id: 'year',
												helpText: 'Year of birth',
												type: FieldType.TT_NUMBER,
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v)
												])
											}
										}
									},
									{
										label: 'Place of abortion',
										value: '',
										other: {
											field: {
												id: 'place_of_abortion',
												helpText: 'Place of abortion',
												type: FieldType.TT_SELECT,
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v)
												])
											}
										}
									},
									{
										label: 'Type of abortion',
										value: '',
										other: {
											field: {
												id: 'type_of_abortion',
												helpText: 'Type of abortion',
												type: FieldType.TT_SELECT,
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v)
												]),
												options: () => {
													return []
												}
											}
										}
									},
									{
										label: 'Procedure done',
										value: '',
										other: {
											field: {
												id: 'procedure_done',
												helpText: 'Procedure done',
												type: FieldType.TT_SELECT,
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v)
												]),
												options: () => {
													return []
												}
											}
										}
									},
									{
										label: 'Gestation (weeks)',
										value: '',
										other: {
											field: {
												id: 'gestation_weeks',
												helpText: 'Gestation (weeks)',
												type: FieldType.TT_NUMBER,
												validation: (v: Option) => this.validateSeries([
													() => Validation.required(v)
												])
											}
										}
									}
								]
							}
						})
					}
					const knownPregnancies = f.known_pregnancies.map((p: Option) => {
						p.other = {
							data: [
								{
									label: 'Year of birth',
									value: '',
									field: {
										id: 'year',
										helpText: 'Year of birth',
										type: FieldType.TT_NUMBER,
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v)
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
										validation: (v: Option) => Validation.required(v), 
										options: () => {
											return []
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
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v)
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
										validation: (v: Option) => Validation.required(v),
										options: () => {
											return []
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
										validation: (v: Option) => Validation.required(v),
										options: () => {
											return []
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
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v)
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
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v)
										]),
										options: () => {
											return []
										}
									}
								},
								{
									label: 'Age at death',
									value: '',
									field: {
										id: 'age_at_death',
										helpText: 'Age at death',
										type: FieldType.TT_TEXT,
										validation: (v: Option) => this.validateSeries([
											() => Validation.required(v)
										]),
										options: () => {
											return []
										}
									}
								}
							]
						}
					})
					return [...knownPregnancies, ...knownAbortions] as Option[]
				}
            }
        ]
    }
  }
})
</script>
