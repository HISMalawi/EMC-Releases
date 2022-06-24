<template>
  <div style="margin: auto; width: 95%; margin-top: 1%;">
    <report-table 
    :columns="columns"
    :rows="rows"
    :config="{tableCssTheme}">
    </report-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ReportTable from "@/components/DataViews/tables/ReportDataTable.vue"
import table, { ColumnInterface, RowInterface } from "@/components/DataViews/tables/ReportDataTable"

export default defineComponent({
    components: { ReportTable },
    props: {
      clinicName: {
        type: String,
        default: ''
      },
      reportparams: {
        type: Object,
        required: true
      },
      totalOPDVisits: {
        type: Number,
        required: true
      },
      reportName: {
        type: String,
        required: true
      },
      periodLabel: {
        type: String,
        required: true
      },
      periodDates: {
        type: String,
        required: true
      },
      rangeLabel: {
        type: String,
        required: true
      },
      range: {
        type: String,
        required: true
      },
    },
    data: function() {
      return {
        rows: [] as RowInterface[][],
        columns: [
            [
              table.thTxt(this.reportName, {
                colspan: 2,
                sortable: false,
                exportable: false 
              })
            ]
        ] as ColumnInterface[][],
      }
    },
    mounted() {
      this.initTable()
    },
    methods: {
      initTable() {
        const rows: RowInterface[][] = []
        const tableHeaders = [
          {
            name: 'Country:',
            value: 'Malawi',
          },
          {
            name: 'Reporting Facility Name',
            value: this.clinicName
          },
          {
            name: this.rangeLabel,
            value: this.range
          },
          {
            name: this.periodLabel,
            value: this.periodDates
          },
          {
            name: 'Total OPD Visits:',
            value: this.totalOPDVisits
          }

        ]

        tableHeaders.forEach(item => {
                  rows.push([
          table.td(item.name, {style: {textAlign: 'left'}}),
          table.td(item.value, {style: {textAlign: 'left'}}),
        ])
        })

        
        this.rows = rows
      }
    }
  })
  </script>

<style scoped>
a {
    color: #337ab7;
    text-decoration: none;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tr {
  height: 45px;
}
.vertical-separator {
  border-width: 0px;
}
td {
  border-style: solid;
  border-width: 1px;
  text-align: center;
}

.section-description td {
  border-width: 0px;
}
.horisonatl-separator td {
  border-width: 0px;
}
.numbers {
  width: 2.5%;
  text-align: center;
  border-width: 0px 1px 0px 0px;
  border-style: dotted;
}
.sum-arrows {
  width: 75px;
  height: 55px;
}
.postfixes {
  font-size: x-small;
  font-weight: bold;
  position: relative;
  top: -15px;
  left: -40px;
}
.granules {
  width: 100%;
  height: 32px;
  margin: 10px;
  display: table;
}
.granules-row {
  display: table-row;
}
.granules-cell {
  display: table-cell;
  text-align: center;
}
.granules span{
  font-size: 10px;
}
.granules-right-td {
  border-right-style: dotted !important;
  border-right-width: 1px;
}
.td-text-align-left {
  text-align: left;
  padding-left: 10px;
  width: 20%;
}
</style>