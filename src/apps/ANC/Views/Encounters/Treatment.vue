<template>
    <ion-page> 
        <ion-header> 
            <ion-toolbar> 
                <ion-title class="his-lg-text">Treatment</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid> 
                <ion-row class="his-card section drug-section-style">
                    <ion-col> 
                        <table> 
                            <thead> 
                                <tr class="his-sm-text"> 
                                    <th>Drug</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(drug, drugIndex) in activeDrugs" :key="drugIndex"> 
                                    <td>
                                        <ion-input
                                            readonly
                                            @click="addDrug(drug)"
                                            :value="drug.drug_name"
                                            placeholder="Add drug"
                                            class="his-sm-text dosage-input"
                                        />
                                    </td>
                                    <td> 
                                        <ion-input 
                                            readonly
                                            @click="editDrugFrequency(drug)"
                                            :value="drug.frequency"
                                            class="his-md-text dosage-input"
                                            placeholder="Add frequency.."
                                        /> 
                                    </td>
                                    <td> 
                                        <ion-input
                                            readonly
                                            @click="editDrugDuration(drug)"
                                            :value="drug.duration"
                                            placeholder="Add duration.."
                                            class="dosage-input his-sm-text"/> 
                                        </td>
                                    <td> 
                                        <ion-button v-if="drugIndex + 1 >= activeDrugs.length"
                                            style="width:100%"
                                            @click="activeDrugs.push({})" class="his-md-text" color="success"> 
                                            Add
                                        </ion-button>
                                        <ion-button v-if="drugIndex + 1 < activeDrugs.length"
                                            style="width:100%"
                                            class="his-md-text"
                                            @click="activeDrugs.splice(drugIndex, 1)"
                                            color="danger">
                                            Remove
                                        </ion-button> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </ion-col>
                </ion-row>
                <ion-row class="his-card section"> 
                    <ion-col> 
                        <ion-list>
                            <ion-item class="his-md-text"
                                detail
                                @click="setDrugSetValues(dset)" 
                                button v-for="(dset, dindex) in drugSets" 
                                :key="dindex"> 
                                <ion-label>{{dset.label}} ({{dset.value}})</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <ion-footer> 
            <ion-toolbar color="dark">
                <ion-button :router-link="cancelDestination" slot="start" size="large" color="danger">
                    Cancel
                </ion-button>
                <ion-button @click="clear" slot="end" size="large" color="warning"> 
                    Clear
                </ion-button>
                <ion-button slot="end" size="large" color="success"> 
                    Finish
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
    IonHeader,
    IonLabel,
    IonPage,
    IonContent,
    IonTitle,
    IonRow,
    IonGrid,
    IonInput,
    IonCol,
    IonFooter,
    IonToolbar,
    IonButton,
    modalController
} from "@ionic/vue"
import { Field, Option } from '@/components/Forms/FieldInterface'
import TouchField from "@/components/Forms/SIngleTouchField.vue"
import EncounterMixinVue from '@/views/EncounterMixin.vue'
import { AncTreatmentService } from '../../Services/anc_treatment_service'
import { FieldType } from "@/components/Forms/BaseFormElements"
import Validation from "@/components/Forms/validations/StandardValidations"
import { DrugService } from '@/services/drug_service'
import { alertConfirmation } from '@/utils/Alerts'
import { isEmpty } from 'lodash'

interface ActiveDrug {
    id: number;
    'drug_name': string;
    dose: string;
    duration: number;
    frequency: string;
    units: string;
}
export default defineComponent({
    components: {
        IonHeader,
        IonRow,
        IonLabel,
        IonGrid,
        IonCol,
        IonPage,
        IonContent,
        IonTitle,
        IonInput,
        IonButton,
        IonFooter,
        IonToolbar
    },
    mixins: [EncounterMixinVue],
    data: () => ({
        activeDrugs: [{}] as ActiveDrug[] | Array<{}>,
        drugSets: [] as any,
        defaultDrugs: [] as any,
        isSubmitting: false as boolean,
        service: {} as any
    }),
    watch: {
        ready: {
            async handler(ready: boolean) {
                if (ready) {
                    this.service = new AncTreatmentService(this.patientID, this.providerID)
                    this.drugSets = (await this.service.getDrugSets()).map((d: any) => ({
                        label: d.name,
                        value: d.description,
                        other: {
                            drugs: d.drugs
                        }
                    }))
                    this.defaultDrugs = await DrugService.getDrugs({'page_size': 50})
                }
            },
            immediate: true
        }
    },
    methods: {
        setDrugSetValues(drugSet: any) {
            const drugs = drugSet.other.drugs.reduce((a: any, c: any) => a.concat(c), [])
            if (this.activeDrugs.length === 1 && isEmpty(this.activeDrugs[0])) {
                this.activeDrugs = drugs
            } else {
                this.activeDrugs = this.activeDrugs.concat(drugs)
            }
        },
        addDrug(drugItem: any) {
            this.launchEditor({
                id: 'new_drug',
                helpText: 'Add drug to prescribe',
                type: FieldType.TT_SELECT,
                defaultValue: () => drugItem.drug_name,
                validation: (v: Option) => Validation.required(v),
                options: async (_: any, filter: string) => {
                    let drugs: any = []
                    if (filter) {
                        drugs = await DrugService.getDrugs({
                           'page_size': 50,
                           'name': filter
                       })
                    } else {
                        drugs = this.defaultDrugs
                    }
                    return drugs.map((d: any) => ({
                        label: d.name,
                        value: d.drug_id,
                        other: {
                            activeDrugValue: {
                                id: d.drug_id,
                                duration: '',
                                frequency: '',
                                units: d.units,
                                'drug_name': d.name,
                                dose: d.dose_strength
                            }
                        }
                    }))
                },
                config: {
                    showKeyboard: true,
                    isFilterDataViaApi: true
                }
            }, 
            (data: Option) => {
                drugItem['id'] = data.other.activeDrugValue["id"]
                drugItem['drug_name'] = data.other.activeDrugValue["drug_name"]
            })
        },
        editDrugFrequency(drug: ActiveDrug) {
            this.launchEditor({
                id: 'frequency',
                helpText: `Edit drug frequencpy for ${drug.drug_name}`,
                type: FieldType.TT_SELECT,
                defaultValue: () => drug.frequency,
                validation: (v: Option) => Validation.required(v),
                options: () => {
                    return [
                        { 
                            label: 'Once a day (OD)',
                            value: 1
                        },
                        {
                            label: 'Twice a day (BD)',
                            value: 2
                        },
                        {
                            label: 'Three a day (TDS)',
                            value: 3
                        },
                        {
                            label: 'Four times a day (QID)',
                            value: 4
                        },
                        {
                            label: 'Five times a day (5X/D)',
                            value: 5
                        },
                        {
                            label: 'Six times a day (Q4HRS)',
                            value: 6
                        },
                        {
                            label: 'In the morning (QAM)',
                            value: 0.5
                        },
                        {
                            label: 'Once a week (QWK)',
                            value: 0.14
                        },
                        {
                            label: 'Once a month',
                            value: 0.03
                        },
                        {
                            label: 'Twice a month',
                            value: 0.071
                        }
                    ]
                }
            },
            (v: Option) => {
                drug.frequency = v.label as string
            })
        },
        editDrugDuration(drug: ActiveDrug) {
            this.launchEditor({
                id: 'duration',
                helpText: `Edit duration of ${drug.drug_name}`,
                type: FieldType.TT_NUMBER,
                defaultValue: () => drug.duration,
                validation: (v: Option) => Validation.required(v)
            }, 
            (v: Option) => {
                drug.duration = v.value as number
            })
        },
        async clear() {
            const ok = await alertConfirmation('Are you sure you want to clear all drugs?')
            if (ok) {
                this.activeDrugs = [{}]
            }
        },
        async launchEditor(field: Field, callback: Function) {
            const modal = await modalController.create({
                component: TouchField,
                backdropDismiss: false,
                cssClass: "full-modal",
                componentProps: {
                    dismissType: 'modal',
                    currentField: field,
                    onFinish: callback,
                }
            })
            modal.present()
        }
    }
})
</script>
<style scoped>
    .dosage-input {
        text-align: center;
        border: solid 1px #ccc;
        height: 50px;
        width: 100%;
        background-color: rgb(252, 252, 241);  
    }
    table {
        width: 100%;
    }
    .drug-section-style {
        padding: 0;
        background: #f6f2ca;
    }
    td, th {
        border: solid 1px #3333;
    }
    th {
        padding: 0.8em;
    }
    td {
        padding: 0.4em;
        font-size: 0.9rem; 
    }
    .section {
        margin-top: 10px;
        height: 40vh;
        overflow-y: scroll;
    }
</style>
