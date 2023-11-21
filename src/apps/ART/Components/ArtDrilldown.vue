<template>
    <ion-page>
        <v2Datatable
            :title="title"
            :subtitle="subtitle"
            :columnData="reportData"
            :columns="columns"
            :on-finish="runFinishAction"
            :rowsPerPage="ITEMS_PER_PAGE"
        />
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';
import { IonPage } from "@ionic/vue"
import  v2Datatable from "@/components/DataViews/tables/v2PocDatatable/TableView.vue"
import { v2ColumnDataInterface, v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { useRouter } from "vue-router"
import { chunk } from 'lodash';
import { delayPromise } from '@/utils/Timers';
import { Patientservice } from '@/services/patient_service';
import { formatGender, toDate } from '@/utils/Strs';

const ITEMS_PER_PAGE = 25
const CACHE_LIFE = 3600000
const PATIENT_CACHE: Record<number, any> = {}
let cacheTimeoutInterval: any = null

export default defineComponent({ 
    props: {
        title: {
            type: String,
            default: 'Drilldown'
        },
        patientIdentifiers: {
            type: Object as PropType<number[]>
        },
        onFinish: {
            type: Function
        }
    },
    components: {
        IonPage,
        v2Datatable
    },
    setup(props) {
        const canLoadData = ref(true)
        const subtitle = ref('-')
        const reportData = ref<any>([])
        const router = useRouter()
        const columns: Array<v2ColumnInterface[]> = [
            [
                { label: 'ARV Number', ref: 'arv_number' },
                { label: 'Gender', ref: 'gender' },
                { label: 'Birthdate', ref: 'birthdate' },
                {
                    label: 'Action',
                    ref: 'patient_id',
                    exportable: false,
                    tdClick: ({data}: v2ColumnDataInterface) => router.push({ path: `/patient/dashboard/${data.patient_id}`}) ,
                    value: () => 'View client'
                }
            ]
        ]
        
        function runFinishAction() {
            canLoadData.value = false;
            if (typeof props.onFinish === 'function') props.onFinish()
        }

        watch(() => props.patientIdentifiers, async (data) => {
            reportData.value = []
            subtitle.value = `Total: 0`
            if (!(data && data.length)) return
            const backlog = chunk(data, ITEMS_PER_PAGE)
            if (!cacheTimeoutInterval) {
                cacheTimeoutInterval = setInterval(() => {
                    Object.keys(PATIENT_CACHE).forEach((key: any) => delete PATIENT_CACHE[key]);
                }, CACHE_LIFE)
            }
            for(const log of backlog) {
                for (const id of log) {
                    if (!canLoadData.value) break;
                    try {
                        if (!PATIENT_CACHE[id]) {
                            const patient = new Patientservice((await Patientservice.findByID(id)))
                            PATIENT_CACHE[id] = {
                                'arv_number': patient.getArvNumber(),
                                'patient_id': patient.getID(),
                                'gender': formatGender(patient.getGender()),
                                'birthdate': toDate(patient.getBirthdate())
                            }
                        }
                        reportData.value.push(PATIENT_CACHE[id])
                    } catch (e) {
                        console.error(e)
                        reportData.value.push({})
                    }
                    subtitle.value = `Total: ${reportData.value.length} of ${(data||[]).length}`
                }
                await delayPromise(250)
            }
        }, { immediate: true })

        return  {
            columns,
            subtitle,
            reportData,
            canLoadData,
            ITEMS_PER_PAGE,
            runFinishAction
        }
    }
})
</script>