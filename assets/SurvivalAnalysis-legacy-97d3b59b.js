!function(){function e(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}System.register(["./loader-legacy-c09b1ae3.js","./ReportTable.vue_vue_type_script_setup_true_lang-legacy-6a59f35f.js","./toasts-legacy-74d888f1.js","./common-legacy-42ce034b.js","./report_service-legacy-e4952686.js","./index-legacy-c6316dba.js","./exports-legacy-bbad59b8.js","./index-legacy-fa0c5051.js","./his_date-legacy-d6a21612.js","./vue-datepicker-legacy-affedcd3.js","./DrilldownTable-legacy-832e8344.js","./_plugin-vue_export-helper-legacy-762b7923.js","./arrays-legacy-263c660a.js","./index-legacy-aa705205.js","./url-legacy-2d97b2db.js"],(function(t,r){"use strict";var a,l,u,n,o,s,i,p,c,g,v;return{setters:[e=>{a=e.l},e=>{l=e._},e=>{u=e.t},e=>{n=e.i,o=e.g},e=>{s=e.R},e=>{i=e.d,p=e.r,c=e.H,g=e.o,v=e.h},null,null,null,null,null,null,null,null,null],execute:function(){var r=(e=>(e.GENERAL="General",e.CHILDREN="Children",e.WOMEN="Women",e))(r||{});class d extends s{constructor(){super(),e(this,"ageGroup",void 0),e(this,"quarter",void 0),e(this,"regenerate",void 0),this.quarter="",this.regenerate=!1,this.ageGroup="General"}setRegenerate(e){this.regenerate=e}getAgeGroup(){return this.ageGroup}setQuarter(e){this.quarter=e}setAgeGroup(e){this.ageGroup=e}async generateReport(){return this.reportBuilder(await this.getReport("cohort_survival_analysis",{quarter:this.quarter,regenerate:this.regenerate,age_group:this.ageGroup}))}getOutcomeInterval(e){const t=Object.values(e)[0];if(!t)return null;const r=Object.keys(t)[0];return parseInt(r,10)}reportBuilder(e){return Object.entries(null!=e?e:{}).reduce(((e,[t,r])=>{if(!n(r)){const a=this.getOutcomeInterval(r),l=o(r,`On antiretrovirals.${a}`,0),u=o(r,`Patient died.${a}`,0),n=o(r,`Defaulted.${a}`,0),s=o(r,`Treatment stopped.${a}`,0),i=o(r,`Patient transferred out.${a}`,0),p=o(r,`N/A.${a}`,0),c=l+u+n+s+i+p;e.push({subGroup:this.ageGroup,quarter:t,interval:a,alive:l,died:u,defaulted:n,stopped:s,transferred:i,unknown:p,total:c})}return e}),[])}}t("default",i({__name:"SurvivalAnalysis",setup(e){const t=p(),n=p(),o=p([]),s=p("MoH Survival Analysis Report"),i=[{path:"quarter",label:"Reg Cohort",initialSort:!0,initialSortOrder:"asc",preSort:e=>parseInt(e.split(" ")[1])},{path:"interval",label:"Interval (Months)"},{path:"subGroup",label:"Sub group"},{path:"total",label:"Total Reg (database)"},{path:"totalConfirmed",label:"Total Reg (Confirmed)"},{path:"alive",label:"Alive"},{path:"died",label:"Died"},{path:"defaulted",label:"Defaulted"},{path:"stopped",label:"Stopped"},{path:"transferred",label:"Transferred out"},{path:"unknown",label:"Unknown"}],h=c((()=>[{id:"ageGroup",type:"select",label:"Sub Group:",value:n.value,options:Object.values(r).map((e=>({label:e.match(/Women/i)?"Option B+":e,value:e})))}]));async function y({quarter:e,ageGroup:t},r=!1){await a.show();try{const a=new d;a.setRegenerate(r),a.setQuarter(e.value),a.setAgeGroup(t.value),o.value=await a.generateReport(),s.value=`MoH Survival Analysis (${t.value}) Report`}catch(l){u("Unable to load report data"),console.error(l)}await a.hide()}return(e,r)=>(g(),v(l,{title:"MoH Survival Analysis Report","report-type":"MoH",columns:i,rows:o.value,quarter:t.value,useQuarterFilter:"","use-secure-export":"","custom-filters":h.value,filename:s.value,onGenerate:y},null,8,["rows","quarter","custom-filters","filename"]))}}))}}}))}();
