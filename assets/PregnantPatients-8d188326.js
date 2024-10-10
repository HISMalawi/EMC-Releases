import{l as o}from"./loader-13c76502.js";import{g as m,_ as l}from"./ReportTable.vue_vue_type_style_index_0_lang-2ed957b1.js";import{t as c}from"./toasts-2ce27f65.js";import{p as f,t as u}from"./common-abc2f84d.js";import{t as d}from"./his_date-1f6a8082.js";import{P as _}from"./program_report_service-d53f9afb.js";import{d as b,r as n,o as h,h as g}from"./index-67d679d3.js";import"./exports-3ab858a9.js";import"./index-2380d2dc.js";import"./vue-datepicker-2b343ada.js";import"./DrilldownTable-e46dc448.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./arrays-31d2d38b.js";import"./report_service-06dc39e3.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";const I=b({__name:"PregnantPatients",setup(w){const r=n("-"),a=n([]),i=[m("patient_id")],s=[{path:"arv_number",label:"ARV Number",preSort:f,initialSort:!0},{path:"given_name",label:"First name",exportable:!1},{path:"family_name",label:"Last name",exportable:!1},{path:"gender",label:"Gender",formatter:u},{path:"birthdate",label:"Date of Birth",formatter:d}];async function p({dateRange:e}){await o.show();try{const t=new _;t.setStartDate(e.startDate),t.setEndDate(e.endDate),r.value=t.getDateIntervalPeriod(),a.value=await t.generate("pregnant_patients")}catch(t){c("Unable to load report data"),console.error(t)}await o.hide()}return(e,t)=>(h(),g(l,{title:"Pregnant Patients Clinic Report","report-type":"Clinic",columns:s,rows:a.value,period:r.value,"row-action-buttons":i,"use-date-range-filter":"","use-secure-export":"",onGenerate:p},null,8,["rows","period"]))}});export{I as default};
