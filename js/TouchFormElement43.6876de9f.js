(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement43","TouchFormElement38","TouchFormElement5","TouchFormElement8"],{"04a0":function(e,t,n){},"0a79":function(e,t,n){"use strict";var a=n("7a23");function o(e,t,n,o,i,c){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",{id:"view-port",class:Object(a["normalizeClass"])(e.showFull?"":"half")},[Object(a["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var i=Object(a["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),c=(n("a4d3"),n("d959")),l=n.n(c);const r=l()(i,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=r},2345:function(e,t,n){"use strict";function a(e,t,n){let a=t;if(e.match(/enter/i))return a+"\r\n";if(e.match(/clear/i))return"";if(a=e.match(/delete|del/i)?a.match(/unknown/i)||a.match(/n\/a/i)?"":a.substring(0,a.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":a.match(/unknown/i)||a.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof a&&a)switch(n){case"lowercase":a=a.toLowerCase();break;case"uppercase":a=a.toUpperCase();break;default:a=a.charAt(0).toUpperCase()+a.slice(1);break}return a}n.d(t,"a",(function(){return a}))},"36ad":function(e,t,n){"use strict";n.r(t);var a=n("7a23");function o(e,t,n,o,i,c){const l=Object(a["resolveComponent"])("ion-input");return Object(a["openBlock"])(),Object(a["createBlock"])(l,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[0]||(t[0]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.readOnly,autocapitalize:"sentences",placeholder:e.placeholder},null,8,["modelValue","type","disabled","readonly","placeholder"])}var i=n("d867"),c=n("2ed9"),l=Object(a["defineComponent"])({name:"HisInput",components:{IonInput:i["v"]},setup(){const{activePlatformProfile:e}=Object(c["e"])(),t=Object(a["computed"])(()=>"HIS_KEYBOARD_ONLY"===e.value.keyboard);return{readOnly:t}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1},placeholder:{type:String,default:()=>""}}}),r=(n("86f4"),n("d959")),s=n.n(r);const u=s()(l,[["render",o],["__scopeId","data-v-04472bbc"]]);t["default"]=u},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"k",(function(){return o})),n.d(t,"f",(function(){return i})),n.d(t,"n",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return r})),n.d(t,"m",(function(){return s})),n.d(t,"j",(function(){return u})),n.d(t,"h",(function(){return d})),n.d(t,"a",(function(){return b})),n.d(t,"l",(function(){return p})),n.d(t,"c",(function(){return f})),n.d(t,"i",(function(){return y})),n.d(t,"g",(function(){return h}));const a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],r=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],b=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],f=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],y=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],h=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"49c3":function(e,t,n){},"51c8":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),o=Object(a["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const i=o;t["default"]=i},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"g",(function(){return c})),n.d(t,"f",(function(){return l})),n.d(t,"e",(function(){return r})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return u})),n.d(t,"h",(function(){return b})),n.d(t,"a",(function(){return p}));var a=n("3800");const o=[a["m"],[["","Delete"]]],i=[a["j"],[["Delete"]]],c=[a["j"],[["Delete","Unknown"]]],l=[a["j"],[["N/A"],["Delete","Unknown"]]],r=[a["j"],[["Delete"]]],s=[a["j"],[["Unknown","Delete"],["Qwerty","A-Z"]]],u=[a["h"],[["Unknown"]]],d=[a["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],b=[a["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],p=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:o},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:b}]},"6ef9":function(e,t,n){"use strict";n.r(t);var a=n("7a23");function o(e,t,n,o,i,c){const l=Object(a["resolveComponent"])("ion-input"),r=Object(a["resolveComponent"])("ion-col"),s=Object(a["resolveComponent"])("base-input"),u=Object(a["resolveComponent"])("ion-row"),d=Object(a["resolveComponent"])("ion-grid"),b=Object(a["resolveComponent"])("ion-label"),p=Object(a["resolveComponent"])("ion-item"),f=Object(a["resolveComponent"])("ion-list"),y=Object(a["resolveComponent"])("view-port"),h=Object(a["resolveComponent"])("his-keyboard");return Object(a["openBlock"])(),Object(a["createElementBlock"])(a["Fragment"],null,[Object(a["createVNode"])(y,{showFull:!1},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(d,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(u,null,{default:Object(a["withCtx"])(()=>[e.prependValue?(Object(a["openBlock"])(),Object(a["createBlock"])(r,{key:0,"size-md":"4"},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(l,{readonly:e.isReadOnly,value:e.prependValue,class:"input_display",disabled:!0},null,8,["readonly","value"])]),_:1})):Object(a["createCommentVNode"])("",!0),Object(a["createVNode"])(r,{"size-md":""},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,{type:e.inputType,value:e.value,onOnValue:e.onKbValue},null,8,["type","value","onOnValue"])]),_:1})]),_:1})]),_:1}),e.listData.length>0?(Object(a["openBlock"])(),Object(a["createBlock"])(f,{key:0,class:"view-port-content"},{default:Object(a["withCtx"])(()=>[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.listData,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])(p,{class:"his-md-text",button:"",key:n,onClick:n=>e.onselect(t)},{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(b,null,{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(t.label),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})):Object(a["createCommentVNode"])("",!0)]),_:1}),Object(a["createVNode"])(h,{initalKeyboardName:e.initalKeyboardName,kbConfig:e.keyboard,onKeyPress:e.keypress,disabled:!1},null,8,["initalKeyboardName","kbConfig","onKeyPress"])],64)}var i=n("36ad"),c=n("db10"),l=n("2345"),r=n("6be2"),s=n("0a79"),u=n("51c8"),d=n("2ef0"),b=n("d867"),p=Object(a["defineComponent"])({components:{IonInput:b["v"],IonRow:b["H"],IonCol:b["m"],IonGrid:b["p"],BaseInput:i["default"],HisKeyboard:c["a"],ViewPort:s["a"],IonList:b["y"],IonItem:b["w"],IonLabel:b["x"]},mixins:[u["default"]],data:()=>({value:"",prependValue:"",initalKeyboardName:"",keyboard:{},listData:[]}),computed:{inputType(){return this.config&&"inputType"in this.config?this.config.inputType:"text"}},mounted(){this.init()},activated(){this.init()},methods:{async init(){var e,t,n,a;this.keyboard=(null===(e=this.config)||void 0===e?void 0:e.customKeyboard)||r["h"],this.initalKeyboardName="function"===typeof(null===(t=this.config)||void 0===t?void 0:t.initialKb)?null===(n=this.config)||void 0===n?void 0:n.initialKb(this.fdata,this.cdata):(null===(a=this.config)||void 0===a?void 0:a.initialKb)||"",this.$emit("onFieldActivated",this),this.config&&this.config.prependValue&&(this.prependValue=await this.config.prependValue(this.fdata)),await this.setDefaultValue()},async setDefaultValue(){if(this.defaultValue&&!this.value){const e=await this.defaultValue(this.fdata,this.cdata);e&&(Object(d["isPlainObject"])(e)?(this.emitValue(e),this.value=e.value.toString()):(this.value=e,this.emitValue({label:e,value:e})))}},async emitValue(e){if(""===e.value)return this.value="",this.$emit("onValue",null);if(this.onValue){const t=await this.onValue(e);if(!t)return}e.value=this.prependValue?`${this.prependValue}${e.value}`:e.value,this.value=e.label,this.$emit("onValue",e)},async onselect(e){await this.emitValue(e)},async onKbValue(e){await this.emitValue({label:e,value:e})},async keypress(e){var t;const n=Object(l["a"])(e,this.value,null===(t=this.config)||void 0===t?void 0:t.casing);await this.emitValue({label:n,value:n})}},watch:{value:{async handler(){this.options&&(this.listData=await this.options(this.fdata))},deep:!0},clear(){this.value=""}}}),f=(n("b0d2"),n("d959")),y=n.n(f);const h=y()(p,[["render",o],["__scopeId","data-v-e7418aa8"]]);t["default"]=h},"86f4":function(e,t,n){"use strict";n("89a0")},"89a0":function(e,t,n){},a4d3:function(e,t,n){"use strict";n("04a0")},b0d2:function(e,t,n){"use strict";n("49c3")},c924:function(e,t,n){"use strict";var a=n("7a23");function o(e,t,n,o,i,c){const l=Object(a["resolveComponent"])("ion-button");return Object(a["openBlock"])(),Object(a["createElementBlock"])("table",null,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.layout,(t,n)=>(Object(a["openBlock"])(),Object(a["createElementBlock"])("tr",{key:n},[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(t,(n,o)=>(Object(a["openBlock"])(),Object(a["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+o},[n?(Object(a["openBlock"])(),Object(a["createBlock"])(l,{key:0,style:Object(a["normalizeStyle"])({width:e.btnSize}),class:Object(a["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(a["createCommentVNode"])("",!0)]))),128))]))),128))])}var i=n("d867"),c=Object(a["defineComponent"])({components:{IonButton:i["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),l=n("d959"),r=n.n(l);const s=r()(c,[["render",o]]);t["a"]=s},db10:function(e,t,n){"use strict";var a=n("7a23");const o={class:"his-floating-keyboard"},i={class:"his-floating-keyboard-content"};function c(e,t,n,c,l,r){const s=Object(a["resolveComponent"])("base-keyboard");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",o,[Object(a["createElementVNode"])("div",i,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.activeLayout,(t,n)=>(Object(a["openBlock"])(),Object(a["createElementBlock"])("div",{key:n},[Object(a["createVNode"])(s,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var l=n("6be2"),r=n("c924"),s=Object(a["defineComponent"])({components:{BaseKeyboard:r["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=l["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=l["a"][t].keyboard,!0)}}}),u=n("d959"),d=n.n(u);const b=d()(s,[["render",c]]);t["a"]=b}}]);
//# sourceMappingURL=TouchFormElement43.6876de9f.js.map