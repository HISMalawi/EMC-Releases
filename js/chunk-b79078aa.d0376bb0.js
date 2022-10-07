(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b79078aa"],{"1c9e":function(t,a,e){"use strict";e.r(a);var n=e("7a23");function i(t,a,e,i,o,s){const p=Object(n["resolveComponent"])("his-standard-form");return Object(n["openBlock"])(),Object(n["createBlock"])(p,{fields:t.fields,onFinishAction:t.onFinish,skipSummary:!0,cancelDestinationPath:t.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])}var o=e("d95e"),s=e("7920"),p=e("2706"),d=e("b5e4"),c=e("7365"),r=e("83af"),l=e("4db7"),u=e("3e53"),m=e("2ef0"),h=e("9283"),b=e("d1ca"),y=e("5a0c"),w=e.n(y),g=e("8734"),D=Object(n["defineComponent"])({mixins:[c["a"]],components:{HisStandardForm:s["a"]},data:()=>({appointment:{}}),watch:{ready:{handler(t){t&&(this.appointment=new r["a"](this.patientID,this.providerID),this.fields=[this.getAppointmentField()])},immediate:!0}},methods:{async onFinish(t,a){var e;await this.appointment.createEncounter(),await this.appointment.saveObservationList(await this.resolveObs(a));const n=new l["a"](this.patientID),i=["CxCa","ANC"];i.includes(""+(null===(e=u["a"].getActiveApp())||void 0===e?void 0:e.applicationName))||await n.printVisitSummaryLbl(),this.nextTask()},getAppointmentField(){const t=t=>h["b"].toStandardHisDisplayFormat(t),a=(t,a)=>new RegExp(t,"i").test(""+a);let e="",n="",i=-1,s=this.appointment.date,c=null;const l={},u=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return{id:"set_appointment",helpText:"Appointments booking",type:o["b"].TT_DATE_PICKER,init:async()=>{try{const t=await this.appointment.getNextAppointment();s=t.appointment_date,c=t.drugs_run_out_date}catch(a){if(console.warn(a),await Object(g["a"])(400),!await Object(d["a"])("Next appointment/drug-runout date is not available, do you want to proceed anyway?"))return this.gotoPatientDashboard(),!0}const t=await b["b"].appointmentLimit();return i=t?parseInt(t):0,!0},onValue:async o=>{if(void 0===l[o]){const t=await r["a"].getDailiyAppointments(o);l[o]=Array.isArray(t)?t.length:0}return!(i>=1&&l[o]>=i&&await Object(d["a"])(`${l[o]} clients were booked on ${t(o)}`,{header:`APPOINTMENT LIMIT (${i}) REACHED`,cancelBtnLabel:"Proceed",confirmBtnLabel:"New date"}))&&(Object(m["isEmpty"])(n)&&(n=await b["b"].clinicHolidays()),!(a(o,n)&&!await Object(d["a"])(t(o)+" is a clinic holiday, do you want to set an appointment?"))&&(Object(m["isEmpty"])(e)&&(e=this.patient.getAge()>=18?await b["b"].adultClinicDays():await b["b"].peadsClinicDays()),!(!a(u[w()(o).day()],e)&&!await Object(d["a"])(t(o)+" is not a clinic day. Do you want to proceed with this date?"))))},validation:t=>p["a"].required(t),defaultValue:()=>s,computedValue:t=>[this.appointment.buildValueDate("Appointment date",t),this.appointment.buildValueDate("Estimated date",s)],config:{hiddenFooterBtns:["Clear"],minDate:()=>this.appointment.date,maxDate:()=>c,supValue:t=>""+l[t],infoItems:a=>[{label:"Medication Run out Date",value:c?t(c):"Not available"},{label:"User set appointment date",value:t(a)},{label:"Appointments",value:l[a]},{label:"Appointment limit (per/day)",value:i}]}}}}}),f=e("6b0d"),A=e.n(f);const v=A()(D,[["render",i]]);a["default"]=v},"83af":function(t,a,e){"use strict";e.d(a,"a",(function(){return i}));var n=e("cc6f");class i extends n["a"]{constructor(t,a){super(t,7,a)}async getNextAppointment(){const t=n["a"].getProgramID();return n["a"].getJson(`/programs/${t}/patients/${this.patientID}/next_appointment_date`,{date:this.date})}static async getDailiyAppointments(t){const a=n["a"].getProgramID();return n["a"].getJson(`/programs/${a}/booked_appointments`,{date:t,paginate:!1})}}}}]);
//# sourceMappingURL=chunk-b79078aa.d0376bb0.js.map