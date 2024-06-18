import{d as h,a8 as $,o as _,h as g,w as o,a as e,u as t,$ as i,I as b,b as d,_ as I,J as T,l as f,f as v,N as k,a7 as w,y,A,D as N,R as z}from"./index-1c16650e.js";import{l as p}from"./loader-1441845f.js";import{S as C}from"./SelectInput-61d8e31d.js";import{T as V}from"./TextInput-9a09c3ed.js";import{i as H,r as x}from"./form-c5c112ea.js";import{i as B}from"./validations-11aef89d.js";import{t as U}from"./toasts-926a2fd9.js";import"./common-94ac9539.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Strs-7ee8a435.js";import"./his_date-3ca53c6f.js";import"./Date-c63183ce.js";const S=h({__name:"NetworkForm",emits:["submit"],setup(P,{emit:c}){const m=c,u=[{label:"HTTP",value:"http"},{label:"HTTPS",value:"https"}],a=$({protocol:{value:"",label:"Select Protocol",required:!0},ipAddress:{value:"",label:"IP Address",placeholder:"Enter IP Address e.g. 127.0.0.1",required:!0,validation:async s=>B(s)},port:{value:"",label:"Port",placeholder:"Enter Port e.g. 3000",required:!0}}),n=async()=>{await H(a)&&m("submit",x(a).formData)};return(s,l)=>(_(),g(t(I),null,{default:o(()=>[e(t(i),{size:"12",class:"ion-margin-vertical"},{default:o(()=>[e(C,{modelValue:a.protocol,"onUpdate:modelValue":l[0]||(l[0]=r=>a.protocol=r),options:u},null,8,["modelValue"])]),_:1}),e(t(i),{size:"12",class:"ion-margin-vertical"},{default:o(()=>[e(V,{modelValue:a.ipAddress,"onUpdate:modelValue":l[1]||(l[1]=r=>a.ipAddress=r)},null,8,["modelValue"])]),_:1}),e(t(i),{size:"12",class:"ion-margin-vertical"},{default:o(()=>[e(V,{modelValue:a.port,"onUpdate:modelValue":l[2]||(l[2]=r=>a.port=r)},null,8,["modelValue"])]),_:1}),e(t(i),{size:"12",class:"ion-margin-vertical"},{default:o(()=>[e(t(b),{class:"ion-margin-top ion-float-right",color:"success",onClick:n},{default:o(()=>[d("Submit")]),_:1}),e(t(b),{class:"ion-margin-top ion-float-right",onClick:l[3]||(l[3]=r=>s.$router.back())},{default:o(()=>[d("Back")]),_:1})]),_:1})]),_:1}))}}),q={class:"his-card"},E={class:"his-card"},X=h({__name:"NetworkSettings",setup(P){const c=T(),m=f.isLoggedIn(),u=async({protocol:a,ipAddress:n,port:s})=>{try{if(p.show(),f.setHost("".concat(a.value,"://").concat(n,":").concat(s)),!await f.apiOk())throw new Error("Unable to connect to: ".concat(a.value,"://").concat(n,":").concat(s));await p.hide(),c.back()}catch(l){await p.hide(),console.log(l),U("".concat(l)),localStorage.clear()}};return(a,n)=>t(m)?(_(),g(t(w),{key:0},{default:o(()=>[e(t(I),null,{default:o(()=>[e(t(i),{size:"10",offset:"1",class:"ion-padding"},{default:o(()=>[v("div",q,[e(t(k),{style:{"padding-left":"0"}},{default:o(()=>[d("Network Settings / API Host configuration")]),_:1}),e(S,{onSubmit:u})])]),_:1})]),_:1})]),_:1})):(_(),g(t(z),{key:1},{default:o(()=>[e(t(A),null,{default:o(()=>[e(t(y),null,{default:o(()=>[e(t(k),null,{default:o(()=>[d("Network Settings / API Host configuration")]),_:1})]),_:1})]),_:1}),e(t(N),null,{default:o(()=>[e(t(w),null,{default:o(()=>[e(t(I),null,{default:o(()=>[e(t(i),{size:"10",offset:"1",class:"ion-padding"},{default:o(()=>[v("div",E,[e(S,{onSubmit:u})])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}});export{X as default};
