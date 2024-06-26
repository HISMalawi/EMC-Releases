System.register(["./loader-legacy-c09b1ae3.js","./ReportTable.vue_vue_type_script_setup_true_lang-legacy-6a59f35f.js","./common-legacy-42ce034b.js","./toasts-legacy-74d888f1.js","./report_service-legacy-e4952686.js","./age_groups-legacy-5143fd58.js","./datatable-legacy-be84368c.js","./index-legacy-c6316dba.js","./exports-legacy-bbad59b8.js","./index-legacy-fa0c5051.js","./his_date-legacy-d6a21612.js","./vue-datepicker-legacy-affedcd3.js","./DrilldownTable-legacy-832e8344.js","./_plugin-vue_export-helper-legacy-762b7923.js","./arrays-legacy-263c660a.js","./index-legacy-aa705205.js","./url-legacy-2d97b2db.js"],(function(e,t){"use strict";var a,r,n,l,o,s,i,c,u,d,g,p;return{setters:[e=>{a=e.l},e=>{r=e._},e=>{n=e.g,l=e.t},e=>{o=e.t},e=>{s=e.R},e=>{i=e.A},e=>{c=e.t},e=>{u=e.d,d=e.r,g=e.o,p=e.h},null,null,null,null,null,null,null,null,null],execute:function(){const t={initiated_1:"Initiated one month",completed_1:"Completed one month",initiated_3:"Initiated Three months",completed_3:"Completed Three months",initiated_6:"Initiated Six months",completed_6:"Completed Six months"};class h extends s{constructor(){super()}async generate(){const e=await this.getReport(`programs/${this.programId}/reports/retention`),t=[],a=[];return i.forEach((r=>{t.push(this.buildRowData(e,"M",r)),a.push(this.buildRowData(e,"F",r))})),[...a,...t]}getIndicatorData(e,t,a){return e.filter((({gender:e,age_group:r})=>e===t&&r===a)).map((({patient_id:e})=>e))}buildRowData(e,t,a){const r=[1,3,6],l={ageGroup:a,gender:t};for(const o of r){const r=n(e,`${o}.all`,[]),s=n(e,`${o}.all`,[]);l[`initiated_${o}`]=this.getIndicatorData(r,t,a),l[`completed_${o}`]=this.getIndicatorData(s,t,a)}return l}}e("default",u({__name:"RetentionReport",setup(e){const n=d("-"),s=d([]),i=[{path:"ageGroup",label:"Age Group"},{path:"gender",label:"Gender",formatter:l},...c(t)];async function u({dateRange:e}){try{await a.show();const t=new h;t.setStartDate(e.startDate),t.setEndDate(e.endDate),n.value=t.getDateIntervalPeriod(),s.value=await t.generate()}catch(t){o("ERROR! Unable to load report data"),console.error(t)}await a.hide()}function _(e){return`${e.column.label} | ${e.row.ageGroup} | ${l(e.row.gender)}s`}return(e,t)=>(g(),p(r,{title:"Clinic Retention Report","report-type":"Clinic",columns:i,rows:s.value,period:n.value,"drill-title":_,"use-date-range-filter":"","show-indices":"",onGenerate:u},null,8,["rows","period"]))}}))}}}));
