(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement46","TouchFormElement38","TouchFormElement5","TouchFormElement51","TouchFormElement8"],{"04a0":function(e,t,n){},"0a79":function(e,t,n){"use strict";var i=n("7a23");function o(e,t,n,o,a,l){return Object(i["openBlock"])(),Object(i["createElementBlock"])("div",{id:"view-port",class:Object(i["normalizeClass"])(e.showFull?"":"half")},[Object(i["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var a=Object(i["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),l=(n("a4d3"),n("d959")),c=n.n(l);const r=c()(a,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=r},"13e0":function(e,t,n){"use strict";n("adbe")},"191f":function(e,t,n){},2345:function(e,t,n){"use strict";function i(e,t,n){let i=t;if(e.match(/enter/i))return i+"\r\n";if(e.match(/clear/i))return"";if(i=e.match(/delete|del/i)?i.match(/unknown/i)||i.match(/n\/a/i)?"":i.substring(0,i.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":i.match(/unknown/i)||i.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof i&&i)switch(n){case"lowercase":i=i.toLowerCase();break;case"uppercase":i=i.toUpperCase();break;default:i=i.charAt(0).toUpperCase()+i.slice(1);break}return i}n.d(t,"a",(function(){return i}))},"36ad":function(e,t,n){"use strict";n.r(t);var i=n("7a23");function o(e,t,n,o,a,l){const c=Object(i["resolveComponent"])("ion-input");return Object(i["openBlock"])(),Object(i["createBlock"])(c,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[0]||(t[0]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.readOnly,autocapitalize:"sentences",placeholder:e.placeholder},null,8,["modelValue","type","disabled","readonly","placeholder"])}var a=n("d867"),l=n("2ed9"),c=Object(i["defineComponent"])({name:"HisInput",components:{IonInput:a["v"]},setup(){const{activePlatformProfile:e}=Object(l["e"])(),t=Object(i["computed"])(()=>"HIS_KEYBOARD_ONLY"===e.value.keyboard);return{readOnly:t}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1},placeholder:{type:String,default:()=>""}}}),r=(n("86f4"),n("d959")),s=n.n(r);const d=s()(c,[["render",o],["__scopeId","data-v-04472bbc"]]);t["default"]=d},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"e",(function(){return o})),n.d(t,"g",(function(){return a})),n.d(t,"n",(function(){return l})),n.d(t,"f",(function(){return c})),n.d(t,"b",(function(){return r})),n.d(t,"m",(function(){return s})),n.d(t,"k",(function(){return d})),n.d(t,"i",(function(){return u})),n.d(t,"a",(function(){return f})),n.d(t,"l",(function(){return h})),n.d(t,"c",(function(){return b})),n.d(t,"j",(function(){return p})),n.d(t,"h",(function(){return m}));const i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","","Confirm"]],l=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],r=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],d=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],u=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],f=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],h=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],b=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],m=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,n){"use strict";n.r(t);var i=n("7a23"),o=Object(i["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const a=o;t["default"]=a},"5fd1":function(e,t,n){"use strict";n.r(t);var i=n("7a23");const o={class:"his-lg-text"};function a(e,t,n,a,l,c){const r=Object(i["resolveComponent"])("ion-col"),s=Object(i["resolveComponent"])("ion-label"),d=Object(i["resolveComponent"])("ion-segment-button"),u=Object(i["resolveComponent"])("ion-segment"),f=Object(i["resolveComponent"])("ion-row"),h=Object(i["resolveComponent"])("ion-grid"),b=Object(i["resolveComponent"])("view-port");return Object(i["openBlock"])(),Object(i["createElementBlock"])("div",null,[Object(i["createVNode"])(b,{showFull:!0},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(h,{class:"view-port-content"},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(f,null,{default:Object(i["withCtx"])(()=>[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(e.listData,(t,n)=>(Object(i["openBlock"])(),Object(i["createBlock"])(r,{size:e.getSize,key:n},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(h,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(f,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(r,{size:"6",class:"ion-col"},{default:Object(i["withCtx"])(()=>[Object(i["createElementVNode"])("span",o,Object(i["toDisplayString"])(t.label),1)]),_:2},1024),Object(i["createVNode"])(r,{size:"6"},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(u,{mode:"ios",modelValue:t.value,"onUpdate:modelValue":e=>t.value=e,onIonChange:()=>e.onChange(t)},{default:Object(i["withCtx"])(()=>[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(t.other.values,(e,t)=>(Object(i["openBlock"])(),Object(i["createBlock"])(d,{class:"yes-no his-lg-text",key:t,value:e.value},{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(s,null,{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(e.label),1)]),_:2},1024)]),_:2},1032,["value"]))),128))]),_:2},1032,["modelValue","onUpdate:modelValue","onIonChange"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1032,["size"]))),128))]),_:1})]),_:1})]),_:1})])}var l=n("82a9"),c=n("d867"),r=n("2ef0"),s=Object(i["defineComponent"])({components:{IonRow:c["H"],IonGrid:c["p"],IonLabel:c["x"],IonCol:c["m"],IonSegmentButton:c["J"],IonSegment:c["I"]},name:"HisMultiYesNo",mixins:[l["default"]],watch:{footerButtonEvent:{handler(e){var t,n;e&&"function"===typeof(null===(t=e.onClickComponentEvents)||void 0===t?void 0:t.refreshOptions)&&(this.listData=null===(n=e.onClickComponentEvents)||void 0===n?void 0:n.refreshOptions(e,this.listData,this.fdata,this.cdata),this.$emit("onValue",Object(r["isEmpty"])(this.listData)?null:this.listData))},deep:!0,immediate:!0},clear(){this.listData=this.listData.map(e=>(e.value="",e))}},computed:{getSize(){return this.listData.length>6?"6":"12"}},mounted(){this.init()},activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this);const e=this.listData.filter(e=>""!=e.value);this.listData=await this.options(this.fdata,e)},onChange(e){this.$nextTick(async()=>{const t=this.listData.map(e=>""!=e.value);if("function"===typeof this.onValue){const t=await this.onValue(e,this.fdata,this.cdata);if(!t)return void(e.value="")}"function"===typeof this.onValueUpdate&&(this.listData=await this.onValueUpdate(this.listData,e)),t.every(Boolean)&&this.$emit("onValue",this.listData)})}}}),d=(n("13e0"),n("d959")),u=n.n(d);const f=u()(s,[["render",a],["__scopeId","data-v-7e12f9a2"]]);t["default"]=f},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"g",(function(){return l})),n.d(t,"f",(function(){return c})),n.d(t,"e",(function(){return r})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return d})),n.d(t,"h",(function(){return f})),n.d(t,"a",(function(){return h}));var i=n("3800");const o=[i["m"],[["","Delete"]]],a=[i["k"],[["Delete"]]],l=[i["k"],[["Delete","Unknown"]]],c=[i["k"],[["N/A"],["Delete","Unknown"]]],r=[i["k"],[["Delete"]]],s=[i["k"],[["Unknown","Delete"],["Qwerty","A-Z"]]],d=[i["i"],[["Unknown"]]],u=[i["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],f=[i["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],h=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:o},{btn:"A-Z",keyboard:u},{btn:"Qwerty",keyboard:f}]},"7d28":function(e,t,n){"use strict";n("191f")},"82a9":function(e,t,n){"use strict";n.r(t);n("14d9");var i=n("7a23"),o=n("db10"),a=n("2345"),l=n("36ad"),c=n("6be2"),r=n("0a79"),s=n("51c8"),d=n("d867"),u=n("2ef0"),f=Object(i["defineComponent"])({components:{IonList:d["y"],IonItem:d["w"],IonLabel:d["x"],HisTextInput:l["default"],HisKeyboard:o["a"],ViewPort:r["a"],IonGrid:d["p"],IonRow:d["H"],IonCol:d["m"],IonInfiniteScroll:d["t"],IonInfiniteScrollContent:d["u"],IonContent:d["n"]},mixins:[s["default"]],data:()=>({showKeyboard:!1,selected:"",filter:"",filtered:[],keyboard:c["h"],listData:[],infiniteScroll:{enabled:!1,page:1,limit:10,threshold:"100px",handler:async(e,t,n)=>[]}}),created(){var e,t,n,i,o,a,l,c,r,s,d;this.showKeyboard=!0===(null===(e=this.config)||void 0===e?void 0:e.showKeyboard),this.infiniteScroll.enabled=!0===(null===(t=this.config)||void 0===t||null===(n=t.infiniteScroll)||void 0===n?void 0:n.enabled),this.infiniteScroll.page=(null===(i=this.config)||void 0===i||null===(o=i.infiniteScroll)||void 0===o?void 0:o.page)||1,this.infiniteScroll.limit=(null===(a=this.config)||void 0===a||null===(l=a.infiniteScroll)||void 0===l?void 0:l.limit)||10,this.infiniteScroll.threshold=(null===(c=this.config)||void 0===c||null===(r=c.infiniteScroll)||void 0===r?void 0:r.threshold)||"100px",this.infiniteScroll.handler=null===(s=this.config)||void 0===s||null===(d=s.infiniteScroll)||void 0===d?void 0:d.handler},watch:{footerButtonEvent:{handler(e){if(Object(u["isPlainObject"])(e.onClickComponentEvents)){const t=(null===e||void 0===e?void 0:e.onClickComponentEvents)||{};if(t&&"function"===typeof t.setValue){const n=t.setValue(e);"string"===typeof n&&(this.filter=n,this.selected=n)}}},deep:!0},listData:{handler(e){e&&(this.filtered=e)},deep:!0,immediate:!0},filter:{async handler(e){var t;if(e)if(null!==(t=this.config)&&void 0!==t&&t.isFilterDataViaApi){if(this.filtered=await this.options(this.fdata,e),this.selected===this.filter){const e=Object(u["find"])(this.filtered,{label:this.filter});e&&this.$emit("onValue",e)}}else this.infiniteScroll.enabled&&(this.infiniteScroll.page=1),this.filtered=this.listData.filter(e=>this.isMatch(e.label,this.filter));else this.filtered=this.listData},immediate:!0}},methods:{isMatch(e,t){return e.match(new RegExp(t,"i"))},clearSelection(){this.filter="",this.selected=""},onKbValue(e,t=!0){t&&this.selected!==e&&(this.filter=e,this.selected=this.filter)},keypress(e){this.filter||(this.selected=""),this.filter=Object(a["a"])(e,this.selected),this.selected=this.filter},async pushData(e){if(this.infiniteScroll.enabled&&"function"===typeof this.infiniteScroll.handler){this.infiniteScroll.page++;const e=await this.infiniteScroll.handler(this.filter,this.infiniteScroll.page,this.infiniteScroll.limit);this.listData.push(...e)}e.target.complete()}}}),h=(n("7d28"),n("d959")),b=n.n(h);const p=b()(f,[["__scopeId","data-v-7b5e2256"]]);t["default"]=p},"86f4":function(e,t,n){"use strict";n("89a0")},"89a0":function(e,t,n){},a4d3:function(e,t,n){"use strict";n("04a0")},adbe:function(e,t,n){},c924:function(e,t,n){"use strict";var i=n("7a23");function o(e,t,n,o,a,l){const c=Object(i["resolveComponent"])("ion-button");return Object(i["openBlock"])(),Object(i["createElementBlock"])("table",null,[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(e.layout,(t,n)=>(Object(i["openBlock"])(),Object(i["createElementBlock"])("tr",{key:n},[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(t,(n,o)=>(Object(i["openBlock"])(),Object(i["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+o},[n?(Object(i["openBlock"])(),Object(i["createBlock"])(c,{key:0,style:Object(i["normalizeStyle"])({width:e.btnSize}),class:Object(i["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(i["withCtx"])(()=>[Object(i["createTextVNode"])(Object(i["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(i["createCommentVNode"])("",!0)]))),128))]))),128))])}var a=n("d867"),l=Object(i["defineComponent"])({components:{IonButton:a["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),c=n("d959"),r=n.n(c);const s=r()(l,[["render",o]]);t["a"]=s},db10:function(e,t,n){"use strict";var i=n("7a23");const o={class:"his-floating-keyboard"},a={class:"his-floating-keyboard-content"};function l(e,t,n,l,c,r){const s=Object(i["resolveComponent"])("base-keyboard");return Object(i["openBlock"])(),Object(i["createElementBlock"])("div",o,[Object(i["createElementVNode"])("div",a,[(Object(i["openBlock"])(!0),Object(i["createElementBlock"])(i["Fragment"],null,Object(i["renderList"])(e.activeLayout,(t,n)=>(Object(i["openBlock"])(),Object(i["createElementBlock"])("div",{key:n},[Object(i["createVNode"])(s,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var c=n("6be2"),r=n("c924"),s=Object(i["defineComponent"])({components:{BaseKeyboard:r["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=c["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=c["a"][t].keyboard,!0)}}}),d=n("d959"),u=n.n(d);const f=u()(s,[["render",l]]);t["a"]=f}}]);
//# sourceMappingURL=TouchFormElement46.3bc70609.js.map