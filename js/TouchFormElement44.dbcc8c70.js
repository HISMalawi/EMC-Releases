(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement44","TouchFormElement51","TouchFormElement8"],{"0a79":function(e,t,c){"use strict";var o=c("7a23"),n=Object(o["withScopeId"])("data-v-7c293cad"),a=n((function(e,t,c,n,a,i){return Object(o["openBlock"])(),Object(o["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(o["renderSlot"])(e.$slots,"default")],2)})),i=Object(o["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:function(){return!0}}}}),l=(c("a4d3"),c("6b0d")),s=c.n(l);const r=s()(i,[["render",a],["__scopeId","data-v-7c293cad"]]);t["a"]=r},"2ee9":function(e,t,c){"use strict";c("beb6")},3800:function(e,t,c){"use strict";c.d(t,"d",(function(){return o})),c.d(t,"l",(function(){return n})),c.d(t,"e",(function(){return a})),c.d(t,"b",(function(){return i})),c.d(t,"k",(function(){return l})),c.d(t,"i",(function(){return s})),c.d(t,"g",(function(){return r})),c.d(t,"a",(function(){return d})),c.d(t,"j",(function(){return u})),c.d(t,"c",(function(){return b})),c.d(t,"h",(function(){return p})),c.d(t,"f",(function(){return j}));var o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],n=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],i=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],r=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],d=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],u=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],b=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],j=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,c){"use strict";c.r(t);var o=c("fe70"),n=c("7a23"),a=Object(n["defineComponent"])({data:()=>({isReadyOnly:!1}),created(){this.isReadyOnly=!Object(o["d"])("desktop")},emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const i=a;t["default"]=i},a4d3:function(e,t,c){"use strict";c("a6f7")},a6f7:function(e,t,c){},beb6:function(e,t,c){},c850:function(e,t,c){"use strict";var o=c("7a23"),n=Object(o["withScopeId"])("data-v-321424f0"),a=n((function(e,t,c,a,i,l){var s=Object(o["resolveComponent"])("center");return Object(o["openBlock"])(),Object(o["createBlock"])("div",{class:"his-card ".concat(e.state," clickable")},[Object(o["createVNode"])("img",{src:e.icon},null,8,["src"]),Object(o["createVNode"])(s,null,{default:n((function(){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.label),1)]})),_:1})],2)})),i=Object(o["defineComponent"])({props:{label:{type:String,required:!0},image:{type:String,required:!0},isActive:{type:Boolean,default:!0}},computed:{state:function(){return this.isActive?"active-card-color":"disabled-card-color"},icon:function(){return"assets/images/".concat(this.image,".png")}}}),l=(c("2ee9"),c("6b0d")),s=c.n(l);const r=s()(i,[["render",a],["__scopeId","data-v-321424f0"]]);t["a"]=r},cde0:function(e,t,c){},e333:function(e,t,c){"use strict";c.r(t);var o=c("7a23");const n=Object(o["withScopeId"])("data-v-2ef290d5");Object(o["pushScopeId"])("data-v-2ef290d5");const a={class:"view-port-content"},i=Object(o["createVNode"])("p",null,null,-1),l={class:"centered his-card"},s={class:"keypad"},r={class:"value-highlight"},d={class:"value-highlight"};Object(o["popScopeId"])();const u=n((function(e,t,c,u,b,p){const j=Object(o["resolveComponent"])("ion-row"),O=Object(o["resolveComponent"])("option-button"),f=Object(o["resolveComponent"])("ion-col"),v=Object(o["resolveComponent"])("ion-input"),y=Object(o["resolveComponent"])("ion-button"),h=Object(o["resolveComponent"])("ion-label"),k=Object(o["resolveComponent"])("ion-item"),m=Object(o["resolveComponent"])("ion-list"),g=Object(o["resolveComponent"])("ion-grid"),V=Object(o["resolveComponent"])("view-port");return Object(o["openBlock"])(),Object(o["createBlock"])(V,null,{default:n(()=>[Object(o["createVNode"])("div",a,[Object(o["createVNode"])(g,null,{default:n(()=>[e.vitalsStatus?(Object(o["openBlock"])(),Object(o["createBlock"])(j,{key:0,class:"mobile-component-view",style:{width:"100%","background-color":e.vitalsStatus.color,color:"white",padding:"10px",textAlign:"center"}},{default:n(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.vitalsStatus.status)+" ",1),i]),_:1},8,["style"])):Object(o["createCommentVNode"])("",!0),Object(o["createVNode"])(j,null,{default:n(()=>[Object(o["createVNode"])(f,{size:"2"},{default:n(()=>[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(e.keys,(t,c)=>Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createBlock"])(O,{class:"his-sm-text",key:c,label:t.label,isActive:e.activeField===c,image:"vitals/"+t.other.icon,onClick:t=>e.setActiveField(c)},null,8,["label","isActive","image","onClick"])),[[o["vShow"],!1!==t.other.visible]])),128))]),_:1}),Object(o["createVNode"])(f,{"size-lg":"6","size-sm":"10"},{default:n(()=>[Object(o["createVNode"])("div",l,[e.keys.length>0?(Object(o["openBlock"])(),Object(o["createBlock"])(v,{key:0,type:"text",class:"keypad-input",modelValue:e.keys[e.activeField].value,"onUpdate:modelValue":t[1]||(t[1]=t=>e.keys[e.activeField].value=t),readonly:e.useVirtualInput},null,8,["modelValue","readonly"])):Object(o["createCommentVNode"])("",!0),Object(o["createVNode"])("table",s,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(e.keyboard,(t,c)=>(Object(o["openBlock"])(),Object(o["createBlock"])("tr",{key:c},[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(t,(t,c)=>(Object(o["openBlock"])(),Object(o["createBlock"])("td",{class:"his-keyboard-margin",key:"btn-"+c},[Object(o["createVNode"])(y,{color:"primary",class:"his-keyboard-btn",onClick:c=>e.onKeyPress(t)},{default:n(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(t),1)]),_:2},1032,["onClick"])]))),128))]))),128))])])]),_:1}),Object(o["createVNode"])(f,{class:"full-component-view",size:"4"},{default:n(()=>[Object(o["createVNode"])(m,null,{default:n(()=>[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(e.keys,(t,c)=>(Object(o["openBlock"])(),Object(o["createBlock"])(k,{class:"his-sm-text",key:c,color:e.activeField===c?"secondary":""},{default:n(()=>[Object(o["createVNode"])(h,null,{default:n(()=>[Object(o["createVNode"])("b",null,Object(o["toDisplayString"])(t.label),1)]),_:2},1024),Object(o["createVNode"])(h,{slot:"end"},{default:n(()=>[Object(o["createVNode"])("span",r,Object(o["toDisplayString"])(t.value||"-"),1),Object(o["createTextVNode"])(" "+Object(o["toDisplayString"])(t.other.modifier),1)]),_:2},1024)]),_:2},1032,["color"]))),128)),e.vitalsStatus&&e.vitalsStatus.value?(Object(o["openBlock"])(),Object(o["createBlock"])(k,{key:0},{default:n(()=>[Object(o["createVNode"])(h,null,{default:n(()=>[Object(o["createVNode"])("b",null,Object(o["toDisplayString"])(e.vitalsStatus.label),1)]),_:1}),Object(o["createVNode"])(h,{slot:"end"},{default:n(()=>[Object(o["createVNode"])("span",d,Object(o["toDisplayString"])(e.vitalsStatus.value),1)]),_:1})]),_:1})):Object(o["createCommentVNode"])("",!0),Object(o["createVNode"])(k,null,{default:n(()=>[e.vitalsStatus?(Object(o["openBlock"])(),Object(o["createBlock"])(h,{key:0,style:{"background-color":e.vitalsStatus.color,color:"white",padding:"10px","text-align":"center"}},{default:n(()=>[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.vitalsStatus.status),1)]),_:1},8,["style"])):Object(o["createCommentVNode"])("",!0)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])]),_:1})}));var b=c("0a79"),p=c("8a30"),j=c("3800"),O=c("c850"),f=c("51c8"),v=c("b5e4"),y=c("1718"),h=c("2ef0"),k=c("2ed9"),m=Object(o["defineComponent"])({components:{ViewPort:b["a"],IonInput:p["v"],IonGrid:p["p"],IonCol:p["m"],IonRow:p["H"],OptionButton:O["a"]},mixins:[f["default"]],data:()=>({keys:[],vitalsStatus:{},activeField:0,keyboard:j["l"]}),setup(){const{useVirtualInput:e}=Object(k["a"])();return{useVirtualInput:e}},activated(){this.$emit("onFieldActivated",this)},watch:{keys:{async handler(e){this.$emit("onValue",e)},deep:!0,immediate:!0}},async mounted(){this.$emit("onFieldActivated",this),this.keys=await this.options(this.fdata)},methods:{img(e){return Object(y["a"])(`vitals/${e}.png`)},async onKeyPress(e){const t=this.keys[this.activeField].value.toString();if(e.match(/del/i)?this.keys[this.activeField].value=t.substring(0,t.length-1):e.match(/clear/i)?this.keys[this.activeField].value="":this.keys[this.activeField].value+=e,"function"===typeof this.config.onUpdateAlertStatus){const e=await this.config.onUpdateAlertStatus(this.keys);Object(h["isPlainObject"])(e)&&Object.keys(e).includes("status")&&(this.vitalsStatus=e||null)}},async setActiveField(e){if("function"===typeof this.config.onChangeOption)try{await this.config.onChangeOption(this.keys[this.activeField]),this.activeField=e}catch(t){Object(v["e"])(t)}}}}),g=(c("ee12"),c("6b0d")),V=c.n(g);const w=V()(m,[["render",u],["__scopeId","data-v-2ef290d5"]]);t["default"]=w},ee12:function(e,t,c){"use strict";c("cde0")}}]);
//# sourceMappingURL=TouchFormElement44.dbcc8c70.js.map