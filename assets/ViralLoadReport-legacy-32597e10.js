System.register(["./loader-legacy-26a3e1a4.js","./ReportTable.vue_vue_type_script_setup_true_lang-legacy-6c7e5d60.js","./toasts-legacy-8814bb27.js","./regimens-legacy-68ba62aa.js","./viral_load_report_service-legacy-d98fe715.js","./index-legacy-5fd00317.js","./exports-legacy-fef1fa2a.js","./index-legacy-e04cac88.js","./his_date-legacy-f511c580.js","./vue-datepicker-legacy-672cca54.js","./common-legacy-42ce034b.js","./DrilldownTable-legacy-316aa25e.js","./_plugin-vue_export-helper-legacy-762b7923.js","./arrays-legacy-263c660a.js","./age_groups-legacy-5143fd58.js","./report_service-legacy-df1b8872.js","./index-legacy-aa705205.js","./url-legacy-2d97b2db.js"],(function(e,a){"use strict";var l,t,r,s,u,n,o,i,c,d;return{setters:[e=>{l=e.l},e=>{t=e._},e=>{r=e.t},e=>{s=e.R},e=>{u=e.V},e=>{n=e.d,o=e.S,i=e.g,c=e.o,d=e.h},null,null,null,null,null,null,null,null,null,null,null,null],execute:function(){e("default",n({__name:"ViralLoadReport",setup(e){const a=o([]),n=o(),g=o(),p=o("-"),y=[{path:"ageGroup",label:"Age Group"},...s.map((e=>({path:e,label:e}))),{path:"N/A",label:"Uknown"}],v=i((()=>[{id:"minVL",placeholder:"Min Viral Load",type:"number",value:n.value,required:!1},{id:"maxVL",placeholder:"Max Viral Load",type:"number",value:g.value,required:!1}]));async function j(e){await l.show();try{n.value=e.minVL,g.value=e.maxVL;const l=new u;l.setStartDate(e.dateRange.startDate),l.setEndDate(e.dateRange.endDate),p.value=l.getDateIntervalPeriod(),a.value=await l.getViralLoad({from:n.value,to:g.value})}catch(t){r("Unable to load report data"),console.error(t)}await l.hide()}return(e,l)=>(c(),d(t,{title:"MoH Viral Load Report","report-type":"MoH",columns:y,rows:a.value,period:p.value,"show-indices":"","use-date-range-filter":"","custom-filters":v.value,onGenerate:j},null,8,["rows","period","custom-filters"]))}}))}}}));
