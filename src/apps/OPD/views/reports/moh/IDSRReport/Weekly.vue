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
  <!-- <div class="aaa" :v-if="show"> -->
    <weekly-dummy v-if="show"></weekly-dummy>
  <!-- </div> -->
  <tr   v-for="(condition, index) in conditions" :key="index">
    <td class="td-text-align-right">{{condition.id}}</td>
    <td class="td-text-align-right" style="width: 30%;padding: revert;">{{condition.name}}</td>
    <td id="ls-5yrs" class="td-text-align-right" @click="onDrillDown(condition.lessThanFiveYearsPatientIds);"> <a> {{condition.lessThanFiveYears}} </a> </td>
    <td id="grt-5yrs" class="td-text-align-right" @click="onDrillDown(condition.greaterThanEqualFiveYearsPatientIds);"> <a> {{condition.greaterThanEqualFiveYears}} </a> </td>
    <td id="total" class="td-text-align-right"  @click="onDrillDown(condition.totalPatientIds);"> <a> {{condition.total}} </a> </td>
  </tr>
  </table>

</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */
import WeeklyDummy from '@/apps/OPD/views/reports/moh/IDSRReport/WeeklyDummy.vue'
import { IDSRReportService } from "@/apps/OPD/services/idsr_service"

export default {
  components: { WeeklyDummy },
  data: function(){
    return {
      show: true,
      conditions: []
    }
  },
  props: ["params", "reportid", "quarter", "onDrillDown"],
  methods: {
   renderResults() {
     const report = new IDSRReportService()
     const Conditions = report.renderResults(this.params)

     if(Conditions.length) {
       console.log({Conditions})
       this.conditions = Conditions
       this.show = false
     }
     
   },
  //  async drillDown(indicator_name){
  //   if(!this.reportid)
  //   return;
  //   for(let i = 0; i < this.params.length;  i++){
  //     if(this.params[i].name === indicator_name){
  //       indicator_id = this.params[i].id;
  //     }
  //   }
  //   await this.onDrillDown(indicator_id)
  //  }
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