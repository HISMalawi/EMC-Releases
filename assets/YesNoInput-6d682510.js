import{d as v,aE as N,aD as B,a7 as C,_ as w,$ as Y,k as $,g as O,r as n,h as b,w as l,o,a,f as r,t as p,c as t,j as i,q as R,F as c,b as j}from"./index-1c16650e.js";import{_ as q}from"./_plugin-vue_export-helper-c27b6911.js";const D=v({name:"YesNoInput",props:{modelValue:{type:Object,default:()=>({})},inline:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},customOptions:{type:Array}},components:{IonRadioGroup:N,IonRadio:B,IonGrid:C,IonRow:w,IonCol:Y,IonLabel:$},emits:["update:modelValue"],setup(e,{emit:s}){return{model:O({get:()=>e.modelValue,set:_=>s("update:modelValue",_)})}}}),E={key:0,class:"text-danger"},F={key:0},G={key:1},L={class:"ion-margin-start"},z=r("span",{class:"ion-margin-start"},"Yes",-1),A=r("span",{class:"ion-margin-start"},"No",-1),S=r("br",null,null,-1);function T(e,s,g,_,U,H){const f=n("ion-label"),u=n("ion-radio"),y=n("ion-radio-group"),k=n("ion-note"),V=n("ion-col"),I=n("ion-row"),h=n("ion-grid");return o(),b(h,{class:"ion-no-margin ion-no-padding"},{default:l(()=>[a(I,null,{default:l(()=>[a(V,{size:"12"},{default:l(()=>[a(f,{class:"ion-margin-end"},{default:l(()=>[r("b",null,[r("span",null,p(e.model.label)+":",1),e.model.required?(o(),t("span",E,"*")):i("",!0)])]),_:1}),e.inline?i("",!0):(o(),t("br",F)),e.inline?i("",!0):(o(),t("br",G)),a(y,{modelValue:e.model.value,"onUpdate:modelValue":s[0]||(s[0]=d=>e.model.value=d),onIonChange:s[1]||(s[1]=()=>e.model.error="")},{default:l(()=>{var d;return[(d=e.customOptions)!=null&&d.length?(o(!0),t(c,{key:0},R(e.customOptions,m=>(o(),t(c,{key:m.label},[r("span",L,p(m.label),1),a(u,{class:"ion-margin-start",slot:"start",color:"primary",value:m.value,disabled:e.disabled},null,8,["value","disabled"])],64))),128)):(o(),t(c,{key:1},[z,a(u,{class:"ion-margin-start",slot:"start",color:"primary",value:"Yes",disabled:e.disabled},null,8,["disabled"]),A,a(u,{class:"ion-margin-start",slot:"start",color:"primary",value:"No",disabled:e.disabled},null,8,["disabled"])],64))]}),_:1},8,["modelValue"]),S,e.model.error?(o(),b(k,{key:2,color:"danger"},{default:l(()=>[j(p(e.model.error),1)]),_:1})):i("",!0)]),_:1})]),_:1})]),_:1})}const M=q(D,[["render",T]]);export{M as Y};
