<template>
    <ion-page>
        <v2Datatable
            :title="title"
            :subtitle="subtitle"
            :columnData="patients"
            :columns="columns"
            :on-finish="onFinish"
            :rowsPerPage="ITEMS_PER_PAGE"
        />
    </ion-page>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { IonPage } from "@ionic/vue"
import  v2Datatable from "@/components/DataViews/tables/v2PocDatatable/TableView.vue"
import { v2ColumnDataInterface, v2ColumnInterface } from '@/components/DataViews/tables/v2PocDatatable/types';
import { useRouter } from "vue-router"
import { formatGender } from '@/utils/Strs';

defineProps<{
    title: string;
    patients: Array<any>;
    onFinish: () => any;
}>();

const ITEMS_PER_PAGE = 20;
const subtitle = ref('-')
const router = useRouter()
const columns: Array<v2ColumnInterface[]> = [[
    {
        label: 'ARV Number',
        ref: 'arv_number'
    },
    {
        label: 'Gender',
        ref: 'gender',
        value: (data: any) => formatGender(data.gender)
    },
    {
        label: 'Systolic/Diastolic',
        ref: 'diastolic',
        value: (data) => `${data.systolic}/${data.diastolic}`
    },
    {
        label: 'Action',
        ref: 'patient_id',
        exportable: false,
        tdClick: ({data}: v2ColumnDataInterface) => router.push({ path: `/patient/dashboard/${data.patient_id}`}) ,
        value: () => 'View client'
    }
]]
</script>