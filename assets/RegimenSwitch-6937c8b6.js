import{l as i}from"./loader-1441845f.js";import{_ as l}from"./ReportTable.vue_vue_type_script_setup_true_lang-18fee1ca.js";import{p as c,t as u}from"./common-94ac9539.js";import{t as d}from"./toasts-926a2fd9.js";import{t as r,f}from"./his_date-3ca53c6f.js";import{R as h}from"./regimen_report_service-25fce2f6.js";import{d as g,S as n,o as _,h as b}from"./index-1c16650e.js";import"./exports-300de8ff.js";import"./index-e903e9ca.js";import"./vue-datepicker-312099be.js";import"./DrilldownTable-d5470f91.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./arrays-7f14d286.js";import"./regimens-494dea9f.js";import"./report_service-1011140c.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";const P=g({__name:"RegimenSwitch",setup(R){const a=n("-"),o=n([]),p=[{path:"arv_number",label:"ARV Number",preSort:c,initialSort:!0},{path:"gender",label:"Gender",formatter:u},{path:"birthdate",label:"DOB (Age in Years)",formatter:m},{path:"art_start_date",label:"Start Date",formatter:r},{path:"current_weight",label:"Weight (Kg)"},{path:"previous_regimen",label:"Prev Regimen"},{path:"current_regimen",label:"Curr Regimen"},{path:"medications",label:"ARVs"},{path:"dispensation_date",label:"Dispensation Date",formatter:r}];function m(e){return"".concat(r(e)," (").concat(f(e),")")}async function s({dateRange:e}){try{await i.show();const t=new h;t.setStartDate(e.startDate),t.setEndDate(e.endDate),a.value=t.getDateIntervalPeriod(),o.value=await t.getRegimenSwitchReport()}catch(t){d("ERROR! Unable to load report data"),console.error(t)}await i.hide()}return(e,t)=>(_(),b(l,{title:"Clinic Regimen Switch Report","report-type":"Clinic",columns:p,rows:o.value,period:a.value,"use-date-range-filter":"",onGenerate:s},null,8,["rows","period"]))}});export{P as default};
