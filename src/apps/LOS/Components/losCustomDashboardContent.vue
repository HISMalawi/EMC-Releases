<template>
    <p/>
    <ion-segment scrollable :value="activeTab" class="ion-justify-content-center">
        <ion-segment-button value="openOrders" @click="activeTab='openOrders'">
            <ion-label>Open</ion-label>
        </ion-segment-button>
        <ion-segment-button value="drawnOrders" @click="activeTab='drawnOrders'">
            <ion-label>Drawn</ion-label>
        </ion-segment-button>
    </ion-segment>
    <p/>
    <!-- Action Table -->
    <div :style="{overflowX: 'auto', height:'84%'}"> 
    <report-table
        :config="{
            showIndex: false
        }"
        v-if="activeTab === 'openOrders'" 
        :rows="labOrderRows" :columns="openColumns"
        >
    </report-table>
    <report-table
        :config="{
            showIndex: false
        }"
        v-if="activeTab === 'drawnOrders'" 
        :rows="drawnOrders" :columns="drawnColumns"
        >
    </report-table>
    </div>
    <!---Specimen selection modal--->
    <ion-modal :is-open="showSpecimenModal" class="custom-modal"> 
        <ion-page>
             <ion-header>
                <ion-toolbar>
                    <ion-title>                        
                        <b>Select specimen</b>
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding"> 
                <ion-row>
                    <ion-col> 
                        <ion-list>
                            <ion-item
                                v-for="(specimen, index) in specimens"
                                :key="index"
                                :color="selectedSpecimen.name === specimen.name ? 'primary': ''"
                                @click="selectedSpecimen = specimen"
                                >
                                <ion-label>{{specimen.name}}</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col> 
                        <ion-list>
                            <ion-item 
                                lines="none"
                                :key="index"
                                v-for="(test, index) in order.tests"
                                >
                                <ion-chip color="success">Test: <b>{{test.name}}</b></ion-chip>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                </ion-row>
            </ion-content>
            <ion-footer> 
                <ion-toolbar> 
                    <ion-button 
                        color="danger" 
                        slot="start"
                        @click="showSpecimenModal=false;selectedSpecimen={}"
                        > 
                        Close 
                    </ion-button>
                    <ion-button
                        :disabled="!selectedSpecimen.name"
                        color="success" 
                        slot="end"
                        @click="() => { showSpecimenModal=true;drawOrder() }">
                        Submit 
                    </ion-button>
                </ion-toolbar>
            </ion-footer>
        </ion-page>
    </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { ColumnInterface, RowInterface } from '@/components/DataViews/tables/ReportDataTable';
import { PatientLabService} from "@/apps/LOS/services/patient_lab_service"
import { isEmpty } from "lodash"
import { voidWithReason } from "@/utils/VoidHelper"
import {
    IonTitle,
    IonCol,
    IonRow,
    IonButton,
    IonFooter,
    IonToolbar,
    IonHeader,
    IonModal,
    IonList,
    IonItem,
    IonChip,
    IonPage,
    IonContent,
    IonSegment,
    IonLabel,
    IonSegmentButton,
} from "@ionic/vue";
import { toastDanger } from '@/utils/Alerts';

const HEADER_STYLE = {
    style: {
        background: '#f1f1f1',
        color: "#333",
        fontSize: '1.1rem !important'
    }
}
export default defineComponent({
    components: {
        IonTitle,
        IonCol,
        IonRow,
        IonButton,
        IonList,
        IonFooter,
        IonToolbar,
        IonHeader,
        IonItem,
        IonChip,
        IonModal,
        IonContent,
        IonPage,
        ReportTable,
        IonSegment,
        IonLabel,
        IonSegmentButton
    },
    data: () => ({
        showSpecimenModal: false as boolean,
        specimens: [] as any,
        order: {} as Record<string, any>,
        selectedSpecimen: {} as any,
        service: {} as any,
        activeTab: 'openOrders' as 'openOrders' | 'drawnOrders',
        drawnColumns: [
            [
                table.thTxt('Accession #', HEADER_STYLE),
                table.thTxt('Test', HEADER_STYLE),
                table.thTxt('Actions', HEADER_STYLE)
            ]
        ] as Array<ColumnInterface[]>,
        openColumns: [
            [
                table.thTxt('Accession #', HEADER_STYLE),
                table.thTxt('Test', HEADER_STYLE),
                table.thTxt('Reason for test', HEADER_STYLE),
                table.thTxt('Drawn', HEADER_STYLE),
                table.thTxt('Void', HEADER_STYLE)
            ]
        ] as Array<ColumnInterface[]>,
        drawnOrders: [] as Array<RowInterface[]>,
        labOrderRows: [] as Array<RowInterface[]>
    }),
    watch: {
        patient: {
            async handler(patient) {
                if (!isEmpty(patient)) {
                    this.service = new PatientLabService(this.patient.getID())
                    await this.initiateOpen()
                }
            },
            immediate: true,
            deep: true
        },
        visitDate: {
            async handler(date: string) {
                if (date && this.activeTab) {
                    this.service.setDate(date)
                    await this.initiateDrawn()
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods : {
        async initiateDrawn() {
            this.drawnOrders = this.getdrawnOrders((await this.service.getOrders('drawn')))
        },
        async initiateOpen() {
            this.labOrderRows = this.getLabOrderRows((await this.service.getOrders('ordered')))
        },
        async drawOrder() {
            try {
                const req = await this.service.updateOrderSpecimen(
                    this.order.order_id, this.selectedSpecimen.concept_id
                )
                if (req) {
                    // Update drawn order rows
                    this.drawnOrders = this.drawnOrders.concat(this.getdrawnOrders([req]))
                    // Remove drawn order from orders list
                    this.labOrderRows.splice(this.order.orderIndex, 1)
                    this.showSpecimenModal = false
                    return this.service.printSpecimenLabel(this.order.order_id)
                }
            }catch(e) {
                console.error(e)
            }
            toastDanger('Unable to draw sample')
        },
        getLabOrderRows(data: any): Array<RowInterface[]> {
            return data.map((d: any, index: number) => ([
                table.td(d.accession_number),
                table.td(d.tests.map((t: any) => t.name).join(',')),
                table.td(d.reason_for_test.name || 'N/A'),
                table.tdBtn('Drawn', async () => {
                    this.order = {...d, orderIndex: index }
                    this.showSpecimenModal = true
                    this.specimens = await PatientLabService
                        .getSpecimensForTests(d.tests)
                }, {}, 'success'),
                /**
                 * Order delete button
                 */
                table.tdBtn('Void', async () => {
                    voidWithReason(
                        async (reason: string) => {
                            try {
                                await this.service.voidOrder(d.order_id, reason)
                                this.labOrderRows.splice(index, 1)
                            } catch (e) {
                                toastDanger(e)
                            }
                        },
                        [
                            'Duplicate order',
                            'Wrong client'
                        ]
                    )
                }, {}, 'danger')
            ]))
        },
        getdrawnOrders(data: any): Array<RowInterface[]> {
            return data.map((d: any) => ([
                table.td(d.accession_number),
                table.td(d.tests.map((t: any) => t.name).join(',')),
                table.tdBtn('Print', () => {
                    this.service.printSpecimenLabel(d.order_id)
                })
            ]))
        },

    },
    props: {
        patient: {
            type: Object,
            required: true
        },
        visitDate: {
            type: String, 
        }
    }
})
</script>