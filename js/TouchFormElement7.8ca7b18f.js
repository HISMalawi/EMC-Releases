(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement7","TouchFormElement38","TouchFormElement8"],{"0504":function(e,t,n){"use strict";n("e60f")},"0a79":function(e,t,n){"use strict";var c=n("7a23");function o(e,t,n,o,a,i){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{id:"view-port",class:Object(c["normalizeClass"])(e.showFull?"":"half")},[Object(c["renderSlot"])(e.$slots,"default",{},void 0,!0)],2)}var a=Object(c["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),i=(n("a4d3"),n("6b0d")),l=n.n(i);const r=l()(a,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=r},"10be":function(e,t,n){"use strict";var c=n("7a23");const o={class:"keypad"};function a(e,t,n,a,i,l){const r=Object(c["resolveComponent"])("ion-input"),s=Object(c["resolveComponent"])("ion-chip"),u=Object(c["resolveComponent"])("center"),d=Object(c["resolveComponent"])("base-keyboard"),b=Object(c["resolveComponent"])("ion-content");return Object(c["openBlock"])(),Object(c["createBlock"])(b,null,{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",o,[Object(c["createVNode"])(r,{value:e.value,disabled:!0,class:"keypad-input"},null,8,["value"]),Object(c["createVNode"])(u,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(s,null,{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.title||"keypad"),1)]),_:1})]),_:1}),Object(c["createVNode"])(d,{btnSize:"96px",layout:e.keypad,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])])]),_:1})}var i=n("c924"),l=n("3800"),r=n("2345"),s=n("fe70"),u=Object(c["defineComponent"])({components:{BaseKeyboard:i["a"]},props:{title:{type:String},preset:{type:String},onKeyPress:{type:Function,required:!0},strictNumbers:{type:Boolean,default:!1}},data:()=>({value:"0",keypad:l["d"]}),watch:{preset:{handler(e){e&&(this.value=e.toString())},immediate:!0}},methods:{async keypress(e){if(e.match(/done/i))await s["j"].dismiss(this.value);else if(this.strictNumbers){if(e.includes(".")&&this.value.includes("."))return;e.includes(".")||"0"!==this.value||(this.value=""),this.value=Object(r["a"])(e,this.value),this.value||(this.value="0"),""+parseInt(this.value)===this.value?this.onKeyPress(parseInt(this.value)):this.onKeyPress(this.value)}else this.value=Object(r["a"])(e,this.value),this.onKeyPress(this.value)}}}),d=(n("27f1"),n("6b0d")),b=n.n(d);const p=b()(u,[["render",a],["__scopeId","data-v-7454247c"]]);t["a"]=p},2345:function(e,t,n){"use strict";function c(e,t,n){let c=t;if(e.match(/enter/i))return c+"\r\n";if(e.match(/clear/i))return"";if(c=e.match(/delete|del/i)?c.match(/unknown/i)||c.match(/n\/a/i)?"":c.substring(0,c.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":c.match(/unknown/i)||c.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof c&&c)switch(n){case"lowercase":c=c.toLowerCase();break;case"uppercase":c=c.toUpperCase();break;default:c=c.charAt(0).toUpperCase()+c.slice(1);break}return c}n.d(t,"a",(function(){return c}))},"27f1":function(e,t,n){"use strict";n("a3fb")},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return c})),n.d(t,"k",(function(){return o})),n.d(t,"f",(function(){return a})),n.d(t,"n",(function(){return i})),n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return r})),n.d(t,"m",(function(){return s})),n.d(t,"j",(function(){return u})),n.d(t,"h",(function(){return d})),n.d(t,"a",(function(){return b})),n.d(t,"l",(function(){return p})),n.d(t,"c",(function(){return h})),n.d(t,"i",(function(){return j})),n.d(t,"g",(function(){return f}));const c=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],r=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],b=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],j=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,n){"use strict";n.r(t);var c=n("7a23"),o=Object(c["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const a=o;t["default"]=a},a3fb:function(e,t,n){},a4d3:function(e,t,n){"use strict";n("a6f7")},a6f7:function(e,t,n){},c924:function(e,t,n){"use strict";var c=n("7a23");function o(e,t,n,o,a,i){const l=Object(c["resolveComponent"])("ion-button");return Object(c["openBlock"])(),Object(c["createElementBlock"])("table",null,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.layout,(t,n)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("tr",{key:n},[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(t,(n,o)=>(Object(c["openBlock"])(),Object(c["createElementBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+o},[n?(Object(c["openBlock"])(),Object(c["createBlock"])(l,{key:0,style:Object(c["normalizeStyle"])({width:e.btnSize}),class:Object(c["normalizeClass"])(`his-keyboard-btn btn-${n}-${e.dynamicClass(t)}`),onClick:()=>e.keyPress(n)},{default:Object(c["withCtx"])(()=>[Object(c["createTextVNode"])(Object(c["toDisplayString"])(n),1)]),_:2},1032,["style","class","onClick"])):Object(c["createCommentVNode"])("",!0)]))),128))]))),128))])}var a=n("d867"),i=Object(c["defineComponent"])({components:{IonButton:a["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)},dynamicClass(e){return 3==e.length&&"Unknown"==e[0]?"Keypad":e[0]}}}),l=n("6b0d"),r=n.n(l);const s=r()(i,[["render",o]]);t["a"]=s},de42:function(e,t,n){"use strict";n.r(t);var c=n("7a23");const o=e=>(Object(c["pushScopeId"])("data-v-23089994"),e=e(),Object(c["popScopeId"])(),e),a={class:"view-port-content"},i=o(()=>Object(c["createElementVNode"])("b",null," Medication ",-1)),l=o(()=>Object(c["createElementVNode"])("b",null," Given Amount",-1)),r=o(()=>Object(c["createElementVNode"])("b",null," Pills brought ",-1)),s={class:"his-card",style:{textAlign:"left"}};function u(e,t,n,o,u,d){const b=Object(c["resolveComponent"])("ion-col"),p=Object(c["resolveComponent"])("ion-row"),h=Object(c["resolveComponent"])("ion-input"),j=Object(c["resolveComponent"])("ion-grid"),f=Object(c["resolveComponent"])("view-port");return Object(c["openBlock"])(),Object(c["createBlock"])(f,null,{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",a,[Object(c["createVNode"])(j,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(p,null,{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(b,{size:"6"},{default:Object(c["withCtx"])(()=>[i]),_:1}),Object(c["createVNode"])(b,{size:"3"},{default:Object(c["withCtx"])(()=>[l]),_:1}),Object(c["createVNode"])(b,{size:"3"},{default:Object(c["withCtx"])(()=>[r]),_:1})]),_:1}),(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.listData,(t,n)=>(Object(c["openBlock"])(),Object(c["createBlock"])(p,{key:n},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(b,{size:"6"},{default:Object(c["withCtx"])(()=>[Object(c["createElementVNode"])("div",s,Object(c["toDisplayString"])(t.label),1)]),_:2},1024),Object(c["createVNode"])(b,{size:"3"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(h,{value:t.value,onClick:n=>e.launchKeyPad(t,"Given amount"),class:"his-card"},null,8,["value","onClick"])]),_:2},1024),Object(c["createVNode"])(b,{size:"3"},{default:Object(c["withCtx"])(()=>[Object(c["createVNode"])(h,{value:t.other.pillsBrought,onClick:n=>e.launchKeyPad(t,"Pills brought"),class:"his-card"},null,8,["value","onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1})])]),_:1})}var d=n("0a79"),b=n("d867"),p=n("10be"),h=n("51c8"),j=Object(c["defineComponent"])({components:{ViewPort:d["a"],IonGrid:b["p"],IonCol:b["m"],IonRow:b["H"],IonInput:b["v"]},mixins:[h["default"]],data:()=>({listData:[]}),watch:{clear:{handler(){this.listData=this.listData.filter(e=>(e.value="",e.other.pillsBrought="",!0))},immediate:!0},listData:{handler(){this.$emit("onValue",this.listData)},deep:!0,immediate:!0}},mounted(){this.init()},activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this),this.listData=await this.options(this.fdata,this.cdata,this.listData)},async launchKeyPad(e,t){const n=await b["Z"].create({component:p["a"],backdropDismiss:!1,cssClass:"keypad-modal",componentProps:{title:e.label,preset:"Given amount"===t?e.value:e.other.pillsBrought,strictNumbers:!0,onKeyPress(n){"Given amount"===t&&(e.value=n),"Pills brought"===t&&(e.other.pillsBrought=n)}}});n.present()}}}),f=(n("0504"),n("6b0d")),m=n.n(f);const O=m()(j,[["render",u],["__scopeId","data-v-23089994"]]);t["default"]=O},e60f:function(e,t,n){}}]);
//# sourceMappingURL=TouchFormElement7.8ca7b18f.js.map