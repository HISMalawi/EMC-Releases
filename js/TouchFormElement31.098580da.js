(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement31","TouchFormElement5","TouchFormElement51","TouchFormElement8"],{"0a79":function(e,t,n){"use strict";var a=n("7a23"),o=Object(a["withScopeId"])("data-v-7c293cad"),r=o((function(e,t,n,o,r,i){return Object(a["openBlock"])(),Object(a["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(a["renderSlot"])(e.$slots,"default")],2)})),i=Object(a["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:function(){return!0}}}}),c=(n("a4d3"),n("6b0d")),s=n.n(c);const u=s()(i,[["render",r],["__scopeId","data-v-7c293cad"]]);t["a"]=u},"20d7":function(e,t,n){},2345:function(e,t,n){"use strict";function a(e,t,n){let a=t;if(e.match(/enter/i))return a+"\r\n";if(e.match(/clear/i))return"";if(a=e.match(/delete|del/i)?a.match(/unknown/i)||a.match(/n\/a/i)?"":a.substring(0,a.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":a.match(/unknown/i)||a.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof a&&a)switch(n){case"lowercase":a=a.toLowerCase();break;case"uppercase":a=a.toUpperCase();break;default:a=a.charAt(0).toUpperCase()+a.slice(1);break}return a}n.d(t,"a",(function(){return a}))},"36ad":function(e,t,n){"use strict";n.r(t);var a=n("7a23");const o=Object(a["withScopeId"])("data-v-729e92ae"),r=o((function(e,t,n,o,r,i){const c=Object(a["resolveComponent"])("ion-input");return Object(a["openBlock"])(),Object(a["createBlock"])(c,{ref:"input",class:"input_display",modelValue:e.text,"onUpdate:modelValue":t[1]||(t[1]=t=>e.text=t),type:e.type,disabled:e.disabled,readonly:e.useVirtualInput,autocapitalize:"sentences"},null,8,["modelValue","type","disabled","readonly"])}));var i=n("8a30"),c=n("2ed9"),s=Object(a["defineComponent"])({name:"HisInput",components:{IonInput:i["v"]},setup(){const{useVirtualInput:e}=Object(c["a"])();return{useVirtualInput:e}},data:()=>({text:""}),watch:{value(e){this.text=e},text(e){this.$emit("onValue",e)}},props:{value:{required:!1},type:{type:String,default:()=>"text"},disabled:{type:Boolean,default:()=>!1}}}),u=(n("7b79"),n("6b0d")),l=n.n(u);const d=l()(s,[["render",r],["__scopeId","data-v-729e92ae"]]);t["default"]=d},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"l",(function(){return o})),n.d(t,"e",(function(){return r})),n.d(t,"b",(function(){return i})),n.d(t,"k",(function(){return c})),n.d(t,"i",(function(){return s})),n.d(t,"g",(function(){return u})),n.d(t,"a",(function(){return l})),n.d(t,"j",(function(){return d})),n.d(t,"c",(function(){return b})),n.d(t,"h",(function(){return p})),n.d(t,"f",(function(){return f}));var a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],i=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],c=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],u=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],l=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],d=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],b=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,n){"use strict";n.r(t);var a=n("fe70"),o=n("7a23"),r=Object(o["defineComponent"])({data:()=>({isReadyOnly:!1}),created(){this.isReadyOnly=!Object(a["d"])("desktop")},emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const i=r;t["default"]=i},"69cf":function(e,t,n){"use strict";n.r(t);var a=n("7a23");const o={key:0,style:{color:"red","font-weight":"bold"}};function r(e,t,n,r,i,c){const s=Object(a["resolveComponent"])("base-input"),u=Object(a["resolveComponent"])("view-port"),l=Object(a["resolveComponent"])("his-keyboard");return Object(a["openBlock"])(),Object(a["createBlock"])(a["Fragment"],null,[Object(a["createVNode"])(u,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,{value:e.value,onOnValue:e.onKbValue},null,8,["value","onOnValue"]),e.errors?(Object(a["openBlock"])(),Object(a["createBlock"])("span",o," **"+Object(a["toDisplayString"])(e.errors)+"** ",1)):Object(a["createCommentVNode"])("",!0)]),_:1}),Object(a["createVNode"])(l,{kbConfig:e.keyboard,onKeyPress:e.keypress,disabled:!1},null,8,["kbConfig","onKeyPress"])],64)}var i=n("36ad"),c=n("db10"),s=n("2345"),u=n("6be2"),l=n("0a79"),d=n("3800"),b=n("51c8"),p=Object(a["defineComponent"])({components:{BaseInput:i["default"],HisKeyboard:c["a"],ViewPort:l["a"]},mixins:[b["default"]],data:()=>({value:"",errors:"",minDays:1,maxDays:30,keyboard:[]}),mounted(){this.init()},activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this);let e=d["g"];this.config?(this.config.year&&this.config.month&&(e=this.generateKeypad(this.config.year(this.fdata),this.config.month(this.fdata))),this.config.keyboardActions?this.keyboard=[e,this.config.keyboardActions]:this.keyboard=[e,[["Unknown"]]]):this.keyboard=u["b"],await this.setDefaultValue()},onKbValue(e){this.value=e,this.emitValue()},keypress(e){this.value=Object(s["a"])(e,""),this.emitValue()},emitValue(){this.errors="";let e=this.value;if(e)if(e.toString().match(/unknown/i))this.$emit("onValue",{label:"Unknown",value:"Unknown"});else{if(isNaN(e))return this.errors="Invalid number",void this.$emit("onValue",null);e=parseInt(e),e<this.minDays||e>this.maxDays?(this.errors="Value number is out of range",this.$emit("onValue",null)):this.$emit("onValue",{label:e,value:e})}else this.$emit("onValue",null)},generateKeypad(e,t){const n=[[]];this.maxDays=new Date(e,t,0).getDate();let a=0,o=0;for(let r=0;r<this.maxDays;++r)o>7&&(++a,n[a]=[],o=0),n[a].push(""+(r+1)),++o;return n},async setDefaultValue(){if(this.defaultValue&&!this.value){const e=await this.defaultValue(this.fdata,this.cdata);e&&(this.value=e,this.emitValue())}}},watch:{clear(){this.value=""}}}),f=n("6b0d"),y=n.n(f);const h=y()(p,[["render",r]]);t["default"]=h},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"g",(function(){return i})),n.d(t,"f",(function(){return c})),n.d(t,"e",(function(){return s})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return l})),n.d(t,"h",(function(){return b})),n.d(t,"a",(function(){return p}));var a=n("3800"),o=[a["k"],[["","Delete"]]],r=[a["i"],[["Delete"]]],i=[a["i"],[["Delete","Unknown"]]],c=[a["i"],[["N/A"],["Delete","Unknown"]]],s=[a["i"],[["Delete"]]],u=[a["i"],[["Unknown","Delete"],["Qwerty","A-Z"]]],l=[a["g"],[["Unknown"]]],d=[a["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],b=[a["j"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],p=[{btn:"0-9",keyboard:u},{btn:"?123",keyboard:o},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:b}]},"7b79":function(e,t,n){"use strict";n("20d7")},a4d3:function(e,t,n){"use strict";n("a6f7")},a6f7:function(e,t,n){},c924:function(e,t,n){"use strict";var a=n("7a23");function o(e,t,n,o,r,i){const c=Object(a["resolveComponent"])("ion-button");return Object(a["openBlock"])(),Object(a["createBlock"])("table",null,[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(e.layout,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])("tr",{key:n},[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(t,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+n},[t?(Object(a["openBlock"])(),Object(a["createBlock"])(c,{key:0,style:{width:e.btnSize},class:"his-keyboard-btn",onClick:()=>e.keyPress(t)},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(t),1)]),_:2},1032,["style","onClick"])):Object(a["createCommentVNode"])("",!0)]))),128))]))),128))])}var r=n("8a30"),i=Object(a["defineComponent"])({components:{IonButton:r["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)}}}),c=n("6b0d"),s=n.n(c);const u=s()(i,[["render",o]]);t["a"]=u},db10:function(e,t,n){"use strict";var a=n("7a23");const o={class:"his-floating-keyboard"},r={class:"his-floating-keyboard-content"};function i(e,t,n,i,c,s){const u=Object(a["resolveComponent"])("base-keyboard");return Object(a["openBlock"])(),Object(a["createBlock"])("div",o,[Object(a["createVNode"])("div",r,[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(e.activeLayout,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])("div",{key:n},[Object(a["createVNode"])(u,{layout:t,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])]))),128))])])}var c=n("6be2"),s=n("c924"),u=Object(a["defineComponent"])({components:{BaseKeyboard:s["a"]},props:{initalKeyboardName:{type:String},kbConfig:{type:Array,required:!0},onKeyPress:{type:Function,required:!0}},data:()=>({activeLayout:{}}),watch:{initalKeyboardName:{handler(e){e&&this.$nextTick(()=>this.switchKeyboard(e))},immediate:!0},kbConfig:{handler(e){e&&(this.activeLayout=e)},deep:!0,immediate:!0}},methods:{keypress(e){this.isFunctionKey(e)||this.onKeyPress(e)},isFunctionKey(e){return!!this.switchKeyboard(e)},switchKeyboard(e){const t=c["a"].map(e=>e.btn).indexOf(e);return t>=0&&(this.activeLayout=c["a"][t].keyboard,!0)}}}),l=n("6b0d"),d=n.n(l);const b=d()(u,[["render",i]]);t["a"]=b}}]);
//# sourceMappingURL=TouchFormElement31.098580da.js.map