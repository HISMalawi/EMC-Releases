import{d as F,j as h,k as Y,$,r as B,H as k,ae as Q,a6 as z,a2 as q,F as W,ai as j,L as f,o as v,c as D,a as i,w as r,b as S,K as H,y as V,h as P}from"./index-a3998c4f.js";import{P as G}from"./patient_service-6ec83e3a.js";import{i as K}from"./common-94ac9539.js";import{T as M}from"./TextInput-46ea36e4.js";import{D as J}from"./DateInput-f08f26ee.js";import{Y as X}from"./YesNoInput-4b80d294.js";import{C as Z,P as _}from"./HIVReception-add37d83.js";import{S as x}from"./SelectInput-a2d652cc.js";import{g as ee}from"./location_options-a54d2efb.js";import{N as te,R as E}from"./regimen_service-0c851836.js";import{i as ae,b as oe,H as ie}from"./DTFormElements-a1199b88.js";import{C as ne,V as le}from"./ApiStore-d6b440c2.js";import{e as re,d as p,v as O,r as N}from"./validations-11aef89d.js";import{s as se}from"./form-6d9e4a71.js";import{E as U,a as L}from"./emc_event-4721851b.js";import{a as ue}from"./his_date-05fd283a.js";import{P as me}from"./program_service-de5a3cd5.js";import{_ as de}from"./_plugin-vue_export-helper-c27b6911.js";import"./patient_identifier_service-841f15bb.js";import"./index-95d3a767.js";import"./vue-datepicker-c019a7dc.js";import"./toasts-a4a73cee.js";import"./loader-9bbe4f46.js";import"./encounter_types-55fa45e3.js";import"./user_service-56799831.js";import"./services-f7c3fb9d.js";import"./Strs-7ee8a435.js";import"./Date-0dd82718.js";import"./image-cb93bc3e.js";const fe=F({components:{IonRow:h,IonCol:Y,IonTitle:$,TextInput:M,DateInput:J,YesNoInput:X,SelectInput:x,NumberInput:te},props:{patient:{type:Object,required:!0},isNewPatient:{type:Boolean,default:!0},observations:{type:Object,default:()=>({})},initialVisitDate:{type:String,default:""}},emits:["onValue","onNext"],setup(t,{emit:o}){const R=B([]),m=new Z(t.patient.getID(),-1),b=new ne(t.patient.getID(),-1),A=new le(t.patient.getID(),-1),C=new _(t.patient.getID(),-1),{facility:T}=W(),s=B(""),y=k(()=>t.patient.getBirthdate()),l=Q({arvNumber:{value:"",label:"ARV Number",placeholder:"Enter ARV Number",required:!0,validation:async(e,a)=>{if(a.arvNumber.disabled)return null;const n=re(e,"POSITIVE_INTEGERS");if(n!==null)return n;const u=await G.findByOtherID(4,"".concat(T.code,"-ARV-").concat(e.value));return K(u.data)?null:["ARV Number already exists"]}},arvNumberAtPreviousLocation:{value:"",label:"ART Number at previous Location",computedValue:e=>({tag:"registration",obs:m.buildValueText("ART number at previous location",e)})},initialVisitDate:{value:t.initialVisitDate,label:"Registration Date",required:!0},shouldFollowUp:{value:t.observations["Agrees to followup"]?t.observations["Agrees to followup"].match(/yes|home visit/i)?"Yes":"No":"",label:"Agrees to follow up ?",computedValue:e=>({tag:"registration",obs:[m.buildGroupValueCoded("Agrees to followup","Home visit",e),m.buildGroupValueCoded("Agrees to followup","Phone",e)]}),required:!0},receivedArvTreatmentBefore:{value:t.observations["Ever received ART"]||"",label:"Ever received ARVs for treatment or prophylaxis?",computedValue:e=>({tag:"registration",obs:m.buildValueCoded("Ever received ART",e)}),required:!0},dateLastTakenArvs:{value:t.observations["Date ART last taken"]||"",label:"Date last taken ARVs",computedValue:e=>({tag:"registration",obs:m.buildValueDate("Date ART last taken",e)}),validation:async(e,a)=>a.receivedArvTreatmentBefore.value==="Yes"&&p(e)},everRegisteredAtClinic:{value:t.observations["Ever registered at ART clinic"]||"",label:"Ever registred at an ART clinic",computedValue:e=>({tag:"registration",obs:m.buildValueCoded("Ever registered at ART clinic",e)}),validation:async(e,a)=>a.receivedArvTreatmentBefore.value==="Yes"&&p(e)},artInitiationLocation:{value:t.observations["Location of ART initiation"]||"",label:"Location of ART Initiation",computedValue:e=>({tag:"registration",obs:b.buildValueText("Location of ART initiation",typeof e=="string"?e:e.label)}),validation:async(e,a)=>a.everRegisteredAtClinic.value==="Yes"&&p(e)},artStartDate:{value:t.observations["Date ART started"]||"",label:"Date started ART",computedValue:e=>({tag:"registration",obs:m.buildValueDate("Date ART started",e)}),validation:async(e,a)=>a.everRegisteredAtClinic.value==="Yes"&&p(e)},initialWeight:{value:t.observations.weight||"",label:"Initial Weight",placeholder:"Enter weight",computedValue:e=>({tag:"vitals",obs:A.buildValueNumber("weight",e)}),validation:async(e,a)=>a.everRegisteredAtClinic.value==="Yes"&&e.value!=="Unknown"&&O([()=>N(e),()=>A.validator({...e,label:"Weight"})])},initialHeight:{value:t.observations.Height||"",label:"Initial Height",placeholder:"Enter height",computedValue:e=>({tag:"vitals",obs:m.buildValueNumber("Height",e)}),validation:async(e,a)=>a.everRegisteredAtClinic.value==="Yes"&&e.value!=="Unknown"&&O([()=>N(e),()=>A.validator({...e,label:"Height"})])},initialTBStatus:{value:t.observations["TB Status at Initiation"]||"",label:"Initial TB Status",placeholder:"select TB status",computedValue:e=>({tag:"registration",obs:m.buildValueCoded("TB Status at Initiation",typeof e=="string"?e:e.label)}),validation:async(e,a)=>a.everRegisteredAtClinic.value==="Yes"&&p(e)},tptHistory:{value:t.observations["Previous TB treatment history"]||"",label:"TPT History",placeholder:"Select TPT history",computedValue:e=>({tag:"consultation",obs:b.buildValueText("Previous TB treatment history",typeof e=="string"?e:e.label)}),validation:async(e,a)=>a.everRegisteredAtClinic.value==="Yes"&&p(e)},tptStartDate:{value:t.observations["TPT Drugs Received"]||"",label:"Date started TPT",validation:async(e,a)=>{var n,u,d;return((d=(u=(n=a.tptHistory)==null?void 0:n.value)==null?void 0:u.label)==null?void 0:d.match(/currently/i))&&p(e)}},inhQty:{value:"",label:"INH Amount Received",validation:async(e,a)=>{var u,d;const n=(d=(u=a.tptHistory)==null?void 0:u.value)==null?void 0:d.label;return(n==null?void 0:n.match(/currently/i))&&(n.match(/ipt/i)||n.includes("3HP (RFP + INH)"))&&N(e)},computedValue:(e,a)=>{var n;return{tag:"consultation",obs:b.buildObs("TPT Drugs Received",{value_drug:((n=R.value.find(u=>u.name==="INH or H (Isoniazid 300mg tablet)"))==null?void 0:n.drug_id)||0,value_datetime:(a==null?void 0:a.tptStartDate.value)||null,value_numeric:e||0})}}},rifapentineQty:{value:"",label:"Rifapentine Amount Received",validation:async(e,a)=>{var u,d;const n=(d=(u=a.tptHistory)==null?void 0:u.value)==null?void 0:d.label;return(n==null?void 0:n.match(/currently/i))&&n.includes("3HP (RFP + INH)")&&N(e)},computedValue:(e,a)=>{var n;return{tag:"consultation",obs:b.buildObs("TPT Drugs Received",{value_drug:((n=R.value.find(u=>u.name==="Rifapentine (150mg)"))==null?void 0:n.drug_id)||0,value_datetime:(a==null?void 0:a.tptStartDate.value)||null,value_numeric:e||0})}}},threeHPQty:{value:"",label:"INH / RFP Amount Received",validation:async(e,a)=>{var u,d;const n=(d=(u=a.tptHistory)==null?void 0:u.value)==null?void 0:d.label;return(n==null?void 0:n.match(/currently/i))&&n.includes("INH 300 / RFP 300 (3HP)")&&N(e)},computedValue:(e,a)=>{var n;return{tag:"consultation",obs:b.buildObs("TPT Drugs Received",{value_drug:((n=R.value.find(u=>u.name==="INH 300 / RFP 300 (3HP)"))==null?void 0:n.drug_id)||0,value_datetime:(a==null?void 0:a.tptStartDate.value)||null,value_numeric:e||0})}}},tptStartLocation:{value:t.observations["Location TPT Last Received"]||"",label:"TPT Transfer From",validation:async(e,a)=>{var n,u,d;return((d=(u=(n=a.tptHistory)==null?void 0:n.value)==null?void 0:u.label)==null?void 0:d.match(/currently/i))&&N(e)},computedValue:e=>({tag:"consultation",obs:b.buildValueText("Location TPT Last Received",typeof e=="string"?e:e.label)})},confirmatoryTest:{value:t.observations["Confirmatory hiv test type"]||"",label:"Confirmatory Test",placeholder:"Select confirmatory test",required:!0,computedValue(e){return{tag:"registration",obs:m.buildValueCoded("Confirmatory hiv test type",typeof e=="string"?e:e.value)}}},confirmatoryTestLocation:{value:t.observations["Confirmatory HIV test location"]||"",label:"Location of Confirmatory",placeholder:"Select location",validation:async(e,a)=>!(a.confirmatoryTest.value.label==="Not done"||a.confirmatoryTest.value==="Not done")&&p(e),computedValue(e){return{tag:"registration",obs:m.buildValueText("Confirmatory HIV test location",typeof e=="string"?e:e.label)}}},confirmatoryTestDate:{value:t.observations["Confirmatory HIV test date"]||"",label:"Confirmatory HIV Test Date",validation:async(e,a)=>!(a.confirmatoryTest.value.label==="Not done"||a.confirmatoryTest.value==="Not done")&&p(e),computedValue:e=>({tag:"registration",obs:m.buildValueDate("Confirmatory HIV test date",e)})},patientType:{value:"New patient",computedValue:e=>({tag:"patient type",obs:C.buildValueCoded("Type of patient",e)})}}),g=k(()=>{var e;return!(((e=l.confirmatoryTest.value)==null?void 0:e.label)==="Not done"||l.confirmatoryTest.value==="Not done")});z(l.receivedArvTreatmentBefore,e=>{e.value==="No"&&(l.everRegisteredAtClinic.value="")}),z(l.initialVisitDate,e=>{U.emit(L.ON_INITIAL_VISIT_DATE,e.value)}),z(()=>l.artStartDate.value,e=>U.emit(L.ON_ART_START_DATE,e),{immediate:!0});const c=k(()=>{var a;const e=typeof l.tptHistory.value=="string"?l.tptHistory.value:(a=l.tptHistory.value)==null?void 0:a.label;if(e!=null&&e.match(/currently/i)){if(e.match(/ipt/i))return["INH or H (Isoniazid 300mg tablet)"];if(e.includes("3HP (RFP + INH)"))return["INH or H (Isoniazid 300mg tablet)","Rifapentine (150mg)"];if(e.includes("INH 300 / RFP 300 (3HP)"))return["INH 300 / RFP 300 (3HP)"]}return[]}),I=async()=>{if(await j("Are you sure you want to clear all fields?"))for(const e in l)e!=="patientType"&&(l[e].value=void 0,l[e].error="");U.emit(L.ON_CLEAR)},w=async()=>{await E.setSessionDate(l.initialVisitDate.value),C.setDate(l.initialVisitDate.value),m.setDate(l.initialVisitDate.value),A.setDate(l.initialVisitDate.value),b.setDate(l.initialVisitDate.value),await se(l,async(e,a)=>{o("onValue",{type:"registration",data:{formData:{...e,arvNumber:e.arvNumber?"".concat(T.code,"-ARV-").concat(e.arvNumber):""},computedData:a,arvNumberEditable:!l.arvNumber.disabled}}),o("onNext")})};return q(()=>{const e=t.patient.getArvNumber();e&&e!=="Unknown"?(l.arvNumber.value=e.split("-")[2],l.arvNumber.disabled=!0):me.getNextSuggestedARVNumber().then(a=>{s.value=a,s.value&&(l.arvNumber.label="Arv Number (Suggested Number: ".concat(s.value,")"))}),E.getCustomIngridients().then(a=>{a.ok&&(R.value=a.data)})}),{today:ue,form:l,isConfirmatoryTestDone:g,initialTbStatusOptions:ae,tptHistoryOptions:oe,HIVTestOptions:ie,tptDrugs:c,facility:T,birthdate:y,getFacilities:ee,onClear:I,onSubmit:w}}});function ve(t,o,R,m,b,A){const C=f("ion-title"),T=f("text-input"),s=f("ion-col"),y=f("DateInput"),l=f("yes-no-input"),g=f("SelectInput"),c=f("NumberInput"),I=f("ion-button"),w=f("ion-row");return v(),D(H,null,[i(C,{class:"ion-text-center ion-margin-vertical ion-padding-bottom bold"},{default:r(()=>[S(" HIV Clinic Registration ")]),_:1}),i(w,{class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(s,{size:"5",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(T,{modelValue:t.form.arvNumber,"onUpdate:modelValue":o[0]||(o[0]=e=>t.form.arvNumber=e),form:t.form,prefix:"".concat(t.facility.code,"-ARV-"),disabled:!t.isNewPatient},null,8,["modelValue","form","prefix","disabled"])]),_:1}),i(s,{size:"7",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(y,{modelValue:t.form.initialVisitDate,"onUpdate:modelValue":o[1]||(o[1]=e=>t.form.initialVisitDate=e),"min-date":t.birthdate,"max-date":t.today,form:t.form},null,8,["modelValue","min-date","max-date","form"])]),_:1}),i(s,{size:"5",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(l,{modelValue:t.form.shouldFollowUp,"onUpdate:modelValue":o[2]||(o[2]=e=>t.form.shouldFollowUp=e),inline:""},null,8,["modelValue"])]),_:1}),i(s,{size:"7",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(l,{modelValue:t.form.receivedArvTreatmentBefore,"onUpdate:modelValue":o[3]||(o[3]=e=>t.form.receivedArvTreatmentBefore=e),inline:""},null,8,["modelValue"])]),_:1}),t.form.receivedArvTreatmentBefore.value==="Yes"?(v(),D(H,{key:0},[i(s,{size:"12",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(y,{modelValue:t.form.dateLastTakenArvs,"onUpdate:modelValue":o[4]||(o[4]=e=>t.form.dateLastTakenArvs=e),form:t.form,"min-date":t.birthdate,"max-date":t.today},null,8,["modelValue","form","min-date","max-date"])]),_:1}),i(s,{size:"12",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(l,{modelValue:t.form.everRegisteredAtClinic,"onUpdate:modelValue":o[5]||(o[5]=e=>t.form.everRegisteredAtClinic=e),inline:""},null,8,["modelValue"])]),_:1})],64)):V("",!0),t.form.everRegisteredAtClinic.value==="Yes"?(v(),D(H,{key:1},[i(s,{size:"9",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(g,{modelValue:t.form.artInitiationLocation,"onUpdate:modelValue":o[6]||(o[6]=e=>t.form.artInitiationLocation=e),form:t.form,asyncOptions:t.getFacilities,allowCustom:""},null,8,["modelValue","form","asyncOptions"])]),_:1}),i(s,{size:"3",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(T,{modelValue:t.form.arvNumberAtPreviousLocation,"onUpdate:modelValue":o[7]||(o[7]=e=>t.form.arvNumberAtPreviousLocation=e),form:t.form},null,8,["modelValue","form"])]),_:1}),i(s,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(y,{modelValue:t.form.artStartDate,"onUpdate:modelValue":o[8]||(o[8]=e=>t.form.artStartDate=e),form:t.form,"min-date":t.birthdate,"max-date":t.today},null,8,["modelValue","form","min-date","max-date"])]),_:1}),i(s,{size:"3",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(c,{modelValue:t.form.initialWeight,"onUpdate:modelValue":o[9]||(o[9]=e=>t.form.initialWeight=e),form:t.form,min:1,allowUnknown:""},null,8,["modelValue","form"])]),_:1}),i(s,{size:"3",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(c,{modelValue:t.form.initialHeight,"onUpdate:modelValue":o[10]||(o[10]=e=>t.form.initialHeight=e),form:t.form,min:1,allowUnknown:""},null,8,["modelValue","form"])]),_:1}),i(s,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(g,{modelValue:t.form.initialTBStatus,"onUpdate:modelValue":o[11]||(o[11]=e=>t.form.initialTBStatus=e),form:t.form,options:t.initialTbStatusOptions},null,8,["modelValue","form","options"])]),_:1}),i(s,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(g,{modelValue:t.form.tptHistory,"onUpdate:modelValue":o[12]||(o[12]=e=>t.form.tptHistory=e),form:t.form,options:t.tptHistoryOptions},null,8,["modelValue","form","options"])]),_:1}),t.tptDrugs.length?(v(),D(H,{key:0},[i(s,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(y,{modelValue:t.form.tptStartDate,"onUpdate:modelValue":o[13]||(o[13]=e=>t.form.tptStartDate=e),"min-date":t.birthdate,"max-date":t.today,form:t.form},null,8,["modelValue","min-date","max-date","form"])]),_:1}),t.tptDrugs.includes("INH or H (Isoniazid 300mg tablet)")?(v(),P(s,{key:0,size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(c,{modelValue:t.form.inhQty,"onUpdate:modelValue":o[14]||(o[14]=e=>t.form.inhQty=e),form:t.form,min:1},null,8,["modelValue","form"])]),_:1})):V("",!0),t.tptDrugs.includes("Rifapentine (150mg)")?(v(),P(s,{key:1,size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(c,{modelValue:t.form.rifapentineQty,"onUpdate:modelValue":o[15]||(o[15]=e=>t.form.rifapentineQty=e),form:t.form,min:1},null,8,["modelValue","form"])]),_:1})):V("",!0),t.tptDrugs.includes("INH 300 / RFP 300 (3HP)")?(v(),P(s,{key:2,size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(c,{modelValue:t.form.threeHPQty,"onUpdate:modelValue":o[16]||(o[16]=e=>t.form.threeHPQty=e),form:t.form,min:1},null,8,["modelValue","form"])]),_:1})):V("",!0),i(s,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(g,{modelValue:t.form.tptStartLocation,"onUpdate:modelValue":o[17]||(o[17]=e=>t.form.tptStartLocation=e),form:t.form,asyncOptions:t.getFacilities,allowCustom:""},null,8,["modelValue","form","asyncOptions"])]),_:1})],64)):V("",!0)],64)):V("",!0),i(s,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(g,{modelValue:t.form.confirmatoryTest,"onUpdate:modelValue":o[18]||(o[18]=e=>t.form.confirmatoryTest=e),form:t.form,options:t.HIVTestOptions},null,8,["modelValue","form","options"])]),_:1}),t.isConfirmatoryTestDone?(v(),D(H,{key:2},[i(s,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(g,{modelValue:t.form.confirmatoryTestLocation,"onUpdate:modelValue":o[19]||(o[19]=e=>t.form.confirmatoryTestLocation=e),form:t.form,asyncOptions:t.getFacilities,allowCustom:""},null,8,["modelValue","form","asyncOptions"])]),_:1}),i(s,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:r(()=>[i(y,{modelValue:t.form.confirmatoryTestDate,"onUpdate:modelValue":o[20]||(o[20]=e=>t.form.confirmatoryTestDate=e),form:t.form,"min-date":t.birthdate,"max-date":t.today},null,8,["modelValue","form","min-date","max-date"])]),_:1})],64)):V("",!0),i(s,{size:"12",class:"ion-margin-top"},{default:r(()=>[i(I,{class:"ion-margin-top ion-float-right",size:"large",onClick:t.onSubmit,color:"success"},{default:r(()=>[S("Next")]),_:1},8,["onClick"]),i(I,{class:"ion-margin-top ion-float-right",size:"large",color:"warning",onClick:t.onClear},{default:r(()=>[S("Clear")]),_:1},8,["onClick"]),t.isNewPatient?V("",!0):(v(),P(I,{key:0,class:"ion-margin-top ion-float-right",size:"large",onClick:o[21]||(o[21]=e=>t.$router.back()),color:"primary"},{default:r(()=>[S("Back")]),_:1}))]),_:1})]),_:1})],64)}const qe=de(fe,[["render",ve]]);export{qe as default};
