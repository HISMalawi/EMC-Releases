(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement29","TouchFormElement38","TouchFormElement5","TouchFormElement8"],{"04a0":function(e,t,n){},"0a79":function(e,t,n){"use strict";var o=n("7a23");function c(e,t,n,c,i,a){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{id:"view-port",class:Object(o["normalizeClass"])(e.showFull?"":"half")},[Object(o["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var i=Object(o["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),a=(n("a4d3"),n("d959")),l=n.n(a);const r=l()(i,[["render",c],["__scopeId","data-v-7c293cad"]]);t["a"]=r},2345:function(e,t,n){"use strict";function o(e,t,n){let o=t;if(e.match(/enter/i))return o+"\r\n";if(e.match(/clear/i))return"";if(o=e.match(/delete|del/i)?o.match(/unknown/i)||o.match(/n\/a/i)?"":o.substring(0,o.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":o.match(/unknown/i)||o.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof o&&o)switch(n){case"lowercase":o=o.toLowerCase();break;case"uppercase":o=o.toUpperCase();break;default:o=o.charAt(0).toUpperCase()+o.slice(1);break}return o}n.d(t,"a",(function(){return o}))},"36ad":function(e,t,n){"use strict";n.r(t);var o=n("7a23");function c(e,t,n,c,i,a){const l=Object(o["resolveComponent"])("ion-input");return Object(o["openBlock"])(),Object(o["createBlock"])(l,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[0]||(t[0]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.readOnly,autocapitalize:"sentences",placeholder:e.placeholder},null,8,["modelValue","type","disabled","readonly","placeholder"])}var i=n("d867"),a=n("2ed9"),l=Object(o["defineComponent"])({name:"HisInput",components:{IonInput:i["v"]},setup(){const{activePlatformProfile:e}=Object(a["e"])(),t=Object(o["computed"])(()=>"HIS_KEYBOARD_ONLY"===e.value.keyboard);return{readOnly:t}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1},placeholder:{type:String,default:()=>""}}}),r=(n("86f4"),n("d959")),s=n.n(r);const d=s()(l,[["render",c],["__scopeId","data-v-04472bbc"]]);t["default"]=d},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"j",(function(){return c})),n.d(t,"m",(function(){return i})),n.d(t,"e",(function(){return a})),n.d(t,"b",(function(){return l})),n.d(t,"l",(function(){return r})),n.d(t,"i",(function(){return s})),n.d(t,"g",(function(){return d})),n.d(t,"a",(function(){return u})),n.d(t,"k",(function(){return b})),n.d(t,"c",(function(){return h})),n.d(t,"h",(function(){return p})),n.d(t,"f",(function(){return m}));const o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],l=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],r=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],u=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],b=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],m=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),c=Object(o["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const i=c;t["default"]=i},"52a3":function(e,t,n){"use strict";n.r(t);var o=n("7a23");function c(e,t,n,c,i,a){const l=Object(o["resolveComponent"])("his-text-input"),r=Object(o["resolveComponent"])("ion-chip"),s=Object(o["resolveComponent"])("ion-text"),d=Object(o["resolveComponent"])("ion-label"),u=Object(o["resolveComponent"])("ion-checkbox"),b=Object(o["resolveComponent"])("ion-item"),h=Object(o["resolveComponent"])("ion-list"),p=Object(o["resolveComponent"])("ion-infinite-scroll-content"),m=Object(o["resolveComponent"])("ion-infinite-scroll"),f=Object(o["resolveComponent"])("ion-content"),k=Object(o["resolveComponent"])("view-port"),y=Object(o["resolveComponent"])("his-keyboard");return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[Object(o["createVNode"])(k,{showFull:!e.showKeyboard},{default:Object(o["withCtx"])(()=>[e.showKeyboard?(Object(o["openBlock"])(),Object(o["createBlock"])(l,{key:0,value:e.selected,onOnValue:e.onKBValue},null,8,["value","onOnValue"])):Object(o["createCommentVNode"])("",!0),(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.checkedItems,(t,n)=>(Object(o["openBlock"])(),Object(o["createBlock"])(r,{color:"danger",key:n,onClick:n=>e.unCheck(t)},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(t.label),1)]),_:2},1032,["onClick"]))),128)),Object(o["createVNode"])(f,{style:{width:"100%"},class:"ion-padding-bottom"},{default:Object(o["withCtx"])(()=>[Object(o["createElementVNode"])("div",{class:Object(o["normalizeClass"])(["ion-content-scroll-host",{"ion-margin-bottom ion-padding-bottom":e.disableScroll}])},[Object(o["createVNode"])(h,{class:Object(o["normalizeClass"])(["view-port-content",{"ion-margin-bottom":e.disableScroll}])},{default:Object(o["withCtx"])(()=>[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.listData,(t,n)=>(Object(o["openBlock"])(),Object(o["createBlock"])(b,{key:n,color:t.isChecked?"lightblue":"",lines:t.isChecked?"none":""},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(d,null,{default:Object(o["withCtx"])(()=>{var e;return[Object(o["createVNode"])(s,{class:"his-md-text"},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(t.label),1)]),_:2},1024),t.description&&t.isChecked?(Object(o["openBlock"])(),Object(o["createBlock"])(s,{key:0,color:null===(e=t.description)||void 0===e?void 0:e.color},{default:Object(o["withCtx"])(()=>[Object(o["createElementVNode"])("p",null,[Object(o["createElementVNode"])("i",null,Object(o["toDisplayString"])(t.description.text),1)])]),_:2},1032,["color"])):Object(o["createCommentVNode"])("",!0)]}),_:2},1024),Object(o["createVNode"])(u,{slot:"start",modelValue:t.isChecked,"onUpdate:modelValue":e=>t.isChecked=e,onIonChange:n=>e.onSelect(t,n),disabled:t.disabled},null,8,["modelValue","onUpdate:modelValue","onIonChange","disabled"])]),_:2},1032,["color","lines"]))),128))]),_:1},8,["class"]),Object(o["createVNode"])(m,{onIonInfinite:t[0]||(t[0]=t=>e.pushData(t)),threshold:"100px",disabled:e.disableScroll},{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(p,{"loading-spinner":"crescent","loading-text":"Loading more data..."})]),_:1},8,["disabled"])],2)]),_:1})]),_:1},8,["showFull"]),e.showKeyboard?(Object(o["openBlock"])(),Object(o["createBlock"])(y,{key:0,kbConfig:e.keyboard,onKeyPress:e.keypress},null,8,["kbConfig","onKeyPress"])):Object(o["createCommentVNode"])("",!0)],64)}n("14d9");var i=n("6be2"),a=n("0a79"),l=n("2345"),r=n("36ad"),s=n("51c8"),d=n("db10"),u=n("d867");function b(e,t){return[...new Map(e.filter(Boolean).map(e=>{const n=Array.isArray(t)?t.map(t=>e[t]).join("_"):e[t];return[n,e]})).values()]}var h=Object(o["defineComponent"])({name:"HisInfiniteScrollMultipleSelect",mixins:[s["default"]],components:{IonCheckbox:u["k"],IonText:u["O"],IonChip:u["l"],ViewPort:a["a"],HisTextInput:r["default"],IonContent:u["n"],IonList:u["y"],IonItem:u["w"],IonLabel:u["x"],HisKeyboard:d["a"],IonInfiniteScroll:u["t"],IonInfiniteScrollContent:u["u"]},data:()=>({showKeyboard:!1,keyboard:i["h"],listData:[],checkedItems:[],disableScroll:!1,filter:"",selected:"",page:1,limit:10}),watch:{clear(){this.checkedItems=[],this.filter="",this.selected=""},checkedItems:{handler(e){this.listData.forEach(t=>{e.find(e=>e.value===t.value)?t.isChecked=!0:t.isChecked=!1}),this.$emit("onValue",e)},deep:!0,immediate:!0},filter:{async handler(){this.page=1,this.disableScroll=!1;const e=await this.getListData();[...this.checkedItems].forEach(t=>{const n=e.findIndex(e=>e.value===t.value);-1===n?e.push(t):e[n].isChecked=!0}),this.listData=e}}},mounted(){this.init()},activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this),this.listData=await this.getListData()},async getListData(){return await this.options(this.fdata,this.filter,this.page,this.limit)},async keypress(e){this.filter||(this.selected=""),this.filter=Object(l["a"])(e,this.selected),this.selected=this.filter},async onKBValue(e){this.listData&&this.selected!==e&&(this.filter=e,this.selected=this.filter)},async pushData(e){this.page++;const t=await this.getListData();t.length>0?this.listData=b([...this.listData,...t.filter(e=>!this.listData.find(t=>t.value===e.value))],"label"):this.disableScroll=!0,e.target.complete()},onSelect(e,t){this.$nextTick(async()=>{e.isChecked?-1===this.checkedItems.findIndex(t=>t.value===e.value)&&this.checkedItems.push(e):this.unCheck(e)})},unCheck(e){this.checkedItems=this.checkedItems.filter(t=>t.value!==e.value)}},created(){var e,t,n,o,c,a,l,r;this.showKeyboard=null!==(e=null===(t=this.config)||void 0===t?void 0:t.showKeyboard)&&void 0!==e&&e,this.keyboard=null!==(n=null===(o=this.config)||void 0===o?void 0:o.keyboard)&&void 0!==n?n:i["h"],this.page=null!==(c=null===(a=this.config)||void 0===a?void 0:a.page)&&void 0!==c?c:1,this.limit=null!==(l=null===(r=this.config)||void 0===r?void 0:r.limit)&&void 0!==l?l:10}}),p=n("d959"),m=n.n(p);const f=m()(h,[["render",c]]);t["default"]=f},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"g",(function(){return a})),n.d(t,"f",(function(){return l})),n.d(t,"e",(function(){return r})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return d})),n.d(t,"h",(function(){return b})),n.d(t,"a",(function(){return h}));var o=n("3800");const c=[o["l"],[["","Delete"]]],i=[o["i"],[["Delete"]]],a=[o["i"],[["Delete","Unknown"]]],l=[o["i"],[["N/A"],["Delete","Unknown"]]],r=[o["i"],[["Delete"]]],s=[o["i"],[["Unknown","Delete"],["Qwerty","A-Z"]]],d=[o["g"],[["Unknown"]]],u=[o["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],b=[o["k"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],h=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:c},{btn:"A-Z",keyboard:u},{btn:"Qwerty",keyboard:b}]},"86f4":function(e,t,n){"use strict";n("89a0")},"89a0":function(e,t,n){},a4d3:function(e,t,n){"use strict";n("04a0")},c924:function(e,t,n){"use strict";var o=n("7a23");function c(e,t,n,c,i,a){const l=Object(o["resolveComponent"])("ion-button");return Object(o["openBlock"])(),Object(o["createElementBlock"])("table",null,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.layout,(t,n)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("tr",{key:n},[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(t,(n,c)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+c},[n?(Object(o["openBlock"])(),Object(o["createBlock"])(l,{key:0,style:Object(o["normalizeStyle"])({width:e.btnSize}),class:Object(o["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(o["withCtx"])(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(o["createCommentVNode"])("",!0)]))),128))]))),128))])}var i=n("d867"),a=Object(o["defineComponent"])({components:{IonButton:i["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),l=n("d959"),r=n.n(l);const s=r()(a,[["render",c]]);t["a"]=s},db10:function(e,t,n){"use strict";var o=n("7a23");const c={class:"his-floating-keyboard"},i={class:"his-floating-keyboard-content"};function a(e,t,n,a,l,r){const s=Object(o["resolveComponent"])("base-keyboard");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,[Object(o["createElementVNode"])("div",i,[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(e.activeLayout,(t,n)=>(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{key:n},[Object(o["createVNode"])(s,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var l=n("6be2"),r=n("c924"),s=Object(o["defineComponent"])({components:{BaseKeyboard:r["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=l["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=l["a"][t].keyboard,!0)}}}),d=n("d959"),u=n.n(d);const b=u()(s,[["render",a]]);t["a"]=b}}]);
//# sourceMappingURL=TouchFormElement29.b7702d4b.js.map