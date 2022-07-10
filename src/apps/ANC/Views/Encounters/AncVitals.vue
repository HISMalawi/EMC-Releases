<template>
  <his-standard-form
    :fields="fields"
    :onFinishAction="onFinish"
    :skipSummary="true"
    :cancelDestinationPath="cancelDestination"
  >
  </his-standard-form>
</template> 
<script lang="ts">
import { defineComponent } from "vue";
import { Field, Option } from "@/components/Forms/FieldInterface";
import { FieldType } from "@/components/Forms/BaseFormElements";
import HisStandardForm from "@/components/Forms/HisStandardForm.vue";
import { VitalsService } from "@/apps/ART/services/vitals_service";
import EncounterMixinVue from "../../../../views/EncounterMixin.vue";
import { ProgramService } from "@/services/program_service";
import { find } from "lodash";

export default defineComponent({
  mixins: [EncounterMixinVue],
  components: { HisStandardForm },
  data: () => ({
    age: null as any,
    gender: null as any,
    recentHeight: null,
    vitals: {} as any,
    weightForHeight: {} as any,
    medianWeightandHeight: {} as any
  }),
  watch: {
    ready: {
      async handler(ready) {
        if (ready) await this.init(this.patient)
      },
      immediate: true
    }
  },
  methods: {
    async init(patient: any) {
        this.vitals = new VitalsService(patient.getID(), this.providerID);
        this.age = patient.getAge();
        this.gender = patient.getGender();
        const lastHeight = await patient.getRecentHeight();
        this.recentHeight = lastHeight == -1 ? null : lastHeight;
        if (this.age <= 14) {
            this.medianWeightandHeight = await patient.getMedianWeightHeight();
            this.weightForHeight = await ProgramService.getWeightForHeightValues();
        }
        this.fields = this.getFields();
    },
    async onFinish(_: any, computedData: any) {
      await this.vitals.createEncounter()
      await this.vitals.saveObservationList(
        (await this.resolveObs(computedData))
      )
      this.nextTask();
    },
    validateVitals(vitals: any) {
      const l = this.checkRequiredVitals(vitals);
      if (l.length > 0) {
        return l.map((val) => {
          return [`${val.label} can not be empty`];
        });
      }
      const v = this.sanitizeVitals(vitals);
      return this.vitals.validateAll(v);
    },
    sanitizeVitals(vitals: Array<Option>) {
      return vitals.filter((element) => {
        if (element.label === "Height" && element.other.required == false) {
          return false;
        }
        return element.value !== "" && element.label !== "Age";
      })
    },
    checkRequiredVitals(vitals: Array<Option>) {
      return vitals.filter((element) => {
        return element.value === "" && element.other.required === true;
      });
    },
    getFields(): Array<Field> {
      return [
        {
          id: "vitals",
          helpText: "Vitals entry",
          type: FieldType.TT_VITALS_ENTRY,
          validation: (value: any) => this.validateVitals(value),
          computedValue: (value: Option[]) => {
            let obs: any = []
            const data = value.filter(v => !v.other.doNotSave)
            data.forEach((d: Option) => {
                if (!d.value) {
                    return
                }
                if (typeof d.other?.computed === 'function') {
                    obs = obs.concat(d.other.computed(d.value))
                } else {
                    obs.push(this.vitals.buildValueNumber(d.label, d.value))
                }
            })
            return obs
          },
          config: {
            hiddenFooterBtns : [
              'Clear'
            ],
            onUpdateAlertStatus: (params: Option[]) => {
                const bp = find(params, { label: 'BP' })
                if (bp && bp.value != '') {
                    const [sys, dis] = `${bp.value}`.split('/').map(v => parseInt(v))
                    if (sys >= 140 && dis >= 90) {
                        return {
                            status: 'Client is at risk of pre-eclampsia, refer for urine protein test.',
                            color: 'brown'
                        }
                    }
                    if (sys < 120 || sys > 140) {
                        return {
                            status: 'Systolic reading is out of normal range',
                            color: 'brown'
                        }
                    }
                    if (dis < 80 || dis > 90) {
                        return {
                            status: 'Diastolic reading is out of normal range',
                            color: 'brown'
                        }
                    }
                    if ((sys >= 130 && sys <= 139) && (dis >= 80 && dis <= 89)) {
                        return {
                            status: 'Prehypertension',
                            color: 'brown'
                        }
                    }
                }
                return { status: '', color: ''}
            },
            onChangeOption: (activeItem: any) => {
              if (!activeItem.value && activeItem.other.required) {
                throw `Value for ${activeItem.label} is required`
              }else if (activeItem.value) {
                const errs = this.vitals.validator(activeItem)
                if(errs && errs.length) throw errs
              }
            }
          },
          options: () => {
            const recentHeight = this.recentHeight && this.age > 18? this.recentHeight : "";
            const showHeight = !(recentHeight && this.age > 18);
            return [
                {
                    label: "Weight",
                    value: "",
                    other: {
                        modifier: "KG",
                        icon: "weight",
                        required: true,
                    },
                },
                {
                    label: "Height",
                    value: `${recentHeight}`,
                    other: {
                        modifier: "CM",
                        icon: "height",
                        recentHeight: this.recentHeight,
                        visible: showHeight
                    }
                },
                { 
                    label: "BP", 
                    value: "", 
                    other: {
                        computed: (bp: string) => {
                            const  [sys, dia] = bp.split("/");
                            return [
                                this.vitals.buildValueNumber("Systolic", sys),
                                this.vitals.buildValueNumber("Diastolic", dia)
                            ]
                        },
                        modifier: "mmHG", 
                        icon: "bp"
                    } 
                },
                {
                    label: "Age",
                    value: this.age,
                    other: {
                        doNotSave: true,
                        modifier: "Years old", 
                        icon: "", 
                        visible: false 
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
