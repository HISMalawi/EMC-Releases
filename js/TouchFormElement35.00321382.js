(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["TouchFormElement35","TouchFormElement38","TouchFormElement8"],{"0a79":function(e,t,a){"use strict";var n=a("7a23");const c=Object(n["withScopeId"])("data-v-7c293cad"),o=c((function(e,t,a,c,o,i){return Object(n["openBlock"])(),Object(n["createBlock"])("div",{id:"view-port",class:e.showFull?"":"half"},[Object(n["renderSlot"])(e.$slots,"default")],2)}));var i=Object(n["defineComponent"])({name:"ViewPort",props:{showFull:{type:Boolean,default:()=>!0}}}),r=(a("a4d3"),a("6b0d")),s=a.n(r);const l=s()(i,[["render",o],["__scopeId","data-v-7c293cad"]]);t["a"]=l},1162:function(e,t,a){"use strict";a("7843")},2345:function(e,t,a){"use strict";function n(e,t,a){let n=t;if(e.match(/enter/i))return n+"\r\n";if(e.match(/clear/i))return"";if(n=e.match(/delete|del/i)?n.match(/unknown/i)||n.match(/n\/a/i)?"":n.substring(0,n.length-1):e.match(/space/i)?t+" ":e.match(/unknown/i)?"Unknown":e.match(/n\/a/i)?"N/A":n.match(/unknown/i)||n.match(/n\/a/i)?e:`${t}${e}`,"string"===typeof n&&n)switch(a){case"lowercase":n=n.toLowerCase();break;case"uppercase":n=n.toUpperCase();break;default:n=n.charAt(0).toUpperCase()+n.slice(1);break}return n}a.d(t,"a",(function(){return n}))},3800:function(e,t,a){"use strict";a.d(t,"d",(function(){return n})),a.d(t,"l",(function(){return c})),a.d(t,"e",(function(){return o})),a.d(t,"b",(function(){return i})),a.d(t,"k",(function(){return r})),a.d(t,"i",(function(){return s})),a.d(t,"g",(function(){return l})),a.d(t,"a",(function(){return u})),a.d(t,"j",(function(){return d})),a.d(t,"c",(function(){return p})),a.d(t,"h",(function(){return b})),a.d(t,"f",(function(){return f}));const n=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],i=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],r=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],l=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],u=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],d=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],p=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],b=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"51c8":function(e,t,a){"use strict";a.r(t);var n=a("7a23"),c=Object(n["defineComponent"])({emits:["onValue","onFieldActivated"],props:{config:{type:Object,default:()=>({})},preset:{type:Object,default:()=>({label:"",value:""})},defaultValue:{type:Function},fdata:{type:Object,required:!0},cdata:{type:Object,required:!0},clear:{type:Number,required:!0},options:{type:Function,default:()=>[]},activationState:{type:String,default:""},onValue:{type:Function},onValueUpdate:{type:Function},footerButtonEvent:{type:Object}}});const o=c;t["default"]=o},7843:function(e,t,a){},a4d3:function(e,t,a){"use strict";a("a6f7")},a6f7:function(e,t,a){},c927:function(e,t,a){"use strict";a.r(t);var n=a("7a23");const c=Object(n["withScopeId"])("data-v-6c8c3b02");Object(n["pushScopeId"])("data-v-6c8c3b02");const o={class:"his-floating-keyboard"},i={class:"his-floating-keyboard-content"},r={style:{width:"99.9%"}},s=Object(n["createTextVNode"])(" Space ");Object(n["popScopeId"])();const l=c((function(e,t,a,l,u,d){const p=Object(n["resolveComponent"])("ion-textarea"),b=Object(n["resolveComponent"])("view-port"),f=Object(n["resolveComponent"])("ion-button");return Object(n["openBlock"])(),Object(n["createBlock"])(n["Fragment"],null,[Object(n["createVNode"])(b,{showFull:!1},{default:c(()=>[Object(n["createVNode"])(p,{rows:"6",cols:"20",readonly:"",value:e.value,placeholder:"Start typing....",class:"input_display"},null,8,["value"])]),_:1}),Object(n["createVNode"])("div",o,[Object(n["createVNode"])("div",i,[Object(n["createVNode"])("table",r,[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(e.layout,(t,a)=>(Object(n["openBlock"])(),Object(n["createBlock"])("tr",{key:a},[(Object(n["openBlock"])(!0),Object(n["createBlock"])(n["Fragment"],null,Object(n["renderList"])(t,(t,a)=>(Object(n["openBlock"])(),Object(n["createBlock"])("td",{key:a},[Object(n["createVNode"])(f,{style:{"text-transform":"none"},strong:"",onClick:a=>e.keypress(t),class:`key__button ${t.toLowerCase()}_btn`},{default:c(()=>[Object(n["createTextVNode"])(Object(n["toDisplayString"])(t),1)]),_:2},1032,["onClick","class"])]))),128))]))),128))])]),Object(n["createVNode"])(f,{onClick:t[1]||(t[1]=t=>e.keypress("space")),strong:"",style:{width:"100%"},shape:"round",size:"large"},{default:c(()=>[s]),_:1})])],64)}));var u=a("2345"),d=a("0a79"),p=a("51c8"),b=a("2ef0"),f=a("3800"),h=a("8a30"),j=Object(n["defineComponent"])({components:{ViewPort:d["a"],IonButton:h["d"],IonTextarea:h["P"]},mixins:[p["default"]],data:()=>({value:"",capsOn:!1,layout:f["h"]}),mounted(){this.init()},activated(){this.init()},methods:{async init(){this.$emit("onFieldActivated",this),await this.setDefaultValue()},async setDefaultValue(){if(this.defaultValue&&!this.value){const e=await this.defaultValue(this.fdata,this.cdata);e&&(Object(b["isPlainObject"])(e)?(this.emitValue(e),this.value=e.value.toString()):(this.value=e,this.emitValue({label:e,value:e})))}},updateKeyboardCaps(e=!1){this.layout=this.layout.map(t=>t.map(t=>e?t.toUpperCase():t.toLowerCase()))},async emitValue(e){if(this.onValue){const t=await this.onValue(e);if(!t)return}this.value=e.label,this.$emit("onValue",e)},async onKbValue(e){await this.emitValue({label:e,value:e})},async keypress(e){const t=Object(u["a"])(this.capsOn?e.toUpperCase():e.toLowerCase(),this.value);if(t.match(/caps/i))return this.capsOn=!this.capsOn,void this.updateKeyboardCaps(this.capsOn);await this.emitValue({label:t,value:t})}},watch:{clear(){this.value=""}}}),m=(a("1162"),a("6b0d")),O=a.n(m);const y=O()(j,[["render",l],["__scopeId","data-v-6c8c3b02"]]);t["default"]=y}}]);
//# sourceMappingURL=TouchFormElement35.00321382.js.map