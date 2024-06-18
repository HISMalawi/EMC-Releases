import{d as E,_ as N,$ as T,I as O,N as k,S as y,g as D,a8 as W,Z as w,T as q,ac as U,r as m,o as h,c as A,a,w as l,b as c,F as _,j as Y}from"./index-1c16650e.js";import{S as I}from"./Date-c63183ce.js";import{T as $}from"./TextInput-9a09c3ed.js";import{D as B}from"./DateInput-1961bd72.js";import{Y as P}from"./YesNoInput-6d682510.js";import{S as j}from"./SelectInput-61d8e31d.js";import{g as L}from"./location_options-3cab4a71.js";import{d as F}from"./his_date-3ca53c6f.js";import{s as M}from"./form-c5c112ea.js";import{S as g}from"./HIVReception-173434dc.js";import{E as Z,a as G}from"./emc_event-4721851b.js";import{d as R,v as H,r as J}from"./validations-11aef89d.js";import{_ as K}from"./_plugin-vue_export-helper-c27b6911.js";import"./vue-datepicker-312099be.js";import"./common-94ac9539.js";import"./Strs-7ee8a435.js";import"./toasts-926a2fd9.js";import"./loader-1441845f.js";import"./ApiStore-7ff79166.js";import"./program_service-dfa5bbb7.js";import"./image-cb93bc3e.js";import"./index-95d3a767.js";import"./user_service-6565a8e9.js";import"./patient_service-29b1e70e.js";import"./patient_identifier_service-31eb4b11.js";import"./services-f7c3fb9d.js";import"./encounter_types-55fa45e3.js";const Q=E({components:{IonRow:N,IonCol:T,IonButton:O,IonTitle:k,TextInput:$,DateInput:B,YesNoInput:P,SelectInput:j},props:{patient:{type:Object,required:!0},isNewPatient:{type:Boolean,default:!0},observations:{type:Object,default:()=>({})},initialVisitDate:{type:String,default:""},artStartDate:{type:String,default:""}},emits:["onValue","onPrevious","onFinish"],setup(t,{emit:n}){const b=y([]),C=y([]),S=F().format(I),V=D(()=>{const o=t.patient.getBirthdate();return o?F(o).format(I):""}),r=new g(t.patient.getID(),t.patient.getAge(),-1),d=D(()=>r.getAllReasonsForART(t.artStartDate||t.initialVisitDate,t.patient.isMale()).map(o=>({label:o.name,value:o.name}))),u=r.getAllWhoStages().filter(o=>o.name.match(/1|2|3|4/i)).map(o=>({label:o.name,value:o.name})),s=W({reasonsForEligibity:{value:t.observations["Reason for ART eligibility"]||"",label:"Reason for Starting",placeholder:"Select Reason for Starting",required:!0,computedValue:o=>({obs:r.buildReasonForArtObs(typeof o=="string"?o:o.label)})},whoStage:{value:t.observations["Who stage"]||"",label:"Select Stage",placeholder:"Select Stage",required:!0,computedValue:o=>({obs:r.buildWhoStageObs(typeof o=="string"?o:o.label)})},cd4countAvailable:{value:t.observations["CD4 count"]?"Yes":"No",label:"Recent CD4 Count results available?",required:!0},cd4CountDate:{value:t.observations["Cd4 count datetime"]||"",label:"CD4 Count date",placeholder:"CD4 Count date",computedValue:o=>({obs:g.buildValueDate("Cd4 count datetime",o)}),validation:async(o,e)=>{var i;return((i=e.cd4countAvailable)==null?void 0:i.value)==="Yes"&&R(o)}},cd4Count:{value:t.observations["CD4 count"]||"",label:"CD4 Count",placeholder:"CD4 Count e.g. <100 or >500",computedValue:o=>{const e=parseInt(o.substring(1)),i=o.substring(0,1);return{modifier:i,count:e,obs:g.buildValueNumber("CD4 count",e,i)}},validation:async(o,e)=>{var i;return((i=e.cd4countAvailable)==null?void 0:i.value)==="Yes"&&H([()=>J(o),()=>r.cd4CountIsValid(o.value.toString())?null:["Please start with a modifier. e.g. >, <, or ="]])}},cd4CountLocation:{value:t.observations["Cd4 count location"]||"",label:"CD4 Count location",computedValue:o=>({obs:g.buildValueText("Cd4 count location",typeof o=="string"?o:o.label)}),validation:async(o,e)=>{var i;return((i=e.cd4countAvailable)==null?void 0:i.value)==="Yes"&&R(o)}},whoConditions:{value:t.observations["Who stages criteria present"]?[{label:t.observations["Who stages criteria present"],value:t.observations["Who stages criteria present"]}]:"",required:!0,label:"Select Staging Conditions",computedValue:o=>({obs:typeof o=="string"?r.buildWhoCriteriaObs(o):o.map(e=>r.buildWhoCriteriaObs(e.label))})}}),f=async()=>{if(await U("Are you sure you want to clear all fields?")){for(const o in s)s[o].value=void 0,s[o].error="";Z.emit(G.ON_CLEAR)}},v=async()=>{r.setDate(t.initialVisitDate),await M(s,async(o,e)=>{n("onValue",{type:"staging",data:{formData:o,computedData:e}}),n("onFinish")})},p=o=>{o&&(s.whoConditions.value="");const e=parseInt((o==null?void 0:o.split(" ")[2])||"1");b.value=r.getStagingConditions(e).map(i=>({label:i.name,value:i.name,other:i})).sort((i,z)=>i.label.localeCompare(z.label))};return w(()=>s.whoStage.value,o=>p(o==null?void 0:o.label)),w(()=>s.reasonsForEligibity.value,()=>{s.whoStage.value="",s.whoConditions.value=""}),q(()=>p()),{today:S,patientDob:V,form:s,whoStages:u,stagingCoditions:b,selectedConditions:C,reasonsForArt:d,getFacilities:L,onClear:f,onSubmit:v}}});function X(t,n,b,C,S,V){const r=m("ion-title"),d=m("SelectInput"),u=m("ion-col"),s=m("yes-no-input"),f=m("DateInput"),v=m("text-input"),p=m("ion-button"),o=m("ion-row");return h(),A(_,null,[a(r,{class:"ion-text-center ion-margin-vertical ion-padding-bottom bold"},{default:l(()=>[c(" Staging ")]),_:1}),a(o,{class:"ion-margin-top ion-margin-bottom"},{default:l(()=>[a(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:l(()=>[a(d,{modelValue:t.form.reasonsForEligibity,"onUpdate:modelValue":n[0]||(n[0]=e=>t.form.reasonsForEligibity=e),options:t.reasonsForArt},null,8,["modelValue","options"])]),_:1}),a(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:l(()=>[a(d,{modelValue:t.form.whoStage,"onUpdate:modelValue":n[1]||(n[1]=e=>t.form.whoStage=e),options:t.whoStages},null,8,["modelValue","options"])]),_:1}),a(u,{size:"12",class:"ion-margin-top ion-margin-bottom"},{default:l(()=>[a(s,{modelValue:t.form.cd4countAvailable,"onUpdate:modelValue":n[2]||(n[2]=e=>t.form.cd4countAvailable=e),inline:""},null,8,["modelValue"])]),_:1}),t.form.cd4countAvailable.value==="Yes"?(h(),A(_,{key:0},[a(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:l(()=>[a(f,{modelValue:t.form.cd4CountDate,"onUpdate:modelValue":n[3]||(n[3]=e=>t.form.cd4CountDate=e),"min-date":t.patientDob,"max-date":t.today},null,8,["modelValue","min-date","max-date"])]),_:1}),a(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:l(()=>[a(v,{modelValue:t.form.cd4Count,"onUpdate:modelValue":n[4]||(n[4]=e=>t.form.cd4Count=e)},null,8,["modelValue"])]),_:1}),a(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:l(()=>[a(d,{modelValue:t.form.cd4CountLocation,"onUpdate:modelValue":n[5]||(n[5]=e=>t.form.cd4CountLocation=e),asyncOptions:t.getFacilities,allowCustom:""},null,8,["modelValue","asyncOptions"])]),_:1})],64)):Y("",!0),a(u,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:l(()=>[a(d,{modelValue:t.form.whoConditions,"onUpdate:modelValue":n[6]||(n[6]=e=>t.form.whoConditions=e),options:t.stagingCoditions,multiple:""},null,8,["modelValue","options"])]),_:1}),a(u,{size:"12",class:"ion-margin-top"},{default:l(()=>[a(p,{class:"ion-margin-top ion-float-right",size:"large",onClick:t.onSubmit,color:"success"},{default:l(()=>[c("Finish")]),_:1},8,["onClick"]),a(p,{class:"ion-margin-top ion-float-right",size:"large",color:"warning",onClick:t.onClear},{default:l(()=>[c("Clear")]),_:1},8,["onClick"]),a(p,{class:"ion-margin-top ion-float-right",size:"large",onClick:n[7]||(n[7]=e=>t.$emit("onPrevious")),color:"primary"},{default:l(()=>[c("Previous")]),_:1})]),_:1})]),_:1})],64)}const Io=K(Q,[["render",X],["__scopeId","data-v-46029383"]]);export{Io as default};
