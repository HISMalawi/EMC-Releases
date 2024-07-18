var st=Object.defineProperty;var ot=(a,i,e)=>i in a?st(a,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[i]=e;var D=(a,i,e)=>(ot(a,typeof i!="symbol"?i+"":i,e),e);import{d as rt,aA as W,i as ct,j as ut,k as lt,I as dt,az as gt,g as vt,r as g,ae as k,H as z,a2 as _t,ay as N,aB as M,L as E,h as I,w as P,o as b,a as pt,T as mt,aC as ft,y as wt}from"./index-63bb7f4f.js";import{P as j,C as U}from"./patient_service-c4df5c63.js";import{a as St,t as x}from"./toasts-1c8b21db.js";import{l as L}from"./loader-d583d493.js";import{e as h}from"./encounter_types-ae359711.js";import{A as p,P as K,V as yt,C as Ct}from"./consultation_service-71ec46f3.js";import{a as B}from"./his_date-5fdda6ef.js";import{a as S}from"./form-fb021895.js";import{C as It,P as bt}from"./index-95d3a767.js";import{i as Y,g as ht}from"./common-abc2f84d.js";import{E as q,a as J}from"./emc_event-4721851b.js";import{_ as At}from"./_plugin-vue_export-helper-c27b6911.js";class Ot extends p{constructor(i,e=B()){super(i,h.HIV_CLINIC_REGISTRATION,e)}}class Rt extends p{constructor(i,e=B()){super(i,h.REGISTRATION,e)}}class Tt extends p{constructor(e,r,c=B()){super(e,h.HIV_STAGING,c);D(this,"age");D(this,"confirmatoryTest");this.age=r,this.confirmatoryTest=null}isAdult(){return this.age>=15}cd4CountIsValid(e){try{return!!e.match(/^(=|<|>)([0-9]*)$/m)}catch(r){return!1}}getStagingConditions(e){const r=this.getStagingCategoryByNum(e);return p.getConceptsByCategory(r)}getAllWhoStages(){return p.getConceptsByCategory("whole_staging_numbers")}getAllReasonsForART(e=this.date,r=!1){return p.getConceptsByCategory("reason_for_art").filter(c=>!(new Date(e)>new Date(It)&&c.name.match(/cd4/i)||r&&c.name.match(/breastfeeding|pregnant/i)))}buildWhoStageObs(e){return this.buildValueCoded("Who stage",e)}buildWhoCriteriaObs(e){return this.buildValueCoded("Who stages criteria present",e)}buildReasonForArtObs(e){return this.buildValueCoded("Reason for ART eligibility",e)}getStagingCategoryByNum(e){switch(e){case 1:return this.isAdult()?"stage_1_conditions_adults":"stage_1_conditions_pedaids";case 2:return this.isAdult()?"stage_2_conditions_adults":"stage_2_conditions_pedaids";case 3:return this.isAdult()?"stage_3_conditions_adults":"stage_3_conditions_pedaids";case 4:return this.isAdult()?"stage_4_conditions_adults":"stage_4_conditions_pedaids";default:return""}}}const Vt=rt({components:{ClinicRegistration:W(()=>M(()=>import("./ClinicRegistration-17e461fb.js"),["assets/ClinicRegistration-17e461fb.js","assets/index-63bb7f4f.js","assets/index-6656787e.css","assets/patient_service-c4df5c63.js","assets/patient_identifier_service-a4f58fdd.js","assets/his_date-5fdda6ef.js","assets/index-95d3a767.js","assets/Date-7ff601d9.js","assets/common-abc2f84d.js","assets/TextInput-9a60f17f.js","assets/_plugin-vue_export-helper-c27b6911.js","assets/TextInput-e777cfa6.css","assets/DateInput-efd6490f.js","assets/validations-b9fbcec4.js","assets/emc_event-4721851b.js","assets/vue-datepicker-d1c81c46.js","assets/DateInput-5fa0484d.css","assets/YesNoInput-2ed78677.js","assets/SelectInput-79572c78.js","assets/SelectInput-5e7944e5.css","assets/location_options-7fd27a7d.js","assets/regimen_service-4315f375.js","assets/DTFormElements-a1199b88.js","assets/consultation_service-71ec46f3.js","assets/program_service-9863a198.js","assets/encounter_types-ae359711.js","assets/form-fb021895.js","assets/Strs-7ee8a435.js","assets/toasts-1c8b21db.js","assets/loader-d583d493.js"])),Staging:W(()=>M(()=>import("./Staging-4a8819de.js"),["assets/Staging-4a8819de.js","assets/index-63bb7f4f.js","assets/index-6656787e.css","assets/TextInput-9a60f17f.js","assets/_plugin-vue_export-helper-c27b6911.js","assets/TextInput-e777cfa6.css","assets/DateInput-efd6490f.js","assets/his_date-5fdda6ef.js","assets/validations-b9fbcec4.js","assets/common-abc2f84d.js","assets/emc_event-4721851b.js","assets/vue-datepicker-d1c81c46.js","assets/DateInput-5fa0484d.css","assets/YesNoInput-2ed78677.js","assets/SelectInput-79572c78.js","assets/SelectInput-5e7944e5.css","assets/location_options-7fd27a7d.js","assets/form-fb021895.js","assets/Strs-7ee8a435.js","assets/toasts-1c8b21db.js","assets/loader-d583d493.js","assets/patient_service-c4df5c63.js","assets/patient_identifier_service-a4f58fdd.js","assets/index-95d3a767.js","assets/Date-7ff601d9.js","assets/encounter_types-ae359711.js","assets/consultation_service-71ec46f3.js","assets/program_service-9863a198.js","assets/Staging-fc4f8fe8.css"])),IonGrid:ct,IonRow:ut,IonCol:lt,IonButton:dt},setup(){const a=gt(),i=vt(),e=g(!1),r=k({}),c=g("ClinicRegistration"),s=parseInt(a.params.patientId.toString()||""),v=!!a.params.new.toString().match(/true/i),A=z(()=>c.value==="Staging"),O=z(()=>c.value==="Staging"),y=g({}),m=g(""),F=g(""),C=g([]),R=k({}),G=g(!1),Q=()=>{new K(s).getPrograms().then(t=>{const u=t.data;G.value=u.some(n=>n.program.name==="HIV PROGRAM")})},X=o=>r[o.type]=o.data,Z=()=>c.value="Staging",tt=()=>c.value="ClinicRegistration",et=async()=>{const{arvNumberEditable:o,formData:t,computedData:u}=r.registration,{computedData:n}=r.staging;try{if(L.show(),!v&&!Y(C.value))for(const d of C.value)await N.void(d,"Duplicate");o&&t.arvNumber&&await y.value.createArvNumber(t.arvNumber);const l=new Rt(s,t.initialVisitDate);await l.createEncounter();const T=await S(u,"patient type");await l.saveObservationList(T);const _=new Ot(s,t.initialVisitDate);await _.createEncounter();const V=await S(u,"registration");if(await _.saveObservationList(V),t.everRegisteredAtClinic==="Yes"){const d=new yt(s,t.initialVisitDate);await d.createEncounter();const it=await S(u,"vitals");await d.saveObservationList(it);const $=new Ct(s,t.initialVisitDate);await $.createEncounter();const nt=await S(u,"consultation");await $.saveObservationList(nt)}const f=new Tt(s,y.value.getAge(),t.initialVisitDate);await f.createEncounter();const w=await S(n);if(await f.saveObservationList(w),v||!G.value){const d=new K(s);d.setProgramDate(t.initialVisitDate),await d.enrollProgram()}await L.hide(),await St("Saved successfully"),i.push("/patient/".concat(s))}catch(l){await L.hide(),console.log(l),x("".concat(l))}},H=async o=>{for(const t of o){C.value.includes(t.encounter_id)||C.value.push(t.encounter_id);const u=await U.getConceptName(t.concept_id);let n="";t.value_datetime||t.value_drug?n=t.value_datetime:t.value_text?n=t.value_text:t.value_numeric?n=t.value_numeric:t.value_coded&&(n=await U.getConceptName(t.value_coded)),t.value_modifier&&(n=t.value_modifier+n),R[u]=n}},at=async()=>{const{HIV_CLINIC_CONSULTATION:o,HIV_CLINIC_REGISTRATION:t,REGISTRATION:u,HIV_STAGING:n,VITALS:l}=h;try{const _=(await N.all({encounter_type_id:t,patient_id:s})).data;if(Y(_))return;if(m.value=ht(_,"[0].encounter_datetime",""),m.value){await H(_[0].observations);const V=(await N.all({program_id:bt,patient_id:s,date:m.value})).data||[];for(const f of V){let w=[u,n];/yes/i.test("".concat(R["Ever registered at ART clinic"]))&&(w=[...w,o,l]),w.includes(f.encounter_type)&&await H(f.observations)}}}catch(T){x("Unable to load previous observations")}};return _t(async()=>{Q();const o=await j.findByID(s);o.ok&&(y.value=new j(o.data)),v||await at(),e.value=!0,q.on(J.ON_INITIAL_VISIT_DATE,t=>{m.value=t}),q.on(J.ON_ART_START_DATE,t=>{F.value=t})}),{activeForm:c,patient:y,isNewPatient:v,isStaging:A,isRegistration:O,isReady:e,initialVisitDate:m,observations:R,artStartDate:F,onValue:X,onFinish:et,onNext:Z,onPrevious:tt}}});function Dt(a,i,e,r,c,s){const v=E("ion-col"),A=E("ion-row"),O=E("ion-grid");return b(),I(O,null,{default:P(()=>[pt(A,{class:"his-card"},{default:P(()=>[a.isReady?(b(),I(v,{key:0,size:"12"},{default:P(()=>[(b(),I(mt,null,[(b(),I(ft(a.activeForm),{patient:a.patient,isNewPatient:a.isNewPatient,initialVisitDate:a.initialVisitDate,artStartDate:a.artStartDate,observations:a.observations,onOnValue:a.onValue,onOnNext:a.onNext,onOnPrevious:a.onPrevious,onOnFinish:a.onFinish},null,40,["patient","isNewPatient","initialVisitDate","artStartDate","observations","onOnValue","onOnNext","onOnPrevious","onOnFinish"]))],1024))]),_:1})):wt("",!0)]),_:1})]),_:1})}const Nt=At(Vt,[["render",Dt]]),Ut=Object.freeze(Object.defineProperty({__proto__:null,default:Nt},Symbol.toStringTag,{value:"Module"}));export{Ot as C,Ut as H,Rt as P,Tt as S};
