import{d as h,I as z,i as C,j as S,k,r as _,ae as V,a2 as R,L as m,h as F,w as r,o as y,a,f as c,b as U}from"./index-3cd761e9.js";import{T as B}from"./TextInput-0126dccd.js";import{S as q}from"./SelectInput-8dfa5de6.js";import{g as I}from"./common-abc2f84d.js";import{U as p}from"./user_service-8138fc1a.js";import{s as N}from"./form-f915e7d2.js";import{a as b,b as T}from"./toasts-b12b9f38.js";import{_ as $}from"./_plugin-vue_export-helper-c27b6911.js";import"./index-95d3a767.js";import"./his_date-5f878a20.js";import"./Strs-7ee8a435.js";import"./loader-fc807f7f.js";const A=h({name:"UserModal",components:{IonButton:z,IonGrid:C,IonRow:S,IonCol:k,TextInput:B,SelectInput:q},setup(){const o=_([]),l=_(-1),f=_(1),d=V({password:{value:"",label:"New Password",required:!0,validation:async({value:e})=>e&&"".concat(e).length<6?["Password must be at least 6 characters long"]:null},confirmPassword:{value:"",label:"Confirm New Password",required:!0,validation:async({value:e},s)=>e&&e!==s.password.value?["Passwords do not match"]:null}}),u=V({givenName:{value:"",label:"First Name",required:!0},familyName:{value:"",label:"Last Name",required:!0},username:{value:"",label:"Username",disabled:!0},roles:{value:[],label:"Roles",required:!0}}),v=async()=>{const e=await p.getCurrentUser();e&&(l.value=e.user_id,u.username.value=e.username,u.givenName.value=I(e,"person.names[0].given_name",""),u.familyName.value=I(e,"person.names[0].family_name",""),u.roles.value=e.roles.map(s=>({value:s.role,label:s.role,other:s})))},n=()=>N(u,async e=>{try{const s=await p.updateUser(l.value,{...e,roles:e.roles.map(t=>t.label)});if(s&&s.data){const t=s.data;sessionStorage.setItem("username",t.username),sessionStorage.setItem("userRoles",JSON.stringify(t.roles)),b("User profile has been updated successfully",3e3),v()}else throw new Error("Failed to update user profile")}catch(s){T("Failed to update user profile")}}),w=()=>N(d,async e=>{await p.updateUser(l.value,e),b("Password updated successfully",3e3);for(const s in d)d[s].value=""});return R(async()=>{await p.getAllRoles().then(e=>{const s=Array.isArray(e.data)?e.data:[];o.value=s.map(t=>({value:t.role,label:t.role,other:t}))}),await v(),f.value++}),{userForm:u,passwordForm:d,roles:o,refreshRoles:f,updateProfile:n,updatePassword:w}}}),L={class:"his-card"},M=c("h2",null,"User Profile",-1),j={class:"his-card"},D=c("h2",null,"Change Password",-1);function E(o,l,f,d,u,v){const n=m("ion-col"),w=m("text-input"),e=m("SelectInput"),s=m("TextInput"),t=m("IonButton"),g=m("ion-row"),P=m("ion-grid");return y(),F(P,null,{default:r(()=>[a(g,null,{default:r(()=>[a(n,{size:"8"},{default:r(()=>[c("div",L,[a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[M]),_:1}),a(g,null,{default:r(()=>[a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[a(w,{modelValue:o.userForm.username,"onUpdate:modelValue":l[0]||(l[0]=i=>o.userForm.username=i)},null,8,["modelValue"])]),_:1}),a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[(y(),F(e,{modelValue:o.userForm.roles,"onUpdate:modelValue":l[1]||(l[1]=i=>o.userForm.roles=i),options:o.roles,multiple:"",key:o.refreshRoles},null,8,["modelValue","options"]))]),_:1}),a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[a(s,{modelValue:o.userForm.givenName,"onUpdate:modelValue":l[2]||(l[2]=i=>o.userForm.givenName=i)},null,8,["modelValue"])]),_:1}),a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[a(s,{modelValue:o.userForm.familyName,"onUpdate:modelValue":l[3]||(l[3]=i=>o.userForm.familyName=i)},null,8,["modelValue"])]),_:1}),a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[a(t,{class:"ion-margin-end ion-margin-vertical ion-float-right",onClick:o.updateProfile},{default:r(()=>[U("Save")]),_:1},8,["onClick"])]),_:1})]),_:1})])]),_:1}),a(n,{size:"4"},{default:r(()=>[c("div",j,[a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[D]),_:1}),a(g,null,{default:r(()=>[a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[a(s,{modelValue:o.passwordForm.password,"onUpdate:modelValue":l[4]||(l[4]=i=>o.passwordForm.password=i),password:""},null,8,["modelValue"])]),_:1}),a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[a(s,{modelValue:o.passwordForm.confirmPassword,"onUpdate:modelValue":l[5]||(l[5]=i=>o.passwordForm.confirmPassword=i),form:o.passwordForm,password:""},null,8,["modelValue","form"])]),_:1}),a(n,{size:"12",class:"ion-margin-vertical"},{default:r(()=>[a(t,{class:"ion-margin-end ion-margin-vertical ion-float-right",onClick:o.updatePassword},{default:r(()=>[U("Save")]),_:1},8,["onClick"])]),_:1})]),_:1})])]),_:1})]),_:1})]),_:1})}const ae=$(A,[["render",E]]);export{ae as default};
