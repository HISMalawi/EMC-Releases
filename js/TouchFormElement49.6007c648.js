(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement49","TouchFormElement8"],{"149a":function(e,t,o){"use strict";o("5128")},"28b2":function(e,t,o){"use strict";o.r(t);var l=o("7a23");const n={class:"large-card"},i={class:"large-card"};function c(e,t,o,c,a,s){const r=Object(l["resolveComponent"])("ion-img"),d=Object(l["resolveComponent"])("ion-avatar"),u=Object(l["resolveComponent"])("ion-label"),b=Object(l["resolveComponent"])("ion-item"),j=Object(l["resolveComponent"])("ion-list"),O=Object(l["resolveComponent"])("ion-col"),p=Object(l["resolveComponent"])("ion-row");return Object(l["openBlock"])(),Object(l["createBlock"])(p,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(O,{size:"5"},{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("div",n,[Object(l["createElementVNode"])("h2",null,Object(l["toDisplayString"])(e.foundRecordsTitle)+" ("+Object(l["toDisplayString"])(e.listData.length)+"): ",1),Object(l["createVNode"])(j,null,{default:Object(l["withCtx"])(()=>[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(e.listData,(t,o)=>(Object(l["openBlock"])(),Object(l["createBlock"])(b,{class:"his-sm-text",button:"",key:o,detail:!0,color:t.value===e.selectedResult.value?"lightblue":"",onClick:o=>e.onSelect(t)},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(d,null,{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(r,{src:"/assets/images/avatar.svg"})]),_:1}),Object(l["createVNode"])(u,null,{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(Object(l["toDisplayString"])(t.label),1)]),_:2},1024)]),_:2},1032,["color","onClick"]))),128))]),_:1})])]),_:1}),Object(l["createVNode"])(O,{size:"7"},{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("div",i,[Object(l["createElementVNode"])("h3",null,Object(l["toDisplayString"])(e.detailsTitle),1),Object(l["createVNode"])(j,null,{default:Object(l["withCtx"])(()=>[(Object(l["openBlock"])(!0),Object(l["createElementBlock"])(l["Fragment"],null,Object(l["renderList"])(e.patientAttributes,(e,t)=>(Object(l["openBlock"])(),Object(l["createBlock"])(b,{class:"his-md-text",key:t,inset:"none"},{default:Object(l["withCtx"])(()=>[Object(l["createVNode"])(u,null,{default:Object(l["withCtx"])(()=>[Object(l["createTextVNode"])(Object(l["toDisplayString"])(e.label),1)]),_:2},1024),Object(l["createVNode"])(u,{slot:"end"},{default:Object(l["withCtx"])(()=>[Object(l["createElementVNode"])("b",null,Object(l["toDisplayString"])(e.value),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})])]),_:1})]),_:1})}var a=o("d867"),s=o("51c8"),r=o("2ef0"),d=Object(l["defineComponent"])({mixins:[s["default"]],components:{IonLabel:a["x"],IonAvatar:a["b"],IonRow:a["H"],IonImg:a["s"],IonCol:a["m"],IonList:a["y"],IonItem:a["w"]},data:()=>({listData:[],selectedResult:{}}),computed:{patientAttributes(){var e,t,o,l;return!Object(r["isEmpty"])(this.selectedResult)&&Object(r["isArray"])(null===(e=this.selectedResult)||void 0===e||null===(t=e.other)||void 0===t?void 0:t.options)?null===(o=this.selectedResult)||void 0===o||null===(l=o.other)||void 0===l?void 0:l.options.filter(e=>{var t,o;return"function"!==typeof(null===e||void 0===e||null===(t=e.other)||void 0===t?void 0:t.show)||(null===e||void 0===e||null===(o=e.other)||void 0===o?void 0:o.show())}):[]},foundRecordsTitle(){var e;return(null===(e=this.config)||void 0===e?void 0:e.foundRecordsTitle)||"Found People"},detailsTitle(){var e;return(null===(e=this.config)||void 0===e?void 0:e.detailsTitle)||"Details:"}},methods:{async init(){this.$emit("onFieldActivated",this),this.listData=await this.options(this.fdata,this),this.onSelect(this.listData.length>0?this.listData[0]:{})},async onSelect(e){if(e){if(this.onValue){const t=await this.onValue(e,this);if(!t)return}this.selectedResult=e,this.$emit("onValue",e)}}},mounted(){this.init()},activated(){this.init()}}),u=(o("149a"),o("6b0d")),b=o.n(u);const j=b()(d,[["render",c],["__scopeId","data-v-67ab35ad"]]);t["default"]=j},5128:function(e,t,o){},"51c8":function(e,t,o){"use strict";o.r(t);var l=o("7a23"),n=Object(l["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const i=n;t["default"]=i}}]);
//# sourceMappingURL=TouchFormElement49.6007c648.js.map