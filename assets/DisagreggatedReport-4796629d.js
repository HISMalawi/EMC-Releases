import{l as i}from"./loader-1441845f.js";import{_ as m}from"./ReportTable.vue_vue_type_script_setup_true_lang-18fee1ca.js";import{D as c}from"./disagregated_report_service-31910659.js";import{R as u}from"./regimens-494dea9f.js";import{t as d}from"./common-94ac9539.js";import{t as g}from"./toasts-926a2fd9.js";import{d as f,S as p,o as b,h}from"./index-1c16650e.js";import"./exports-300de8ff.js";import"./index-e903e9ca.js";import"./his_date-3ca53c6f.js";import"./vue-datepicker-312099be.js";import"./DrilldownTable-d5470f91.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./arrays-7f14d286.js";import"./age_groups-8203d13f.js";import"./program_report_service-2cf7f172.js";import"./report_service-1011140c.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";const U=f({__name:"DisagreggatedReport",setup(D){const a=p("-"),l=p([]),s=[{path:"ageGroup",label:"Age Group"},{path:"gender",label:"Gender",formatter:d},{path:"txCurr",label:"TX curr (receiving ART)",drillable:!0},...u.map(r=>({path:r,label:r,drillable:!0})),{path:"N/A",label:"Unknown",drillable:!0},{path:"total",label:"Total",drillable:!0}],n=async({dateRange:r},o=!0,t="Custom")=>{try{await i.show();const e=new c;e.setStartDate(r.startDate),e.setEndDate(r.endDate),e.setRebuildOutcome(o),e.setQuarter(t),a.value=e.getDateIntervalPeriod(),l.value=await e.getDisaggReport(o,"pepfar")}catch(e){console.error(e),g("Error! Unable to generate report")}i.hide()};return(r,o)=>(b(),h(m,{title:"PEPFAR Disaggregated Report","report-type":"PEPFAR",columns:s,rows:l.value,period:a.value,"drill-title":t=>"".concat(t.row.ageGroup," ").concat(t.column.label," | ").concat(t.row.gender,"s"),useDateRangeFilter:"",showIndices:"",onGenerate:n},null,8,["rows","period","drill-title"]))}});export{U as default};
