import{l as s}from"./loader-1441845f.js";import{_ as u}from"./ReportTable.vue_vue_type_script_setup_true_lang-18fee1ca.js";import{p as f,t as c}from"./common-94ac9539.js";import{t as i}from"./his_date-3ca53c6f.js";import{D as d}from"./defaulter_report_service-caec95bb.js";import{t as D}from"./toasts-926a2fd9.js";import{g as b}from"./datatable-e05a5ebd.js";import{d as h,S as a,o as _,h as g}from"./index-1c16650e.js";import"./exports-300de8ff.js";import"./index-e903e9ca.js";import"./vue-datepicker-312099be.js";import"./DrilldownTable-d5470f91.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./arrays-7f14d286.js";import"./report_service-1011140c.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";const U=h({__name:"DefaultersReport",setup(v){const o=a("-"),e=a([]),l=a("PEPFAR Defaulters List Report"),p=[b()],n=[{path:"arv_number",label:"ARV Number",preSort:f,initialSort:!0},{path:"given_name",label:"First name",exportable:!1},{path:"family_name",label:"Last name",exportable:!1},{path:"gender",label:"Gender",formatter:c},{path:"birthdate",label:"Date of Birth",formatter:i},{path:"current_age",label:"Age (At reporting)"},{path:"defaulter_date",label:"Defaulted Date",formatter:i}];async function m({dateRange:r}){await s.show();const t=new d;t.setStartDate(r.startDate),t.setEndDate(r.endDate),o.value=t.getDateIntervalPeriod();try{e.value=await t.getDefaulters(),l.value="PEPFAR Defaulters List Report <b>(".concat(e.value.length," Defaulters)</b>")}catch(w){D("Unable to load report data")}await s.hide()}return(r,t)=>(_(),g(u,{title:l.value,"report-type":"PEPFAR",columns:n,"row-action-buttons":p,rows:e.value,period:o.value,"use-date-range-filter":"","use-secure-export":"",onGenerate:m},null,8,["title","rows","period"]))}});export{U as default};
