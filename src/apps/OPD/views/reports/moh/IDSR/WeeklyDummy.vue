<template>
  <tr v-for="(condition, index) in conditions" :key="index">
    <td>{{index}}</td>
    <td class="td-text-align-left" style="width: 43.3%;padding: 1.5%;">{{condition}}</td>
    <td id="ls-5ys">0</td>
    <td id="grt-5yrs">0</td>
    <td id="total">0</td>
  </tr>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: function() {
    return {
      conditions: [
        'Diarrhoea SD U/5',
        'Food borne illness',
        'HIV/AIDS (New Cases)',
        'Injuries (RTA)',
        'Lymphatic Filariasis',
        'Malaria in pregnancy',
        'Onchocerciasis',
        'Malnutrition  U/5',
        'Viral Hepatitis',
        'Underweight Newborns  2500 g',
        'Trypanosomiasis',
        'Trachoma',
        'STI',
        'Severe Pneumonia U/5',
        'Schistosomiasis',
        'Perinatal deaths'
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
.td-text-align-left {
  text-align: left;
  margin: auto;
  margin-left: 20px;
}
</style>