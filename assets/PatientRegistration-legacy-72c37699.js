System.register(["./index-legacy-5fd00317.js","./relations_service-legacy-17e80565.js","./TextInput-legacy-8725a274.js","./DateInput-legacy-c96b3246.js","./SelectInput-legacy-239ac137.js","./location_options-legacy-82bffb9f.js","./form-legacy-14cfe3a7.js","./Strs-legacy-09248991.js","./loader-legacy-26a3e1a4.js","./emc_event-legacy-58754a45.js","./validations-legacy-470ac0cd.js","./his_date-legacy-f511c580.js","./toasts-legacy-8814bb27.js","./patient_identifier_service-legacy-c96f3e39.js","./index-legacy-aa705205.js","./_plugin-vue_export-helper-legacy-762b7923.js","./program_service-legacy-a2774ffc.js","./image-legacy-0b5f9ca9.js","./vue-datepicker-legacy-672cca54.js","./common-legacy-42ce034b.js","./Date-legacy-074e72e8.js"],(function(e,a){"use strict";var l,n,t,i,o,r,d,u,m,s,c,g,p,v,b,h,N,y,f,_,V,w,k,I,U,j,P,D,A,z,C,E,x,q,F,L,S,B,M;return{setters:[e=>{l=e.d,n=e.a7,t=e._,i=e.$,o=e.ak,r=e.J,d=e.S,u=e.a8,m=e.Z,s=e.ac,c=e.al,g=e.r,p=e.h,v=e.w,b=e.o,h=e.a,N=e.f,y=e.b},e=>{f=e.P,_=e.R},e=>{V=e.T},e=>{w=e.D},e=>{k=e.S},e=>{I=e.a,U=e.b},e=>{j=e.i,P=e.r},e=>{D=e.a},e=>{A=e.l},e=>{z=e.E,C=e.a},e=>{E=e.a,x=e.b,q=e.c},e=>{F=e.a},e=>{L=e.t},e=>{S=e.P},e=>{B=e.M},e=>{M=e._},null,null,null,null,null],execute:function(){const a=l({components:{IonGrid:n,IonRow:t,IonCol:i,TextInput:V,DateInput:w,SelectInput:k,IonCheckbox:o},setup(){const e=r(),a=d(!1),l=d(!1),n=I(),t=u({givenName:{label:"First Name",value:"",placeholder:"Enter First Name",required:!0,validation:e=>E(e)},familyName:{label:"Last Name",value:"",placeholder:"Enter Last Name",required:!0,validation:e=>E(e)},middleName:{label:"Middle Name",value:"",placeholder:"Enter middle Name",validation:e=>e&&e.label?E(e):null},nationalId:{label:"Malawi National ID Number",value:"",placeholder:"Enter Malawi National ID Number",validation:e=>e&&e.label?x(e):null},gender:{value:"",required:!0,label:"Gender",placeholder:"select gender"},birthdate:{value:"",label:"Date of Birth",required:!0},cellPhoneNumber:{value:"",required:!0,label:"Cellphone Number",placeholder:"Enter cellphone number e.g. 0991234567",validation:async e=>"Unknown"!==e.value&&q(e)},homeVillage:{value:"",label:"Home Village",placeholder:"Home Village",required:!0},landmark:{value:"",label:"Landmark",placeholder:"Closest Landmark or Plot Number",required:!0}}),i=u({givenName:{label:"First Name",value:"",placeholder:"Enter First Name",required:!0,validation:e=>E(e)},familyName:{label:"Last Name",value:"",placeholder:"Enter Last Name",required:!0,validation:e=>E(e)},cellPhoneNumber:{value:"",required:!0,label:"Cellphone Number",placeholder:"Enter cellphone number e.g. 0991234567",validation:async e=>"Unknown"!==e.value&&q(e)}});m(l,(e=>{e?(i.givenName.value="Unknown",i.familyName.value="Unknown",i.cellPhoneNumber.value="Unknown",i.givenName.disabled=!0,i.familyName.disabled=!0,i.givenName.error="",i.familyName.error="",i.cellPhoneNumber.error=""):(i.givenName.value="",i.familyName.value="",i.cellPhoneNumber.value="",i.givenName.disabled=!1,i.familyName.disabled=!1)}));const o=(e,a={})=>{const l={facility_name:null,occupation:null};for(const n in e)l[D(n)]=e[n];return{...l,...a}},g=async e=>{var a,l,n,t,i,o,r,d;let u,m;try{var s;null!=e&&null!==(s=e.other)&&void 0!==s&&s.traditional_authority_id&&(u=await c.getTraditionalAuthorityById(e.other.traditional_authority_id)),u&&(m=await c.getDistrictByID(u.district_id))}catch(g){L("Unable to resolve client address. Saving using default address"),console.error(g)}return{home_district:null!==(a=null===(l=m)||void 0===l?void 0:l.name)&&void 0!==a?a:"N/A",home_traditional_authority:null!==(n=null===(t=u)||void 0===t?void 0:t.name)&&void 0!==n?n:"N/A",home_village:(null==e?void 0:e.label)||"N/A",current_district:null!==(i=null===(o=m)||void 0===o?void 0:o.name)&&void 0!==i?i:"N/A",current_traditional_authority:null!==(r=null===(d=u)||void 0===d?void 0:d.name)&&void 0!==r?r:"N/A",current_village:(null==e?void 0:e.label)||"N/A"}};return{today:F,patient:t,guardian:i,landmarks:n,genderOptions:[{label:"Male",value:"M"},{label:"Female",value:"F"}],guardianAbsent:l,isBirthdateEstimated:a,onClear:async()=>{if(await s("Are you sure you want to clear all fields?")){for(const e in t)t[e].value=void 0,t[e].error="";for(const e in i)i[e].value=void 0,i[e].error="";z.emit(C.ON_CLEAR)}},onFinish:async()=>{const n=await j(t),r=!!l.value||await j(i);if(n&&r){await A.show("Saving...");try{const n=P(t).formData,d=new f,u=await g(n.homeVillage),m=o(n,{...u,isPatient:!0,patient_type:null,gender:n.gender.value,landmark:n.landmark.value,birthdate_estimated:a.value?"Yes":"No",relationship:l.value?"No":"Yes"});await d.createPerson(m),await d.createPatient();const s=d.getPersonID();if(n.nationalId&&await S.create(s,B,n.nationalId),!l.value&&r){const{formData:e}=P(i),a=await g(),l=o(e,{...a,middle_name:"",gender:"N/A",birthdate:"N/A",birthdate_estimated:"N/A",landmark:"N/A",relationship:"N/A",patient_type:"",isPatient:!1,patient_id:s});await d.registerGuardian(l);const n=d.getPersonID();await _.createRelation(s,n,13)}A.hide(),e.push(`/patient/reception/${s}/true`)}catch(d){console.log(d),A.hide()}}},getVillagesByName:U}}}),G=N("h1",null,"New Patient Registration",-1),O=N("b",null,"Personal Details",-1),R=N("b",null,"Guardian details",-1),T={class:"ion-margin-start checkbox-label"};e("default",M(a,[["render",function(e,a,l,n,t,i){const o=g("ion-col"),r=g("ion-row"),d=g("ion-title"),u=g("TextInput"),m=g("SelectInput"),s=g("DateInput"),c=g("ion-checkbox"),f=g("ion-button"),_=g("ion-grid"),V=g("Layout");return b(),p(V,null,{default:v((()=>[h(_,null,{default:v((()=>[h(r,null,{default:v((()=>[h(o,{class:"ion-margin-bottom"},{default:v((()=>[G])),_:1})])),_:1}),h(r,{class:"his-card"},{default:v((()=>[h(o,{size:"12"},{default:v((()=>[h(d,{class:"ion-text-center ion-margin-vertical"},{default:v((()=>[O])),_:1}),h(r,{class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(o,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(u,{modelValue:e.patient.givenName,"onUpdate:modelValue":a[0]||(a[0]=a=>e.patient.givenName=a)},null,8,["modelValue"])])),_:1}),h(o,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(u,{modelValue:e.patient.middleName,"onUpdate:modelValue":a[1]||(a[1]=a=>e.patient.middleName=a)},null,8,["modelValue"])])),_:1}),h(o,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(u,{modelValue:e.patient.familyName,"onUpdate:modelValue":a[2]||(a[2]=a=>e.patient.familyName=a)},null,8,["modelValue"])])),_:1}),h(o,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(u,{modelValue:e.patient.nationalId,"onUpdate:modelValue":a[3]||(a[3]=a=>e.patient.nationalId=a)},null,8,["modelValue"])])),_:1}),h(o,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(m,{modelValue:e.patient.gender,"onUpdate:modelValue":a[4]||(a[4]=a=>e.patient.gender=a),options:e.genderOptions},null,8,["modelValue","options"])])),_:1}),h(o,{size:"4",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(u,{modelValue:e.patient.cellPhoneNumber,"onUpdate:modelValue":a[5]||(a[5]=a=>e.patient.cellPhoneNumber=a),allowUnknown:""},null,8,["modelValue"])])),_:1}),h(o,{size:"12",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(s,{modelValue:e.patient.birthdate,"onUpdate:modelValue":a[6]||(a[6]=a=>e.patient.birthdate=a),allowEstimation:!0,estimationLabel:"Estimate Age",minDate:"1920-01-01",maxDate:e.today(),onIsEstimated:a[7]||(a[7]=a=>e.isBirthdateEstimated=a)},null,8,["modelValue","maxDate"])])),_:1}),h(o,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(m,{modelValue:e.patient.homeVillage,"onUpdate:modelValue":a[8]||(a[8]=a=>e.patient.homeVillage=a),asyncOptions:e.getVillagesByName,allowCustom:""},null,8,["modelValue","asyncOptions"])])),_:1}),h(o,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(m,{modelValue:e.patient.landmark,"onUpdate:modelValue":a[9]||(a[9]=a=>e.patient.landmark=a),options:e.landmarks,allowCustom:""},null,8,["modelValue","options"])])),_:1})])),_:1}),h(d,{class:"ion-text-center ion-margin-vertical ion-padding-top"},{default:v((()=>[R,N("span",T,[y(" Guardian Details Unknown? "),h(c,{modelValue:e.guardianAbsent,"onUpdate:modelValue":a[10]||(a[10]=a=>e.guardianAbsent=a)},null,8,["modelValue"])])])),_:1}),h(r,{class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(o,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(u,{modelValue:e.guardian.givenName,"onUpdate:modelValue":a[11]||(a[11]=a=>e.guardian.givenName=a)},null,8,["modelValue"])])),_:1}),h(o,{size:"6",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(u,{modelValue:e.guardian.familyName,"onUpdate:modelValue":a[12]||(a[12]=a=>e.guardian.familyName=a)},null,8,["modelValue"])])),_:1}),h(o,{size:"12",class:"ion-margin-top ion-margin-bottom"},{default:v((()=>[h(u,{modelValue:e.guardian.cellPhoneNumber,"onUpdate:modelValue":a[13]||(a[13]=a=>e.guardian.cellPhoneNumber=a),allowUnknown:""},null,8,["modelValue"])])),_:1})])),_:1}),h(f,{class:"ion-margin-top ion-float-right",onClick:e.onFinish,size:"large",color:"success"},{default:v((()=>[y("Finish")])),_:1},8,["onClick"]),h(f,{class:"ion-margin-top ion-float-right",onClick:e.onClear,size:"large",color:"warning"},{default:v((()=>[y("Clear")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1})}]]))}}}));
