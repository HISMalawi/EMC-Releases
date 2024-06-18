System.register(["./index-legacy-5fd00317.js","./image-legacy-0b5f9ca9.js","./_plugin-vue_export-helper-legacy-762b7923.js","./LineChart.vue_vue_type_script_setup_true_lang-legacy-92f40413.js","./index-legacy-e04cac88.js","./report_service-legacy-df1b8872.js","./his_date-legacy-f511c580.js","./encounter_types-legacy-566983b4.js","./url-legacy-2d97b2db.js","./toasts-legacy-8814bb27.js","./index-legacy-aa705205.js","./arrays-legacy-263c660a.js","./common-legacy-42ce034b.js"],(function(e,t){"use strict";var l,a,n,i,o,s,r,u,d,c,p,v,g,m,h,f,y,_,b,D,S,I,T,x,C,w,V,A,N,E,L,j,O,R,z,P,F,G,M,H,k,$,q,X,B,J;return{setters:[e=>{l=e.d,a=e.S,n=e.T,i=e.o,o=e.c,s=e.t,r=e.h,u=e.w,d=e.a,c=e.u,p=e.U,v=e.b,g=e.V,m=e.W,h=e.i,f=e.j,y=e.X,_=e.Y,b=e.l,D=e.Z,S=e.g,I=e.f,T=e.I,x=e._,C=e.$,w=e.a0,V=e.a1,A=e.a2,N=e.a3,E=e.a4,L=e.a5,j=e.a6,O=e.a7},e=>{R=e.r},e=>{z=e._},e=>{P=e._},e=>{F=e.D},e=>{G=e.R},e=>{M=e.t,H=e.s,k=e.g,$=e.a,q=e.b},e=>{X=e.e},e=>{B=e.p},e=>{J=e.t},null,null,null],execute:function(){var t=document.createElement("style");t.textContent="ion-icon[data-v-6289fcf4]{position:absolute;right:0;top:0;margin-right:1rem;font-size:28px;opacity:.9}ion-img[data-v-6289fcf4]{width:3rem;height:3rem}\n",document.head.appendChild(t);const U=l({__name:"CountTo",props:{end:{type:Number,required:!0},start:{type:Number,default:0},time:{type:Number,default:500}},setup(e){const t=e,l=a(t.start);function r(){const e=t.end/t.time;l.value<t.end?(l.value=Math.ceil(l.value+e),setTimeout(r,1)):l.value=t.end}return n((()=>r())),(e,t)=>(i(),o("span",null,s(l.value),1))}}),W=["src"],Y=l({__name:"BoxCard",props:{value:{type:Number,required:!0},label:{type:String,required:!0},icon:{type:String},img:{type:String},color:{type:String,default:"light"},isLoading:{type:Boolean,default:!1}},setup:e=>(t,l)=>(i(),r(c(_),{color:""},{default:u((()=>[d(c(y),null,{default:u((()=>[d(c(p),{class:"text-sm"},{default:u((()=>[v(s(e.label),1)])),_:1}),d(c(g),{style:{"font-size":"x-large","font-weight":"bold"}},{default:u((()=>[e.isLoading?(i(),r(c(m),{key:0,name:"bubbles",color:e.color},null,8,["color"])):(i(),r(U,{key:1,end:e.value},null,8,["end"]))])),_:1}),e.icon?(i(),r(c(h),{key:0,icon:e.icon,color:e.color,class:"ion-float-right ion-margin-top"},null,8,["icon","color"])):f("",!0),e.img?(i(),o("img",{key:1,src:c(R)(e.img),class:"ion-float-right ion-margin-top"},null,8,W)):f("",!0)])),_:1})])),_:1}))}),Z=z(Y,[["__scopeId","data-v-6289fcf4"]]),K=l({__name:"EncounterTable",props:{rowData:{type:Array,required:!0},isLoading:{type:Boolean,default:!1}},setup(e){const t={showSearchField:!1,showIndices:!1,showSubmitButton:!1,pagination:{enabled:!1}},l={maxWidth:"78px !important",fontSize:"var(--font-size-sm)"},a=[{path:"encounter",label:"Encounter Name",thStyles:l,tdStyles:l},{path:"female",label:"Female",thStyles:l,tdStyles:l},{path:"male",label:"Male",thStyles:l,tdStyles:l},{path:"me",label:"Me",thStyles:l,tdStyles:l},{path:"facility",label:"Facility",thStyles:l,tdStyles:l}];return(l,n)=>(i(),r(c(_),{style:{height:"100%"}},{default:u((()=>[d(c(y),null,{default:u((()=>[d(c(g),{class:"ion-padding-start ion-padding-bottom text-sm",style:{"font-weight":"800"}},{default:u((()=>[v("Encounters created today")])),_:1}),d(c(F),{rows:e.rowData,columns:a,color:"light",config:t,loading:e.isLoading},null,8,["rows","loading"])])),_:1})])),_:1}))}});class Q extends G{constructor(){super()}async getVisits(){this.useDefaultParams=!1;const e=await this.getReport(`programs/${this.programId}/reports/visits`,{name:"visits"});return this.useDefaultParams=!0,Object.entries(e).reduce(((e,[t,l])=>(e.dates.push(M(t)),e.complete.push(l.complete),e.incomplete.push(l.incomplete),e)),{dates:[],complete:[],incomplete:[]})}getMissedAppointments(){return this.getReport("missed_appointments")}getAppointmentsDue(e){return this.getReport(`programs/${this.programId}/booked_appointments`,{date:e})}getPatientsDueForVL(){return this.getReport(`programs/${this.programId}/reports/vl_due`)}getDefaulters(){return this.getReport("defaulter_list",{pepfar:!0})}getPatientsOnDTG(){return this.getReport(`programs/${this.programId}/reports/patients_on_dtg`)}async getTXCurrent(e){return this.getReport(`programs/${this.programId}/reports/tx_curr`,{start_date:H(this.startDate,e,"days")})}}const ee={"HIV clinic registration":X.HIV_CLINIC_REGISTRATION,"HIV reception":X.HIV_RECEPTION,Vitals:X.VITALS,"HIV staging":X.HIV_STAGING,"HIV clinic consultation":X.HIV_CLINIC_CONSULTATION,"ART adherence":X.ART_ADHERENCE,Prescription:X.TREATMENT,Dispensing:X.DISPENSING,Appointments:X.APPOUNTMENT},te={complete:[],incomplete:[],dates:[]},le="__emc_dashboard_statistics__",ae=new class extends G{constructor(){super()}buildEncounters(e,t){return Object.entries(ee).map((([l,a])=>({encounter:l,female:e?e[a].F:0,male:e?e[a].M:0,me:t?t[a].F+t[a].M:0,facility:e?e[a].F+e[a].M:0})))}async getStats(){const e=Object.values(ee),t=B("reports/encounters",this.buildParams()),l=await b.postJson(t,{encounter_types:e}),a=await b.postJson(t,{encounter_types:e,all:!0});return this.buildEncounters(l.data,a.data)}};function ne(){var e,t,l,n,i,o,s,r,u;const d=function(){try{const e=localStorage.getItem(le);return e?JSON.parse(e):void 0}catch(e){return void J("Error parsing cached stats. Please, refresh to load fresh stats")}}(),c=a(!1),p=a(null!==(e=null==d?void 0:d.visits)&&void 0!==e?e:te),v=a(null!==(t=null==d?void 0:d.missedAppointments)&&void 0!==t?t:[]),g=a(null!==(l=null==d?void 0:d.appointmentsDue)&&void 0!==l?l:[]),m=a(null!==(n=null==d?void 0:d.dueForVL)&&void 0!==n?n:[]),h=a(null!==(i=null==d?void 0:d.defaulters)&&void 0!==i?i:[]),f=a(null!==(o=null==d?void 0:d.patientsOnDTG)&&void 0!==o?o:[]),y=a(null!==(s=null==d?void 0:d.txCurrent30)&&void 0!==s?s:[]),_=a(null!==(r=null==d?void 0:d.txCurrent60)&&void 0!==r?r:[]),b=a(null!==(u=null==d?void 0:d.encounters)&&void 0!==u?u:ae.buildEncounters());return D([p,v,g,m,h,f,y,_,b],(([e,t,l,a,n,i,o,s,r])=>localStorage.setItem(le,JSON.stringify({visits:e,missedAppointments:t,appointmentsDue:l,dueForVL:a,defaulters:n,patientsOnDTG:i,txCurrent30:o,txCurrent60:s,encounters:r})))),{visits:p,missedAppointments:v,appointmentsDue:g,dueForVL:m,defaulters:h,patientsOnDTG:f,txCurrent30:y,txCurrent60:_,encounters:b,isLoading:c,refresh:async function(){const{start:e,end:t}=k($()),l=new Q;l.setStartDate(e),l.setEndDate(t),b.value=void 0,p.value=void 0,v.value=void 0,g.value=void 0,h.value=void 0,f.value=void 0,m.value=void 0,y.value=void 0,_.value=void 0,c.value=!0;try{b.value=await ae.getStats(),p.value=await l.getVisits(),g.value=await l.getAppointmentsDue(q()),f.value=await l.getPatientsOnDTG(),y.value=await l.getTXCurrent(30),v.value=await l.getMissedAppointments(),m.value=await l.getPatientsDueForVL(),_.value=await l.getTXCurrent(60),h.value=await l.getDefaulters()}catch(a){console.error(a),J("Unable to update dashboard starts")}c.value=!1}}}const ie={id:"containter"},oe={class:"ion-padding-start"};e("default",l({__name:"dashboard",setup(e){const{visits:t,missedAppointments:l,appointmentsDue:a,dueForVL:n,defaulters:s,patientsOnDTG:r,txCurrent30:p,txCurrent60:g,encounters:m,isLoading:h,refresh:f}=ne(),y=S((()=>t?"No Data":"Loading data...")),_=S((()=>{var e,l;return null!==(e=null===(l=t.value)||void 0===l?void 0:l.complete.concat(t.value.incomplete).reduce(((e,t)=>e+t),0))&&void 0!==e?e:0})),b=S((()=>{var e,l;return{title:{text:"Complete / incomplete visits",align:"left"},xaxis:{categories:null!==(e=null===(l=t.value)||void 0===l?void 0:l.dates)&&void 0!==e?e:[],tickAmount:30,labels:{show:!0,rotate:-75}}}})),D=S((()=>{var e,l,a,n;return[{name:"Complete Visits",data:null!==(e=null===(l=t.value)||void 0===l?void 0:l.complete)&&void 0!==e?e:[]},{name:"Incomplete Visits",data:null!==(a=null===(n=t.value)||void 0===n?void 0:n.incomplete)&&void 0!==a?a:[]}]}));return(e,S)=>(i(),o("div",ie,[I("h1",oe,[v(" Dashboard "),d(c(T),{class:"ion-margin-end ion-float-right",onClick:c(f),disabled:c(h)},{default:u((()=>[v(" Refresh ")])),_:1},8,["onClick","disabled"])]),d(c(O),null,{default:u((()=>[d(c(x),null,{default:u((()=>[d(c(C),{"size-md":"3"},{default:u((()=>[d(Z,{label:"Total Visits",value:_.value,icon:c(w),color:"success","is-loading":!c(t)},null,8,["value","icon","is-loading"])])),_:1}),d(c(C),{"size-md":"3"},{default:u((()=>{var e,t;return[d(Z,{label:"Missed Appointments",value:null!==(e=null===(t=c(l))||void 0===t?void 0:t.length)&&void 0!==e?e:0,icon:c(V),color:"danger","is-loading":!c(l)},null,8,["value","icon","is-loading"])]})),_:1}),d(c(C),{"size-md":"3"},{default:u((()=>{var e,t;return[d(Z,{label:"Appointments Due",value:null!==(e=null===(t=c(a))||void 0===t?void 0:t.length)&&void 0!==e?e:0,icon:c(A),color:"secondary","is-loading":!c(a)},null,8,["value","icon","is-loading"])]})),_:1}),d(c(C),{"size-md":"3"},{default:u((()=>{var e,t;return[d(Z,{label:"Due For VL",value:null!==(e=null===(t=c(n))||void 0===t?void 0:t.length)&&void 0!==e?e:0,icon:c(N),color:"secondary","is-loading":!c(n)},null,8,["value","icon","is-loading"])]})),_:1}),d(c(C),{"size-md":"3"},{default:u((()=>{var e,t;return[d(Z,{label:"Defaulter (this quarter)",value:null!==(e=null===(t=c(s))||void 0===t?void 0:t.length)&&void 0!==e?e:0,icon:c(E),color:"danger","is-loading":!c(s)},null,8,["value","icon","is-loading"])]})),_:1}),d(c(C),{"size-md":"3"},{default:u((()=>{var e,t;return[d(Z,{label:"Patients on DTG",value:null!==(e=null===(t=c(r))||void 0===t?void 0:t.length)&&void 0!==e?e:0,icon:c(L),color:"primary","is-loading":!c(r)},null,8,["value","icon","is-loading"])]})),_:1}),d(c(C),{"size-md":"3"},{default:u((()=>{var e,t;return[d(Z,{label:"Tx Curr (30 Days)",value:null!==(e=null===(t=c(p))||void 0===t?void 0:t.length)&&void 0!==e?e:0,icon:c(j),color:"primary","is-loading":!c(p)},null,8,["value","icon","is-loading"])]})),_:1}),d(c(C),{"size-md":"3"},{default:u((()=>{var e,t;return[d(Z,{label:"Tx Curr (60 Days)",value:null!==(e=null===(t=c(g))||void 0===t?void 0:t.length)&&void 0!==e?e:0,icon:c(j),color:"primary","is-loading":!c(g)},null,8,["value","icon","is-loading"])]})),_:1})])),_:1}),d(c(x),{class:"ion-margin-bottom"},{default:u((()=>[d(c(C),{"size-md":"6"},{default:u((()=>[d(P,{series:D.value,options:b.value,placeholder:y.value},null,8,["series","options","placeholder"])])),_:1}),d(c(C),{"size-md":"6"},{default:u((()=>{var e;return[d(K,{"row-data":null!==(e=c(m))&&void 0!==e?e:[],"is-loading":!c(m)},null,8,["row-data","is-loading"])]})),_:1})])),_:1})])),_:1})]))}}))}}}));
