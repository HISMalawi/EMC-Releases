(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e6cd8aa"],{3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return i})),n.d(t,"g",(function(){return o})),n.d(t,"n",(function(){return r})),n.d(t,"f",(function(){return u})),n.d(t,"b",(function(){return l})),n.d(t,"m",(function(){return s})),n.d(t,"k",(function(){return c})),n.d(t,"i",(function(){return d})),n.d(t,"a",(function(){return f})),n.d(t,"l",(function(){return p})),n.d(t,"c",(function(){return m})),n.d(t,"j",(function(){return h})),n.d(t,"h",(function(){return b}));const a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","","Confirm"]],r=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],l=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],f=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],m=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],h=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],b=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"g",(function(){return r})),n.d(t,"f",(function(){return u})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return c})),n.d(t,"h",(function(){return f})),n.d(t,"a",(function(){return p}));var a=n("3800");const i=[a["m"],[["","Delete"]]],o=[a["k"],[["Delete"]]],r=[a["k"],[["Delete","Unknown"]]],u=[a["k"],[["N/A"],["Delete","Unknown"]]],l=[a["k"],[["Delete"]]],s=[a["k"],[["Unknown","Delete"],["Qwerty","A-Z"]]],c=[a["i"],[["Unknown"]]],d=[a["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],f=[a["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],p=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:i},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:f}]},7920:function(e,t,n){"use strict";var a=n("7a23");function i(e,t,n,i,o,r){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),u=n("d959"),l=n.n(u);const s=l()(r,[["render",i]]);t["a"]=s},b446:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return x}));n("14d9"),n("13d5");var a,i=n("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],r=n("9283"),u=n("2706"),l=n("3800"),s=n("6be2"),c=n("5a0c"),d=n.n(c),f=n("1c74");function p(e,t,n=!0){const a=[];return n&&a.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:i["b"].TT_TEXT,config:{customKeyboard:[l["k"],[a,["DELETE"]]]}}}function m(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:i["b"].TT_SELECT,options:()=>o}}function h(e,t){return{id:e,helpText:t+" Day",type:i["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function b(e,t){return{id:e,helpText:t+" Estimated period",type:i["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function y(e,t){return{id:e,helpText:t+" Age Estimate",type:i["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:s["e"]}}}function D(e){return parseInt(e)<10?"0"+e:e}async function v(e,t,n){if(t.defaultValue){const a=await t.defaultValue(e);if(a){const[e,t,i]=a.split("-");switch(n){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(i)||""}}}return""}function w(e){return r["b"].toStandardHisDisplayFormat(e)}function k(e,t,n,a){if(t.minDate){const i=t.minDate(n,a);if(new Date(e)<new Date(i))return[`${w(e)} is less than minimum date of ${w(i)}`]}if(t.maxDate){const i=t.maxDate(n,a);if(i&&new Date(e)>new Date(i))return[`${w(e)} is greater than max date of  ${w(i)}`]}}function x(e,t=""){let n="",i="",l="",s="",c=!1;const x="year_"+e.id,S="month_"+e.id,T="day_"+e.id,g="age_estimate_"+e.id,E="duration_estimate_"+e.id,I=p(x,e.helpText,e.estimation.allowUnknown),O=m(S,e.helpText),$=h(T,e.helpText),F=y(g,e.helpText),N=b(E,e.helpText),_="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,U=t=>!(t[x]&&t[x].value&&["Unknown"].includes(t[x].value))&&(!e.condition||e.condition(t)),V=(e,t)=>{const n=[{type:"year",value:i,default:"YYYY"},{type:"month",value:l,default:"MM"},{type:"day",value:s,default:"DD"}];return n.reduce((n,a)=>{const i=[null,void 0,"Unknown",""];return t===a.type?i.includes(e)?n.push(a.default):n.push(e):i.includes(a.value)?n.push(a.default):n.push(a.value),n},[]).join("-")};"function"===typeof e.init&&(I.init=e.init),I.updateHelpTextOnValue=e=>`${I.helpText} (${V(null===e||void 0===e?void 0:e.label,"year")})`,I.proxyID=e.id,I.unload=e=>i=e.value.toString(),I.config={...I.config,...e.config},I.defaultValue=t=>v(t,e,"Year"),I.condition=t=>!e.condition||e.condition(t),I.validation=(t,n,a)=>{if(e.required&&u["a"].required(t))return["Year cannot be empty"];const i=t?t.value:"";if(!e.estimation.allowUnknown&&i.toString().match(/unknown/i))return["Value unknown is not permitted"];if(i&&!["Unknown"].includes(i)&&isNaN(i)||i<1900)return["Invalid Year"];if(i&&"function"===typeof e.minDate){const t=r["b"].getYear(e.minDate(n,a));if(parseInt(i)<t)return[`Year of ${i} is less than Minimum year of ${t}`]}if(i&&"function"===typeof e.maxDate){const t=e.maxDate(n,a);if(t&&i>r["b"].getYear(t))return[`Year of ${i} exceeds Maximum year of ${r["b"].getYear(t)}`]}return null},I.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:n?w(n):"Unknown"}),I.appearInSummary=(t,n)=>n===e.id,I.computedValue=t=>{if(n){const[a,i,o]=n.split("-");return n=`${t.value}-${i}-${o}`,e.computeValue(n,!1)}if(t&&"Unknown"===t.value)return n="",e.computeValue("Unknown",!1)},O.updateHelpTextOnValue=e=>`${O.helpText} (${V(null===e||void 0===e?void 0:e.label,"month")})`,O.proxyID=e.id,O.unload=e=>l=D(e.value.toString()),O.condition=e=>U(e),O.validation=e=>u["a"].required(e),O.defaultValue=t=>v(t,e,"Month"),_&&(O.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),O.computedValue=(t,a)=>{if((""+t.value).match(/unknown/i))return n=a[x].value+"-07-15",e.computeValue(n,!0);if(n){const[a,i,o]=n.split("-"),r=D(""+t.value);return n=`${a}-${r}-${o}`,e.computeValue(n,!1)}},$.proxyID=e.id,$.updateHelpTextOnValue=e=>`${$.helpText} (${V(null===e||void 0===e?void 0:e.label,"day")})`,$.condition=e=>!(""+e[S].value).match(/unknown/i)&&U(e),$.validation=(t,a,o)=>u["a"].required(t)?["Day is required for date"]:(c=!!(""+t.value).match(/unknown/i),s=c?"15":D(""+t.value),n=`${i}-${l}-${s}`,k(n,e,a,o)),$.defaultValue=t=>v(t,e,"Day"),$.computedValue=()=>e.computeValue(n,c),$.unload=(t,n,a,i)=>{e.unload&&e.unload(t,n,a,i)},$.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),$.config={year:e=>e[x].value,month:e=>e[S].value},_||($.config.keyboardActions=[]);const j=(t,n)=>{const a=["Unknown"===t[x].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===n];return a.every(Boolean)};return F.proxyID=e.id,F.validation=(t,a,i)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(o))return["Not a valid age estimate"];const r=d()(f["e"].getSessionDate()).subtract(t.value,"years").year();return n=r+"-07-15",k(n,e,a,i)},F.condition=e=>j(e,a.AGE_ESTIMATE_FIELD),F.computedValue=()=>e.computeValue(n,!0),F.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),N.proxyID=e.id,N.validation=(t,a,i)=>u["a"].required(t)?["Please select an estimate"]:(n=d()(f["e"].getSessionDate()).subtract(t.value,"day").format(r["a"]),k(n,e,a,i)),N.condition=e=>j(e,a.MONTH_ESTIMATE_FIELD),N.computedValue=()=>e.computeValue(n,!0),N.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),[I,O,$,F,N]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(a||(a={}))},e8ff:function(e,t,n){"use strict";n.r(t);var a=n("7a23");function i(e,t,n,i,o,r){const u=Object(a["resolveComponent"])("his-standard-form");return Object(a["openBlock"])(),Object(a["createBlock"])(u,{skipSummary:!0,fields:e.fields,onOnFinish:e.onSubmit},null,8,["fields","onOnFinish"])}n("14d9");var o=n("1c74"),r=n("b5e4"),u=n("b446"),l=n("9283"),s=n("7920"),c=n("7f35"),d=n("0fa1"),f=n("8e8b"),p=Object(a["defineComponent"])({components:{HisStandardForm:s["a"]},data:()=>({apiDate:"",fields:[]}),async created(){this.apiDate=await o["e"].getApiDate(),this.fields=Object(u["b"])({id:"session_date",helpText:"Session Date",required:!0,minDate:()=>"2000-01-01",maxDate:()=>this.apiDate,estimation:{allowUnknown:!1},computeValue:e=>e,config:{footerBtns:[{name:"Reset",slot:"end",color:"success",state:{visible:{default:()=>o["e"].isBDE()}},onClick:async()=>{await this.resetSessionDate()}}]}},"")},async mounted(){await this.showBdeNotice()},methods:{async showBdeNotice(){if(!o["e"].isBDE())return;const e=l["b"].toStandardHisDisplayFormat(o["e"].getCachedApiDate()||""),t=l["b"].toStandardHisDisplayFormat(o["e"].getSessionDate()),n=await Object(c["a"])("BDE Notice",`The system is currently in Back Data Entry Mode(BDE).                 Do you wish to reset the date to ${e}?`,"BDE Date: "+t,[{name:"Reset Date",slot:"start",color:"success"},{name:"Keep BDE Date",slot:"end",color:"danger"},{name:"New date",slot:"end"}]);if("Reset Date"===n)return await this.resetSessionDate();"Keep BDE Date"===n&&this.redirect()},async resetSessionDate(){try{await o["e"].resetSessionDate(),f["a"].invalidate("PROVIDERS"),Object(r["d"])("Session date has been reset to "+this.formatDate(this.apiDate)),this.redirect()}catch(e){Object(r["e"])(""+e)}},redirect(){const e=this.$route.query.patient_dashboard_redirection_id;e?this.$router.push("/patient/dashboard/"+e):this.$router.back()},async onSubmit(e,t){const n=t.session_date;try{var a,i;await o["e"].setSessionDate(n),Object(r["d"])("Successfully Back dated to "+this.formatDate(n));const e=null===(a=this.$route)||void 0===a||null===(i=a.query)||void 0===i?void 0:i.patient_id;e?Object(d["b"])(e,this.$router):this.redirect()}catch(u){Object(r["e"])(""+u)}},formatDate(e){return l["b"].toStandardHisDisplayFormat(e)}}}),m=n("d959"),h=n.n(m);const b=h()(p,[["render",i]]);t["default"]=b}}]);
//# sourceMappingURL=chunk-2e6cd8aa.c2d35276.js.map