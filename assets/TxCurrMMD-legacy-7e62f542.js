System.register(["./loader-legacy-5e05219c.js","./ReportTable.vue_vue_type_script_setup_true_lang-legacy-dcfa1363.js","./tx_report_service-legacy-08fcdbf5.js","./toasts-legacy-ac0a9e63.js","./common-legacy-2d845b1c.js","./datatable-legacy-471fc9a1.js","./index-legacy-5705a9b7.js","./exports-legacy-d3f6086b.js","./index-legacy-668a84bd.js","./his_date-legacy-df0799d6.js","./vue-datepicker-legacy-008eb8d3.js","./DrilldownTable-legacy-4f1ea4f5.js","./_plugin-vue_export-helper-legacy-762b7923.js","./arrays-legacy-ea080c1a.js","./report_service-legacy-01542a7b.js","./index-legacy-aa705205.js","./url-legacy-2d97b2db.js","./age_groups-legacy-5143fd58.js"],(function(e,t){"use strict";var a,l,r,n,s,o,i,u,c,d,g;return{setters:[e=>{a=e.l},e=>{l=e._},e=>{r=e.T,n=e.a},e=>{s=e.t},e=>{o=e.t},e=>{i=e.t},e=>{u=e.d,c=e.r,d=e.o,g=e.h},null,null,null,null,null,null,null,null,null,null,null],execute:function(){e("default",u({__name:"TxCurrMMD",setup(e){const t=c("-"),u=c([]),p=[{path:"ageGroup",label:"Age group",thStyles:{minWidth:"150px !important"}},{path:"gender",label:"Gender",formatter:o,thStyles:{minWidth:"110px !important"}},...i(r,{thStyles:{minWidth:"350px !important"}})];async function y({dateRange:e},l){try{await a.show();const r=new n;r.setStartDate(e.startDate),r.setEndDate(e.endDate),t.value=r.getDateIntervalPeriod(),u.value=await r.getTxCurrMMDReport(l)}catch(r){s("ERROR! Unable to load report data"),console.error(r)}await a.hide()}function h(e){return`${e.row.ageGroup} | ${e.column.label} | ${o(e.row.gender)}s`}return(e,a)=>(d(),g(l,{title:"PEPFAR TX CURR MMD Report",subtitle:"Clients that are alive and on treatment in the reporting period and the difference in days between their clinical dispensation visit and \n      next appointment / drug-runout date is: 3 months (1 - 89 days), 3 - 5 months (90 - 179 days), 6+ months (180 or more days)","report-type":"PEPFAR",columns:p,rows:u.value,period:t.value,"drill-title":h,useDateRangeFilter:"",showIndices:"",onGenerate:y},null,8,["rows","period"]))}}))}}}));
