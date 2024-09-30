import{l as n}from"./loader-13c76502.js";import{t as d,_ as c}from"./ReportTable.vue_vue_type_style_index_0_lang-2ed957b1.js";import{T as u,a as h}from"./tx_report_service-1a913c4a.js";import{t as f}from"./toasts-2ce27f65.js";import{t as i}from"./common-abc2f84d.js";import{d as D,r as s,o as w,h as _}from"./index-67d679d3.js";import"./exports-3ab858a9.js";import"./index-2380d2dc.js";import"./his_date-1f6a8082.js";import"./vue-datepicker-2b343ada.js";import"./DrilldownTable-e46dc448.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./arrays-31d2d38b.js";import"./report_service-06dc39e3.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";import"./age_groups-8203d13f.js";const k=D({__name:"TxCurrMMD",setup(g){const r=s("-"),o=s([]),p=[{path:"ageGroup",label:"Age group",thStyles:{minWidth:"150px !important"}},{path:"gender",label:"Gender",formatter:i,thStyles:{minWidth:"110px !important"}},...d(u,{thStyles:{minWidth:"350px !important"}})];async function m({dateRange:t},a){try{await n.show();const e=new h;e.setStartDate(t.startDate),e.setEndDate(t.endDate),r.value=e.getDateIntervalPeriod(),o.value=await e.getTxCurrMMDReport(a)}catch(e){f("ERROR! Unable to load report data"),console.error(e)}await n.hide()}function l(t){return"".concat(t.row.ageGroup," | ").concat(t.column.label," | ").concat(i(t.row.gender),"s")}return(t,a)=>(w(),_(c,{title:"PEPFAR TX CURR MMD Report",subtitle:"Clients that are alive and on treatment in the reporting period and the difference in days between their clinical dispensation visit and \n      next appointment / drug-runout date is: 3 months (1 - 89 days), 3 - 5 months (90 - 179 days), 6+ months (180 or more days)","report-type":"PEPFAR",columns:p,rows:o.value,period:r.value,"drill-title":l,useDateRangeFilter:"",showIndices:"",onGenerate:m},null,8,["rows","period"]))}});export{k as default};
