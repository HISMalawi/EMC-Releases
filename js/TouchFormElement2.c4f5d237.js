(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement2","TouchFormElement38","TouchFormElement8"],{"04a0":function(e,t,o){},"0a79":function(e,t,o){"use strict";var l=o("7a23");function n(e,t,o,n,c,a){return Object(l["openBlock"])(),Object(l["createElementBlock"])("div",{id:"view-port",class:Object(l["normalizeClass"])(e.showFull?"":"half")},[Object(l["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var c=Object(l["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),a=(o("a4d3"),o("d959")),i=o.n(a);const r=i()(c,[["render",n],["__scopeId","data-v-7c293cad"]]);t["a"]=r},"36c4":function(e,t,o){},"51c8":function(e,t,o){"use strict";o.r(t);var l=o("7a23"),n=Object(l["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const c=n;t["default"]=c},"856e":function(e,t,o){"use strict";o("36c4")},a4d3:function(e,t,o){"use strict";o("04a0")},b043:function(e,t,o){"use strict";o.r(t);var l=o("7a23");const n=e=>(Object(l["pushScopeId"])("data-v-b37011c8"),e=e(),Object(l["popScopeId"])(),e),c={key:0},a=n(()=>Object(l["createElementVNode"])("p",null,null,-1));function i(e,t,o,n,i,r){const d=Object(l["resolveComponent"])("ion-radio"),s=Object(l["resolveComponent"])("ion-label"),u=Object(l["resolveComponent"])("ion-item"),b=Object(l["resolveComponent"])("ion-radio-group"),O=Object(l["resolveComponent"])("ion-list"),j=Object(l["resolveComponent"])("ion-col"),p=Object(l["resolveComponent"])("ion-title"),m=Object(l["resolveComponent"])("ion-row"),h=Object(l["resolveComponent"])("ion-input"),v=Object(l["resolveComponent"])("ion-grid"),f=Object(l["resolveComponent"])("view-port");return Object(l["openBlock"])(),Object(l["createBlock"])(f,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(v,{class:"view-port-content"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(m,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(j,{size:"4"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(O,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(b,{modelValue:e.selected,"onUpdate:modelValue":t[0]||(t[0]=t=>e.selected=t)},{default:Object(l["withCtx"])(()=>[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(e.listData,(e,t)=>(Object(l["openBlock"])(),Object(l["createBlock"])(u,{detail:"",lines:"none",class:"his-md-text his-card ion-padding",key:t},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(d,{slot:"start",value:e.label},null,8,["value"]),Object(l["createVNode"])(s,{innerHTML:e.label},null,8,["innerHTML"])]),_:2},1024))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),Object(l["createVNode"])(j,null,{default:Object(l["withCtx"])(()=>[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(e.listData,(t,o)=>(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",{key:o},[e.selected===t.label?(Object(l["openBlock"])(),Object(l["createElementBlock"])("div",c,[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(t.other.data,(n,c)=>(Object(l["openBlock"])(),Object(l["createBlock"])(v,{style:{"margin-bottom":"10px"},class:"his-card",key:c},{default:Object(l["withCtx"])(()=>{var i;return[null!==t&&void 0!==t&&null!==(i=t.other)&&void 0!==i&&i.rowTitles?(Object(l["openBlock"])(),Object(l["createBlock"])(m,{key:0,style:{background:"#F8F8F8"}},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(j,{class:"ion-text-center"},{default:Object(l["withCtx"])(()=>{var e,o;return[Object(l["createVNode"])(p,{class:"his-md-text",innerHTML:null!==t&&void 0!==t&&null!==(e=t.other)&&void 0!==e&&e.rowTitles&&(null===t||void 0===t||null===(o=t.other)||void 0===o?void 0:o.rowTitles[c])||""},null,8,["innerHTML"])]}),_:2},1024)]),_:2},1024)):Object(l["createCommentVNode"])("",!0),a,(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(n,(t,n)=>(Object(l["openBlock"])(),Object(l["createBlock"])(m,{key:n},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(j,null,{default:Object(l["withCtx"])(()=>[t.disabled?(Object(l["openBlock"])(),Object(l["createBlock"])(u,{key:0,onClick:o=>e.warn("Cannot edit "+t.label),class:"his-sm-text"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(s,null,{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(Object(l["toDisplayString"])(t.label),1)]),_:2},1024),Object(l["createVNode"])(h,{placeholder:"N/A",slot:"end"})]),_:2},1032,["onClick"])):Object(l["createCommentVNode"])("",!0),t.disabled?Object(l["createCommentVNode"])("",!0):(Object(l["openBlock"])(),Object(l["createBlock"])(u,{key:1,class:"his-sm-text",onClick:l=>e.editField(t,e.listData[o].other.data[c])},{default:Object(l["withCtx"])(()=>{var e,o;return[Object(l["createVNode"])(s,{color:null!==t&&void 0!==t&&null!==(e=t.value)&&void 0!==e&&e.label?"":"danger"},{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("b",null,Object(l["toDisplayString"])(t.label),1)]),_:2},1032,["color"]),Object(l["createVNode"])(h,{class:"his-md-text",slot:"end",readonly:!0,value:null===t||void 0===t||null===(o=t.value)||void 0===o?void 0:o.label,placeholder:"Click to edit"},null,8,["value"])]}),_:2},1032,["onClick"]))]),_:2},1024)]),_:2},1024))),128))]}),_:2},1024))),128))])):Object(l["createCommentVNode"])("",!0)]))),128))]),_:1})]),_:1})]),_:1})]),_:1})}o("13d5"),o("14d9");var r=o("51c8"),d=o("0a79"),s=o("d867"),u=o("ff79"),b=o("b5e4"),O=o("e6e9"),j=o("2ef0"),p=Object(l["defineComponent"])({name:"HisSelect",mixins:[r["default"]],components:{IonTitle:s["R"],IonInput:s["v"],IonRadioGroup:s["F"],IonRadio:s["E"],IonGrid:s["p"],IonCol:s["m"],IonRow:s["H"],ViewPort:d["a"]},setup(){return{arrowUp:u["h"],arrowDown:u["g"]}},data:()=>({selected:"",listData:[]}),mounted(){this.init()},activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this),this.listData=await this.options(this.fdata),this.listData.length&&(this.selected=this.listData[0].label)},warn(e){Object(b["e"])(e)},async launchModal(e,t){(await s["Z"].create({component:O["a"],backdropDismiss:!1,cssClass:"full-modal",componentProps:{dismissType:"modal",currentField:e,onFinish:t}})).present()},async editField(e,t){const o=o=>{var l,n,c;(e.value=o,"function"===typeof(null===e||void 0===e||null===(l=e.field)||void 0===l?void 0:l.computedValue))&&(e.computedValue=null===e||void 0===e||null===(c=e.field)||void 0===c?void 0:c.computedValue(o));"function"===typeof(null===e||void 0===e||null===(n=e.field)||void 0===n?void 0:n.onValueUpdate)&&e.field.onValueUpdate(o,t)};this.launchModal(e.field,t=>{var l,n;if(!Array.isArray(t)&&(t.label.match(/unknown/i)&&"function"===typeof(null===(l=e.field)||void 0===l||null===(n=l.config)||void 0===n?void 0:n.onUnknownEstimateField)))return this.launchModal(e.field.config.onUnknownEstimateField(),e=>o(e));o(t)})}},watch:{listData:{handler(e){const t=[],o=e.map(e=>e.other.data).reduce((e,t)=>[...e,...t.reduce((e,t)=>[...e,...t],[])],[]).filter(e=>e.required&&""===e.value?(t.push(e.label),!1):!!e.required).map(e=>({label:e.label,value:e.value,other:{obs:e.computedValue}}));Object(j["isEmpty"])(t)?this.$emit("onValue",o):this.$emit("onValue",[{label:"_INCOMPLETE_RECORD_ERROR_",value:t.length,other:{incompleteLabels:t}}])},deep:!0}}}),m=(o("856e"),o("d959")),h=o.n(m);const v=h()(p,[["render",i],["__scopeId","data-v-b37011c8"]]);t["default"]=v},e6e9:function(e,t,o){"use strict";var l=o("7a23");function n(e,t,o,n,c,a){const i=Object(l["resolveComponent"])("ion-title"),r=Object(l["resolveComponent"])("ion-toolbar"),d=Object(l["resolveComponent"])("ion-header"),s=Object(l["resolveComponent"])("ion-content"),u=Object(l["resolveComponent"])("ion-button"),b=Object(l["resolveComponent"])("ion-footer"),O=Object(l["resolveComponent"])("ion-page");return Object(l["openBlock"])(),Object(l["createBlock"])(O,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(d,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(r,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(i,{class:"his-lg-text ion-text-center"},{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(Object(l["toDisplayString"])(e.currentField.helpText),1)]),_:1})]),_:1})]),_:1}),Object(l["createVNode"])(s,null,{default:Object(l["withCtx"])(()=>[(Object(l["openBlock"])(),Object(l["createBlock"])(l["KeepAlive"],null,[(Object(l["openBlock"])(),Object(l["createBlock"])(Object(l["resolveDynamicComponent"])(e.currentField.type),{key:e.currentField.id,currentFieldig:e.currentField.currentFieldig,options:e.currentField.options,preset:e.currentField.preset,clear:e.valueClearIndex,fdata:e.formData,config:e.currentField.config,cdata:e.computedFormData,activationState:e.state,onValue:e.currentField.onValue,defaultValue:e.currentField.defaultValue,onValueUpdate:e.currentField.onValueUpdate,onOnValue:e.onFieldValue},null,40,["currentFieldig","options","preset","clear","fdata","config","cdata","activationState","onValue","defaultValue","onValueUpdate","onOnValue"]))],1024))]),_:1}),Object(l["createVNode"])(b,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(r,{color:"light"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(u,{disabled:e.disableBtn,onClick:e.onClose,slot:"start",color:"danger",size:"large"},{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(" Close ")]),_:1},8,["disabled","onClick"]),Object(l["createVNode"])(u,{disabled:e.disableBtn,onClick:e.onClear,slot:"end",color:"warning",size:"large"},{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(" Clear ")]),_:1},8,["disabled","onClick"]),Object(l["createVNode"])(u,{disabled:e.disableBtn,onClick:e.onDone,slot:"end",color:"success",size:"large"},{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(" Done ")]),_:1},8,["disabled","onClick"])]),_:1})]),_:1})]),_:1})}var c=o("b5e4"),a=o("d95e"),i=o("d867");function r(){const e={};return a["a"].forEach(t=>{e[t]=Object(l["defineAsyncComponent"])(()=>o("f159")(`./${t}.vue`))}),e}var d=Object(l["defineComponent"])({name:"SingleFieldTouchForm",components:{IonPage:i["D"],IonContent:i["n"],IonFooter:i["o"],IonToolbar:i["S"],IonButton:i["d"],IonHeader:i["q"],IonTitle:i["R"],...r()},props:{dismissType:{type:String},onFinish:{type:Function,required:!0},currentField:{type:Object,required:!0}},data:()=>({valueClearIndex:0,formData:{},computedFormData:{},state:"",value:null,disableBtn:!1}),methods:{onClose(){"modal"===this.dismissType?i["Z"].dismiss():this.$router.back()},onClear(){this.valueClearIndex+=1,this.value=null},onFieldValue(e){this.value=e},onDone(){if(this.disableBtn=!0,this.currentField.validation){const e=this.currentField.validation(this.value);if(this.disableBtn=!1,e)return Object(c["e"])(e.join(", "),6e4)}try{this.onFinish(this.value)}catch(e){Object(c["c"])(""+e),console.error(e)}this.onClose(),this.disableBtn=!1}}}),s=o("d959"),u=o.n(s);const b=u()(d,[["render",n]]);t["a"]=b}}]);
//# sourceMappingURL=TouchFormElement2.c4f5d237.js.map