<template>
    <div class="overview">
        <report-table
            :rows="rows"
            :columns="columns"
            :config="{
                tableCssTheme: 'art-report-theme',
                skeletonTextRows: 5,
                showIndex: false
            }"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable" 
import table from "@/components/DataViews/tables/ReportDataTable"
//TODO: import service to get data
export default defineComponent({
    components: { ReportTable },
    setup() {
        const columns =  [
            [
                table.thTxt('Task Type'),
                table.thTxt('Me'),
                table.thTxt('Today'),
            ] as ColumnInterface[]
        ]
        const rows = ref([] as RowInterface[])
        onMounted(() => {
            // Set rows here
        })
        return {
            columns,
            rows
        }
    }
})
</script>
<style scoped>
    .overview {
        margin: 10px;
        max-height: 60vh;
        overflow-x: auto;
    }
</style>