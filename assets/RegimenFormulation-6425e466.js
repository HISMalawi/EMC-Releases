import{l as a}from"./loader-fc807f7f.js";import{_ as c}from"./ReportTable.vue_vue_type_script_setup_true_lang-7566087b.js";import{t as u}from"./toasts-b12b9f38.js";import{p as d,t as f}from"./common-abc2f84d.js";import{t as g}from"./his_date-5f878a20.js";import{R}from"./regimen_report_service-9deb0d3b.js";import{R as b,b as _}from"./regimens-494dea9f.js";import{t as i}from"./form-f915e7d2.js";import{g as h}from"./datatable-70a994f9.js";import{d as v,r as n,H as w,o as D,h as F}from"./index-3cd761e9.js";import"./exports-43b12b0a.js";import"./index-ff4fd6e8.js";import"./vue-datepicker-7be88e13.js";import"./DrilldownTable-fe464bc0.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./arrays-31d2d38b.js";import"./report_service-0353e3c5.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";import"./Strs-7ee8a435.js";const j=v({__name:"RegimenFormulation",setup(S){const o=n("-"),r=n([]),m=[h("patient_id")],s=[{path:"arv_number",label:"ARV Number",preSort:d,initialSort:!0},{path:"gender",label:"Gender",formatter:f},{path:"birthdate",label:"Date of Birth",formatter:g},{path:"regimen",label:"Reg. name"},{path:"drugs",label:"Formulation"}],p=w(()=>[{id:"regimen",label:"Select Regimen",type:"select",options:i(b)},{id:"formulation",label:"Formulation",type:"select",options:i(_)}]);async function l(e){await a.show();try{const t=new R;t.setStartDate(e.dateRange.startDate),t.setEndDate(e.dateRange.endDate),o.value=t.getDateIntervalPeriod(),r.value=await t.getRegimenFormulationReport(e.regimen.value,e.formulation.value)}catch(t){u("Unable to load report data"),console.error(t)}await a.hide()}return(e,t)=>(D(),F(c,{title:"Regimen Formulation: Patient Level Clinic Report","report-type":"Clinic",columns:s,rows:r.value,period:o.value,"row-action-buttons":m,"custom-filters":p.value,"use-date-range-filter":"",onGenerate:l},null,8,["rows","period","custom-filters"]))}});export{j as default};
