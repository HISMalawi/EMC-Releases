import{d as U,k as V,aK as _,d2 as I,ak as B,S as T,g as C,Z as k,T as N,r as i,c as s,h as w,w as p,j as r,f as c,a as f,aa as x,F as S,o as t,t as u,b as m}from"./index-1c16650e.js";import{_ as $}from"./_plugin-vue_export-helper-c27b6911.js";const j=U({name:"TextInput",props:{modelValue:{type:Object,default:()=>({})},allowUnknown:{type:Boolean,default:!1},form:{type:Object,default:()=>({})},prefix:{type:String,default:""},suffix:{type:String,default:""},password:{type:Boolean,default:!1}},components:{IonLabel:V,IonInput:_,IonNote:I,IonCheckbox:B},emits:["update:modelValue"],setup(e,{emit:l}){const n=T(!1),o=C({get:()=>e.modelValue,set:a=>l("update:modelValue",a)}),b=async()=>{if(o.value.required&&!o.value.value)return o.value.error="This field is required";if(!e.allowUnknown&&o.value.value==="Unknown"||o.value.value==="N/A")return o.value.error="Unknown is not allowed";if(o.value.validation){const a=await o.value.validation({label:o.value.value,value:o.value.value},e.form);if(a&&a.length)return o.value.error+=a.toString()}return o.value.error=""};return k(n,a=>{a?(o.value.value="Unknown",o.value.error="",o.value.disabled=!0):(o.value.value="",o.value.disabled=!1)}),k(e.modelValue,a=>{a.value==="Unknown"?n.value||(n.value=!0):n.value=!1}),N(()=>{o.value.value==="Unknown"&&!n.value&&(n.value=!0)}),{validate:b,model:o,isUnknown:n}}});const q={key:0,class:"text-danger"},F={key:1,class:"ion-float-right ion-margin-end checkbox-label"},O={key:0,class:"pre-suffix-wrapper"},z={class:"inner-input-wrapper"},A={key:1,class:"pre-suffix-wrapper"};function D(e,l,n,o,b,a){const g=i("ion-checkbox"),v=i("ion-label"),y=i("ion-input"),h=i("ion-note");return t(),s(S,null,[e.model.label?(t(),w(v,{key:0,class:"ion-padding-bottom bold"},{default:p(()=>[c("span",null,u(e.model.label),1),e.model.required?(t(),s("span",q," *")):r("",!0),e.allowUnknown?(t(),s("span",F,[m(u(e.model.label)+" Unknown? ",1),f(g,{modelValue:e.isUnknown,"onUpdate:modelValue":l[0]||(l[0]=d=>e.isUnknown=d)},null,8,["modelValue"])])):r("",!0)]),_:1})):r("",!0),c("div",{class:x(["ion-margin-top outer-input-wrapper",e.model.error?"box-input-error":"box-input"])},[e.prefix?(t(),s("div",O,[f(v,{class:"checkbox-label bold"},{default:p(()=>[m(u(e.prefix),1)]),_:1})])):r("",!0),c("div",z,[f(y,{class:"ion-no-margin ion-no-padding",modelValue:e.model.value,"onUpdate:modelValue":l[1]||(l[1]=d=>e.model.value=d),type:e.password?"password":"text",placeholder:e.model.placeholder,disabled:e.model.disabled||e.isUnknown,onIonFocus:l[2]||(l[2]=d=>e.model.error=""),onIonBlur:e.validate},null,8,["modelValue","type","placeholder","disabled","onIonBlur"])]),e.suffix?(t(),s("div",A,[f(v,{class:"checkbox-label bold ion-float-right"},{default:p(()=>[m(u(e.suffix),1)]),_:1})])):r("",!0)],2),e.model.error?(t(),w(h,{key:1,color:"danger"},{default:p(()=>[m(u(e.model.error),1)]),_:1})):r("",!0)],64)}const L=$(j,[["render",D]]);export{L as T};
