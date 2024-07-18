var z=Object.defineProperty;var O=(e,o,i)=>o in e?z(e,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[o]=i;var U=(e,o,i)=>(O(e,typeof o!="symbol"?o+"":o,i),i);import{_ as j}from"./ReportTable.vue_vue_type_script_setup_true_lang-8aad6814.js";import{U as f}from"./user_service-189363c5.js";import{d as C,I as L,D as M,S as G,C as J,q as W,Z,n as K,$ as Q,v as X,i as Y,j as x,k as ee,r as $,H as oe,ae,a2 as B,aF as ne,L as l,o as S,h as N,w as s,a as t,b,t as te,aG as re,aH as se,ai as le,aI as ie}from"./index-57d23056.js";import{m as I}from"./DrilldownTable-8c099209.js";import{T as ue}from"./TextInput-9a6aecb6.js";import{S as me}from"./SelectInput-518dc713.js";import{i as de,r as ce}from"./form-e10fce49.js";import{i as p,g as w}from"./common-abc2f84d.js";import{t as y,a as pe}from"./toasts-525b3fd9.js";import{a as V}from"./validations-b9fbcec4.js";import{_ as A}from"./_plugin-vue_export-helper-c27b6911.js";import{H as fe}from"./Date-2967d952.js";import"./exports-acc60da7.js";import"./index-49e4aaf0.js";import"./his_date-6717bb29.js";import"./vue-datepicker-70dfaf9c.js";import"./arrays-31d2d38b.js";import"./Strs-7ee8a435.js";import"./loader-4cd1c473.js";class ve extends Error{constructor(i,d){super(i);U(this,"errors");this.errors=d}}const _e=C({name:"UserModal",components:{IonButton:L,IonPage:M,IonHeader:G,IonContent:J,IonToolbar:W,IonButtons:Z,IonFooter:K,IonTitle:Q,IonIcon:X,TextInput:ue,SelectInput:me,IonGrid:Y,IonRow:x,IonCol:ee},props:{user:{type:Object,default:()=>({})}},setup(e){var n,r;const o=$([]),i=oe(()=>p(e.user)?"Add New User":"Edit User"),d=ae({givenName:{value:w(e.user,"person.names[0].given_name",""),label:"First Name",required:!0,validation:a=>V(a)},familyName:{validation:a=>V(a),value:w(e.user,"person.names[0].family_name",""),label:"Last Name",required:!0},username:{value:w(e.user,"username",""),label:"Username",required:!0,disabled:!p(e.user),validation:async a=>"".concat(a.value).length<4?["Username must be at least 4 characters long"]:null},password:{value:"",label:"Password",required:p(e.user),validation:async({value:a})=>a&&"".concat(a).length<6?["Password must be at least 6 characters long"]:null},confirmPassword:{value:"",label:"Confirm Password",required:p(e.user),validation:async({value:a},u)=>a&&a!==u.password.value?["Passwords not matching"]:null},roles:{value:((r=(n=e.user)==null?void 0:n.roles)==null?void 0:r.map(a=>({label:a.role,value:a.role,other:a})))||[],label:"Roles",placeholder:"Select Roles",required:!0}}),_=async()=>{if(!await de(d))return;const{formData:a}=ce(d,!0);let u={...a,roles:a.roles.map(c=>c.label)};try{p(e.user)?u=await f.createUser(u):u=await f.updateUser(e.user.user_id,u),I.hide(u)}catch(c){if(c instanceof ve)return d.username.error="Username already exists";y(JSON.stringify(c),2e3)}};return B(()=>{f.getAllRoles().then(a=>{const u=Array.isArray(a.data)?a.data:[];o.value=u==null?void 0:u.map(c=>({value:c.role,label:c.role,other:c}))})}),{form:d,close:ne,modal:I,roles:o,title:i,submit:_}}});function we(e,o,i,d,_,n){const r=l("IonIcon"),a=l("IonButton"),u=l("IonButtons"),c=l("IonTitle"),F=l("IonToolbar"),T=l("IonHeader"),D=l("text-input"),v=l("ion-col"),g=l("TextInput"),P=l("SelectInput"),k=l("ion-row"),H=l("ion-grid"),R=l("IonContent"),q=l("IonFooter"),E=l("IonPage");return S(),N(E,null,{default:s(()=>[t(T,null,{default:s(()=>[t(F,null,{default:s(()=>[t(u,{slot:"end"},{default:s(()=>[t(a,{slot:"end",onClick:o[0]||(o[0]=m=>e.modal.hide()),"icon-only":""},{default:s(()=>[t(r,{icon:e.close},null,8,["icon"])]),_:1})]),_:1}),t(c,null,{default:s(()=>[b(te(e.title),1)]),_:1})]),_:1})]),_:1}),t(R,null,{default:s(()=>[t(H,null,{default:s(()=>[t(k,null,{default:s(()=>[t(v,{size:"12",class:"ion-margin-vertical"},{default:s(()=>[t(D,{modelValue:e.form.username,"onUpdate:modelValue":o[1]||(o[1]=m=>e.form.username=m)},null,8,["modelValue"])]),_:1}),t(v,{size:"6",class:"ion-margin-vertical"},{default:s(()=>[t(g,{modelValue:e.form.password,"onUpdate:modelValue":o[2]||(o[2]=m=>e.form.password=m),password:""},null,8,["modelValue"])]),_:1}),t(v,{size:"6",class:"ion-margin-vertical"},{default:s(()=>[t(g,{modelValue:e.form.confirmPassword,"onUpdate:modelValue":o[3]||(o[3]=m=>e.form.confirmPassword=m),form:e.form,password:""},null,8,["modelValue","form"])]),_:1}),t(v,{size:"12",class:"ion-margin-vertical"},{default:s(()=>[t(P,{modelValue:e.form.roles,"onUpdate:modelValue":o[4]||(o[4]=m=>e.form.roles=m),options:e.roles,multiple:""},null,8,["modelValue","options"])]),_:1}),t(v,{size:"12",class:"ion-margin-vertical"},{default:s(()=>[t(g,{modelValue:e.form.givenName,"onUpdate:modelValue":o[5]||(o[5]=m=>e.form.givenName=m)},null,8,["modelValue"])]),_:1}),t(v,{size:"12",class:"ion-margin-vertical"},{default:s(()=>[t(g,{modelValue:e.form.familyName,"onUpdate:modelValue":o[6]||(o[6]=m=>e.form.familyName=m)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1}),t(q,null,{default:s(()=>[t(a,{class:"ion-margin-end ion-margin-vertical ion-float-right",onClick:e.submit},{default:s(()=>[b("Save")]),_:1},8,["onClick"]),t(a,{class:"ion-margin-vertical ion-float-right",color:"light",onClick:o[7]||(o[7]=m=>e.modal.hide())},{default:s(()=>[b("Close")]),_:1})]),_:1})]),_:1})}const h=A(_e,[["render",we]]),ge=C({name:"Users",components:{BaseReportTable:j},setup(){const e=$([]),o=[{path:"username",label:"Username",initialSort:!0,initialSortOrder:"asc"},{path:"given_name",label:"First name"},{path:"family_name",label:"Last name"},{path:"role",label:"Roles"},{path:"deactivated_on",label:"Deactivated On",formatter:fe.toStandardHisDisplayFormat}],i=n=>{try{return{given_name:w(n,"person.names[0].given_name","Unknown"),family_name:w(n,"person.names[0].family_name","Unknown"),role:n.roles.map(a=>a.role).join(", "),...n}}catch(r){return console.error("Error occurred while processing user details:",r),null}},d=[{icon:re,action:async n=>{const r=await I.show(h,{user:n});p(r)||Object.assign(n,i(r.data))}},{color:"danger",icon:se,condition:n=>n.deactivated_on===null,action:async n=>{if(await le("Are you sure you want to deactivate this user?"))try{const{user:r}=await(await f.deactivateUser(n.user_id)).data;n.deactivated_on=r.deactivated_on,pe("User deactivated")}catch(r){y("Deactivation Failed: ".concat(r))}}},{color:"warning",icon:ie,condition:n=>n.deactivated_on!==null,action:async n=>{try{await f.activateUser(n.user_id),n.deactivated_on=null}catch(r){y("Activation Failed: ".concat(r))}}}],_=[{label:"Add New User",action:async()=>{const n=await I.show(h);p(n==null?void 0:n.user)||e.value.push(i(n.user))}}];return B(async()=>{const n=(await f.getAllUsers({paginate:!1})).data,r=await f.getCurrentUser();e.value=n.filter(a=>a.person_id!==(r==null?void 0:r.person_id)).map(a=>i(a))}),{rows:e,columns:o,rowActionBtns:d,actionBtns:_}}});function Ie(e,o,i,d,_,n){const r=l("base-report-table");return S(),N(r,{title:"Users","report-icon":"patient-type.png",columns:e.columns,rows:e.rows,rowActionButtons:e.rowActionBtns,"action-buttons":e.actionBtns,canExportCsv:!1,canExportPDF:!1,showRefreshButton:!1},null,8,["columns","rows","rowActionButtons","action-buttons"])}const ze=A(ge,[["render",Ie]]);export{ze as default};
