import{l as a}from"./loader-1c88a23f.js";import{_ as s}from"./ReportTable.vue_vue_type_script_setup_true_lang-8fdfbbf3.js";import{p as l,t as c}from"./common-abc2f84d.js";import{t as f,c as u}from"./his_date-1bddad28.js";import{t as d}from"./toasts-d882244a.js";import{R as _}from"./report_service-ee0f5881.js";import{g as h}from"./datatable-96228f13.js";import{d as b,r as w,o as g,h as R}from"./index-a3fc2e12.js";import"./exports-d964c26f.js";import"./index-b8a0d675.js";import"./vue-datepicker-7c4021ca.js";import"./DrilldownTable-df83cd6e.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./arrays-31d2d38b.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";const W=b({__name:"AppointmentReport",setup(y){const r=w([]),p=[h()],n=[{path:"arv_number",label:"ARV Number",preSort:l,initialSort:!0},{path:"given_name",label:"First name",exportable:!1},{path:"family_name",label:"Last name",exportable:!1},{path:"gender",label:"Gender",formatter:c},{path:"birthdate",label:"Date of Birth",formatter:f}];async function i({date:e}){var o;await a.show();const t=new _;try{r.value=(o=await t.getReport("programs/".concat(t.programId,"/scheduled_appointments"),{date:u(e)}))!=null?o:[]}catch(m){d("Unable to load report data"),console.error(m)}await a.hide()}return(e,t)=>(g(),R(s,{title:"Clinic Appointments Report","report-type":"Clinic",columns:n,"row-action-buttons":p,rows:r.value,"use-date-filter":"","use-secure-export":"",onGenerate:i},null,8,["rows"]))}});export{W as default};
