(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement33","TouchFormElement38","TouchFormElement5","TouchFormElement51","TouchFormElement8"],{"0a79":function(e,t,n){"use strict";var i=n("7a23");const o=Object(i["withScopeId"])("data-v-7c293cad"),c=o((function(e,t,n,o,c,a){return Object(i["openBlock"])(),Object(i["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(i["renderSlot"])(e.$slots,"default")],2)}));var a=Object(i["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),l=(n("a4d3"),n("6b0d")),s=n.n(l);const r=s()(a,[["render",c],["__scopeId","data-v-7c293cad"]]);t["a"]=r},2345:function(e,t,n){"use strict";function i(e,t,n){let i=t;if(e.match(/enter/i))return i+"\r\n";if(e.match(/clear/i))return"";if(i=e.match(/delete|del/i)?i.match(/unknown/i)||i.match(/n\/a/i)?"":i.substring(0,i.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":i.match(/unknown/i)||i.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof i&&i)switch(n){case"lowercase":i=i.toLowerCase();break;case"uppercase":i=i.toUpperCase();break;default:i=i.charAt(0).toUpperCase()+i.slice(1);break}return i}n.d(t,"a",(function(){return i}))},"2fd5":function(e,t,n){"use strict";n.r(t);var i=n("7a23");function o(e,t,n,o,c,a){const l=Object(i["resolveComponent"])("his-text-input"),s=Object(i["resolveComponent"])("ion-chip"),r=Object(i["resolveComponent"])("ion-text"),d=Object(i["resolveComponent"])("ion-label"),u=Object(i["resolveComponent"])("ion-checkbox"),h=Object(i["resolveComponent"])("ion-item"),b=Object(i["resolveComponent"])("ion-list"),f=Object(i["resolveComponent"])("view-port"),p=Object(i["resolveComponent"])("his-keyboard");return Object(i["openBlock"])(),Object(i["createBlock"])(i["Fragment"],null,[Object(i["createVNode"])(f,{showFull:!e.showKeyboard},{default:Object(i["withCtx"])(()=>[e.showKeyboard?(Object(i["openBlock"])(),Object(i["createBlock"])(l,{key:0,value:e.selected,onOnValue:t[1]||(t[1]=t=>e.onKbValue(t,e.showKeyboard)),disabled:!1},null,8,["value"])):Object(i["createCommentVNode"])("",!0),(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(e.checkedItems,(t,n)=>(Object(i["openBlock"])(),Object(i["createBlock"])("span",{key:n},[Object(i["createVNode"])(s,{color:"danger",onClick:n=>e.uncheck(t.label)},{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(t.label),1)]),_:2},1032,["onClick"])]))),128)),Object(i["createVNode"])(b,{class:"view-port-content"},{default:Object(i["withCtx"])(()=>[(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(e.filtered,(t,n)=>(Object(i["openBlock"])(),Object(i["createBlock"])(h,{key:n,color:t.isChecked?"lightblue":"",lines:t.isChecked?"none":""},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(d,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(r,{class:"his-md-text"},{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(t.label),1)]),_:2},1024),e.isDescription(t.description,t.isChecked)?(Object(i["openBlock"])(),Object(i["createBlock"])(r,{key:0,color:t.description.color},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])("p",null,[Object(i["createVNode"])("i",null,Object(i["toDisplayString"])(t.description.text),1)])]),_:2},1032,["color"])):Object(i["createCommentVNode"])("",!0)]),_:2},1024),Object(i["createVNode"])(u,{slot:"start",modelValue:t.isChecked,"onUpdate:modelValue":e=>t.isChecked=e,onIonChange:n=>e.onselect(t,n),disabled:null===t||void 0===t?void 0:t.disabled},null,8,["modelValue","onUpdate:modelValue","onIonChange","disabled"])]),_:2},1032,["color","lines"]))),128))]),_:1})]),_:1},8,["showFull"]),e.showKeyboard?(Object(i["openBlock"])(),Object(i["createBlock"])(p,{key:0,kbConfig:e.keyboard,onKeyPress:e.keypress},null,8,["kbConfig","onKeyPress"])):Object(i["createCommentVNode"])("",!0)],64)}var c=n("8a30"),a=n("82a9"),l=n("2ef0"),s=Object(i["defineComponent"])({components:{IonCheckbox:c["k"],IonText:c["O"],IonChip:c["l"]},name:"HisMultipleSelect",mixins:[a["default"]],methods:{async init(){this.$emit("onFieldActivated",this),!Object(l["isEmpty"])(this.listData)&&this.config.buildOptionsOnce||(this.listData=await this.options(this.fdata,this.getChecked(this.listData),this.cdata,this.listData),this.$emit("onValue",this.getChecked(this.listData)))},async onselect(e,t){this.$nextTick(async()=>{var n;const i={...e};if(i.isChecked=t.target.checked,"function"===typeof(null===i||void 0===i||null===(n=i.other)||void 0===n?void 0:n.onEvent)&&await i.other.onEvent(i.isChecked),this.onValue&&i.isChecked){const e=await this.onValue(i,this.fdata,this.cdata);if(!e)return t.target.checked=!1}this.onValueUpdate&&(this.listData=await this.onValueUpdate([...this.listData],i,this.fdata,this.cdata)),this.$emit("onValue",this.getChecked(this.listData))})},uncheck(e){this.listData.forEach(t=>{t.label===e&&(t.isChecked=!1)})},getChecked(e){return e.filter(e=>e.isChecked)},isDescription(e,t=!1){return!!e&&(null===e||void 0===e||!e.show||("onChecked"===e.show&&t||"always"===e.show))}},computed:{checkedItems(){return this.getChecked(this.listData)}},watch:{clear(){this.listData=this.listData.map(e=>(e.isChecked=!1,e))},footerButtonEvent:{async handler(e){var t,n;e&&"function"===typeof(null===(t=e.onClickComponentEvents)||void 0===t?void 0:t.refreshOptions)&&(this.listData=await(null===(n=e.onClickComponentEvents)||void 0===n?void 0:n.refreshOptions(e,this.listData,this.fdata,this.cdata)),this.$emit("onValue",this.getChecked(this.listData)))},deep:!0,immediate:!0}},mounted(){this.init()},activated(){this.init()}}),r=n("6b0d"),d=n.n(r);const u=d()(s,[["render",o]]);t["default"]=u},"36ad":function(e,t,n){"use strict";n.r(t);var i=n("7a23");const o=Object(i["withScopeId"])("data-v-64dded10"),c=o((function(e,t,n,o,c,a){const l=Object(i["resolveComponent"])("ion-input");return Object(i["openBlock"])(),Object(i["createBlock"])(l,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[1]||(t[1]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.readOnly,autocapitalize:"sentences"},null,8,["modelValue","type","disabled","readonly"])}));var a=n("8a30"),l=n("2ed9"),s=Object(i["defineComponent"])({name:"HisInput",components:{IonInput:a["v"]},setup(){const{activePlatformProfile:e}=Object(l["e"])(),t=Object(i["computed"])(()=>"HIS_KEYBOARD_ONLY"===e.value.keyboard);return{readOnly:t}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1}}}),r=(n("ba6e"),n("6b0d")),d=n.n(r);const u=d()(s,[["render",c],["__scopeId","data-v-64dded10"]]);t["default"]=u},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"l",(function(){return o})),n.d(t,"e",(function(){return c})),n.d(t,"b",(function(){return a})),n.d(t,"k",(function(){return l})),n.d(t,"i",(function(){return s})),n.d(t,"g",(function(){return r})),n.d(t,"a",(function(){return d})),n.d(t,"j",(function(){return u})),n.d(t,"c",(function(){return h})),n.d(t,"h",(function(){return b})),n.d(t,"f",(function(){return f}));const i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],a=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],r=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],d=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],u=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],b=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,n){"use strict";n.r(t);var i=n("7a23"),o=Object(i["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const c=o;t["default"]=c},"5c0e":function(e,t,n){},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return c})),n.d(t,"g",(function(){return a})),n.d(t,"f",(function(){return l})),n.d(t,"e",(function(){return s})),n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return d})),n.d(t,"h",(function(){return h})),n.d(t,"a",(function(){return b}));var i=n("3800");const o=[i["k"],[["","Delete"]]],c=[i["i"],[["Delete"]]],a=[i["i"],[["Delete","Unknown"]]],l=[i["i"],[["N/A"],["Delete","Unknown"]]],s=[i["i"],[["Delete"]]],r=[i["i"],[["Unknown","Delete"],["Qwerty","A-Z"]]],d=[i["g"],[["Unknown"]]],u=[i["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],h=[i["j"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],b=[{btn:"0-9",keyboard:r},{btn:"?123",keyboard:o},{btn:"A-Z",keyboard:u},{btn:"Qwerty",keyboard:h}]},"6f40":function(e,t,n){},"7d28":function(e,t,n){"use strict";n("6f40")},"82a9":function(e,t,n){"use strict";n.r(t);var i=n("7a23"),o=n("db10"),c=n("2345"),a=n("36ad"),l=n("6be2"),s=n("0a79"),r=n("51c8"),d=n("8a30"),u=n("2ef0"),h=Object(i["defineComponent"])({components:{IonList:d["y"],IonItem:d["w"],IonLabel:d["x"],HisTextInput:a["default"],HisKeyboard:o["a"],ViewPort:s["a"],IonGrid:d["p"],IonRow:d["H"],IonCol:d["m"],IonInfiniteScroll:d["t"],IonInfiniteScrollContent:d["u"],IonContent:d["n"]},mixins:[r["default"]],data:()=>({showKeyboard:!1,selected:"",filter:"",filtered:[],keyboard:l["h"],listData:[],infiniteScroll:{enabled:!1,page:1,limit:10,threshold:"100px",handler:async(e,t,n)=>[]}}),created(){var e,t,n,i,o,c,a,l,s,r,d;this.showKeyboard=!0===(null===(e=this.config)||void 0===e?void 0:e.showKeyboard),this.infiniteScroll.enabled=!0===(null===(t=this.config)||void 0===t||null===(n=t.infiniteScroll)||void 0===n?void 0:n.enabled),this.infiniteScroll.page=(null===(i=this.config)||void 0===i||null===(o=i.infiniteScroll)||void 0===o?void 0:o.page)||1,this.infiniteScroll.limit=(null===(c=this.config)||void 0===c||null===(a=c.infiniteScroll)||void 0===a?void 0:a.limit)||10,this.infiniteScroll.threshold=(null===(l=this.config)||void 0===l||null===(s=l.infiniteScroll)||void 0===s?void 0:s.threshold)||"100px",this.infiniteScroll.handler=null===(r=this.config)||void 0===r||null===(d=r.infiniteScroll)||void 0===d?void 0:d.handler},watch:{footerButtonEvent:{handler(e){if(Object(u["isPlainObject"])(e.onClickComponentEvents)){const t=(null===e||void 0===e?void 0:e.onClickComponentEvents)||{};if(t&&"function"===typeof t.setValue){const n=t.setValue(e);"string"===typeof n&&(this.filter=n,this.selected=n)}}},deep:!0},listData:{handler(e){e&&(this.filtered=e)},deep:!0,immediate:!0},filter:{async handler(e){var t;if(e)if(null!==(t=this.config)&&void 0!==t&&t.isFilterDataViaApi){if(this.filtered=await this.options(this.fdata,e),this.selected===this.filter){const e=Object(u["find"])(this.filtered,{label:this.filter});e&&this.$emit("onValue",e)}}else this.infiniteScroll.enabled&&(this.infiniteScroll.page=1),this.filtered=this.listData.filter(e=>this.isMatch(e.label,this.filter));else this.filtered=this.listData},immediate:!0}},methods:{isMatch(e,t){return e.match(new RegExp(t,"i"))},clearSelection(){this.filter="",this.selected=""},onKbValue(e,t=!0){t&&this.selected!==e&&(this.filter=e,this.selected=this.filter)},keypress(e){this.filter||(this.selected=""),this.filter=Object(c["a"])(e,this.selected),this.selected=this.filter},async pushData(e){if(this.infiniteScroll.enabled&&"function"===typeof this.infiniteScroll.handler){this.infiniteScroll.page++;const e=await this.infiniteScroll.handler(this.filter,this.infiniteScroll.page,this.infiniteScroll.limit);this.listData.push(...e)}e.target.complete()}}}),b=(n("7d28"),n("6b0d")),f=n.n(b);const p=f()(h,[["__scopeId","data-v-7b5e2256"]]);t["default"]=p},a4d3:function(e,t,n){"use strict";n("a6f7")},a6f7:function(e,t,n){},ba6e:function(e,t,n){"use strict";n("5c0e")},c924:function(e,t,n){"use strict";var i=n("7a23");function o(e,t,n,o,c,a){const l=Object(i["resolveComponent"])("ion-button");return Object(i["openBlock"])(),Object(i["createBlock"])("table",null,[(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(e.layout,(t,n)=>(Object(i["openBlock"])(),Object(i["createBlock"])("tr",{key:n},[(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(t,(t,n)=>(Object(i["openBlock"])(),Object(i["createBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+n},[t?(Object(i["openBlock"])(),Object(i["createBlock"])(l,{key:0,style:{width:e.btnSize},class:"his-keyboard-btn",onClick:()=>e.keyPress(t)},{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(t),1)]),_:2},1032,["style","onClick"])):Object(i["createCommentVNode"])("",!0)]))),128))]))),128))])}var c=n("8a30"),a=Object(i["defineComponent"])({components:{IonButton:c["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)}}}),l=n("6b0d"),s=n.n(l);const r=s()(a,[["render",o]]);t["a"]=r},db10:function(e,t,n){"use strict";var i=n("7a23");const o={class:"his-floating-keyboard"},c={class:"his-floating-keyboard-content"};function a(e,t,n,a,l,s){const r=Object(i["resolveComponent"])("base-keyboard");return Object(i["openBlock"])(),Object(i["createBlock"])("div",o,[Object(i["createVNode"])("div",c,[(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(e.activeLayout,(t,n)=>(Object(i["openBlock"])(),Object(i["createBlock"])("div",{key:n},[Object(i["createVNode"])(r,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var l=n("6be2"),s=n("c924"),r=Object(i["defineComponent"])({components:{BaseKeyboard:s["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=l["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=l["a"][t].keyboard,!0)}}}),d=n("6b0d"),u=n.n(d);const h=u()(r,[["render",a]]);t["a"]=h}}]);
//# sourceMappingURL=TouchFormElement33.f3519d81.js.map