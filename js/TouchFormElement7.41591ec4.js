(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement7","TouchFormElement51","TouchFormElement8"],{"0504":function(e,t,n){"use strict";n("e60f")},"0a79":function(e,t,n){"use strict";var a=n("7a23"),c=Object(a["withScopeId"])("data-v-7c293cad"),o=c((function(e,t,n,c,o,r){return Object(a["openBlock"])(),Object(a["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(a["renderSlot"])(e.$slots,"default")],2)})),r=Object(a["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:function(){return!0}}}}),i=(n("a4d3"),n("6b0d")),l=n.n(i);const s=l()(r,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=s},"10be":function(e,t,n){"use strict";var a=n("7a23"),c=Object(a["withScopeId"])("data-v-7454247c");Object(a["pushScopeId"])("data-v-7454247c");var o={class:"keypad"};Object(a["popScopeId"])();var r=c((function(e,t,n,r,i,l){var s=Object(a["resolveComponent"])("ion-input"),u=Object(a["resolveComponent"])("ion-chip"),d=Object(a["resolveComponent"])("center"),b=Object(a["resolveComponent"])("base-keyboard"),p=Object(a["resolveComponent"])("ion-content");return Object(a["openBlock"])(),Object(a["createBlock"])(p,null,{default:c((function(){return[Object(a["createVNode"])("div",o,[Object(a["createVNode"])(s,{value:e.value,disabled:!0,class:"keypad-input"},null,8,["value"]),Object(a["createVNode"])(d,null,{default:c((function(){return[Object(a["createVNode"])(u,null,{default:c((function(){return[Object(a["createTextVNode"])(Object(a["toDisplayString"])(e.title||"keypad"),1)]})),_:1})]})),_:1}),Object(a["createVNode"])(b,{btnSize:"96px",layout:e.keypad,onKeyPress:e.keypress},null,8,["layout","onKeyPress"])])]})),_:1})})),i=n("1da1"),l=(n("96cf"),n("d3b7"),n("25f0"),n("ac1f"),n("466d"),n("caad"),n("2532"),n("c924")),s=n("3800"),u=n("2345"),d=n("fe70"),b=Object(a["defineComponent"])({components:{BaseKeyboard:l["a"]},props:{title:{type:String},preset:{type:String},onKeyPress:{type:Function,required:!0},strictNumbers:{type:Boolean,default:!1}},data:function(){return{value:"0",keypad:s["d"]}},watch:{preset:{handler:function(e){e&&(this.value=e.toString())},immediate:!0}},methods:{keypress:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e.match(/done/i)){n.next=5;break}return n.next=3,d["g"].dismiss(t.value);case 3:n.next=16;break;case 5:if(!t.strictNumbers){n.next=14;break}if(!e.includes(".")||!t.value.includes(".")){n.next=8;break}return n.abrupt("return");case 8:e.includes(".")||"0"!==t.value||(t.value=""),t.value=Object(u["a"])(e,t.value),t.value||(t.value="0"),"".concat(parseInt(t.value))===t.value?t.onKeyPress(parseInt(t.value)):t.onKeyPress(t.value),n.next=16;break;case 14:t.value=Object(u["a"])(e,t.value),t.onKeyPress(t.value);case 16:case"end":return n.stop()}}),n)})))()}}}),p=(n("27f1"),n("6b0d")),f=n.n(p);const j=f()(b,[["render",r],["__scopeId","data-v-7454247c"]]);t["a"]=j},2345:function(e,t,n){"use strict";function a(e,t,n){let a=t;if(e.match(/enter/i))return a+"\r\n";if(e.match(/clear/i))return"";if(a=e.match(/delete|del/i)?a.match(/unknown/i)||a.match(/n\/a/i)?"":a.substring(0,a.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":a.match(/unknown/i)||a.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof a&&a)switch(n){case"lowercase":a=a.toLowerCase();break;case"uppercase":a=a.toUpperCase();break;default:a=a.charAt(0).toUpperCase()+a.slice(1);break}return a}n.d(t,"a",(function(){return a}))},"27f1":function(e,t,n){"use strict";n("a3fb")},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"l",(function(){return c})),n.d(t,"e",(function(){return o})),n.d(t,"b",(function(){return r})),n.d(t,"k",(function(){return i})),n.d(t,"i",(function(){return l})),n.d(t,"g",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"j",(function(){return d})),n.d(t,"c",(function(){return b})),n.d(t,"h",(function(){return p})),n.d(t,"f",(function(){return f}));var a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],r=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],i=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],s=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],u=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],d=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],b=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,n){"use strict";n.r(t);var a=n("fe70"),c=n("7a23"),o=Object(c["defineComponent"])({data:()=>({isReadyOnly:!1}),created(){this.isReadyOnly=!Object(a["d"])("desktop")},emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const r=o;t["default"]=r},a3fb:function(e,t,n){},a4d3:function(e,t,n){"use strict";n("a6f7")},a6f7:function(e,t,n){},c924:function(e,t,n){"use strict";var a=n("7a23");function c(e,t,n,c,o,r){const i=Object(a["resolveComponent"])("ion-button");return Object(a["openBlock"])(),Object(a["createBlock"])("table",null,[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(e.layout,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])("tr",{key:n},[(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(t,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+n},[t?(Object(a["openBlock"])(),Object(a["createBlock"])(i,{key:0,style:{width:e.btnSize},class:"his-keyboard-btn",onClick:()=>e.keyPress(t)},{default:Object(a["withCtx"])(()=>[Object(a["createTextVNode"])(Object(a["toDisplayString"])(t),1)]),_:2},1032,["style","onClick"])):Object(a["createCommentVNode"])("",!0)]))),128))]))),128))])}var o=n("8a30"),r=Object(a["defineComponent"])({components:{IonButton:o["d"]},props:{btnSize:{type:String,default:"90%"},layout:{type:Array,required:!0,default:()=>[]},onKeyPress:{type:Function,required:!0}},methods:{keyPress(e){this.onKeyPress(e)}}}),i=n("6b0d"),l=n.n(i);const s=l()(r,[["render",c]]);t["a"]=s},de42:function(e,t,n){"use strict";n.r(t);var a=n("7a23");const c=Object(a["withScopeId"])("data-v-23089994");Object(a["pushScopeId"])("data-v-23089994");const o={class:"view-port-content"},r=Object(a["createVNode"])("b",null," Medication ",-1),i=Object(a["createVNode"])("b",null," Given Amount",-1),l=Object(a["createVNode"])("b",null," Pills brought ",-1),s={class:"his-card",style:{textAlign:"left"}};Object(a["popScopeId"])();const u=c((function(e,t,n,u,d,b){const p=Object(a["resolveComponent"])("ion-col"),f=Object(a["resolveComponent"])("ion-row"),j=Object(a["resolveComponent"])("ion-input"),O=Object(a["resolveComponent"])("ion-grid"),v=Object(a["resolveComponent"])("view-port");return Object(a["openBlock"])(),Object(a["createBlock"])(v,null,{default:c(()=>[Object(a["createVNode"])("div",o,[Object(a["createVNode"])(O,null,{default:c(()=>[Object(a["createVNode"])(f,null,{default:c(()=>[Object(a["createVNode"])(p,{size:"6"},{default:c(()=>[r]),_:1}),Object(a["createVNode"])(p,{size:"3"},{default:c(()=>[i]),_:1}),Object(a["createVNode"])(p,{size:"3"},{default:c(()=>[l]),_:1})]),_:1}),(Object(a["openBlock"])(!0),Object(a["createBlock"])(a["Fragment"],null,Object(a["renderList"])(e.listData,(t,n)=>(Object(a["openBlock"])(),Object(a["createBlock"])(f,{key:n},{default:c(()=>[Object(a["createVNode"])(p,{size:"6"},{default:c(()=>[Object(a["createVNode"])("div",s,Object(a["toDisplayString"])(t.label),1)]),_:2},1024),Object(a["createVNode"])(p,{size:"3"},{default:c(()=>[Object(a["createVNode"])(j,{value:t.value,onClick:n=>e.launchKeyPad(t,"Given amount"),class:"his-card"},null,8,["value","onClick"])]),_:2},1024),Object(a["createVNode"])(p,{size:"3"},{default:c(()=>[Object(a["createVNode"])(j,{value:t.other.pillsBrought,onClick:n=>e.launchKeyPad(t,"Pills brought"),class:"his-card"},null,8,["value","onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1})])]),_:1})}));var d=n("0a79"),b=n("8a30"),p=n("10be"),f=n("51c8"),j=Object(a["defineComponent"])({components:{ViewPort:d["a"],IonGrid:b["p"],IonCol:b["m"],IonRow:b["H"],IonInput:b["v"]},mixins:[f["default"]],data:()=>({listData:[]}),watch:{clear:{handler(){this.listData=this.listData.filter(e=>(e.value="",e.other.pillsBrought="",!0))},immediate:!0},listData:{handler(){this.$emit("onValue",this.listData)},deep:!0,immediate:!0}},mounted(){this.init()},activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this),this.listData=await this.options(this.fdata,this.cdata,this.listData)},async launchKeyPad(e,t){const n=await b["X"].create({component:p["a"],backdropDismiss:!1,cssClass:"keypad-modal",componentProps:{title:e.label,preset:"Given amount"===t?e.value:e.other.pillsBrought,strictNumbers:!0,onKeyPress(n){"Given amount"===t&&(e.value=n),"Pills brought"===t&&(e.other.pillsBrought=n)}}});n.present()}}}),O=(n("0504"),n("6b0d")),v=n.n(O);const h=v()(j,[["render",u],["__scopeId","data-v-23089994"]]);t["default"]=h},e60f:function(e,t,n){}}]);
//# sourceMappingURL=TouchFormElement7.41591ec4.js.map