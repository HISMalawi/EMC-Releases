import{l as u}from"./loader-13c76502.js";import{_ as F}from"./ReportTable.vue_vue_type_style_index_0_lang-2ed957b1.js";import{t as m,g as R}from"./common-abc2f84d.js";import{a as _}from"./tx_report_service-1a913c4a.js";import{t as x}from"./toasts-2ce27f65.js";import{a as A}from"./arrays-31d2d38b.js";import{A as D}from"./age_groups-8203d13f.js";import{d as S,r as l,o as M,h as G}from"./index-67d679d3.js";import"./exports-3ab858a9.js";import"./index-2380d2dc.js";import"./his_date-1f6a8082.js";import"./vue-datepicker-2b343ada.js";import"./DrilldownTable-e46dc448.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./report_service-06dc39e3.js";import"./index-95d3a767.js";import"./url-ffe761c9.js";const L=S({__name:"TxRTT",setup($){const p=l("-"),c=l([]),g=l(),n=new _,d=[{path:"ageGroup",label:"Age group"},{path:"gender",label:"Gender",formatter:m},{path:"lessThanThree",label:"Returned <3 mo",drillable:!0},{path:"betweenThreeAndFive",label:"Returned 3-5 mo",drillable:!0},{path:"overSix",label:"Returned 6+ mo",drillable:!0}];function h(e,t,a,r){const o={gender:t,ageGroup:a,lessThanThree:[],betweenThreeAndFive:[],overSix:[]},b=R(e,"".concat(a,".").concat(t),[]);for(const{months:s,patient_id:i}of b)s<3?o.lessThanThree.push(i):s>=3&&s<6?o.betweenThreeAndFive.push(i):o.overSix.push(i);r[t].rows.push(o),r[t].aggregate.lessThanThree.push(...o.lessThanThree),r[t].aggregate.betweenThreeAndFive.push(...o.betweenThreeAndFive),r[t].aggregate.overSix.push(...o.overSix)}function T(e){const t={M:{rows:[],aggregate:{lessThanThree:[],betweenThreeAndFive:[],overSix:[]}},F:{rows:[],aggregate:{lessThanThree:[],betweenThreeAndFive:[],overSix:[]}}};return D.reduce((a,r)=>(h(e,"F",r,a),h(e,"M",r,a),a),t)}function f(e){const t=Object.values(e.F.aggregate).flat(1),a=Object.values(e.M.aggregate).flat(1);g.value=A([...t,...a])}async function w({dateRange:e},t=!1){try{await u.show(),n.setStartDate(e.startDate),n.setEndDate(e.endDate),p.value=n.getDateIntervalPeriod();const a=await n.getClinicTxRtt(t),r=T(a);c.value=[...r.F.rows,...r.M.rows,{ageGroup:"All",gender:"Male",...r.M.aggregate},...await n.buildMaternityAgreggateRows(r.F.aggregate)],f(r)}catch(a){x("ERROR! Unable to load report data"),console.error(a)}await u.hide()}function v(e){return"".concat(e.column.label," | ").concat(e.row.ageGroup," | ").concat(m(e.row.gender),"s")}return(e,t)=>(M(),G(F,{title:"Clinic TX RTT Report","report-type":"Clinic",columns:d,rows:c.value,period:p.value,"total-clients":g.value,"drill-title":v,useDateRangeFilter:"",showIndices:"",onGenerate:w},null,8,["rows","period","total-clients"]))}});export{L as default};
