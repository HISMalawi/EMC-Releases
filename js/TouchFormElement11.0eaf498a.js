(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement11","TouchFormElement38","TouchFormElement8"],{"0a79":function(e,t,n){"use strict";var a=n("7a23"),c=Object(a["withScopeId"])("data-v-7c293cad"),o=c((function(e,t,n,c,o,i){return Object(a["openBlock"])(),Object(a["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(a["renderSlot"])(e.$slots,"default")],2)})),i=Object(a["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:function(){return!0}}}}),s=(n("a4d3"),n("6b0d")),r=n.n(s);const l=r()(i,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=l},"10be":function(e,t,n){"use strict";var a=n("7a23");const c=Object(a["withScopeId"])("data-v-7454247c");Object(a["pushScopeId"])("data-v-7454247c");const o={class:"keypad"};Object(a["popScopeId"])();const i=c((function(e,t,n,i,s,r){const l=Object(a["resolveComponent"])("ion-input"),u=Object(a["resolveComponent"])("ion-chip"),d=Object(a["resolveComponent"])("center"),p=Object(a["resolveComponent"])("base-keyboard"),b=Object(a["resolveComponent"])("ion-content");return Object(a["openBlock"])(),Object(a["createBlock"])(b,null,{default:c(()=>[Object(a["createVNode"])("div",o,[Object(a["createVNode"])(l,{value:e.value,disabled:!0,class:"keypad-input"},null,8,["value"]),Object(a["createVNode"])(d,null,{default:c(()=>[Object(a["createVNode"])(u,null,{default:c(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.title||"keypad"),1)]),_:1})]),_:1}),Object(a["createVNode"])(p,{btnSize:"96px",layout:e.keypad,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])])]),_:1})}));var s=n("c924"),r=n("3800"),l=n("2345"),u=n("fe70"),d=Object(a["defineComponent"])({components:{BaseKeyboard:s["a"]},props:{title:{type:String},preset:{type:String},onKeyPress:{type:Function,required:!0},strictNumbers:{type:Boolean,default:!1}},data:()=>({value:"0",keypad:r["d"]}),watch:{preset:{handler(e){e&&(this.value=e.toString())},immediate:!0}},methods:{async keypress(e){if(e.match(/done/i))await u["g"].dismiss(this.value);else if(this.strictNumbers){if(e.includes(".")&&this.value.includes("."))return;e.includes(".")||"0"!==this.value||(this.value=""),this.value=Object(l["a"])(e,this.value),this.value||(this.value="0"),""+parseInt(this.value)===this.value?this.onKeyPress(parseInt(this.value)):this.onKeyPress(this.value)}else this.value=Object(l["a"])(e,this.value),this.onKeyPress(this.value)}}}),p=(n("27f1"),n("6b0d")),b=n.n(p);const f=b()(d,[["render",i],["__scopeId","data-v-7454247c"]]);t["a"]=f},2345:function(e,t,n){"use strict";function a(e,t,n){let a=t;if(e.match(/enter/i))return a+"\r\n";if(e.match(/clear/i))return"";if(a=e.match(/delete|del/i)?a.match(/unknown/i)||a.match(/n\/a/i)?"":a.substring(0,a.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":a.match(/unknown/i)||a.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof a&&a)switch(n){case"lowercase":a=a.toLowerCase();break;case"uppercase":a=a.toUpperCase();break;default:a=a.charAt(0).toUpperCase()+a.slice(1);break}return a}n.d(t,"a",(function(){return a}))},"27f1":function(e,t,n){"use strict";n("a3fb")},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"l",(function(){return c})),n.d(t,"e",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"k",(function(){return s})),n.d(t,"i",(function(){return r})),n.d(t,"g",(function(){return l})),n.d(t,"a",(function(){return u})),n.d(t,"j",(function(){return d})),n.d(t,"c",(function(){return p})),n.d(t,"h",(function(){return b})),n.d(t,"f",(function(){return f}));var a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],i=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],l=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],u=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],d=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],p=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],b=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,n){"use strict";n.r(t);var a=n("fe70"),c=n("7a23"),o=Object(c["defineComponent"])({data:()=>({isReadyOnly:!1}),created(){this.isReadyOnly=!Object(a["d"])("desktop")},emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const i=o;t["default"]=i},a3fb:function(e,t,n){},a4d3:function(e,t,n){"use strict";n("a6f7")},a6f7:function(e,t,n){},aabb:function(e,t,n){"use strict";n("c6a9")},c6a9:function(e,t,n){},c924:function(e,t,n){"use strict";var a=n("7a23");function c(e,t,n,c,o,i){const s=Object(a["resolveComponent"])("ion-button");return Object(a["openBlock"])(),Object(a["createBlock"])("table",null,[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(e.layout,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])("tr",{key:n},[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(t,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+n},[t?(Object(a["openBlock"])(),Object(a["createBlock"])(s,{key:0,style:{width:e.btnSize},class:"his-keyboard-btn",onClick:()=>e.keyPress(t)},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(t),1)]),_:2},1032,["style","onClick"])):Object(a["createCommentVNode"])("",!0)]))),128))]))),128))])}var o=n("8a30"),i=Object(a["defineComponent"])({components:{IonButton:o["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)}}}),s=n("6b0d"),r=n.n(s);const l=r()(i,[["render",c]]);t["a"]=l},f2c3:function(e,t,n){"use strict";n.r(t);var a=n("7a23");const c=Object(a["withScopeId"])("data-v-1803a4c0");Object(a["pushScopeId"])("data-v-1803a4c0");const o={class:"view-port-content"},i={class:"his-lg-text"},s={class:"his-lg-text"},r={class:"his-md-text his-card",style:{textAlign:"left"}};Object(a["popScopeId"])();const l=c((function(e,t,n,l,u,d){const p=Object(a["resolveComponent"])("ion-col"),b=Object(a["resolveComponent"])("ion-row"),f=Object(a["resolveComponent"])("ion-input"),h=Object(a["resolveComponent"])("ion-grid"),j=Object(a["resolveComponent"])("view-port");return Object(a["openBlock"])(),Object(a["createBlock"])(j,null,{default:c(()=>[Object(a["createVNode"])("div",o,[Object(a["createVNode"])(h,null,{default:c(()=>[Object(a["createVNode"])(b,null,{default:c(()=>[Object(a["createVNode"])(p,{size:"8"},{default:c(()=>{var t,n;return[Object(a["createVNode"])("b",i,Object(a["toDisplayString"])((null===(t=e.config)||void 0===t||null===(n=t.titles)||void 0===n?void 0:n.label)||"Medication"),1)]}),_:1}),Object(a["createVNode"])(p,{size:"4"},{default:c(()=>{var t,n;return[Object(a["createVNode"])("b",s,Object(a["toDisplayString"])((null===(t=e.config)||void 0===t||null===(n=t.titles)||void 0===n?void 0:n.value)||"Amount Remaining"),1)]}),_:1})]),_:1}),(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(e.listData,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])(b,{key:n},{default:c(()=>[Object(a["createVNode"])(p,{size:"8"},{default:c(()=>[Object(a["createVNode"])("div",r,Object(a["toDisplayString"])(t.label),1)]),_:2},1024),Object(a["createVNode"])(p,{size:"4"},{default:c(()=>[Object(a["createVNode"])(f,{value:t.value,onClick:n=>e.launchKeyPad(t),class:"his-card his-md-text"},null,8,["value","onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1})])]),_:1})}));var u=n("0a79"),d=n("8a30"),p=n("10be"),b=n("51c8"),f=Object(a["defineComponent"])({components:{ViewPort:u["a"],IonGrid:d["p"],IonCol:d["m"],IonRow:d["H"],IonInput:d["v"]},mixins:[b["default"]],data:()=>({listData:[]}),watch:{clear:{handler(){this.listData=this.listData.filter(e=>(e.value="",!0))},immediate:!0},listData:{handler(){this.$emit("onValue",this.listData)},deep:!0,immediate:!0}},mounted(){this.init()},activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this),this.listData=await this.options(this.fdata,this.cdata,this.listData)},async launchKeyPad(e){const t=await d["X"].create({component:p["a"],backdropDismiss:!1,cssClass:"keypad-modal",componentProps:{title:e.label,preset:e.value,strictNumbers:!0,onKeyPress(t){e.value=t}}});t.present()}}}),h=(n("aabb"),n("6b0d")),j=n.n(h);const O=j()(f,[["render",l],["__scopeId","data-v-1803a4c0"]]);t["default"]=O}}]);
//# sourceMappingURL=TouchFormElement11.0eaf498a.js.map