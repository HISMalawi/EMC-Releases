System.register(["./loader-legacy-26a3e1a4.js","./ReportTable.vue_vue_type_script_setup_true_lang-legacy-6c7e5d60.js","./common-legacy-42ce034b.js","./toasts-legacy-8814bb27.js","./tpt_report_service-legacy-8cc70607.js","./index-legacy-5fd00317.js","./exports-legacy-fef1fa2a.js","./index-legacy-e04cac88.js","./his_date-legacy-f511c580.js","./vue-datepicker-legacy-672cca54.js","./DrilldownTable-legacy-316aa25e.js","./_plugin-vue_export-helper-legacy-762b7923.js","./arrays-legacy-263c660a.js","./report_service-legacy-df1b8872.js","./index-legacy-aa705205.js","./url-legacy-2d97b2db.js","./age_groups-legacy-5143fd58.js"],(function(e,t){"use strict";var l,a,r,s,n,o,u,c,i,p;return{setters:[e=>{l=e.l},e=>{a=e._},e=>{r=e.t},e=>{s=e.t},e=>{n=e.b,o=e.T},e=>{u=e.d,c=e.S,i=e.o,p=e.h},null,null,null,null,null,null,null,null,null,null,null],execute:function(){e("default",u({__name:"TptOutcomes",setup(e){const t=c("-"),u=c([]),g=[{path:"age_group",label:"Age Group"},{path:"tpt_type",label:"TPT Type"},...Object.entries(n).map((([e,t])=>({path:e,label:t,drillable:!0,sortable:!1})))];async function y({dateRange:e}){try{await l.show();const a=new o;a.setStartDate(e.startDate),a.setEndDate(e.endDate),t.value=a.getDateIntervalPeriod(),u.value=await a.getTtpOutcomes()}catch(a){s("ERROR! Unable to load report data"),console.error(a)}await l.hide()}function d(e){return`${e.column.label} | ${e.row.age_group} | ${r(e.row.tpt_type)}`}return(e,l)=>(i(),p(a,{title:"TPT Outcomes Clinic Report","report-type":"Clinic",columns:g,rows:u.value,period:t.value,"drill-title":d,"use-date-range-filter":"","show-indices":"",onGenerate:y},null,8,["rows","period"]))}}))}}}));
