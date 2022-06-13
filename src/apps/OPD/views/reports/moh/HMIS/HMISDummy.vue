<template>
  <tr v-for="(condition, index) in conditions" :key="index">
    <td>{{index}}</td>
    <td class="td-text-align-left" style="width: 60.3%;padding: 1.5%;">{{condition}}</td>
    <td>0</td>
    <td></td>
  </tr>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: function() {
    return {
      conditions: [
        'Sexually transmitted infections-new cases',
        'Syphilis in pregnancy',
        'Opportunistic infection - new cases',
        'Acute respiratory infections - new cases (U5)',
        'Diarrhoea non - bloody -new cases (under5)',
        'Malnutrition - new case (under 5)',
        'Cholera - confirmed new cases',
        'Malnutrition  U/5',
        'Measles - confirmed new cases',
        'Acute Flaccid paralysis -confirmed new cases',
        'Ebola - confirmed new cases',
        'Meningococal meningitis - confimed new cases',
        'Plague - confirmed new cases',
        'Rabies - confirmed new cases',
        'Yellow fever - confirmed new cases',
        'Dysentery - new cases',
        'Eye infections - new cases',
        'Ear infections - new cases',
        'Skin infections - new cases',
        'Oral conditions',
        'Schistosomiasis - new cases',
        'Leprosy - new cases',
        'Common injuries and woulds (except RTA)',
        'Number of road traffic accidents'
      ]
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
.td-text-align-right.td-wd {
    width: 10%;
}
.td-text-align-left {
  text-align: left;
  margin: auto;
  margin-left: 20px;
}
</style>