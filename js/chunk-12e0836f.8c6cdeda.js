(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12e0836f"],{3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"l",(function(){return i})),n.d(t,"e",(function(){return o})),n.d(t,"b",(function(){return u})),n.d(t,"k",(function(){return r})),n.d(t,"i",(function(){return l})),n.d(t,"g",(function(){return s})),n.d(t,"a",(function(){return c})),n.d(t,"j",(function(){return d})),n.d(t,"c",(function(){return f})),n.d(t,"h",(function(){return v})),n.d(t,"f",(function(){return p}));const a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],u=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],r=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],s=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],c=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],d=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],f=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],v=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],p=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"g",(function(){return u})),n.d(t,"f",(function(){return r})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return c})),n.d(t,"h",(function(){return f})),n.d(t,"a",(function(){return v}));var a=n("3800");const i=[a["k"],[["","Delete"]]],o=[a["i"],[["Delete"]]],u=[a["i"],[["Delete","Unknown"]]],r=[a["i"],[["N/A"],["Delete","Unknown"]]],l=[a["i"],[["Delete"]]],s=[a["i"],[["Unknown","Delete"],["Qwerty","A-Z"]]],c=[a["g"],[["Unknown"]]],d=[a["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],f=[a["j"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],v=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:i},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:f}]},8652:function(e,t,n){"use strict";n.r(t);var a=n("7a23");function i(e,t,n,i,o,u){const r=Object(a["resolveComponent"])("his-standard-form");return Object(a["openBlock"])(),Object(a["createBlock"])(r,{cancelDestinationPath:e.cancelDestination,fields:e.fields,onFinishAction:e.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}var o=n("9441"),u=n("7365"),r=n("2706"),l=n("d95e"),s=n("e86e"),c=n("b446"),d=n("b5e4"),f=n("cc6f");class v extends f["a"]{constructor(e,t){super(e,39,t)}}var p=Object(a["defineComponent"])({components:{HisStandardForm:o["a"]},mixins:[u["a"]],data:()=>({hivService:{}}),watch:{ready:{async handler(e){e&&(this.hivService=new v(this.patient.getID(),this.providerID),this.fields=this.getFields())},immediate:!0,deep:!0}},methods:{async onSubmit(e,t){const n=await this.hivService.createEncounter();if(!n)return Object(d["e"])("Unable to create encounter");const a=await this.resolveObs({...t}),i=await this.hivService.saveObservationList(a);if(!i)return Object(d["e"])("Unable to save observations");this.nextTask()},buildDateObs(e,t,n){let a={};return a=t.match(/unknown/i)?this.hivService.buildValueText(e,"Unknown"):n?this.hivService.buildValueDateEstimated(e,t):this.hivService.buildValueDate(e,t),a},getFields(){return[{id:"hiv_status",helpText:"HIV status",type:l["b"].TT_SELECT,validation:e=>r["a"].required(e),computedValue:({value:e})=>({obs:this.hivService.buildValueText("HIV status",e)}),options:()=>[{label:"Positive not ART",value:"Positive not ART"},{label:"Posititve on ART",value:"Positive on ART"},{label:"Previous negative",value:"Previous negative"},{label:"New positive",value:"New positive"},{label:"New negative",value:"New negative"},{label:"Never tested",value:"Never tested"}]},...Object(c["b"])({id:"hiv_test_date",helpText:"HIV Test",required:!0,minDate:()=>this.patient.getBirthdate(),maxDate:()=>v.getSessionDate(),condition:e=>"Never tested"!==e.hiv_status.value,summaryLabel:"HIV test date",estimation:{allowUnknown:!0,estimationFieldType:c["a"].MONTH_ESTIMATE_FIELD},computeValue:(e,t)=>this.buildDateObs("HIV test date",e,t)},this.hivService.getDate()),{id:"test_location",helpText:"HIV test location",type:l["b"].TT_SELECT,validation:e=>r["a"].required(e),defaultValue:()=>v.getLocationName(),computedValue:({label:e})=>({obs:this.hivService.buildValueText("HIV test location",e)}),condition:e=>"Never tested"!==e.hiv_status.value,options:(e,t="")=>Object(s["b"])(t),config:{showKeyboard:!0,isFilterDataViaApi:!0}}]}}}),m=n("6b0d"),b=n.n(m);const h=b()(p,[["render",i]]);t["default"]=h},b446:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return D}));n("13d5");var a,i=n("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],u=n("9283"),r=n("2706"),l=n("3800"),s=n("6be2"),c=n("5a0c"),d=n.n(c),f=n("1c74");function v(e,t,n=!0){const a=[];return n&&a.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:i["b"].TT_TEXT,config:{customKeyboard:[l["i"],[a,["DELETE"]]]}}}function p(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:i["b"].TT_SELECT,options:()=>o}}function m(e,t){return{id:e,helpText:t+" Day",type:i["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function b(e,t){return{id:e,helpText:t+" Estimated period",type:i["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function h(e,t){return{id:e,helpText:t+" Age Estimate",type:i["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:s["e"]}}}function y(e){return parseInt(e)<10?"0"+e:e}async function w(e,t,n){if(t.defaultValue){const a=await t.defaultValue(e);if(a){const[e,t,i]=a.split("-");switch(n){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(i)||""}}}return""}function T(e){return u["b"].toStandardHisDisplayFormat(e)}function g(e,t,n,a){if(t.minDate){const i=t.minDate(n,a);if(new Date(e)<new Date(i))return[`${T(e)} is less than minimum date of ${T(i)}`]}if(t.maxDate){const i=t.maxDate(n,a);if(i&&new Date(e)>new Date(i))return[`${T(e)} is greater than max date of  ${T(i)}`]}}function D(e,t=""){let n="",i="",l="",s="",c=!1;const D="year_"+e.id,x="month_"+e.id,k="day_"+e.id,S="age_estimate_"+e.id,V="duration_estimate_"+e.id,_=v(D,e.helpText,e.estimation.allowUnknown),E=p(x,e.helpText),I=m(k,e.helpText),N=h(S,e.helpText),A=b(V,e.helpText),U="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,$=t=>!(t[D]&&t[D].value&&["Unknown"].includes(t[D].value))&&(!e.condition||e.condition(t)),O=(e,t)=>{const n=[{type:"year",value:i,default:"YYYY"},{type:"month",value:l,default:"MM"},{type:"day",value:s,default:"DD"}];return n.reduce((n,a)=>{const i=[null,void 0,"Unknown",""];return t===a.type?i.includes(e)?n.push(a.default):n.push(e):i.includes(a.value)?n.push(a.default):n.push(a.value),n},[]).join("-")};"function"===typeof e.init&&(_.init=e.init),_.updateHelpTextOnValue=e=>`${_.helpText} (${O(null===e||void 0===e?void 0:e.label,"year")})`,_.proxyID=e.id,_.unload=e=>i=e.value.toString(),_.config={..._.config,...e.config},_.defaultValue=t=>w(t,e,"Year"),_.condition=t=>!e.condition||e.condition(t),_.validation=(t,n,a)=>{if(e.required&&r["a"].required(t))return["Year cannot be empty"];const i=t?t.value:"";if(!e.estimation.allowUnknown&&i.toString().match(/unknown/i))return["Value unknown is not permitted"];if(i&&!["Unknown"].includes(i)&&isNaN(i)||i<1900)return["Invalid Year"];if(i&&"function"===typeof e.minDate){const t=u["b"].getYear(e.minDate(n,a));if(parseInt(i)<t)return[`Year of ${i} is less than Minimum year of ${t}`]}if(i&&"function"===typeof e.maxDate){const t=e.maxDate(n,a);if(t&&i>u["b"].getYear(t))return[`Year of ${i} exceeds Maximum year of ${u["b"].getYear(t)}`]}return null},_.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:n?T(n):"Unknown"}),_.appearInSummary=(t,n)=>n===e.id,_.computedValue=t=>{if(n){const[a,i,o]=n.split("-");return n=`${t.value}-${i}-${o}`,e.computeValue(n,!1)}if(t&&"Unknown"===t.value)return n="",e.computeValue("Unknown",!1)},E.updateHelpTextOnValue=e=>`${E.helpText} (${O(null===e||void 0===e?void 0:e.label,"month")})`,E.proxyID=e.id,E.unload=e=>l=y(e.value.toString()),E.condition=e=>$(e),E.validation=e=>r["a"].required(e),E.defaultValue=t=>w(t,e,"Month"),U&&(E.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),E.computedValue=(t,a)=>{if((""+t.value).match(/unknown/i))return n=a[D].value+"-07-15",e.computeValue(n,!0);if(n){const[a,i,o]=n.split("-"),u=y(""+t.value);return n=`${a}-${u}-${o}`,e.computeValue(n,!1)}},I.proxyID=e.id,I.updateHelpTextOnValue=e=>`${I.helpText} (${O(null===e||void 0===e?void 0:e.label,"day")})`,I.condition=e=>!(""+e[x].value).match(/unknown/i)&&$(e),I.validation=(t,a,o)=>r["a"].required(t)?["Day is required for date"]:(c=!!(""+t.value).match(/unknown/i),s=c?"15":y(""+t.value),n=`${i}-${l}-${s}`,g(n,e,a,o)),I.defaultValue=t=>w(t,e,"Day"),I.computedValue=()=>e.computeValue(n,c),I.unload=(t,n,a,i)=>{e.unload&&e.unload(t,n,a,i)},I.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),I.config={year:e=>e[D].value,month:e=>e[x].value},U||(I.config.keyboardActions=[]);const M=(t,n)=>{const a=["Unknown"===t[D].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===n];return a.every(Boolean)};return N.proxyID=e.id,N.validation=(t,a,i)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(o))return["Not a valid age estimate"];const u=d()(f["e"].getSessionDate()).subtract(t.value,"years").year();return n=u+"-07-15",g(n,e,a,i)},N.condition=e=>M(e,a.AGE_ESTIMATE_FIELD),N.computedValue=()=>e.computeValue(n,!0),N.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),A.proxyID=e.id,A.validation=(t,a,i)=>r["a"].required(t)?["Please select an estimate"]:(n=d()(f["e"].getSessionDate()).subtract(t.value,"day").format(u["a"]),g(n,e,a,i)),A.condition=e=>M(e,a.MONTH_ESTIMATE_FIELD),A.computedValue=()=>e.computeValue(n,!0),A.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),[_,E,I,N,A]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(a||(a={}))},e86e:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"c",(function(){return r})),n.d(t,"f",(function(){return l})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return c})),n.d(t,"g",(function(){return d})),n.d(t,"h",(function(){return f}));var a=n("5713"),i=n("2ef0");async function o(e=""){const t=await a["a"].getFacilities({name:e});return t.filter(e=>!Object(i["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function u(e=""){const t=await a["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function r(e=""){const t=await a["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function l(){const e=await a["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function s(){const e=await a["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function c(e){const t=await a["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function d(e,t=""){const n=await a["a"].getTraditionalAuthorities(e,t);return n.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function f(e,t=""){const n=await a["a"].getVillages(e,t);return n.map(e=>({label:e.name,value:e.village_id,other:e}))}}}]);
//# sourceMappingURL=chunk-12e0836f.8c6cdeda.js.map