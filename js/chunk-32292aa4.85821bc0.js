(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32292aa4"],{3800:function(e,n,t){"use strict";t.d(n,"d",(function(){return o})),t.d(n,"j",(function(){return i})),t.d(n,"m",(function(){return r})),t.d(n,"e",(function(){return s})),t.d(n,"b",(function(){return a})),t.d(n,"l",(function(){return c})),t.d(n,"i",(function(){return l})),t.d(n,"g",(function(){return d})),t.d(n,"a",(function(){return u})),t.d(n,"k",(function(){return p})),t.d(n,"c",(function(){return f})),t.d(n,"h",(function(){return h})),t.d(n,"f",(function(){return m}));const o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],a=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],c=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],u=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],f=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],h=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],m=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},7920:function(e,n,t){"use strict";var o=t("7a23");function i(e,n,t,i,r,s){return Object(o["openBlock"])(),Object(o["createBlock"])(Object(o["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=t("9441"),s=Object(o["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,n){this.$emit("onFinish",e,n)},onIndex(e){this.$emit("onIndex",e)}}}),a=t("d959"),c=t.n(a);const l=c()(s,[["render",i]]);n["a"]=l},f49b:function(e,n,t){"use strict";t.r(n);var o=t("7a23");function i(e,n,t,i,r,s){const a=Object(o["resolveComponent"])("his-standard-form");return Object(o["openBlock"])(),Object(o["createBlock"])(a,{fields:e.fields,onFinishAction:e.onFinish,skipSummary:!0},null,8,["fields","onFinishAction"])}var r=t("d95e"),s=t("7920"),a=t("2706"),c=t("3800"),l=t("156d"),d=t("7f35"),u=t("b5e4"),p=t("d867"),f=Object(o["defineComponent"])({components:{HisStandardForm:s["a"]},methods:{async onFinish(e){const n=e.protocol.value,t=e.ip_address.value,o=e.port.value;l["b"].setLocalStorage(n,t,o);const i=await p["X"].create({message:"Please wait...",backdropDismiss:!1});await i.present();const r=await l["b"].healthCheck();p["X"].dismiss(),r&&200===r.status&&r?this.$router.back():(Object(u["e"])(`\n          Unable to connect to: ${n}://${t}: ${o}\n        `),this.clearLocalStorage())},getFields(){this.fields=[{id:"protocol",helpText:"Select Protocol",type:r["b"].TT_SELECT,requireNext:!1,validation:e=>a["a"].required(e),options:()=>[{label:"HTTP",value:"http"},{label:"HTTPS",value:"https"}]},{id:"ip_address",helpText:"Enter IP Address",type:r["b"].TT_IP_ADDRESS,validation:e=>a["a"].required(e)||a["a"].isIPAddress(e)},{id:"port",helpText:"Enter Port",validation:e=>a["a"].required(e),type:r["b"].TT_TEXT,config:{customKeyboard:[c["i"],[["Delete"]]]}}]},async showConfigNotice(){if(this.isUsingLocalStorage()){const e=await Object(d["a"])("Config notice","The system is currently using user specified configurations.                 Do you wish to reset back to server configurations?","",[{name:"Reset configurations",slot:"start",color:"success"},{name:"New configurations",slot:"end"}]);"Reset configurations"===e&&(this.clearLocalStorage(),this.$router.back())}},isUsingLocalStorage(){return"true"===localStorage.getItem("useLocalStorage")},clearLocalStorage(){const e=["useLocalStorage","apiURL","apiPort","apiProtocol"];l["b"].removeOnly(e)}},data(){return{fields:[]}},async mounted(){await this.showConfigNotice(),this.getFields()}}),h=t("d959"),m=t.n(h);const b=m()(f,[["render",i]]);n["default"]=b}}]);
//# sourceMappingURL=chunk-32292aa4.85821bc0.js.map