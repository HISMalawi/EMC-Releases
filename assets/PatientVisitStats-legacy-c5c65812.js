System.register(["./vue-datepicker-legacy-672cca54.js","./LineChart.vue_vue_type_script_setup_true_lang-legacy-92f40413.js","./index-legacy-5fd00317.js","./common-legacy-42ce034b.js","./index-legacy-aa705205.js","./report_service-legacy-df1b8872.js","./loader-legacy-26a3e1a4.js","./DrilldownTable-legacy-316aa25e.js","./his_date-legacy-f511c580.js","./_plugin-vue_export-helper-legacy-762b7923.js","./arrays-legacy-263c660a.js","./url-legacy-2d97b2db.js","./index-legacy-e04cac88.js"],(function(t,e){"use strict";var a,n,i,s,l,r,o,u,d,p,c,g,h,_,m,f,v,y,w,V,j,x,R,C,D,P;return{setters:[t=>{a=t.K},t=>{n=t._},t=>{i=t.l,s=t.d,l=t.a7,r=t._,o=t.$,u=t.J,d=t.S,p=t.g,c=t.r,g=t.h,h=t.w,_=t.o,m=t.a,f=t.f,v=t.b,y=t.t},t=>{w=t.i},t=>{V=t.P},t=>{j=t.R},t=>{x=t.l},t=>{R=t.m,C=t.D},t=>{D=t.c},t=>{P=t._},null,null,null],execute:function(){class e extends j{constructor(){super()}static getLocationName(){return sessionStorage.getItem("locationName")}getBookedAppointments(t){return i.getJson(`programs/${V}/scheduled_appointments`,{date:t})}getViralLoadResults(t){return this.getReport(`/programs/${V}/reports/high_vl_patients`,{range:t})}getOtherOutcome(t){return this.getReport("patient_outcome_list",{outcome:t})}getPatientVisitTypes(){return this.getReport("patient_visit_types")}getClientsDueForVl(){return this.getReport("clients_due_vl")}getClientRentention(){return this.getReport(`/programs/${V}/reports/retention`)}getExternalConsultationClients(){return this.getReport(`${V}/external_consultation_clients`)}getMissedAppointments(){return this.getReport("missed_appointments")}getPregnantWomen(){return this.getReport(`/programs/${V}/reports/pregnant_patients`)}getArchivingCandidates(){return i.getJson(`programs/${V}/reports/archiving_candidates`,{start_date:this.date})}getIncompleteVisits(){return this.getReport("incomplete_visits",{tool_name:"INCOMPLETE VISITS"})}getVisitStats(){return i.getJson(`programs/${V}/reports/visits`,{name:"visits",start_date:this.startDate,end_date:this.endDate})}}const S=s({components:{LineChart:n,IonGrid:l,IonRow:r,IonCol:o,VueDatePicker:a},setup(){u();const t=d(["",""]),a=d([]),n=p((()=>{var t;return(null===(t=a.value[0])||void 0===t?void 0:t.raw.flat())||[]})),i=p((()=>{var t;return(null===(t=a.value[1])||void 0===t?void 0:t.raw.flat())||[]})),s=p((()=>a.value.map((({raw:t})=>t)).flat(3))),l=async(t,e="Drill down clients")=>{await R.show(C,{patientIds:t.map((({patientId:t})=>t)),title:e})};return{range:t,series:a,options:{title:{text:"Patient Vists Statistics",align:"left"},yaxis:{title:{text:"Number of clients"},plotAreaHeight:800}},totalAttendance:s,totalPatientVisits:n,totalGuardianVisits:i,fetchData:async()=>{x.show();const n=new e;n.setStartDate(t.value[0]),n.setEndDate(t.value[1]);const i=await n.getPatientVisitTypes();a.value=(t=>{const e={},a={},n={},i=[{name:"Patient present",raw:[],data:[]},{name:"Guardian present",raw:[],data:[]},{name:"Both patient and guardian present",raw:[],data:[]}];return Object.entries(t).forEach((([t,s])=>{e[t]=[],a[t]=[],n[t]=[],Object.entries(s).forEach((([i,{patient_present:s,guardian_present:l}])=>{l&&s?n[t].push({patientId:i,date:t}):s?e[t].push({patientId:i,date:t}):l&&a[t].push({patientId:i,date:t})}));const l=new Date(t).getTime();i[0].data.push([l,e[t].length]),i[0].raw.push(e[t]),i[1].data.push([l,a[t].length]),i[1].raw.push(a[t]),i[2].data.push([l,n[t].length]),i[2].raw.push(n[t])})),i})(i),x.hide()},pointSelection:async(t,e)=>{if(!w(a.value))try{await l(a.value[e].raw[t],`${a.value[e].name} visits`)}catch(n){console.error(n)}},drilldown:l,toDisplayRangeFmt:D}}}),b={style:{display:"flex","justify-content":"flex-start"}},I={class:"his-card"};t("default",P(S,[["render",function(t,e,a,n,i,s){const l=c("vue-date-picker"),r=c("ion-button"),o=c("ion-col"),u=c("ion-label"),d=c("ion-badge"),p=c("ion-item"),w=c("ion-list"),V=c("line-chart"),j=c("ion-row"),x=c("ion-grid");return _(),g(x,null,{default:h((()=>[m(j,null,{default:h((()=>[m(o,{size:"5",offset:"7",class:"ion-padding"},{default:h((()=>[f("div",b,[m(l,{modelValue:t.range,"onUpdate:modelValue":e[0]||(e[0]=e=>t.range=e),placeholder:"Select date range","partial-range":!0,"enable-time-picker":!1,format:t.toDisplayRangeFmt,"multi-calendars":"","auto-apply":"","text-input":"",range:"",class:"ion-margin-end",style:{padding:"5px"}},null,8,["modelValue","format"]),m(r,{color:"primary",onClick:t.fetchData,style:{height:"44px"}},{default:h((()=>[v("Submit")])),_:1},8,["onClick"])])])),_:1}),m(o,{size:"2",class:"ion-padding-top"},{default:h((()=>[f("div",I,[m(w,null,{default:h((()=>[m(p,{button:"",onClick:e[1]||(e[1]=e=>t.drilldown(t.totalAttendance,"Total Attendance"))},{default:h((()=>[m(u,null,{default:h((()=>[v(" Total Attendance ")])),_:1}),m(d,null,{default:h((()=>[v(y(t.totalAttendance.length),1)])),_:1})])),_:1}),m(p,{button:"",onClick:e[2]||(e[2]=e=>t.drilldown(t.totalPatientVisits,"Total patient visits"))},{default:h((()=>[m(u,null,{default:h((()=>[v(" Patient Visit ")])),_:1}),m(d,null,{default:h((()=>[v(y(t.totalPatientVisits.length),1)])),_:1})])),_:1}),m(p,{button:"",onClick:e[3]||(e[3]=e=>t.drilldown(t.totalGuardianVisits,"Total guardian visits"))},{default:h((()=>[m(u,null,{default:h((()=>[v(" Guardian Visit ")])),_:1}),m(d,null,{default:h((()=>[v(y(t.totalGuardianVisits.length),1)])),_:1})])),_:1})])),_:1})])])),_:1}),m(o,{size:"10"},{default:h((()=>[m(V,{series:t.series,options:t.options,onPointSelection:t.pointSelection,placeholder:"select date period"},null,8,["series","options","onPointSelection"])])),_:1})])),_:1})])),_:1})}]]))}}}));
