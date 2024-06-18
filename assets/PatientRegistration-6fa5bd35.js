import{d as B,a7 as S,_ as q,$ as R,ak as T,J as M,S as D,a8 as U,Z as G,ac as O,al as A,r as u,h as $,w as i,o as W,a,f as w,b as k}from"./index-1c16650e.js";import{P as Y,R as H}from"./relations_service-426943ac.js";import{T as J}from"./TextInput-9a09c3ed.js";import{D as Z}from"./DateInput-1961bd72.js";import{S as j}from"./SelectInput-61d8e31d.js";import{a as K,b as Q}from"./location_options-3cab4a71.js";import{i as C,r as E}from"./form-c5c112ea.js";import{a as X}from"./Strs-7ee8a435.js";import{l as _}from"./loader-1441845f.js";import{E as x,a as ee}from"./emc_event-4721851b.js";import{a as v,b as ae,c as z}from"./validations-11aef89d.js";import{a as oe}from"./his_date-3ca53c6f.js";import{t as ne}from"./toasts-926a2fd9.js";import{P as te}from"./patient_identifier_service-31eb4b11.js";import{M as le}from"./index-95d3a767.js";import{_ as ie}from"./_plugin-vue_export-helper-c27b6911.js";import"./program_service-dfa5bbb7.js";import"./image-cb93bc3e.js";import"./vue-datepicker-312099be.js";import"./common-94ac9539.js";import"./Date-c63183ce.js";const re=B({components:{IonGrid:S,IonRow:q,IonCol:R,TextInput:J,DateInput:Z,SelectInput:j,IonCheckbox:T},setup(){const o=M(),l=D(!1),f=D(!1),I=K(),P=[{label:"Male",value:"M"},{label:"Female",value:"F"}],p=U({givenName:{label:"First Name",value:"",placeholder:"Enter First Name",required:!0,validation:e=>v(e)},familyName:{label:"Last Name",value:"",placeholder:"Enter Last Name",required:!0,validation:e=>v(e)},middleName:{label:"Middle Name",value:"",placeholder:"Enter middle Name",validation:e=>e&&e.label?v(e):null},nationalId:{label:"Malawi National ID Number",value:"",placeholder:"Enter Malawi National ID Number",validation:e=>e&&e.label?ae(e):null},gender:{value:"",required:!0,label:"Gender",placeholder:"select gender"},birthdate:{value:"",label:"Date of Birth",required:!0},cellPhoneNumber:{value:"",required:!0,label:"Cellphone Number",placeholder:"Enter cellphone number e.g. 0991234567",validation:async e=>e.value!=="Unknown"&&z(e)},homeVillage:{value:"",label:"Home Village",placeholder:"Home Village",required:!0},landmark:{value:"",label:"Landmark",placeholder:"Closest Landmark or Plot Number",required:!0}}),n=U({givenName:{label:"First Name",value:"",placeholder:"Enter First Name",required:!0,validation:e=>v(e)},familyName:{label:"Last Name",value:"",placeholder:"Enter Last Name",required:!0,validation:e=>v(e)},cellPhoneNumber:{value:"",required:!0,label:"Cellphone Number",placeholder:"Enter cellphone number e.g. 0991234567",validation:async e=>e.value!=="Unknown"&&z(e)}});G(f,e=>{e?(n.givenName.value="Unknown",n.familyName.value="Unknown",n.cellPhoneNumber.value="Unknown",n.givenName.disabled=!0,n.familyName.disabled=!0,n.givenName.error="",n.familyName.error="",n.cellPhoneNumber.error=""):(n.givenName.value="",n.familyName.value="",n.cellPhoneNumber.value="",n.givenName.disabled=!1,n.familyName.disabled=!1)});const c=async()=>{if(await O("Are you sure you want to clear all fields?")){for(const e in p)p[e].value=void 0,p[e].error="";for(const e in n)n[e].value=void 0,n[e].error="";x.emit(ee.ON_CLEAR)}},N=(e,s={})=>{const r={facility_name:null,occupation:null};for(const m in e)r[X(m)]=e[m];return{...r,...s}},d=async e=>{var m,b,t,g,h;let s,r;try{(m=e==null?void 0:e.other)!=null&&m.traditional_authority_id&&(s=await A.getTraditionalAuthorityById(e.other.traditional_authority_id)),s&&(r=await A.getDistrictByID(s.district_id))}catch(y){ne("Unable to resolve client address. Saving using default address"),console.error(y)}return{home_district:(b=r==null?void 0:r.name)!=null?b:"N/A",home_traditional_authority:(t=s==null?void 0:s.name)!=null?t:"N/A",home_village:(e==null?void 0:e.label)||"N/A",current_district:(g=r==null?void 0:r.name)!=null?g:"N/A",current_traditional_authority:(h=s==null?void 0:s.name)!=null?h:"N/A",current_village:(e==null?void 0:e.label)||"N/A"}};return{today:oe,patient:p,guardian:n,landmarks:I,genderOptions:P,guardianAbsent:f,isBirthdateEstimated:l,onClear:c,onFinish:async()=>{const e=await C(p),s=f.value?!0:await C(n);if(e&&s){await _.show("Saving...");try{const r=E(p).formData,m=new Y,b=await d(r.homeVillage),t=N(r,{...b,isPatient:!0,patient_type:null,gender:r.gender.value,landmark:r.landmark.value,birthdate_estimated:l.value?"Yes":"No",relationship:f.value?"No":"Yes"});await m.createPerson(t),await m.createPatient();const g=m.getPersonID();if(r.nationalId&&await te.create(g,le,r.nationalId),!f.value&&s){const{formData:h}=E(n),y=await d(),F=N(h,{...y,middle_name:"",gender:"N/A",birthdate:"N/A",birthdate_estimated:"N/A",landmark:"N/A",relationship:"N/A",patient_type:"",isPatient:!1,patient_id:g});await m.registerGuardian(F);const L=m.getPersonID();await H.createRelation(g,L,13)}_.hide(),o.push("/patient/reception/".concat(g,"/true"))}catch(r){console.log(r),_.hide()}}},getVillagesByName:Q}}}),se=w("h1",null,"New Patient Registration",-1),me=w("b",null,"Personal Details",-1),de=w("b",null,"Guardian details",-1),ue={class:"ion-margin-start checkbox-label"};function pe(o,l,f,I,P,p){const n=u("ion-col"),c=u("ion-row"),N=u("ion-title"),d=u("TextInput"),V=u("SelectInput"),e=u("DateInput"),s=u("ion-checkbox"),r=u("ion-button"),m=u("ion-grid"),b=u("Layout");return W(),$(b,null,{default:i(()=>[a(m,null,{default:i(()=>[a(c,null,{default:i(()=>[a(n,{class:"ion-margin-bottom"},{default:i(()=>[se]),_:1})]),_:1}),a(c,{class:"his-card"},{default:i(()=>[a(n,{size:"12"},{default:i(()=>[a(N,{class:"ion-text-center ion-margin-vertical"},{default:i(()=>[me]),_:1}),a(c,{class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(n,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(d,{modelValue:o.patient.givenName,"onUpdate:modelValue":l[0]||(l[0]=t=>o.patient.givenName=t)},null,8,["modelValue"])]),_:1}),a(n,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(d,{modelValue:o.patient.middleName,"onUpdate:modelValue":l[1]||(l[1]=t=>o.patient.middleName=t)},null,8,["modelValue"])]),_:1}),a(n,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(d,{modelValue:o.patient.familyName,"onUpdate:modelValue":l[2]||(l[2]=t=>o.patient.familyName=t)},null,8,["modelValue"])]),_:1}),a(n,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(d,{modelValue:o.patient.nationalId,"onUpdate:modelValue":l[3]||(l[3]=t=>o.patient.nationalId=t)},null,8,["modelValue"])]),_:1}),a(n,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(V,{modelValue:o.patient.gender,"onUpdate:modelValue":l[4]||(l[4]=t=>o.patient.gender=t),options:o.genderOptions},null,8,["modelValue","options"])]),_:1}),a(n,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(d,{modelValue:o.patient.cellPhoneNumber,"onUpdate:modelValue":l[5]||(l[5]=t=>o.patient.cellPhoneNumber=t),allowUnknown:""},null,8,["modelValue"])]),_:1}),a(n,{size:"12",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(e,{modelValue:o.patient.birthdate,"onUpdate:modelValue":l[6]||(l[6]=t=>o.patient.birthdate=t),allowEstimation:!0,estimationLabel:"Estimate Age",minDate:"1920-01-01",maxDate:o.today(),onIsEstimated:l[7]||(l[7]=t=>o.isBirthdateEstimated=t)},null,8,["modelValue","maxDate"])]),_:1}),a(n,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(V,{modelValue:o.patient.homeVillage,"onUpdate:modelValue":l[8]||(l[8]=t=>o.patient.homeVillage=t),asyncOptions:o.getVillagesByName,allowCustom:""},null,8,["modelValue","asyncOptions"])]),_:1}),a(n,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(V,{modelValue:o.patient.landmark,"onUpdate:modelValue":l[9]||(l[9]=t=>o.patient.landmark=t),options:o.landmarks,allowCustom:""},null,8,["modelValue","options"])]),_:1})]),_:1}),a(N,{class:"ion-text-center ion-margin-vertical ion-padding-top"},{default:i(()=>[de,w("span",ue,[k(" Guardian Details Unknown? "),a(s,{modelValue:o.guardianAbsent,"onUpdate:modelValue":l[10]||(l[10]=t=>o.guardianAbsent=t)},null,8,["modelValue"])])]),_:1}),a(c,{class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(n,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(d,{modelValue:o.guardian.givenName,"onUpdate:modelValue":l[11]||(l[11]=t=>o.guardian.givenName=t)},null,8,["modelValue"])]),_:1}),a(n,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(d,{modelValue:o.guardian.familyName,"onUpdate:modelValue":l[12]||(l[12]=t=>o.guardian.familyName=t)},null,8,["modelValue"])]),_:1}),a(n,{size:"12",class:"ion-margin-top ion-margin-bottom"},{default:i(()=>[a(d,{modelValue:o.guardian.cellPhoneNumber,"onUpdate:modelValue":l[13]||(l[13]=t=>o.guardian.cellPhoneNumber=t),allowUnknown:""},null,8,["modelValue"])]),_:1})]),_:1}),a(r,{class:"ion-margin-top ion-float-right",onClick:o.onFinish,size:"large",color:"success"},{default:i(()=>[k("Finish")]),_:1},8,["onClick"]),a(r,{class:"ion-margin-top ion-float-right",onClick:o.onClear,size:"large",color:"warning"},{default:i(()=>[k("Clear")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1})}const Le=ie(re,[["render",pe]]);export{Le as default};
