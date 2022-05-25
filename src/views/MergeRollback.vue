<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="his-lg-text">
                    <ion-text color="danger">{{npid}}</ion-text> merge history
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list class="his-card">
                <ion-item class="his-md-text" v-for="(item, index) in patientInfo" :key="index"> 
                    <ion-label>
                        {{item.label}}:
                    </ion-label>
                    <b>{{item.value}}</b>
                </ion-item>
            </ion-list>
            <report-table :columns="columns" :rows="rows"></report-table>
        </ion-content>
        <ion-footer> 
            <ion-toolbar color="dark">
                <ion-button 
                    color="danger" 
                    size="large" 
                    slot="start"> 
                    Cancel 
                </ion-button>
                <ion-button 
                    @click="rollback"
                    :disabled="!isReversible" 
                    color="success" 
                    size="large" 
                    slot="end"> 
                    Reverse
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import {
    IonPage,
    IonContent,
    IonToolbar,
    IonHeader,
    IonFooter,
    IonTitle,
    IonList,
    IonItem,
    IonText,
    IonLabel,
    IonButton
} from "@ionic/vue"
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import table from "@/components/DataViews/tables/ReportDataTable"
import { MergingService, MergeHistory } from "@/services/merging_service"
import { Option } from '@/components/Forms/FieldInterface'
import { useRoute, useRouter } from 'vue-router'
import { toastDanger } from '@/utils/Alerts'

export default defineComponent({
    components: {
        IonText,
        IonPage,
        IonContent,
        IonToolbar,
        IonHeader,
        IonFooter,
        IonTitle,
        IonList,
        IonItem,
        IonLabel,
        IonButton,
        ReportTable
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const patientID = ref(-1)
        const rows = ref([] as any)
        const results = ref([] as MergeHistory[])
        const npid = `${route.params.id}`.toUpperCase() as string
        const patientInfo = ref([] as Option[])
        const columns = [
            [
                table.thTxt('First Name'),
                table.thTxt('Last name'),
                table.thTxt('Birthdate'),
                table.thTxt('Gender'),
                table.thTxt('Merge date'),
                table.thTxt('Merge type')
            ]
        ]

        const isReversible = computed(() => results.value.length > 0)

        onMounted(async () => {
            if (!npid) {
                router.back()
                return
            }
            try {
                results.value = (await MergingService.getMergeHistory(npid) || [])
            } catch (e) {
                toastDanger(`Merge history not found for ${npid}`)
            }
            rows.value = results.value.map((item: MergeHistory) => {
                if (patientID.value === -1) {
                    patientID.value = item['secondary_id']
                    patientInfo.value = [
                        { label: 'First name', value: item['secondary_first_name']},
                        { label: 'Last name', value: item['secondary_surname']}, 
                        { label: 'Birthdate', value: item['secondary_birthdate']},
                        { label: 'Gender', value: item['secondary_gender']},
                    ]
                }
                return [
                    table.td(item['primary_first_name']),
                    table.td(item['primary_surname']),
                    table.tdDate(item['primary_birthdate']),
                    table.td(item['primary_gender']),
                    table.tdDate(item['merge_date']),
                    table.td(item['merge_type'])
                ]
            })
        })

        async function rollback() {
            const ok = await MergingService.rollback(patientID.value)
            if (ok) {
                router.back()
            } else {
                toastDanger('Failed to rollback')
            }
        }

        return {
            isReversible,
            patientInfo,
            rollback,
            columns,
            rows,
            npid
        }
    }
})
</script>
<style scoped>
.his-card {
    margin: auto !important;
}
</style>
