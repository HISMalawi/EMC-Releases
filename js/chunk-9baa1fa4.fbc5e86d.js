(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9baa1fa4"],{"027b":function(e,n,t){"use strict";t.r(n);var i=t("7a23");function o(e,n,t,o,r,a){const s=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(s,{fields:e.fields,onOnFinish:e.onFinish,skipSummary:!0},null,8,["fields","onOnFinish"])}var r=t("d95e"),a=t("7920"),s=t("2706"),d=t("3800"),c=t("cc74"),l=Object(i["defineComponent"])({components:{HisStandardForm:a["a"]},methods:{async onFinish(e){const n=e.use_portal.value;if(await c["b"].setPortalEnabled(n),this.enablePortal){const n=e.ip_address.value,t=e.port.value,i=`http://${n}:${t}`;await c["b"].setPortalIP(i)}this.$router.back()},getFields(){this.fields=[{id:"use_portal",helpText:"Enable Portal?",type:r["b"].TT_SELECT,requireNext:!0,validation:e=>s["a"].required(e),options:()=>[{label:"Yes",value:"true"},{label:"No",value:"false"}],computedValue:async e=>{this.enablePortal="true"===e.value}},{id:"ip_address",helpText:"Enter IP Address",type:r["b"].TT_TEXT,condition:()=>this.enablePortal,validation:e=>s["a"].required(e)||s["a"].isIPAddress(e),config:{customKeyboard:[d["c"],[["Delete"]]]}},{id:"port",helpText:"Enter Port",condition:()=>this.enablePortal,validation:e=>s["a"].required(e),type:r["b"].TT_TEXT,config:{customKeyboard:[d["k"],[["Delete"]]]}}]}},data(){return{fields:[],enablePortal:!1}},mounted(){this.getFields()}}),u=t("d959"),p=t.n(u);const f=p()(l,[["render",o]]);n["default"]=f},3800:function(e,n,t){"use strict";t.d(n,"d",(function(){return i})),t.d(n,"e",(function(){return o})),t.d(n,"g",(function(){return r})),t.d(n,"n",(function(){return a})),t.d(n,"f",(function(){return s})),t.d(n,"b",(function(){return d})),t.d(n,"m",(function(){return c})),t.d(n,"k",(function(){return l})),t.d(n,"i",(function(){return u})),t.d(n,"a",(function(){return p})),t.d(n,"l",(function(){return f})),t.d(n,"c",(function(){return h})),t.d(n,"j",(function(){return m})),t.d(n,"h",(function(){return b}));const i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","","Confirm"]],a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],d=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],c=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],u=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],p=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],f=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],m=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],b=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},7920:function(e,n,t){"use strict";var i=t("7a23");function o(e,n,t,o,r,a){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=t("9441"),a=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,n){this.$emit("onFinish",e,n)},onIndex(e){this.$emit("onIndex",e)}}}),s=t("d959"),d=t.n(s);const c=d()(a,[["render",o]]);n["a"]=c}}]);
//# sourceMappingURL=chunk-9baa1fa4.fbc5e86d.js.map