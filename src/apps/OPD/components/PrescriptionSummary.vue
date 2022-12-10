<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-row> 
                <ion-col>
                    <ion-title class="his-lg-text">Summary </ion-title>
                </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <view-port> 
                <div class="view-port-content"> 
                    <his-table :columns="columns" :styles="styles" :rows="rows" :rowColors="rowColors" :cellColors="cellColors"/>
                </div>
            </view-port>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import HisTable from "@/components/DataViews/HisBasicTable.vue"
import ViewPort from "@/components/DataViews/ViewPort.vue"
import { isEmpty } from "lodash"

export default defineComponent({
    components: { 
    HisTable,
    ViewPort
    },
    data: () => ({
        activeLabel: '' as string,
        columns: [] as Array<string>,
        rows: [] as Array<string>,
        rowColors: [] as Array<any>,
        cellColors: [] as Array<any>,
        styles: [] as Array<string>
    }),
    props: {
        checkedItems: {
            type: Object as any,
            required: true
        }
    },
    watch: {
    checkedItems(){
        this.init()
    }
  },
    mounted() {
        this.init()
    },
    activated() {
        this.init()    
    },
    methods: {
        init() {
            if (isEmpty(this.checkedItems)) return
            const rows = this.checkedItems.map((drug: any) => [
              drug.label,
              drug.other.frequency,
              `${drug.other.dosage} ${drug.other.units}`,
              `${drug.other.duration} days`
            ])
            this.columns =  [ 'Drug Name','Frequency','Dosage','Duration']
            this.rows = rows
            this.rowColors = []
            this.cellColors = []
            this.styles =  []
        }
    },
})
</script>
<style scoped>
    .view-port-content {
        background: white !important;
    }
</style>
