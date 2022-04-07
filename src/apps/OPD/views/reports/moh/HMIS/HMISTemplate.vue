<template>
  <table class="my-table" style="margin: auto; width: 95%; margin-top: 3%; margin-bottom: 3%;">
  <tr>
    <td  colspan="2" class="td-text-align-left" style="width: min-content;">Diseases/Events/Conditions</td>
    <td  class="td-text-align-left" style="text-align: center;">#</td>
  </tr>
  <hmis-dummy v-if="show"></hmis-dummy>
  <tr   v-for="(condition, index) in conditions" :key="index">
    <td class="td-text-align-right td-wd">{{condition.id}}</td>
    <td class="td-text-align-right" style="width: 60%;padding: revert;">{{condition.name}}</td>
    <td id="total" class="td-text-align-right"  @click="onDrillDown(condition.totalPatientIds);"> <a> {{condition.total}} </a> </td>
  </tr>
  </table>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import HmisDummy from '@/apps/OPD/views/reports/moh/HMIS/HMISDummy.vue'
import { HMISReportService } from "@/apps/OPD/services/hmis_report_service"
import { Service } from "@/services/service"
import dayjs from 'dayjs';

export default {
  components: { HmisDummy },
  data: function(){
    return {
      show: true,
      conditions: []
    }
  },
  props: ["params", "onDrillDown","periodDates"],
  methods: {
   renderResults() {
     const report = new HMISReportService()
     const Conditions = report.renderResults(this.params)
     if(Conditions.length) {
       this.conditions = Conditions
       this.show = false
     } 
   },
   onDownload() {
     const report = new HMISReportService()
     let {CSVString} = report.getCSVString(this.conditions)
     CSVString += `
          Date Created: ${dayjs().format('DD/MMM/YYYY HH:MM:ss')}
          His-Core Version: ${Service.getCoreVersion()}
          API Version: ${Service.getApiVersion()}
          Report Period: ${this.periodDates}
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
.td-text-align-right.td-wd {
    width: 10%;
}
</style>