System.register(["./index-legacy-f8d71896.js","./common-legacy-0d7df615.js","./_plugin-vue_export-helper-legacy-762b7923.js"],(function(e,l){"use strict";var o,a,n,t,i,u,d,r,s,c,v,p,m,h,f,b,y,g,k,w,x,C,O,I,V,_,S,U,E,D,L,j,z;return{setters:[e=>{o=e.d,a=e.J,n=e.z,t=e.aq,i=e.v,u=e.ar,d=e.U,r=e.d4,s=e.s,c=e.r,v=e.H,p=e.a6,m=e.a2,h=e.al,f=e.O,b=e.d5,y=e.aK,g=e.d6,k=e.L,w=e.c,x=e.h,C=e.w,O=e.y,I=e.ag,V=e.f,_=e.K,S=e.N,U=e.a,E=e.o,D=e.t,L=e.b},e=>{j=e.i},e=>{z=e._}],execute:function(){var l=document.createElement("style");l.textContent=".outer-input-box[data-v-5d0bac9f]{width:100%;height:fit-content;background-color:#fff}.inner-input-box[data-v-5d0bac9f]{position:relative;width:100%}.search-input[data-v-5d0bac9f]{height:2.5rem;width:100%;display:inline-block}.input-options[data-v-5d0bac9f]{position:absolute;width:100%;max-height:25rem;overflow-y:auto;background-color:#fff;z-index:100;border-radius:.25rem;border-top-left-radius:0;border-top-right-radius:0;box-shadow:0 8px 16px rgba(0,0,0,.2)}.input-icon[data-v-5d0bac9f]{font-size:12px!important;position:absolute;top:0;right:0;height:2.5rem;width:2rem;color:#8a8a8a;padding-right:.5rem;display:flex;align-items:center;justify-content:flex-end;z-index:90}.input-option-checkbox[data-v-5d0bac9f]{--size: 18px !important}.input-placeholder[data-v-5d0bac9f]{color:#a0a0a0;margin:.5rem}\n",document.head.appendChild(l);const A=o({name:"SelectInput",props:{modelValue:{type:Object,default:()=>({})},form:{type:Object,default:()=>({})},options:{type:Array,default:()=>[]},asyncOptions:{type:Function,required:!1},allowCustom:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},infiniteScrolling:{type:Boolean,default:!1}},components:{IonLabel:a,IonInput:n,IonNote:t,IonIcon:i,IonCheckbox:u,IonList:d,IonChip:r,IonItem:s},emits:["update:modelValue"],setup(e,{emit:l}){const o=c(!1),a=c(""),n=c(),t=c(!1),i=c(),u=c(""),d=c([]),r=c(1),s=v((()=>e.multiple?d.value.filter((({isChecked:e})=>e)):n.value?[n.value]:[])),k=v((()=>!u.value&&j(s.value)&&!t.value)),w=v({get:()=>e.modelValue,set:e=>l("update:modelValue",e)}),x=()=>{u.value="",n.value=void 0,d.value.forEach((e=>e.isChecked=!1))},C=()=>{if(x(),j(w.value.value))return;if(Array.isArray(w.value.value)&&e.multiple)return w.value.value.forEach((e=>{const l=d.value.findIndex((({value:l})=>l===e.value));-1===l?d.value.push({...e,isChecked:!0}):d.value[l].isChecked=!0}));const l=d.value.find((e=>e.value===w.value.value));n.value=l||{label:w.value.value,value:w.value.value}},O=async()=>{const l="function"==typeof e.asyncOptions?await e.asyncOptions(u.value):e.options.filter((({label:e})=>e.toLowerCase().includes(u.value.toLowerCase())));s.value.forEach((e=>{const o=l.findIndex((l=>l.value===e.value));-1===o?l.push(e):l[o].isChecked=!0})),d.value=l.filter((({label:e})=>!!e))},I=async()=>{if(w.value.required&&j(w.value.value))return w.value.error="This field is required";if(w.value.validation){const l=await w.value.validation({label:w.value.value,value:w.value.value},e.form);if(l&&l.length)return w.value.error+=l.toString()}return w.value.error=""},V=()=>{t.value=!1,w.value.value=e.multiple?s.value:j(s.value)?void 0:s.value[0],u.value="",I()},_=l=>{e.multiple||(n.value=l,V()),w.value.value=e.multiple?s.value:j(s.value)?void 0:s.value[0],u.value=""};return p(u,(async()=>{r.value++,await O()})),p([()=>e.options,()=>e.asyncOptions],(async()=>O())),p((()=>e.modelValue.value),(e=>j(e)&&C()),{deep:!0,immediate:!0}),p(t,(e=>e&&(i.value=n.value||d.value[0]))),m((async()=>{await O(),C(),addEventListener("click",(e=>{!e.target.closest(".inner-input-box")&&t.value&&V()}))})),h((()=>removeEventListener("click",(e=>console.log(e))))),{validate:I,onSelect:_,resetHandler:x,onShowOptions:()=>{w.value.disabled||(t.value=!0,w.value.error="")},onCloseOptions:V,diselect:l=>e.multiple?l.isChecked=!1:n.value=void 0,onCustomValue:()=>{w.value.value={label:a.value,value:a.value}},handleKeyDown:e=>{switch(t.value||(t.value=!0),e.key){case"ArrowDown":(e=>{e.preventDefault();const l=d.value.indexOf(i.value)+1;i.value=d.value[l]||d.value[0]})(e);break;case"ArrowUp":(e=>{e.preventDefault();const l=d.value.indexOf(i.value)-1;i.value=d.value[l]||d.value[d.value.length-1]})(e);break;case"Enter":_(i.value);break;case"Escape":V()}},model:w,customOption:a,isCustom:o,chevronDown:f,chevronUp:b,close:y,closeCircle:g,selectedOption:n,showOptions:t,focusedOption:i,showPlaceholder:k,filteredOptions:d,filter:u,tags:s}}}),B={key:0,class:"text-danger"},q={key:1,class:"ion-float-right ion-margin-end checkbox-label"},K={class:"inner-input-box"},H={key:0,class:"input-options"},F={class:"input-icon"};e("S",z(A,[["render",function(e,l,o,a,n,t){const i=k("ion-checkbox"),u=k("ion-label"),d=k("ion-input"),r=k("ion-icon"),s=k("ion-chip"),c=k("ion-item"),v=k("ion-list"),p=k("ion-note");return E(),w(_,null,[e.model.label?(E(),x(u,{key:0,class:"ion-padding-bottom bold"},{default:C((()=>[V("span",null,D(e.model.label),1),e.model.required?(E(),w("span",B," *")):O("",!0),e.allowCustom?(E(),w("span",q,[L(" Add Custom "+D(e.model.label)+"? ",1),U(i,{modelValue:e.isCustom,"onUpdate:modelValue":l[0]||(l[0]=l=>e.isCustom=l),onIonChange:l[1]||(l[1]=l=>e.model.value="")},null,8,["modelValue"])])):O("",!0)])),_:1})):O("",!0),e.isCustom?(E(),x(d,{key:1,class:I(["box-input",{"box-input-error":e.model.error,"ion-margin-top":e.model.label}]),modelValue:e.customOption,"onUpdate:modelValue":l[2]||(l[2]=l=>e.customOption=l),placeholder:e.model.placeholder||e.model.label,disabled:e.model.disabled,onIonFocus:l[3]||(l[3]=()=>e.model.error=""),onIonBlur:e.validate,onIonInput:e.onCustomValue},null,8,["class","modelValue","placeholder","disabled","onIonBlur","onIonInput"])):(E(),w("div",{key:2,class:I(["outer-input-box box-input",{"box-input-error":e.model.error,"ion-margin-top":e.model.label}])},[V("div",K,[V("div",{style:{display:"flex","flex-wrap":"wrap",width:"100%"},onClick:l[6]||(l[6]=(...l)=>e.onShowOptions&&e.onShowOptions(...l))},[(E(!0),w(_,null,S(e.tags,((l,o)=>(E(),x(s,{key:o},{default:C((()=>[U(u,null,{default:C((()=>[L(D(l.label),1)])),_:2},1024),U(r,{icon:e.closeCircle,color:"danger",onClick:o=>e.diselect(l),style:{"z-index":"20"}},null,8,["icon","onClick"])])),_:2},1024)))),128)),U(d,{disabled:e.model.disabled,placeholder:e.showPlaceholder?e.model.placeholder||"select option":"",modelValue:e.filter,"onUpdate:modelValue":l[4]||(l[4]=l=>e.filter=l),class:"search-input",ref:"searchInput",onKeydown:l[5]||(l[5]=l=>e.handleKeyDown(l))},null,8,["disabled","placeholder","modelValue"])]),e.showOptions?(E(),w("div",H,[U(v,null,{default:C((()=>[(E(!0),w(_,null,S(e.filteredOptions,((l,o)=>{var a;return E(),x(c,{key:o,lines:o+1===e.filteredOptions.length?"none":void 0,color:l.value===(null===(a=e.focusedOption)||void 0===a?void 0:a.value)?"light":"",onClick:o=>e.onSelect(l)},{default:C((()=>[e.multiple?(E(),x(i,{key:0,class:"input-option-checkbox",slot:"start",modelValue:l.isChecked,"onUpdate:modelValue":e=>l.isChecked=e},null,8,["modelValue","onUpdate:modelValue"])):O("",!0),U(u,null,{default:C((()=>[L(D(l.label),1)])),_:2},1024)])),_:2},1032,["lines","color","onClick"])})),128))])),_:1})])):O("",!0),V("div",F,[e.filter||e.tags.length>0?(E(),x(r,{key:0,icon:e.close,onClick:e.resetHandler},null,8,["icon","onClick"])):O("",!0),U(r,{icon:e.showOptions?e.chevronUp:e.chevronDown,onClick:l[7]||(l[7]=l=>e.showOptions?e.onCloseOptions():e.onShowOptions())},null,8,["icon"])])])],2)),e.model.error?(E(),x(p,{key:3,color:"danger"},{default:C((()=>[L(D(e.model.error),1)])),_:1})):O("",!0)],64)}],["__scopeId","data-v-5d0bac9f"]]))}}}));
