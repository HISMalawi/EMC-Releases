System.register(["./loader-legacy-26a3e1a4.js","./ReportTable.vue_vue_type_script_setup_true_lang-legacy-6c7e5d60.js","./common-legacy-42ce034b.js","./toasts-legacy-8814bb27.js","./age_groups-legacy-5143fd58.js","./report_service-legacy-df1b8872.js","./arrays-legacy-263c660a.js","./index-legacy-5fd00317.js","./exports-legacy-fef1fa2a.js","./index-legacy-e04cac88.js","./his_date-legacy-f511c580.js","./vue-datepicker-legacy-672cca54.js","./DrilldownTable-legacy-316aa25e.js","./_plugin-vue_export-helper-legacy-762b7923.js","./index-legacy-aa705205.js","./url-legacy-2d97b2db.js"],(function(e,t){"use strict";var a,r,l,o,n,s,u,d,g,p,i,c;return{setters:[e=>{a=e.l},e=>{r=e._},e=>{l=e.g,o=e.t},e=>{n=e.t},e=>{s=e.A},e=>{u=e.R},e=>{d=e.a},e=>{g=e.d,p=e.S,i=e.o,c=e.h},null,null,null,null,null,null,null,null],execute:function(){const t=["started_new_on_art","started_previously_on_art","completed_new_on_art","completed_previously_on_art"];class _ extends u{constructor(){super()}getTBPrevReport(){return this.getReport(`/programs/${this.programId}/reports/tb_prev2`)}buildReportData(e){const a=[];return["F","M"].forEach((r=>{s.forEach((o=>{const n={gender:r,ageGroup:o};t.forEach((t=>{n[`3hp_${t}`]=l(e[o][r],`3HP.${t}`,[]),n[`6h_${t}`]=l(e[o][r],`6H.${t}`,[])})),a.push(n)}))})),a}aggregate(e,t,a,r){return Object.values(e).reduce(((e,l)=>[...l[t][a][r],...e]),[])}getAggregatedMaleData(e){const a={gender:"Male",ageGroup:"All"};for(const r of t)a[`3hp_${r}`]=this.aggregate(e,"M","3HP",r),a[`6h_${r}`]=this.aggregate(e,"M","6H",r);return a}async getAggregatedMaternalStatus(e){const a=t.reduce(((t,a)=>[...t,{group:"3HP",indicator:a,data:this.aggregate(e,"F","3HP",a)},{group:"6H",indicator:a,data:this.aggregate(e,"F","6H",a)}]),[]),r=d(a.reduce(((e,t)=>[...e,...t.data]),[]).map((e=>e.patient_id))),l=await this.getMaternalStatus(r),o=l.FBf.concat(l.FP),n=[],s=(e,t,r)=>a.reduce(((a,r)=>r.indicator===e&&t===r.group?[...a,...r.data]:a),[]).filter((e=>"FNP"===r?!o.includes(e.patient_id):l[r].includes(e.patient_id)));for(const u of["FP","FNP","FBf"]){const e={gender:u,ageGroup:"All"};for(const a of t)e[`3hp_${a}`]=s(a,"3HP",u),e[`6h_${a}`]=s(a,"6H",u);n.push(e)}return n}}e("default",g({__name:"TbPrev",setup(e){const t=p("-"),l=p([]),s=[{path:"ageGroup",label:"Age group"},{path:"gender",label:"Gender",formatter:o},{path:"3hp_started_new_on_art",label:"3HP Started New on ART",drillable:!0},{path:"6h_started_new_on_art",label:"6H Started New on ART",drillable:!0},{path:"3hp_started_previously_on_art",label:"3HP Started Previously on ART",drillable:!0},{path:"6h_started_previously_on_art",label:"6H Started Previously on ART",drillable:!0},{path:"3hp_completed_new_on_art",label:"3HP Completed New on ART",drillable:!0},{path:"6h_completed_new_on_art",label:"6H Completed New on ART",drillable:!0},{path:"3hp_completed_previously_on_art",label:"3HP Completed Previously on ART",drillable:!0},{path:"6h_completed_previously_on_art",label:"6H Completed Previously on ART",drillable:!0}];async function u({dateRange:e}){try{await a.show();const r=new _;r.setStartDate(e.startDate),r.setEndDate(e.endDate),t.value=r.getDateIntervalPeriod();const o=await r.getTBPrevReport();l.value=r.buildReportData(o),l.value.push(r.getAggregatedMaleData(o)),l.value.push(...await r.getAggregatedMaternalStatus(o))}catch(r){n("ERROR! Unable to load report data"),console.error(r)}await a.hide()}function d(e){return`${e.column.label} | ${e.row.ageGroup} | ${o(e.row.gender)}s`}return(e,a)=>(i(),c(r,{title:"PEPFAR TB Prev Report","report-type":"PEPFAR",columns:s,rows:l.value,period:t.value,"drill-title":d,useDateRangeFilter:"",showIndices:"",onGenerate:u},null,8,["rows","period"]))}}))}}}));
