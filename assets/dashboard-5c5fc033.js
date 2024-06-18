import{d as S,S as m,T as se,o as h,c as z,t as U,h as T,w as l,a as n,u as e,U as oe,b as N,V as j,W as ne,i as re,j as B,X as J,Y as X,l as G,Z as ie,g as A,f as le,I as ue,_ as M,$ as g,a0 as ce,a1 as de,a2 as pe,a3 as me,a4 as ge,a5 as fe,a6 as H,a7 as ve}from"./index-1c16650e.js";import{r as _e}from"./image-cb93bc3e.js";import{_ as he}from"./_plugin-vue_export-helper-c27b6911.js";import{_ as be}from"./LineChart.vue_vue_type_script_setup_true_lang-46342194.js";import{D as ye}from"./index-e903e9ca.js";import{R as W}from"./report_service-1011140c.js";import{t as De,s as Ie,g as Ce,a as Te,b as xe}from"./his_date-3ca53c6f.js";import{e as v}from"./encounter_types-55fa45e3.js";import{p as we}from"./url-ffe761c9.js";import{t as Y}from"./toasts-926a2fd9.js";import"./index-95d3a767.js";import"./arrays-7f14d286.js";import"./common-94ac9539.js";const Ve=S({__name:"CountTo",props:{end:{type:Number,required:!0},start:{type:Number,default:0},time:{type:Number,default:500}},setup(t){const a=t,s=m(a.start);function u(){const i=a.end/a.time;s.value<a.end?(s.value=Math.ceil(s.value+i),setTimeout(u,1)):s.value=a.end}return se(()=>u()),(i,f)=>(h(),z("span",null,U(s.value),1))}}),Ae=["src"],Ne=S({__name:"BoxCard",props:{value:{type:Number,required:!0},label:{type:String,required:!0},icon:{type:String},img:{type:String},color:{type:String,default:"light"},isLoading:{type:Boolean,default:!1}},setup(t){return(a,s)=>(h(),T(e(X),{color:""},{default:l(()=>[n(e(J),null,{default:l(()=>[n(e(oe),{class:"text-sm"},{default:l(()=>[N(U(t.label),1)]),_:1}),n(e(j),{style:{"font-size":"x-large","font-weight":"bold"}},{default:l(()=>[t.isLoading?(h(),T(e(ne),{key:0,name:"bubbles",color:t.color},null,8,["color"])):(h(),T(Ve,{key:1,end:t.value},null,8,["end"]))]),_:1}),t.icon?(h(),T(e(re),{key:0,icon:t.icon,color:t.color,class:"ion-float-right ion-margin-top"},null,8,["icon","color"])):B("",!0),t.img?(h(),z("img",{key:1,src:e(_e)(t.img),class:"ion-float-right ion-margin-top"},null,8,Ae)):B("",!0)]),_:1})]),_:1}))}});const _=he(Ne,[["__scopeId","data-v-6289fcf4"]]),Se=S({__name:"EncounterTable",props:{rowData:{type:Array,required:!0},isLoading:{type:Boolean,default:!1}},setup(t){const a={showSearchField:!1,showIndices:!1,showSubmitButton:!1,pagination:{enabled:!1}},s={maxWidth:"78px !important",fontSize:"var(--font-size-sm)"},u=[{path:"encounter",label:"Encounter Name",thStyles:s,tdStyles:s},{path:"female",label:"Female",thStyles:s,tdStyles:s},{path:"male",label:"Male",thStyles:s,tdStyles:s},{path:"me",label:"Me",thStyles:s,tdStyles:s},{path:"facility",label:"Facility",thStyles:s,tdStyles:s}];return(i,f)=>(h(),T(e(X),{style:{height:"100%"}},{default:l(()=>[n(e(J),null,{default:l(()=>[n(e(j),{class:"ion-padding-start ion-padding-bottom text-sm",style:{"font-weight":"800"}},{default:l(()=>[N("Encounters created today")]),_:1}),n(e(ye),{rows:t.rowData,columns:u,color:"light",config:a,loading:t.isLoading},null,8,["rows","loading"])]),_:1})]),_:1}))}});class Ee extends W{constructor(){super()}async getVisits(){this.useDefaultParams=!1;const a=await this.getReport("programs/".concat(this.programId,"/reports/visits"),{name:"visits"});return this.useDefaultParams=!0,Object.entries(a).reduce((s,[u,i])=>(s.dates.push(De(u)),s.complete.push(i.complete),s.incomplete.push(i.incomplete),s),{dates:[],complete:[],incomplete:[]})}getMissedAppointments(){return this.getReport("missed_appointments")}getAppointmentsDue(a){return this.getReport("programs/".concat(this.programId,"/booked_appointments"),{date:a})}getPatientsDueForVL(){return this.getReport("programs/".concat(this.programId,"/reports/vl_due"))}getDefaulters(){return this.getReport("defaulter_list",{pepfar:!0})}getPatientsOnDTG(){return this.getReport("programs/".concat(this.programId,"/reports/patients_on_dtg"))}async getTXCurrent(a){return this.getReport("programs/".concat(this.programId,"/reports/tx_curr"),{start_date:Ie(this.startDate,a,"days")})}}const $={"HIV clinic registration":v.HIV_CLINIC_REGISTRATION,"HIV reception":v.HIV_RECEPTION,Vitals:v.VITALS,"HIV staging":v.HIV_STAGING,"HIV clinic consultation":v.HIV_CLINIC_CONSULTATION,"ART adherence":v.ART_ADHERENCE,Prescription:v.TREATMENT,Dispensing:v.DISPENSING,Appointments:v.APPOUNTMENT};class Re extends W{constructor(){super()}buildEncounters(a,s){return Object.entries($).map(([u,i])=>({encounter:u,female:a?a[i].F:0,male:a?a[i].M:0,me:s?s[i].F+s[i].M:0,facility:a?a[i].F+a[i].M:0}))}async getStats(){const a=Object.values($),s=we("reports/encounters",this.buildParams()),u=await G.postJson(s,{encounter_types:a}),i=await G.postJson(s,{encounter_types:a,all:!0});return this.buildEncounters(u.data,i.data)}}const Le={complete:[],incomplete:[],dates:[]},K="__emc_dashboard_statistics__",q=new Re;function Oe(){try{const t=localStorage.getItem(K);return t?JSON.parse(t):void 0}catch(t){Y("Error parsing cached stats. Please, refresh to load fresh stats");return}}function Pe(){var x,w,V,c,d,o,r,F,k;const t=Oe(),a=m(!1),s=m((x=t==null?void 0:t.visits)!=null?x:Le),u=m((w=t==null?void 0:t.missedAppointments)!=null?w:[]),i=m((V=t==null?void 0:t.appointmentsDue)!=null?V:[]),f=m((c=t==null?void 0:t.dueForVL)!=null?c:[]),b=m((d=t==null?void 0:t.defaulters)!=null?d:[]),y=m((o=t==null?void 0:t.patientsOnDTG)!=null?o:[]),D=m((r=t==null?void 0:t.txCurrent30)!=null?r:[]),I=m((F=t==null?void 0:t.txCurrent60)!=null?F:[]),C=m((k=t==null?void 0:t.encounters)!=null?k:q.buildEncounters());function E(){C.value=void 0,s.value=void 0,u.value=void 0,i.value=void 0,b.value=void 0,y.value=void 0,f.value=void 0,D.value=void 0,I.value=void 0}async function R(){const{start:L,end:O}=Ce(Te()),p=new Ee;p.setStartDate(L),p.setEndDate(O),E(),a.value=!0;try{C.value=await q.getStats(),s.value=await p.getVisits(),i.value=await p.getAppointmentsDue(xe()),y.value=await p.getPatientsOnDTG(),D.value=await p.getTXCurrent(30),u.value=await p.getMissedAppointments(),f.value=await p.getPatientsDueForVL(),I.value=await p.getTXCurrent(60),b.value=await p.getDefaulters()}catch(P){console.error(P),Y("Unable to update dashboard starts")}a.value=!1}return ie([s,u,i,f,b,y,D,I,C],([L,O,p,P,Q,Z,ee,te,ae])=>localStorage.setItem(K,JSON.stringify({visits:L,missedAppointments:O,appointmentsDue:p,dueForVL:P,defaulters:Q,patientsOnDTG:Z,txCurrent30:ee,txCurrent60:te,encounters:ae}))),{visits:s,missedAppointments:u,appointmentsDue:i,dueForVL:f,defaulters:b,patientsOnDTG:y,txCurrent30:D,txCurrent60:I,encounters:C,isLoading:a,refresh:R}}const ze={id:"containter"},Fe={class:"ion-padding-start"},Ke=S({__name:"dashboard",setup(t){const{visits:a,missedAppointments:s,appointmentsDue:u,dueForVL:i,defaulters:f,patientsOnDTG:b,txCurrent30:y,txCurrent60:D,encounters:I,isLoading:C,refresh:E}=Pe(),R=A(()=>a?"No Data":"Loading data..."),x=A(()=>{var c,d;return(d=(c=a.value)==null?void 0:c.complete.concat(a.value.incomplete).reduce((o,r)=>o+=r,0))!=null?d:0}),w=A(()=>{var c,d;return{title:{text:"Complete / incomplete visits",align:"left"},xaxis:{categories:(d=(c=a.value)==null?void 0:c.dates)!=null?d:[],tickAmount:30,labels:{show:!0,rotate:-75}}}}),V=A(()=>{var c,d,o,r;return[{name:"Complete Visits",data:(d=(c=a.value)==null?void 0:c.complete)!=null?d:[]},{name:"Incomplete Visits",data:(r=(o=a.value)==null?void 0:o.incomplete)!=null?r:[]}]});return(c,d)=>(h(),z("div",ze,[le("h1",Fe,[N(" Dashboard "),n(e(ue),{class:"ion-margin-end ion-float-right",onClick:e(E),disabled:e(C)},{default:l(()=>[N(" Refresh ")]),_:1},8,["onClick","disabled"])]),n(e(ve),null,{default:l(()=>[n(e(M),null,{default:l(()=>[n(e(g),{"size-md":"3"},{default:l(()=>[n(_,{label:"Total Visits",value:x.value,icon:e(ce),color:"success","is-loading":!e(a)},null,8,["value","icon","is-loading"])]),_:1}),n(e(g),{"size-md":"3"},{default:l(()=>{var o,r;return[n(_,{label:"Missed Appointments",value:(r=(o=e(s))==null?void 0:o.length)!=null?r:0,icon:e(de),color:"danger","is-loading":!e(s)},null,8,["value","icon","is-loading"])]}),_:1}),n(e(g),{"size-md":"3"},{default:l(()=>{var o,r;return[n(_,{label:"Appointments Due",value:(r=(o=e(u))==null?void 0:o.length)!=null?r:0,icon:e(pe),color:"secondary","is-loading":!e(u)},null,8,["value","icon","is-loading"])]}),_:1}),n(e(g),{"size-md":"3"},{default:l(()=>{var o,r;return[n(_,{label:"Due For VL",value:(r=(o=e(i))==null?void 0:o.length)!=null?r:0,icon:e(me),color:"secondary","is-loading":!e(i)},null,8,["value","icon","is-loading"])]}),_:1}),n(e(g),{"size-md":"3"},{default:l(()=>{var o,r;return[n(_,{label:"Defaulter (this quarter)",value:(r=(o=e(f))==null?void 0:o.length)!=null?r:0,icon:e(ge),color:"danger","is-loading":!e(f)},null,8,["value","icon","is-loading"])]}),_:1}),n(e(g),{"size-md":"3"},{default:l(()=>{var o,r;return[n(_,{label:"Patients on DTG",value:(r=(o=e(b))==null?void 0:o.length)!=null?r:0,icon:e(fe),color:"primary","is-loading":!e(b)},null,8,["value","icon","is-loading"])]}),_:1}),n(e(g),{"size-md":"3"},{default:l(()=>{var o,r;return[n(_,{label:"Tx Curr (30 Days)",value:(r=(o=e(y))==null?void 0:o.length)!=null?r:0,icon:e(H),color:"primary","is-loading":!e(y)},null,8,["value","icon","is-loading"])]}),_:1}),n(e(g),{"size-md":"3"},{default:l(()=>{var o,r;return[n(_,{label:"Tx Curr (60 Days)",value:(r=(o=e(D))==null?void 0:o.length)!=null?r:0,icon:e(H),color:"primary","is-loading":!e(D)},null,8,["value","icon","is-loading"])]}),_:1})]),_:1}),n(e(M),{class:"ion-margin-bottom"},{default:l(()=>[n(e(g),{"size-md":"6"},{default:l(()=>[n(be,{series:V.value,options:w.value,placeholder:R.value},null,8,["series","options","placeholder"])]),_:1}),n(e(g),{"size-md":"6"},{default:l(()=>{var o;return[n(Se,{"row-data":(o=e(I))!=null?o:[],"is-loading":!e(I)},null,8,["row-data","is-loading"])]}),_:1})]),_:1})]),_:1})]))}});export{Ke as default};
