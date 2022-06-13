<template>
  <table style="margin: auto; width: 95%; margin-top: 1%;">
    <tr id="">
      <td colspan="5" id="" style="border-right-style: solid; font-weight: bold; text-align: center;">{{reportName}}</td>
    </tr>
  <tr>
    <td class="td-text-align-left">Country:</td>
    <td class="td-text-align-left">Malawi</td>
  </tr>
  <tr>
    <td class="td-text-align-left">Reporting Facility Name:</td>
    <td class="td-text-align-left">{{clinicName}}</td>
  </tr>
  <tr>
    <td class="td-text-align-left">{{periodLabel}}</td>
    <td class="td-text-align-left">{{periodDates}}</td>
  </tr>
  <tr>
    <td class="td-text-align-left">Total OPD Visits: </td>
    <td class="td-text-align-left"><span id="total_visits">{{totalOPDVisits}}</span></td>
  </tr>
  </table>
</template>

<script lang="ts">
  export default {
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
    },
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
.td-text-align-left {
  text-align: left;
  padding-left: 10px;
  width: 20%;
}
</style>