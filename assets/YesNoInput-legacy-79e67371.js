System.register(["./index-legacy-c6316dba.js","./_plugin-vue_export-helper-legacy-762b7923.js"],(function(e,l){"use strict";var a,o,n,t,s,r,i,d,u,m,c,p,b,g,y,f,v,I,_,k,V;return{setters:[e=>{a=e.d,o=e.aI,n=e.aH,t=e.i,s=e.j,r=e.k,i=e.J,d=e.H,u=e.L,m=e.h,c=e.w,p=e.o,b=e.a,g=e.f,y=e.t,f=e.c,v=e.y,I=e.N,_=e.K,k=e.b},e=>{V=e._}],execute:function(){const l=a({name:"YesNoInput",props:{modelValue:{type:Object,default:()=>({})},inline:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},customOptions:{type:Array}},components:{IonRadioGroup:o,IonRadio:n,IonGrid:t,IonRow:s,IonCol:r,IonLabel:i},emits:["update:modelValue"],setup:(e,{emit:l})=>({model:d({get:()=>e.modelValue,set:e=>l("update:modelValue",e)})})}),h={key:0,class:"text-danger"},j={key:0},x={key:1},N={class:"ion-margin-start"},O=g("span",{class:"ion-margin-start"},"Yes",-1),Y=g("span",{class:"ion-margin-start"},"No",-1),w=g("br",null,null,-1);e("Y",V(l,[["render",function(e,l,a,o,n,t){const s=u("ion-label"),r=u("ion-radio"),i=u("ion-radio-group"),d=u("ion-note"),V=u("ion-col"),R=u("ion-row"),B=u("ion-grid");return p(),m(B,{class:"ion-no-margin ion-no-padding"},{default:c((()=>[b(R,null,{default:c((()=>[b(V,{size:"12"},{default:c((()=>[b(s,{class:"ion-margin-end"},{default:c((()=>[g("b",null,[g("span",null,y(e.model.label)+":",1),e.model.required?(p(),f("span",h,"*")):v("",!0)])])),_:1}),e.inline?v("",!0):(p(),f("br",j)),e.inline?v("",!0):(p(),f("br",x)),b(i,{modelValue:e.model.value,"onUpdate:modelValue":l[0]||(l[0]=l=>e.model.value=l),onIonChange:l[1]||(l[1]=()=>e.model.error="")},{default:c((()=>{var l;return[null!==(l=e.customOptions)&&void 0!==l&&l.length?(p(!0),f(_,{key:0},I(e.customOptions,(l=>(p(),f(_,{key:l.label},[g("span",N,y(l.label),1),b(r,{class:"ion-margin-start",slot:"start",color:"primary",value:l.value,disabled:e.disabled},null,8,["value","disabled"])],64)))),128)):(p(),f(_,{key:1},[O,b(r,{class:"ion-margin-start",slot:"start",color:"primary",value:"Yes",disabled:e.disabled},null,8,["disabled"]),Y,b(r,{class:"ion-margin-start",slot:"start",color:"primary",value:"No",disabled:e.disabled},null,8,["disabled"])],64))]})),_:1},8,["modelValue"]),w,e.model.error?(p(),m(d,{key:2,color:"danger"},{default:c((()=>[k(y(e.model.error),1)])),_:1})):v("",!0)])),_:1})])),_:1})])),_:1})}]]))}}}));
