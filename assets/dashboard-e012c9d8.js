import{d as E,r as m,a2 as se,o as h,c as F,t as j,h as T,w as l,a as o,u as e,m as oe,b as N,l as J,a3 as ne,v as re,y as z,a4 as U,a5 as X,G as B,a6 as ie,H as A,f as le,I as ue,j as H,k as g,a7 as ce,a8 as de,a9 as pe,aa as me,ab as ge,ac as fe,ad as M,i as ve}from"./index-67d679d3.js";import{r as _e}from"./image-cb93bc3e.js";import{_ as he}from"./_plugin-vue_export-helper-c27b6911.js";import{_ as be}from"./LineChart.vue_vue_type_script_setup_true_lang-f4916d5e.js";import{D as De}from"./index-2380d2dc.js";import{R as W}from"./report_service-06dc39e3.js";import{t as Ie,s as ye,g as Ce,a as Te,b as xe}from"./his_date-1f6a8082.js";import{e as f}from"./encounter_types-ae359711.js";import{p as we}from"./url-ffe761c9.js";import{t as K}from"./toasts-2ce27f65.js";import"./index-95d3a767.js";import"./arrays-31d2d38b.js";import"./common-abc2f84d.js";const Ve=E({__name:"CountTo",props:{end:{type:Number,required:!0},start:{type:Number,default:0},time:{type:Number,default:500}},setup(t){const a=t,n=m(a.start);function u(){const i=a.end/a.time;n.value<a.end?(n.value=Math.ceil(n.value+i),setTimeout(u,1)):n.value=a.end}return se(()=>u()),(i,v)=>(h(),F("span",null,j(n.value),1))}}),Ae=["src"],Ne=E({__name:"BoxCard",props:{value:{type:Number,required:!0},label:{type:String,required:!0},icon:{type:String},img:{type:String},color:{type:String,default:"light"},isLoading:{type:Boolean,default:!1}},setup(t){return(a,n)=>(h(),T(e(X),{color:""},{default:l(()=>[o(e(U),null,{default:l(()=>[o(e(oe),{class:"text-sm"},{default:l(()=>[N(j(t.label),1)]),_:1}),o(e(J),{style:{"font-size":"x-large","font-weight":"bold"}},{default:l(()=>[t.isLoading?(h(),T(e(ne),{key:0,name:"bubbles",color:t.color},null,8,["color"])):(h(),T(Ve,{key:1,end:t.value},null,8,["end"]))]),_:1}),t.icon?(h(),T(e(re),{key:0,icon:t.icon,color:t.color,class:"ion-float-right ion-margin-top"},null,8,["icon","color"])):z("",!0),t.img?(h(),F("img",{key:1,src:e(_e)(t.img),class:"ion-float-right ion-margin-top"},null,8,Ae)):z("",!0)]),_:1})]),_:1}))}});const _=he(Ne,[["__scopeId","data-v-6289fcf4"]]),Ee=E({__name:"EncounterTable",props:{rowData:{type:Array,required:!0},isLoading:{type:Boolean,default:!1}},setup(t){const a={showSearchField:!1,showIndices:!1,showSubmitButton:!1,pagination:{enabled:!1}},n=[{path:"encounter",label:"Encounter Name",thStyles:{minWidth:"120px !important"}},{path:"female",label:"Female",sortable:!1},{path:"male",label:"Male",sortable:!1},{path:"me",label:"Me",sortable:!1},{path:"facility",label:"Facility",sortable:!1}];return(u,i)=>(h(),T(e(X),{style:{height:"100%"}},{default:l(()=>[o(e(U),null,{default:l(()=>[o(e(J),{class:"ion-padding-start ion-padding-bottom text-sm",style:{"font-weight":"800"}},{default:l(()=>[N("Encounters created today")]),_:1}),o(e(De),{rows:t.rowData,columns:n,color:"light",config:a,loading:t.isLoading},null,8,["rows","loading"])]),_:1})]),_:1}))}});class Re extends W{constructor(){super()}async getVisits(){this.useDefaultParams=!1;const a=await this.getReport("programs/".concat(this.programId,"/reports/visits"),{name:"visits"});return this.useDefaultParams=!0,Object.entries(a).reduce((n,[u,i])=>(n.dates.push(Ie(u)),n.complete.push(i.complete),n.incomplete.push(i.incomplete),n),{dates:[],complete:[],incomplete:[]})}getMissedAppointments(){return this.getReport("missed_appointments")}getAppointmentsDue(a){return this.getReport("programs/".concat(this.programId,"/booked_appointments"),{date:a})}getPatientsDueForVL(){return this.getReport("programs/".concat(this.programId,"/reports/vl_due"))}getDefaulters(){return this.getReport("defaulter_list",{pepfar:!0})}getPatientsOnDTG(){return this.getReport("programs/".concat(this.programId,"/reports/patients_on_dtg"))}async getTXCurrent(a){return this.getReport("programs/".concat(this.programId,"/reports/tx_curr"),{start_date:ye(this.startDate,a,"days")})}}const $={"HIV clinic registration":f.HIV_CLINIC_REGISTRATION,"HIV reception":f.HIV_RECEPTION,Vitals:f.VITALS,"HIV staging":f.HIV_STAGING,"HIV clinic consultation":f.HIV_CLINIC_CONSULTATION,"ART adherence":f.ART_ADHERENCE,Prescription:f.TREATMENT,Dispensing:f.DISPENSING,Appointments:f.APPOINTMENT};class Le extends W{constructor(){super()}buildEncounters(a,n){return Object.entries($).map(([u,i])=>({encounter:u,female:a?a[i].F:0,male:a?a[i].M:0,me:n?n[i].F+n[i].M:0,facility:a?a[i].F+a[i].M:0}))}async getStats(){const a=Object.values($),n=we("reports/encounters",this.buildParams()),u=await B.postJson(n,{encounter_types:a}),i=await B.postJson(n,{encounter_types:a,all:!0});return this.buildEncounters(u.data,i.data)}}const Oe={complete:[],incomplete:[],dates:[]},Q="__emc_dashboard_statistics__",q=new Le;function Se(){try{const t=localStorage.getItem(Q);return t?JSON.parse(t):void 0}catch(t){K("Error parsing cached stats. Please, refresh to load fresh stats");return}}function Pe(){var x,w,V,c,d,s,r,k,G;const t=Se(),a=m(!1),n=m((x=t==null?void 0:t.visits)!=null?x:Oe),u=m((w=t==null?void 0:t.missedAppointments)!=null?w:[]),i=m((V=t==null?void 0:t.appointmentsDue)!=null?V:[]),v=m((c=t==null?void 0:t.dueForVL)!=null?c:[]),b=m((d=t==null?void 0:t.defaulters)!=null?d:[]),D=m((s=t==null?void 0:t.patientsOnDTG)!=null?s:[]),I=m((r=t==null?void 0:t.txCurrent30)!=null?r:[]),y=m((k=t==null?void 0:t.txCurrent60)!=null?k:[]),C=m((G=t==null?void 0:t.encounters)!=null?G:q.buildEncounters());function R(){C.value=void 0,n.value=void 0,u.value=void 0,i.value=void 0,b.value=void 0,D.value=void 0,v.value=void 0,I.value=void 0,y.value=void 0}async function L(){const{start:O,end:S}=Ce(Te()),p=new Re;p.setStartDate(O),p.setEndDate(S),R(),a.value=!0;try{C.value=await q.getStats(),n.value=await p.getVisits(),i.value=await p.getAppointmentsDue(xe()),D.value=await p.getPatientsOnDTG(),I.value=await p.getTXCurrent(30),u.value=await p.getMissedAppointments(),v.value=await p.getPatientsDueForVL(),y.value=await p.getTXCurrent(60),b.value=await p.getDefaulters()}catch(P){console.error(P),K("Unable to update dashboard starts")}a.value=!1}return ie([n,u,i,v,b,D,I,y,C],([O,S,p,P,Y,Z,ee,te,ae])=>localStorage.setItem(Q,JSON.stringify({visits:O,missedAppointments:S,appointmentsDue:p,dueForVL:P,defaulters:Y,patientsOnDTG:Z,txCurrent30:ee,txCurrent60:te,encounters:ae}))),{visits:n,missedAppointments:u,appointmentsDue:i,dueForVL:v,defaulters:b,patientsOnDTG:D,txCurrent30:I,txCurrent60:y,encounters:C,isLoading:a,refresh:L}}const Fe={id:"containter"},ke={class:"ion-padding-start"},Qe=E({__name:"dashboard",setup(t){const{visits:a,missedAppointments:n,appointmentsDue:u,dueForVL:i,defaulters:v,patientsOnDTG:b,txCurrent30:D,txCurrent60:I,encounters:y,isLoading:C,refresh:R}=Pe(),L=A(()=>a?"No Data":"Loading data..."),x=A(()=>{var c,d;return(d=(c=a.value)==null?void 0:c.complete.concat(a.value.incomplete).reduce((s,r)=>s+=r,0))!=null?d:0}),w=A(()=>{var c,d;return{title:{text:"Complete / incomplete visits",align:"left"},xaxis:{categories:(d=(c=a.value)==null?void 0:c.dates)!=null?d:[],tickAmount:30,labels:{show:!0,rotate:-75}}}}),V=A(()=>{var c,d,s,r;return[{name:"Complete Visits",data:(d=(c=a.value)==null?void 0:c.complete)!=null?d:[]},{name:"Incomplete Visits",data:(r=(s=a.value)==null?void 0:s.incomplete)!=null?r:[]}]});return(c,d)=>(h(),F("div",Fe,[le("h1",ke,[N(" Dashboard "),o(e(ue),{class:"ion-margin-end ion-float-right",onClick:e(R),disabled:e(C)},{default:l(()=>[N(" Refresh ")]),_:1},8,["onClick","disabled"])]),o(e(ve),null,{default:l(()=>[o(e(H),null,{default:l(()=>[o(e(g),{"size-md":"3"},{default:l(()=>[o(_,{label:"Total Visits",value:x.value,icon:e(ce),color:"success","is-loading":!e(a)},null,8,["value","icon","is-loading"])]),_:1}),o(e(g),{"size-md":"3"},{default:l(()=>{var s,r;return[o(_,{label:"Missed Appointments",value:(r=(s=e(n))==null?void 0:s.length)!=null?r:0,icon:e(de),color:"danger","is-loading":!e(n)},null,8,["value","icon","is-loading"])]}),_:1}),o(e(g),{"size-md":"3"},{default:l(()=>{var s,r;return[o(_,{label:"Appointments Due",value:(r=(s=e(u))==null?void 0:s.length)!=null?r:0,icon:e(pe),color:"secondary","is-loading":!e(u)},null,8,["value","icon","is-loading"])]}),_:1}),o(e(g),{"size-md":"3"},{default:l(()=>{var s,r;return[o(_,{label:"Due For VL",value:(r=(s=e(i))==null?void 0:s.length)!=null?r:0,icon:e(me),color:"secondary","is-loading":!e(i)},null,8,["value","icon","is-loading"])]}),_:1}),o(e(g),{"size-md":"3"},{default:l(()=>{var s,r;return[o(_,{label:"Defaulter (this quarter)",value:(r=(s=e(v))==null?void 0:s.length)!=null?r:0,icon:e(ge),color:"danger","is-loading":!e(v)},null,8,["value","icon","is-loading"])]}),_:1}),o(e(g),{"size-md":"3"},{default:l(()=>{var s,r;return[o(_,{label:"Patients on DTG",value:(r=(s=e(b))==null?void 0:s.length)!=null?r:0,icon:e(fe),color:"primary","is-loading":!e(b)},null,8,["value","icon","is-loading"])]}),_:1}),o(e(g),{"size-md":"3"},{default:l(()=>{var s,r;return[o(_,{label:"Tx Curr (30 Days)",value:(r=(s=e(D))==null?void 0:s.length)!=null?r:0,icon:e(M),color:"primary","is-loading":!e(D)},null,8,["value","icon","is-loading"])]}),_:1}),o(e(g),{"size-md":"3"},{default:l(()=>{var s,r;return[o(_,{label:"Tx Curr (60 Days)",value:(r=(s=e(I))==null?void 0:s.length)!=null?r:0,icon:e(M),color:"primary","is-loading":!e(I)},null,8,["value","icon","is-loading"])]}),_:1})]),_:1}),o(e(H),{class:"ion-margin-bottom"},{default:l(()=>[o(e(g),{"size-md":"6"},{default:l(()=>[o(be,{series:V.value,options:w.value,placeholder:L.value},null,8,["series","options","placeholder"])]),_:1}),o(e(g),{"size-md":"6"},{default:l(()=>{var s;return[o(Ee,{"row-data":(s=e(y))!=null?s:[],"is-loading":!e(y)},null,8,["row-data","is-loading"])]}),_:1})]),_:1})]),_:1})]))}});export{Qe as default};
