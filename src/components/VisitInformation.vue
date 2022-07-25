<template>
  <div class="report-content">
    <report-table
      :asyncRows="getRows"
      :columns="columns"
      :config="tableConfig"
    ></report-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { isArray } from "lodash";
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"

const tdStyles = {style: {fontSize: '11px !important', border: '1px solid #dddddd !important', textAlign: 'left'}}
const thStyles = {style: {fontSize: '12px !important', fontWeight: 'bold', textAlign: 'left', border: '1px solid #dddddd !important'}}

export default defineComponent({
  name: "HisResultCard",
  components: {
    ReportTable
  },
  data: () => ({
    tableConfig: { 
      showIndex: false,
      cssClasses: "table-bordered table-striped"
    },
    columns: [[
      table.thTxt('VISIT DATE', thStyles),
      table.thTxt('WEIGHT (Kg)', thStyles),
      table.thTxt('REG', thStyles),
      table.thTxt('VIRAL LOAD', thStyles),
      table.thTxt('TB STATUS', thStyles),
      table.thTxt('OUTCOME', thStyles),
      table.thTxt('PILLS DISPENSED', thStyles),
      table.thTxt('ACTIONS', thStyles)
    ]] as ColumnInterface[][],
  }),
  props: {
    icon: {
      required: false,
    },
    getVisitDates: {
      type: Function,
      required: true,
    },
  },
  methods: {
    printLabel(date: any) {
      this.$emit("onPrint", date);
    },
    showMore(date: any) {
      this.$emit("onDetails", date);
    },
    formatAdherence(vals: any) {
      if (isArray(vals)) {
        const f = [...vals];
        if (isArray(f)) {
          let j = "";
          f.forEach((element) => {
            j += `${element[0]}: (${element[1]}%), `;
          });
          return j;
        }
        return f;
      } else {
        return vals;
      }
    },
    async getRows (): Promise<RowInterface[][]> {
      const visitDates = await this.getVisitDates()
      return visitDates.map((item: any) => {
        return [
          table.tdBtn(item.label, () => this.printLabel(item.value), tdStyles, 'secondary'),
          table.td(item.data.weight, tdStyles),
          table.td(item.data.regimen, tdStyles),
          table.td(item.data['viral_load'], tdStyles),
          table.td(item.data['tb_status'].match(/Unknown/i) ? 'TB NOT suspected' : item.data['tb_status'], tdStyles),
          table.td(item.data.outcome.match(/Unk/i) ? "" : item.data.outcome, tdStyles),
          table.td((item.data?.drugs?.pills_given || []).map((d: any) =>  {
            return `${d['short_name'] || d['name']} <b>(${d.quantity || '?'})</b>`
          }).join('<br/>'), tdStyles),
          table.tdBtn('show more', () => this.showMore(item.value), tdStyles, 'secondary'),
        ]
      })
    }
  },
});
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>