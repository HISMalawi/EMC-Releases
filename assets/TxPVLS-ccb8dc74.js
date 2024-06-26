import{l as i}from"./loader-161c88b9.js";import{_ as c}from"./ReportTable.vue_vue_type_script_setup_true_lang-4a26db6e.js";import{t as n}from"./common-8a0477e8.js";import{t as d}from"./toasts-a30647ed.js";import{V as u,T as f}from"./viral_load_report_service-ccd592b5.js";import{t as _}from"./datatable-a3e74ed6.js";import{d as w,r as p,o as g,h}from"./index-9d5e84a5.js";import"./exports-ecad058b.js";import"./index-fca9b4d0.js";import"./his_date-68cf9d33.js";import"./vue-datepicker-7955ae14.js";import"./DrilldownTable-696672fe.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./arrays-d6bc15b2.js";import"./age_groups-8203d13f.js";import"./regimens-494dea9f.js";import"./report_service-595e8b35.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";const O=w({__name:"TxPVLS",setup(D){const o=p("-"),e=p([]),t=new u,s=[{path:"ageGroup",label:"Age group"},{path:"gender",label:"Gender",formatter:n},..._(f)];async function l({dateRange:r}){try{await i.show(),t.setStartDate(r.startDate),t.setEndDate(r.endDate),o.value=t.getDateIntervalPeriod(),e.value=await t.getTxPVLS()}catch(a){d("ERROR! Unable to load report data"),console.error(a)}await i.hide()}function m(r){return"".concat(r.column.label," | ").concat(r.row.ageGroup," | ").concat(n(r.row.gender),"s")}return(r,a)=>(g(),h(c,{title:"PEPFAR TX PVLS Report","report-type":"PEPFAR",columns:s,rows:e.value,period:o.value,"drill-title":m,useDateRangeFilter:"",showIndices:"",onGenerate:l},null,8,["rows","period"]))}});export{O as default};
