(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d226ccc"],{e9ce:function(e,t,s){"use strict";s.r(t);var a=s("7a23");function r(e,t,s,r,o,i){const n=Object(a["resolveComponent"])("report-template");return Object(a["openBlock"])(),Object(a["createBlock"])(n,{title:e.title,period:e.period,rows:e.rows,fields:e.fields,columns:e.columns,canExportCsv:!0,canExportPDf:!0,reportReady:e.reportReady,onReportConfiguration:e.onPeriod},null,8,["title","period","rows","fields","columns","reportReady","onReportConfiguration"])}s("14d9");var o=s("1497"),i=s("44e3"),n=s("4ba2"),d=s("ad8d"),l=s("d95e"),p=s("9ceb"),h=Object(a["defineComponent"])({mixins:[i["a"]],components:{ReportTemplate:n["a"]},data:()=>({title:"Lab test result(s)",rows:[],cohort:[],reportType:"",reportReady:!1,columns:[],patientLevelColumns:[[p["a"].thTxt("ARV#"),p["a"].thTxt("Gender"),p["a"].thTxt("Birthdate"),p["a"].thTxt("Ordered"),p["a"].thTxt("Specimen"),p["a"].thTxt("Test"),p["a"].thTxt("Result"),p["a"].thTxt("Released")]],disaggregatedColumns:[p["a"].thTxt("Age group"),p["a"].thTxt("Gender")]}),created(){this.report=new o["a"],this.fields=this.getFormFields()},methods:{async onPeriod({type:e,tests:t}){this.reportReady=!0,this.rows=[],this.period=this.report.getDateIntervalPeriod(),this.reportType=e.value,"disaggregated"===this.reportType?this.setDisaggregatedRows(t):"patient_level"===this.reportType&&this.setPatientLevelRows(t)},getFormFields(){return[...this.getDateDurationFields(),{id:"tests",helpText:"Available test(s) results",type:l["b"].TT_MULTIPLE_SELECT,options:async(e,t,s)=>{this.report.setStartDate(s.start_date),this.report.setEndDate(s.end_date);const a=await this.report.getLabResultsReport(),r=this.buildAvailableTests(a);return this.buildAvailableTestOptions(r)}},{id:"type",helpText:"Select report type",type:l["b"].TT_SELECT,options:()=>[{label:"Disaggregated",value:"disaggregated"},{label:"Patient level",value:"patient_level"}]}]},buildAvailableTests(e){const t={};return this.sortByArvNumber(e).forEach(e=>{e.measures.forEach(s=>{s.name in t||(t[s.name]=[]),t[s.name].push({id:e.patient_id,arv:e.arv_number,gender:e.gender,ageGroup:e.age_group,birthdate:this.toDate(e.birthdate),ordered:this.toDate(e.order_date),specimen:e.test,test:s.name,result:`${s.modifier} ${s.value}`,released:this.toDate(e.result_date)})})}),t},buildAvailableTestOptions(e){const t=[];for(const s in e){const a=e[s];t.push({label:s,value:a.length,other:a})}return t},setDisaggregatedRows(e){const t=[],s=[];this.columns=[this.disaggregatedColumns.concat(e.map(e=>p["a"].thTxt(e.label)))];for(const a in d["a"]){const r=d["a"][a],o=[p["a"].td(r),p["a"].td("M")],i=[p["a"].td(r),p["a"].td("F")];e.forEach(({other:e})=>{const t=t=>e.filter(e=>e.gender===t&&e.ageGroup===r).map(e=>e.id);o.push(this.drill(t("M"))),i.push(this.drill(t("F")))}),t.push(o),s.push(i),this.rows=[...s,...t]}},setPatientLevelRows(e){this.columns=this.patientLevelColumns,e.forEach(({other:e})=>{e.forEach(e=>{this.rows.push([this.tdARV(e.arv),p["a"].td(e.gender),p["a"].tdDate(e.birthdate),p["a"].tdDate(e.ordered),p["a"].td(e.specimen),p["a"].td(e.test),p["a"].td(e.result),p["a"].tdDate(e.released)])})})}}}),u=s("d959"),c=s.n(u);const g=c()(h,[["render",r]]);t["default"]=g}}]);
//# sourceMappingURL=chunk-2d226ccc.a68680b8.js.map