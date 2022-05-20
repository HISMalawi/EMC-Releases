<template>
  <table class="my-table" style="margin: auto; width: 95%; margin-top: 3%; margin-bottom: 3%;">
  <tr>
    <td rowspan="2" colspan="2" class="td-text-align-left" style="width: min-content;">Diseases/Events/Conditions</td>
    <td colspan="3" class="td-text-align-left" style="text-align: center;">Out-patient Cases</td>
  </tr>
  <tr>
    <td class="td-text-align-left td-span-width">&#60;5 yrs</td>
    <td class="td-text-align-left td-span-width">&#62;&#61;5 yrs</td>
    <td class="td-text-align-left td-span-width">Total</td>
  </tr>
  <weekly-dummy v-if="show"></weekly-dummy>
  <tr   v-for="(condition, index) in conditions" :key="index">
    <td class="td-text-align-right">{{condition.id}}</td>
    <td class="td-text-align-right" style="width: 30%;padding: revert;">{{condition.name}}</td>
    <td id="ls-5yrs" class="td-text-align-right" @click="onDrillDown(condition.name+lessThanFiveYears, condition.lessThanFiveYearsPatientIds);"> <a> {{condition.lessThanFiveYears}} </a> </td>
    <td id="grt-5yrs" class="td-text-align-right" @click="onDrillDown(condition.name+greaterAndEqualFiveYears, condition.greaterThanEqualFiveYearsPatientIds);"> <a> {{condition.greaterThanEqualFiveYears}} </a> </td>
    <td id="total" class="td-text-align-right"  @click="onDrillDown(condition.name+total, condition.totalPatientIds);"> <a> {{condition.total}} </a> </td>
  </tr>
  </table>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import WeeklyDummy from '@/apps/OPD/views/reports/moh/IDSR/WeeklyDummy.vue'
import { IDSRReportService } from "@/apps/OPD/services/idsr_service"
import { Service } from "@/services/service"
import dayjs from 'dayjs';

export default {
  components: { WeeklyDummy },
  data: function(){
    return {
      show: true,
      conditions: [],
      lessThanFiveYears: " < 5 yrs",
      greaterAndEqualFiveYears: " >= 5 yrs",
      total: ' Total'
    }
  },
  props: ["params", "onDrillDown","epiweek"],
  methods: {
   renderResults() {
     const report = new IDSRReportService()
     const Conditions = report.renderResults(this.params)
     if(Conditions.length) {
       this.conditions = Conditions
       this.show = false
     } 
   },
   onDownload() {
     const report = new IDSRReportService()
     let {CSVString} = report.getCSVString(this.conditions)
     CSVString += `
          Date Created: ${dayjs().format('DD/MMM/YYYY HH:MM:ss')}
          His-Core Version: ${Service.getCoreVersion()}
          API Version: ${Service.getApiVersion()}
          Report Period: ${this.epiweek}
          Site: ${Service.getLocationName()}
          Site UUID: ${Service.getSiteUUID()}`
          ;
      // }
      const csvData = new Blob([CSVString], { type: "text/csv;charset=utf-8;" });
      //IE11 & Edge
      const reportTitle = `${Service.getLocationName()} Weekly IDSR report ${this.quarter}`;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(csvData, 'exportFilename');
      } else {
        //In FF link must be added to DOM to be clicked
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(csvData);
        link.setAttribute("download", `${reportTitle}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
   },
  },
  watch: {
    params: {
      immediate: true,
      handler() {
        this.renderResults();
      }
    }
  }
}
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
</style>