(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement28","TouchFormElement38","TouchFormElement8"],{"04a0":function(e,t,n){},"0a79":function(e,t,n){"use strict";var o=n("7a23");function c(e,t,n,c,r,a){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{id:"view-port",class:Object(o["normalizeClass"])(e.showFull?"":"half")},[Object(o["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var r=Object(o["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),a=(n("a4d3"),n("d959")),i=n.n(a);const l=i()(r,[["render",c],["__scopeId","data-v-7c293cad"]]);t["a"]=l},1262:function(e,t,n){"use strict";n("e5ab")},2345:function(e,t,n){"use strict";function o(e,t,n){let o=t;if(e.match(/enter/i))return o+"\r\n";if(e.match(/clear/i))return"";if(o=e.match(/delete|del/i)?o.match(/unknown/i)||o.match(/n\/a/i)?"":o.substring(0,o.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":o.match(/unknown/i)||o.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof o&&o)switch(n){case"lowercase":o=o.toLowerCase();break;case"uppercase":o=o.toUpperCase();break;default:o=o.charAt(0).toUpperCase()+o.slice(1);break}return o}n.d(t,"a",(function(){return o}))},"2a82":function(e,t,n){"use strict";n.r(t);var o=n("7a23");function c(e,t,n,c,r,a){const i=Object(o["resolveComponent"])("ion-input"),l=Object(o["resolveComponent"])("ion-col"),s=Object(o["resolveComponent"])("ion-row"),u=Object(o["resolveComponent"])("ion-grid"),d=Object(o["resolveComponent"])("view-port"),b=Object(o["resolveComponent"])("his-keyboard");return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[Object(o["createVNode"])(d,{showFull:!1},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(u,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(s,null,{default:Object(o["withCtx"])(()=>[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.addressInputs,(t,n)=>(Object(o["openBlock"])(),Object(o["createBlock"])(l,{key:n},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(i,{readonly:"HIS_KEYBOARD_ONLY"===e.activePlatformProfile.keyboard,mode:"md",inputmode:"numeric",type:"number",max:255,class:Object(o["normalizeClass"])([{"highlighted-input":n===e.activeIndex},"input_display"]),modelValue:e.addressInputs[n],"onUpdate:modelValue":t=>e.addressInputs[n]=t,onIonFocus:t=>e.onAddressClick(n),style:{textAlign:"center"},placeholder:"0"},null,8,["readonly","class","modelValue","onUpdate:modelValue","onIonFocus"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),e.showKeyboard?(Object(o["openBlock"])(),Object(o["createBlock"])(b,{key:0,onKeyPress:e.keypress,kbConfig:e.numbers},null,8,["onKeyPress","kbConfig"])):Object(o["createCommentVNode"])("",!0)],64)}var r=n("db10"),a=n("3800"),i=n("0a79"),l=n("51c8"),s=n("2345"),u=n("d867"),d=n("2ef0"),b=n("2ed9"),p=Object(o["defineComponent"])({components:{IonInput:u["v"],IonRow:u["H"],IonCol:u["m"],IonGrid:u["p"],HisKeyboard:r["a"],ViewPort:i["a"]},mixins:[l["default"]],watch:{clear(){this.addressInputs={first:"",second:"",third:"",fourth:""}}},setup(e,{emit:t}){const{activePlatformProfile:n}=Object(b["e"])();Object(o["onActivated"])(()=>t("onFieldActivated",this));const c=Object(o["ref"])(!1),r=Object(o["ref"])(""),i=Object(o["ref"])({first:"",second:"",third:"",fourth:""});function l(e){if(!r.value)return;const t=r.value,n=Object(s["a"])(e,i.value[t]);if(n.length>3)switch(r.value){case"first":r.value="second";break;case"second":r.value="third";break;case"third":r.value="fourth";break;case"fourth":r.value=""}else i.value[t]="0"===n.charAt(0)&&n.length>1?n.substring(1):n}function u(e){r.value=e,c.value=!0}return Object(o["watch"])(i,e=>{if(!e)return;const n=Object.values(e).map(e=>!Object(d["isEmpty"])(e));if(n.every(Boolean)){const n=Object.values(e).map(e=>e).join(".");t("onValue",{label:n,value:n})}else t("onValue",null)},{deep:!0,immediate:!0}),{activePlatformProfile:n,keypress:l,activeIndex:r,onAddressClick:u,showKeyboard:c,addressInputs:i,numbers:[a["i"],[["Delete"],["Clear"]]]}}}),f=(n("1262"),n("d959")),m=n.n(f);const y=m()(p,[["render",c],["__scopeId","data-v-c5491dd8"]]);t["default"]=y},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"j",(function(){return c})),n.d(t,"m",(function(){return r})),n.d(t,"e",(function(){return a})),n.d(t,"b",(function(){return i})),n.d(t,"l",(function(){return l})),n.d(t,"i",(function(){return s})),n.d(t,"g",(function(){return u})),n.d(t,"a",(function(){return d})),n.d(t,"k",(function(){return b})),n.d(t,"c",(function(){return p})),n.d(t,"h",(function(){return f})),n.d(t,"f",(function(){return m}));const o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],i=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],u=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],d=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],b=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],p=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],f=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],m=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),c=Object(o["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const r=c;t["default"]=r},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"g",(function(){return a})),n.d(t,"f",(function(){return i})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return u})),n.d(t,"h",(function(){return b})),n.d(t,"a",(function(){return p}));var o=n("3800");const c=[o["l"],[["","Delete"]]],r=[o["i"],[["Delete"]]],a=[o["i"],[["Delete","Unknown"]]],i=[o["i"],[["N/A"],["Delete","Unknown"]]],l=[o["i"],[["Delete"]]],s=[o["i"],[["Unknown","Delete"],["Qwerty","A-Z"]]],u=[o["g"],[["Unknown"]]],d=[o["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],b=[o["k"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],p=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:c},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:b}]},a4d3:function(e,t,n){"use strict";n("04a0")},c924:function(e,t,n){"use strict";var o=n("7a23");function c(e,t,n,c,r,a){const i=Object(o["resolveComponent"])("ion-button");return Object(o["openBlock"])(),Object(o["createElementBlock"])("table",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.layout,(t,n)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{key:n},[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(t,(n,c)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+c},[n?(Object(o["openBlock"])(),Object(o["createBlock"])(i,{key:0,style:Object(o["normalizeStyle"])({width:e.btnSize}),class:Object(o["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(o["createCommentVNode"])("",!0)]))),128))]))),128))])}var r=n("d867"),a=Object(o["defineComponent"])({components:{IonButton:r["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),i=n("d959"),l=n.n(i);const s=l()(a,[["render",c]]);t["a"]=s},db10:function(e,t,n){"use strict";var o=n("7a23");const c={class:"his-floating-keyboard"},r={class:"his-floating-keyboard-content"};function a(e,t,n,a,i,l){const s=Object(o["resolveComponent"])("base-keyboard");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,[Object(o["createElementVNode"])("div",r,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.activeLayout,(t,n)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{key:n},[Object(o["createVNode"])(s,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var i=n("6be2"),l=n("c924"),s=Object(o["defineComponent"])({components:{BaseKeyboard:l["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=i["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=i["a"][t].keyboard,!0)}}}),u=n("d959"),d=n.n(u);const b=d()(s,[["render",a]]);t["a"]=b},e5ab:function(e,t,n){}}]);
//# sourceMappingURL=TouchFormElement28.e4a0a219.js.map