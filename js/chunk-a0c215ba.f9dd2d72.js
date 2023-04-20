(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a0c215ba"],{"2e46":function(t,e,r){"use strict";r.r(e);var a=r("7a23");function n(t,e,r,n,s,o){const i=Object(a["resolveComponent"])("report-template"),p=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(p,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(i,{title:t.title,period:t.period,rows:t.rows,fields:t.fields,columns:t.columns,showtitleOnly:!0,config:{showIndex:!1},encryptPDF:!0,onReportConfiguration:t.onPeriod},null,8,["title","period","rows","fields","columns","onReportConfiguration"])]),_:1})}r("14d9");var s=r("ad8d"),o=r("44e3"),i=r("552a"),p=r("d95e"),d=r("2706"),l=r("9283"),c=r("9ceb"),h=r("d867"),u=r("25da"),m=Object(a["defineComponent"])({mixins:[o["a"]],components:{ReportTemplate:i["a"],IonPage:h["D"]},data:()=>({title:"Booked clients",date:"",rows:[],appointments:{},columns:[[c["a"].thTxt("ARV#"),c["a"].thTxt("First name",{csvExportable:!1,pdfExportable:!0}),c["a"].thTxt("Last name",{csvExportable:!1,pdfExportable:!0}),c["a"].thTxt("Gender"),c["a"].thTxt("birthdate"),c["a"].thTxt("Current Address",{csvExportable:!1,pdfExportable:!0}),c["a"].thTxt("Actions")]]}),created(){this.report=new s["b"],this.fields=[{id:"date",helpText:"Select date",type:p["b"].TT_DATE_PICKER,defaultValue:()=>s["b"].getSessionDate(),validation:t=>d["a"].required(t),onValue:async t=>(this.report.setStartDate(t),this.appointments[t]||(this.appointments[t]=await this.report.getBookedAppointments(t)||[]),!0),config:{infoItems:t=>{var e;return[{label:"Appointments",value:(null===(e=this.appointments[t])||void 0===e?void 0:e.length)||0}]}}}]},methods:{onPeriod(t){this.rows=[],this.period=l["b"].toStandardHisDisplayFormat(t.date),this.setRows(this.appointments[t.date])},setRows(t){Object(u["a"])(t).asc(t=>t.given_name).forEach(t=>{this.rows.push([this.tdARV(t.arv_number||"N/A"),c["a"].td(t.given_name),c["a"].td(t.family_name),c["a"].td(this.formatGender(t.gender)),c["a"].tdDate(t.birthdate),c["a"].td(`District: <br/> <b>${t.district}</b><br/>\n                        Village: <br/> <b>${t.village}</b><br/>\n                        Land-mark: <br/> <b>${t.land_mark}</b><br/>\n                        Cellphone: <br/> <b>${t.cell_phone}</b>`),c["a"].tdBtn("Select",()=>this.confirmPatient(t.person_id))])})}}}),g=r("d959"),b=r.n(g);const y=b()(m,[["render",n]]);e["default"]=y},ad8d:function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return s}));var a=r("5969");const n=["<1 year","1-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90 plus years"];class s extends a["a"]{constructor(){super()}getBookedAppointments(t){return a["a"].getJson(`programs/${this.programID}/scheduled_appointments`,{date:t})}getViralLoadResults(t){return this.getReport(`/programs/${this.programID}/reports/high_vl_patients`,{range:t})}getOtherOutcome(t){return this.getReport("patient_outcome_list",{outcome:t})}getPatientVisitTypes(){return this.getReport("patient_visit_types")}getClientsDueForVl(){return this.getReport("clients_due_vl")}getClientRentention(){return this.getReport(`/programs/${this.programID}/reports/retention`)}getExternalConsultationClients(){return this.getReport(this.programID+"/external_consultation_clients")}getMissedAppointments(){return this.getReport("missed_appointments")}getPregnantWomen(){return this.getReport(`/programs/${this.programID}/reports/pregnant_patients`)}getArchivingCandidates(){return a["a"].getJson(`programs/${this.programID}/reports/archiving_candidates`,{start_date:this.date})}}}}]);
//# sourceMappingURL=chunk-a0c215ba.f9dd2d72.js.map