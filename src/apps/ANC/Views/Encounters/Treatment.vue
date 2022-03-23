<template>
    <ion-page> 
        <ion-header> 
            <ion-toolbar> 
                <ion-title>Treatment</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid> 
                <ion-row class="his-card section drug-section-style">
                    <ion-col> 
                        <table> 
                            <thead> 
                                <tr> 
                                    <th>Drug</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody> 
                                <tr v-for="(drug, drugIndex) in activeDrugs" :key="drugIndex"> 
                                    <td> <b>{{drug.drug_name}}</b> </td>
                                    <td> 
                                        <ion-input 
                                            readonly
                                            @click="editDrugFrequency(drug)"
                                            :value="drug.frequency"
                                            class="dosage-input"
                                            placeholder="Add frequency.."
                                        /> 
                                    </td>
                                    <td> 
                                        <ion-input
                                            readonly
                                            @click="editDrugDuration(drug)"
                                            :value="drug.duration"
                                            placeholder="Add duration.."
                                            class="dosage-input"/> 
                                        </td>
                                    <td> 
                                        <ion-button @click="removeDrug(drug)" color="danger">
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
                            <ion-item @click="appendDrugSetDrugs(dSet.drugs)" 
                                button v-for="(dSet, dIndex) in drugSets" :key="dIndex">
                                <ion-label>{{dSet.name}} ({{dSet.description}})</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <ion-footer> 
            <ion-toolbar color="dark">
                <ion-button slot="start" size="large" color="danger">
                    Cancel
                </ion-button>
                <ion-button @click="addDrug" slot="end" size="large"> 
                    Add Drug
                </ion-button>
                <ion-button slot="end" size="large" color="warning"> 
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
    IonList,
    IonItem,
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
        IonGrid,
        IonCol,
        IonPage,
        IonContent,
        IonTitle,
        IonInput,
        IonButton,
        IonFooter,
        IonToolbar,
        IonList,
        IonItem,
    },
    mixins: [EncounterMixinVue],
    data: () => ({
        activeDrugs: [] as ActiveDrug[],
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
                    this.drugSets = await this.service.getDrugSets()
                    this.defaultDrugs = await DrugService.getDrugs({'page_size': 50})
                }
            },
            immediate: true
        }
    },
    methods: {
        appendDrugSetDrugs(drugs: any) {
            this.activeDrugs = [...this.activeDrugs, ...Object.values(drugs) as ActiveDrug[]]
        },
        addDrug() {
            this.launchEditor({
                id: 'new_drug',
                helpText: 'Add drug to prescribe',
                type: FieldType.TT_SELECT,
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
                                'drug_name': d.name,
                                duration: '',
                                frequency: '',
                                units: d.units,
                                dose: d.dost_strength
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
                this.activeDrugs.push(data.other.activeDrugValue)
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
                validation: (v: Option) => Validation.required(v)
            }, 
            (v: Option) => {
                drug.duration = v.value as number
            })
        },
        removeDrug(drug: ActiveDrug) {
            this.activeDrugs = this.activeDrugs.filter(d => d.drug_name != drug.drug_name)
        },
        clear() {
            //Clear all selected drugs
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
    }
</style>
