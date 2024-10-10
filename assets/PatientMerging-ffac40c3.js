import{d as N,c as P,f as a,b as s,t as d,ag as q,o as g,i as M,j as S,k as E,ah as H,g as F,ae as K,H as z,ai as G,F as T,L as c,h as w,w as m,a as p,N as I,A as U,K as B}from"./index-67d679d3.js";import{P as f}from"./patient_service-74358abf.js";import{_ as A}from"./_plugin-vue_export-helper-c27b6911.js";import{b as j}from"./toasts-2ce27f65.js";import"./patient_identifier_service-e7b2c656.js";import"./his_date-1f6a8082.js";import"./index-95d3a767.js";import"./Date-a3d1c586.js";import"./common-abc2f84d.js";const L=N({props:{patient:{type:Object,required:!0},isActive:{type:Boolean}},computed:{stateClass(){return{"active-card-color":this.isActive,"inactive-card-color":!this.isActive}}}});function Q(i,y,u,b,C,v){return g(),P("div",{class:q(["his-card clickable",i.stateClass])},[a("li",null,[a("ul",null,[s(" NPID : "),a("b",null,d(i.patient.npid),1)]),a("ul",null,[s(" Arv# : "),a("b",null,d(i.patient.arvNum),1)]),a("ul",null,[s(" Name : "),a("b",null,d(i.patient.name),1)]),a("ul",null,[s(" Birth date : "),a("b",null,d(i.patient.birthdate),1)]),a("ul",null,[s(" Gender : "),a("b",null,d(i.patient.gender),1)]),a("ul",null,[s(" Home District : "),a("b",null,d(i.patient.homeDistrict),1)]),a("ul",null,[s(" Home Village : "),a("b",null,d(i.patient.homeVillage),1)]),a("ul",null,[s(" Current District : "),a("b",null,d(i.patient.currentDistrict),1)]),a("ul",null,[s(" Current Village : "),a("b",null,d(i.patient.currentVillage),1)])])],2)}const J=A(L,[["render",Q],["__scopeId","data-v-db98b469"]]),O=N({components:{IonGrid:M,IonRow:S,IonCol:E,PatientCard:J,IonSearchbar:H},setup(){const i=F(),{facility:y}=T(),u=K([{category:"primary",query:"",results:[]},{category:"secondary",query:"",results:[]}]),b=z(()=>u.every(e=>e.results.length>0&&e.results.some(n=>n.isChecked))),C=async e=>e.match(/^(\w+-ARV-\w+)$/)?{type:"arv_number",value:e}:e.match(/^(\d+)$/)?{type:"arv_number",value:"".concat(y.code,"-ARV-").concat(e)}:{type:"name",value:e},v=e=>{const n={},t=e.split(" ").filter(l=>/\S/.test(l));return t.length>0&&(n.given_name=t[0],t[1]&&(n.family_name=t[1]),t[2]&&(n.middle_name=t[1],n.family_name=t[2])),n};return{patients:u,enableMergeBtn:b,searchPatient:async e=>{if(e.query)try{const{type:n,value:t}=await C(e.query);let l;n==="name"?l=(await f.search(v(t))).data:n==="arv_number"?l=(await f.findByOtherID(4,t)).data:l=[],e.results=l.map((o,D)=>{const r=new f(o);return{index:D,id:r.getID(),name:r.getFullName(),docID:r.getDocID(),birthdate:r.getBirthdate(),arvNum:r.getArvNumber(),npid:r.getNationalID(),gender:r.getGender(),homeDistrict:r.getHomeDistrict(),homeVillage:r.getHomeVillage(),currentDistrict:r.getCurrentDistrict(),currentVillage:r.getCurrentVillage(),isChecked:!1}})}catch(n){console.log("".concat(n))}},onPatient:(e,n)=>{if(n==="primary")u[0].results.forEach(t=>{t.id===e.id?t.isChecked=!t.isChecked:t.isChecked=!1}),e.isChecked&&u[1].results.forEach(t=>{t.id===e.id&&(t.isChecked=!1)});else{if(e.isChecked)return e.isChecked=!1;e.isChecked=!u[0].results.some(t=>t.isChecked&&t.id===e.id)}},merge:async()=>{var e;if(await G("Are you sure you want to merge these patients?"))try{const n=u[0].results.find(o=>o.isChecked),t=await f.mergePatients({primary:{patient_id:n.id,doc_id:n.docID},secondary:u[1].results.filter(o=>o.isChecked).map(o=>({patient_id:o.id,doc_id:o.docID}))});if(!t.ok)throw new Error("Unable to merge Patients");const l=(e=t.data)==null?void 0:e.patient_id;i.push({name:"EMC Mastercard",params:{patientId:l}})}catch(n){j("".concat(n))}}}}});const W={class:"ion-margin-start"};function X(i,y,u,b,C,v){const V=c("ion-button"),k=c("ion-col"),$=c("ion-card-title"),e=c("ion-searchbar"),n=c("ion-card-header"),t=c("patient-card"),l=c("ion-card-content"),o=c("ion-card"),D=c("ion-row"),r=c("ion-grid");return g(),w(r,null,{default:m(()=>[p(D,null,{default:m(()=>[p(k,{size:"12",class:"padding"},{default:m(()=>[a("h2",W,[s(" Patient Merging "),p(V,{class:"ion-float-right ion-margin-end",disabled:!i.enableMergeBtn,onClick:i.merge},{default:m(()=>[s(" Merge Selected Patients ")]),_:1},8,["disabled","onClick"])])]),_:1}),(g(!0),P(B,null,I(i.patients,_=>(g(),w(k,{size:"6",key:_.category},{default:m(()=>[p(o,null,{default:m(()=>[p(n,{color:"light"},{default:m(()=>[p($,{class:"ion-margin-bottom"},{default:m(()=>[s(d(_.category)+" patients ",1)]),_:2},1024),p(e,{style:{width:"100%",height:"45px"},class:"box-input ion-no-padding ion-margin-end",placeholder:"Type Name or ARV Number and press enter",modelValue:_.query,"onUpdate:modelValue":h=>_.query=h,onKeyup:U(h=>i.searchPatient(_),["enter"])},null,8,["modelValue","onUpdate:modelValue","onKeyup"])]),_:2},1024),p(l,{color:"light",style:{height:"70vh","overflow-y":"auto"}},{default:m(()=>[(g(!0),P(B,null,I(_.results,(h,R)=>(g(),w(t,{onClick:Y=>i.onPatient(h,_.category),key:R,patient:h,isActive:h.isChecked},null,8,["onClick","patient","isActive"]))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})}const se=A(O,[["render",X]]);export{se as default};
