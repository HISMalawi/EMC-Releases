(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13e9c9f8"],{3800:function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"j",(function(){return a})),n.d(e,"m",(function(){return o})),n.d(e,"e",(function(){return s})),n.d(e,"b",(function(){return r})),n.d(e,"l",(function(){return c})),n.d(e,"i",(function(){return d})),n.d(e,"g",(function(){return l})),n.d(e,"a",(function(){return u})),n.d(e,"k",(function(){return g})),n.d(e,"c",(function(){return h})),n.d(e,"h",(function(){return p})),n.d(e,"f",(function(){return m}));const i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],r=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],c=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],d=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],l=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],u=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],g=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],m=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(t,e,n){"use strict";n.d(e,"d",(function(){return o})),n.d(e,"g",(function(){return s})),n.d(e,"f",(function(){return r})),n.d(e,"e",(function(){return c})),n.d(e,"c",(function(){return d})),n.d(e,"b",(function(){return l})),n.d(e,"h",(function(){return g})),n.d(e,"a",(function(){return h}));var i=n("3800");const a=[i["l"],[["","Delete"]]],o=[i["i"],[["Delete"]]],s=[i["i"],[["Delete","Unknown"]]],r=[i["i"],[["N/A"],["Delete","Unknown"]]],c=[i["i"],[["Delete"]]],d=[i["i"],[["Unknown","Delete"],["Qwerty","A-Z"]]],l=[i["g"],[["Unknown"]]],u=[i["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],g=[i["k"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],h=[{btn:"0-9",keyboard:d},{btn:"?123",keyboard:a},{btn:"A-Z",keyboard:u},{btn:"Qwerty",keyboard:g}]},7365:function(t,e,n){"use strict";n("14d9"),n("13d5");var i,a=n("7a23"),o=n("ad60"),s=n("2ef0"),r=n("0fa1"),c=n("7f35"),d=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(i||(i={}));const l=t=>d["b"].toStandardHisDisplayFormat(t),u={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+l(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${l(e)} is less than birth date of ${l(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:a})=>{const o=await Object(c["c"])("Please select a provider for "+e,`BDE: ${l(n)} | Current: ${l(a)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var g=n("c21d"),h=n("7920"),p=n("b5e4"),m=n("8e8b"),f=Object(a["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),m["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[i.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(s["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(g["a"])(this.facts,u);for(const s in t){var e,n;const r=t[s];if(null!==r&&void 0!==r&&null!==(e=r.actions)&&void 0!==e&&e.alert){var a;const t=this.runflowState(await(null===r||void 0===r||null===(a=r.actions)||void 0===a?void 0:a.alert(this.facts)));if(t===i.EXIT)return}if(null!==r&&void 0!==r&&null!==(n=r.actions)&&void 0!==n&&n.selection){var o;const t=await(null===r||void 0===r||null===(o=r.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await m["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(p["c"])(""+t)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await m["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),i=e.username.toUpperCase();return n<i?-1:n>i?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(s["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var i;const[e]=(null===(i=t.person)||void 0===i?void 0:i.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const b=f;e["a"]=b},7920:function(t,e,n){"use strict";var i=n("7a23");function a(t,e,n,a,o,s){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),s=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),r=n("d959"),c=n.n(r);const d=c()(s,[["render",a]]);e["a"]=d},b446:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return w}));n("14d9"),n("13d5");var i,a=n("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],s=n("9283"),r=n("2706"),c=n("3800"),d=n("6be2"),l=n("5a0c"),u=n.n(l),g=n("1c74");function h(t,e,n=!0){const i=[];return n&&i.push("UNKNOWN"),{id:t,helpText:e+" Year",appearInSummary:()=>!1,type:a["b"].TT_TEXT,config:{customKeyboard:[c["i"],[i,["DELETE"]]]}}}function p(t,e){return{id:t,helpText:e+" Month",appearInSummary:()=>!1,type:a["b"].TT_SELECT,options:()=>o}}function m(t,e){return{id:t,helpText:e+" Day",type:a["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function f(t,e){return{id:t,helpText:e+" Estimated period",type:a["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function b(t,e){return{id:t,helpText:e+" Age Estimate",type:a["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:d["e"]}}}function y(t){return parseInt(t)<10?"0"+t:t}async function T(t,e,n){if(e.defaultValue){const i=await e.defaultValue(t);if(i){const[t,e,a]=i.split("-");switch(n){case"Year":return t||"";case"Month":return parseInt(e)||"";case"Day":return parseInt(a)||""}}}return""}function v(t){return s["b"].toStandardHisDisplayFormat(t)}function D(t,e,n,i){if(e.minDate){const a=e.minDate(n,i);if(new Date(t)<new Date(a))return[`${v(t)} is less than minimum date of ${v(a)}`]}if(e.maxDate){const a=e.maxDate(n,i);if(a&&new Date(t)>new Date(a))return[`${v(t)} is greater than max date of  ${v(a)}`]}}function w(t,e=""){let n="",a="",c="",d="",l=!1;const w="year_"+t.id,S="month_"+t.id,A="day_"+t.id,C="age_estimate_"+t.id,E="duration_estimate_"+t.id,_=h(w,t.helpText,t.estimation.allowUnknown),I=p(S,t.helpText),O=m(A,t.helpText),F=b(C,t.helpText),N=f(E,t.helpText),x="boolean"===typeof t.estimation.allowUnknownMonthDay&&t.estimation.allowUnknownMonthDay,V=e=>!(e[w]&&e[w].value&&["Unknown"].includes(e[w].value))&&(!t.condition||t.condition(e)),P=(t,e)=>{const n=[{type:"year",value:a,default:"YYYY"},{type:"month",value:c,default:"MM"},{type:"day",value:d,default:"DD"}];return n.reduce((n,i)=>{const a=[null,void 0,"Unknown",""];return e===i.type?a.includes(t)?n.push(i.default):n.push(t):a.includes(i.value)?n.push(i.default):n.push(i.value),n},[]).join("-")};"function"===typeof t.init&&(_.init=t.init),_.updateHelpTextOnValue=t=>`${_.helpText} (${P(null===t||void 0===t?void 0:t.label,"year")})`,_.proxyID=t.id,_.unload=t=>a=t.value.toString(),_.config={..._.config,...t.config},_.defaultValue=e=>T(e,t,"Year"),_.condition=e=>!t.condition||t.condition(e),_.validation=(e,n,i)=>{if(t.required&&r["a"].required(e))return["Year cannot be empty"];const a=e?e.value:"";if(!t.estimation.allowUnknown&&a.toString().match(/unknown/i))return["Value unknown is not permitted"];if(a&&!["Unknown"].includes(a)&&isNaN(a)||a<1900)return["Invalid Year"];if(a&&"function"===typeof t.minDate){const e=s["b"].getYear(t.minDate(n,i));if(parseInt(a)<e)return[`Year of ${a} is less than Minimum year of ${e}`]}if(a&&"function"===typeof t.maxDate){const e=t.maxDate(n,i);if(e&&a>s["b"].getYear(e))return[`Year of ${a} exceeds Maximum year of ${s["b"].getYear(e)}`]}return null},_.summaryMapValue=()=>({label:t.summaryLabel||t.helpText,value:n?v(n):"Unknown"}),_.appearInSummary=(e,n)=>n===t.id,_.computedValue=e=>{if(n){const[i,a,o]=n.split("-");return n=`${e.value}-${a}-${o}`,t.computeValue(n,!1)}if(e&&"Unknown"===e.value)return n="",t.computeValue("Unknown",!1)},I.updateHelpTextOnValue=t=>`${I.helpText} (${P(null===t||void 0===t?void 0:t.label,"month")})`,I.proxyID=t.id,I.unload=t=>c=y(t.value.toString()),I.condition=t=>V(t),I.validation=t=>r["a"].required(t),I.defaultValue=e=>T(e,t,"Month"),x&&(I.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),I.computedValue=(e,i)=>{if((""+e.value).match(/unknown/i))return n=i[w].value+"-07-15",t.computeValue(n,!0);if(n){const[i,a,o]=n.split("-"),s=y(""+e.value);return n=`${i}-${s}-${o}`,t.computeValue(n,!1)}},O.proxyID=t.id,O.updateHelpTextOnValue=t=>`${O.helpText} (${P(null===t||void 0===t?void 0:t.label,"day")})`,O.condition=t=>!(""+t[S].value).match(/unknown/i)&&V(t),O.validation=(e,i,o)=>r["a"].required(e)?["Day is required for date"]:(l=!!(""+e.value).match(/unknown/i),d=l?"15":y(""+e.value),n=`${a}-${c}-${d}`,D(n,t,i,o)),O.defaultValue=e=>T(e,t,"Day"),O.computedValue=()=>t.computeValue(n,l),O.unload=(e,n,i,a)=>{t.unload&&t.unload(e,n,i,a)},O.beforeNext=(e,i)=>!t.beforeNext||t.beforeNext(n,i),O.config={year:t=>t[w].value,month:t=>t[S].value},x||(O.config.keyboardActions=[]);const M=(e,n)=>{const i=["Unknown"===e[w].value,!t.condition||t.condition(e),t.estimation.estimationFieldType===n];return i.every(Boolean)};return F.proxyID=t.id,F.validation=(e,i,a)=>{if(e&&e.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(e.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!e.value.toString().match(o))return["Not a valid age estimate"];const s=u()(g["e"].getSessionDate()).subtract(e.value,"years").year();return n=s+"-07-15",D(n,t,i,a)},F.condition=t=>M(t,i.AGE_ESTIMATE_FIELD),F.computedValue=()=>t.computeValue(n,!0),F.beforeNext=(e,i)=>!t.beforeNext||t.beforeNext(n,i),N.proxyID=t.id,N.validation=(e,i,a)=>r["a"].required(e)?["Please select an estimate"]:(n=u()(g["e"].getSessionDate()).subtract(e.value,"day").format(s["a"]),D(n,t,i,a)),N.condition=t=>M(t,i.MONTH_ESTIMATE_FIELD),N.computedValue=()=>t.computeValue(n,!0),N.beforeNext=(e,i)=>!t.beforeNext||t.beforeNext(n,i),[_,I,O,F,N]}(function(t){t["AGE_ESTIMATE_FIELD"]="age-estimate-field",t["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(i||(i={}))},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));n("14d9");function i(t,e){const n=[],i=[-1,"",null,void 0];for(const a in e){if(!(a in t))continue;const o=t[a];i.includes(o)?n.push(!1):n.push(e[a](o,t))}return n.every(Boolean)}function a(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function o(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function s(t,e,n="",s="",r="priority"){const c=[];for(const a in e){const o=e[a],r=[o.target&&n&&o.target!=n,o.targetEvent&&s&&o.targetEvent!=s];r.some(Boolean)||i(t,o.conditions)&&(o.title=a,o.description&&(o.description.text=o.description.info(t)),c.push(o))}return"priority"===r?a(c):o(c)}},daa6:function(t,e,n){"use strict";n("13d5"),n("14d9");var i=n("7a23"),a=n("d95e"),o=n("ade3"),s=n("cc6f"),r=n("5713"),c=n("8158"),d=n("b5e4");const l={"Adults with stage 4 conditions":{concept:"WHO STAGE IV ADULT",priority:1,conditions:{stage:t=>4===t}},"Classify as stage 4 when reason for ART is WHO STAGE 4":{concept:"WHO STAGE IV ADULT",priority:2,conditions:{reasonForArt:t=>"WHO STAGE IV ADULT"===t}},"Adults with stage 3 conditions":{concept:"WHO STAGE III ADULT",priority:3,conditions:{stage:t=>3===t}},"Adults with stage 2 conditions":{concept:"WHO STAGE II ADULT",priority:4,conditions:{stage:t=>2===t}},"Adults with stage 1 conditions":{concept:"WHO STAGE I ADULT",priority:5,conditions:{stage:t=>1===t}}},u={"Children with stage 4 conditions":{concept:"WHO STAGE IV PEDS",priority:1,conditions:{stage:t=>4===t}},"Classify as stage 4 when reason for ART is WHO STAGE 4":{concept:"WHO STAGE IV PEDS",priority:2,conditions:{reasonForArt:t=>"WHO STAGE IV PEDS"===t}},"For children with stage 3 conditions":{concept:"WHO STAGE III PEDS",priority:3,conditions:{stage:t=>3===t}},"Children with stage 2 conditions":{concept:"WHO STAGE II PEDS",priority:4,conditions:{stage:t=>2===t}},"Children with stage 1 conditions":{concept:"WHO STAGE I PEDS",priority:5,conditions:{stage:t=>1===t}}},g={"Warn if Severe weight loss is selected when actual patient BMI is acceptable":{priority:1,actions:{alert:async t=>await Object(d["a"])(`Patient's BMI of ${t.bmi} greater than 18.5, do you wish to proceed?`,{confirmBtnLabel:"Yes, keep severe weightloss",cancelBtnLabel:"No, cancel"})},conditions:{selectedCondition(t){return"Severe weight loss >10% and/or BMI <18.5kg/m^2, unexplained"===t},bmi:t=>t>18.5}},"Warn for contradicting stage defining conditions":{priority:1,actions:{alert:async t=>{const e=await Object(d["a"])("CONTRADICTING STAGE DEFINING CONDITIONS",{confirmBtnLabel:"Keep Asymptomatic",cancelBtnLabel:"Keep other(s)"});return!!e&&(t.stage=1,t.selectedConditions=[],t.stageThreeConditions=[],t.stageFourConditions=[],t.stageTwoConditions=[],!0)}},conditions:{selectedCondition(t){return"Asymptomatic HIV infection"===t},stage:t=>t>=2}}},h={"For children whose current weight percentile is less than 70":{priority:1,actions:{isChecked:!0},description:{color:"danger",show:"always",info:t=>"Child has a low weight percentile of "+t.weightPercentile},conditions:{selectedCondition(t){return"Severe unexplained wasting or malnutrition not responding to treatment (weight-for-height/ -age <70% or MUAC less than 11cm or oedema)"===t},weightPercentile(t){return t<70}}},"Enable Moderate unexplained malnutrition for children whose weight for height is 70-79%":{priority:1,actions:{isChecked:!0},description:{color:"danger",show:"always",info:t=>"Child has weight percentile of "+t.weightPercentile},conditions:{selectedCondition(t){return"Moderate unexplained wasting/malnutrition not responding to treatment (weight-for-height/ -age 70-79% or muac 11-12 cm)"===t},weightPercentile(t){return t>=70&&t<=79}}},"Disable moderate weight loss when Severe unexplained weight loss is chosen":{priority:2,actions:{isChecked:!1,disabled:!0},description:{color:"secondary",show:"always",info:()=>"Severe weight loss/manutrition was already selected"},conditions:{selectedCondition(t){return"Moderate unexplained wasting/malnutrition not responding to treatment (weight-for-height/ -age 70-79% or muac 11-12 cm)"===t},selectedConditions(t){return t.includes("Severe unexplained wasting or malnutrition not responding to treatment (weight-for-height/ -age <70% or MUAC less than 11cm or oedema)")}}}},p={"Adults with a BMI less than 16":{priority:1,actions:{isChecked:!0},description:{color:"danger",show:"always",info:t=>"Adult has a low BMI of "+t.bmi},conditions:{selectedCondition(t){return"Severe weight loss >10% and/or BMI <18.5kg/m^2, unexplained"===t},bmi:t=>t<16}},"Adults whose BMI is between 16 and 18":{priority:3,actions:{isChecked:!0},description:{color:"warning",show:"onChecked",info:t=>`BMI of ${t.bmi} is between 16 and 18`},conditions:{selectedCondition:t=>"Moderate weight loss less than or equal to 10 percent, unexplained"===t,bmi:t=>t>=16&&t<=18.5}},"Disable Moderate weight loss if severe weightloss is selected":{priority:2,actions:{isChecked:!1,disabled:!0},description:{color:"secondary",show:"always",info:()=>"Severe weight loss was already selected"},conditions:{selectedCondition(t){return"Moderate weight loss less than or equal to 10 percent, unexplained"===t},selectedConditions(t){return t.includes("Severe weight loss >10% and/or BMI <18.5kg/m^2, unexplained")}}}},m={"Has stage 4 conditions":{concept:"WHO STAGE IV PEDS",priority:1,conditions:{stage:t=>4===t}},"Has stage 3 conditions":{concept:"WHO STAGE III PEDS",priority:2,conditions:{stage:t=>3===t}},"Children under twelve months who tested positive on Rapid test and have presumed severe HIV":{concept:"PRESUMED SEVERE HIV",priority:3,conditions:{ageInMonths(t){return t<12},selectedConditions:t=>{const e=c["a"].getConceptsByCategory("pshd_condition");for(const n in e)if(t.includes(n))return!0;return!1},testType(t){return"HIV rapid test"===t}}},"Children under twelve who tested positive via HIV DNA Polymerase Chain Reaction test":{concept:"HIV DNA polymerase chain reaction",priority:4,conditions:{ageInMonths:t=>t<12,testType:t=>"HIV DNA polymerase chain reaction"===t}},"Children who are less than 24 months":{concept:"HIV infected",priority:5,conditions:{ageInMonths:t=>t<24}},"Children between 24 and 56 months who have stage 2 or 1 conditions":{concept:"CD4 COUNT LESS THAN OR EQUAL TO 750",priority:6,conditions:{ageInMonths(t){return t>=24&&t<=56},cd4Date:t=>new Date(t)<=new Date("2014-04-01"),cd4(t){return t<=750},cd4Modifier(t){return"<"===t||"="===t},stage(t){return t<=2}}},"Children with CD4 count less than 500 and have stage 1 and stage 2 conditions":{concept:"CD4 COUNT LESS THAN OR EQUAL TO 500",priority:7,conditions:{cd4(t){return t<=500},cd4Date:t=>new Date(t)<=new Date("2014-04-01"),cd4Modifier(t){return"<"===t||"="===t},stage(t){return t<=2}}},"Children over the date 2014-04-01 who are more than five years old and have cd4 count less than 500":{concept:"CD4 COUNT LESS THAN OR EQUAL TO 500",priority:9,conditions:{cd4Date:t=>new Date(t)<=new Date("2014-04-01"),age(t){return t>5},cd4(t){return t<=500},cd4Modifier(t){return"<"===t||"="===t}}},"Children over date 2014-04-01 and less than Five years old":{concept:"HIV infected",priority:10,conditions:{date(t){return t>="2014-04-01"},age(t){return t<=5}}},"Women who are breast feeding":{concept:"BREASTFEEDING",priority:11,conditions:{gender(t){return"F"===t},breastFeeding(t){return"Yes"===t},stage:t=>t<=2}},"Women who are pregnant":{concept:"PATIENT PREGNANT",priority:12,conditions:{gender(t){return"F"===t},pregnant(t){return"Yes"===t},stage(t){return t<=2}}},"Asymptomatic patient with either stage one or stage two conditions":{concept:"Asymptomatic",priority:13,conditions:{stage:t=>t<=2}}},f={"Has stage 4 conditions":{concept:"WHO STAGE IV ADULT",priority:1,conditions:{stage:t=>4===t}},"Has HIV wasting syndrome identified in stage 3":{concept:"WHO STAGE IV ADULT",priority:2,conditions:{selectedConditions:t=>{const e=c["a"].getConceptsByCategory("severe_hiv_wasting_syndrome"),n=e.reduce((e,n)=>t.includes(n.name)?e+1:0,0);return n>=2}}},"Has stage 3 conditions":{concept:"WHO STAGE III ADULT",priority:3,conditions:{stage:t=>3===t}},"CD4 less than 350 for adults before 2014":{concept:"cd4 less than or equal to 350",priority:4,conditions:{cd4Date:t=>new Date(t)<=new Date("2014-04-01"),cd4(t){return t<=350},cd4Modifier(t){return"<"===t||"="===t}}},"CD4 less than 250 for adults after 2014":{concept:"cd4 less than or equal to 250",priority:4,conditions:{cd4Date:t=>new Date(t)<=new Date("2014-04-01"),cd4(t){return t<=250},cd4Modifier(t){return"<"===t||"="===t}}},"CD4 less than 350 for adults after 2014":{concept:"cd4 less than or equal to 350",priority:5,conditions:{cd4Date:t=>new Date(t)<=new Date("2014-04-01"),cd4(t){return t<=350},cd4Modifier(t){return"<"===t||"="===t}}},"CD4 less than 500 for adults after 2014":{concept:"cd4 less than or equal to 500",priority:6,conditions:{cd4Date:t=>new Date(t)<=new Date("2014-04-01"),cd4(t){return t<=500},cd4Modifier(t){return"<"===t||"="===t}}},"Women who are breast feeding":{concept:"BREASTFEEDING",priority:8,conditions:{gender(t){return"F"===t},breastFeeding(t){return"Yes"===t},stage:t=>t<=2}},"Women who are pregnant":{concept:"PATIENT PREGNANT",priority:7,conditions:{gender(t){return"F"===t},pregnant(t){return"Yes"===t},stage(t){return t<=2}}},"Asymptomatic patient with either stage one or stage two conditions":{concept:"Asymptomatic",priority:9,conditions:{stage:t=>t<=2}}};var b;(function(t){t["ADULT_STAGE_4"]="stage_4_conditions_adults",t["ADULT_STAGE_3"]="stage_3_conditions_adults",t["ADULT_STAGE_2"]="stage_2_conditions_adults",t["ADULT_STAGE_1"]="stage_1_conditions_adults",t["PEDAID_STAGE_4"]="stage_4_conditions_pedaids",t["PEDAID_STAGE_3"]="stage_3_conditions_pedaids",t["PEDAID_STAGE_2"]="stage_2_conditions_pedaids",t["PEDAID_STAGE_1"]="stage_1_conditions_pedaids"})(b||(b={}));class y extends s["a"]{constructor(t,e,n){super(t,52,n),Object(o["a"])(this,"age",void 0),Object(o["a"])(this,"confirmatoryTest",void 0),this.age=e,this.confirmatoryTest=null}isAdult(){return this.age>=15}isPedaid(){return this.age<=14}setAge(t){this.age=t}getFacilities(t=""){return r["a"].getFacilities({name:t})}getConfirmatoryTestType(){return this.confirmatoryTest}cd4CountIsValid(t){try{return!!t.match(/^(=|<|>)([0-9]*)$/m)}catch(e){return!1}}getAlertGuidelines(){return g}getWhoStageGuidelines(){return this.isAdult()?l:u}getProgramEligibilityGuidelines(){return this.isAdult()?f:m}getRecommendedConditionGuidelines(){return this.isAdult()?p:h}getStagingConditions(t){const e=this.getStagingCategoryByNum(t);return s["a"].getConceptsByCategory(e)}buildWhoStageObs(t){return this.buildValueCoded("Who stage",t)}buildWhoCriteriaObs(t){return this.buildValueCoded("Who stages criteria present",t)}buildReasonForArtObs(t){return this.buildValueCoded("Reason for ART eligibility",t)}getStagingCategoryByNum(t){switch(t){case 1:return this.isAdult()?b.ADULT_STAGE_1:b.PEDAID_STAGE_1;case 2:return this.isAdult()?b.ADULT_STAGE_2:b.PEDAID_STAGE_2;case 3:return this.isAdult()?b.ADULT_STAGE_3:b.PEDAID_STAGE_3;case 4:return this.isAdult()?b.ADULT_STAGE_4:b.PEDAID_STAGE_4;default:return""}}async loadHivConfirmatoryTestType(){const t=await s["a"].getFirstValueCoded(this.patientID,"Confirmatory hiv test type");t&&(this.confirmatoryTest=t)}}var T=n("7365"),v=n("2706"),D=n("b446"),w=n("9283"),S=n("2ef0"),A=n("3800"),C=n("c21d"),E=n("e86e"),_=Object(i["defineComponent"])({mixins:[T["a"]],data:()=>({staging:{},showStagingWeightChart:!0,canShowStagingFields:!0,bmiObj:{},stagingFacts:{age:-1,bmi:-1,gender:"",stage:-1,cd4:-1,cd4Date:"",date:"",isChildBearing:!1,stageOneConditions:[],stageTwoConditions:[],stageThreeConditions:[],stageFourConditions:[],reasonForArt:"",testType:"",pregnant:"",breastFeeding:"",selectedCondition:"",selectedConditions:[],weightPercentile:-1,ageInMonths:-1,cd4Modifier:"",whoStage:""}}),watch:{ready:{handler(t){t&&(this.staging=new y(this.patient.getID(),this.patient.getAge(),this.providerID))},immediate:!0}},methods:{async initStaging(t){await this.staging.loadHivConfirmatoryTestType(),this.bmiObj=await t.getBMI(),this.stagingFacts.age=t.getAge(),this.stagingFacts.bmi=this.bmiObj["index"],this.stagingFacts.date=y.getSessionDate(),this.stagingFacts.gender=t.isMale()?"M":"F",this.stagingFacts.testType=this.staging.getConfirmatoryTestType(),this.stagingFacts.ageInMonths=t.getAgeInMonths(),this.stagingFacts.isChildBearing=t.isChildBearing(),this.staging.isPedaid()&&(this.stagingFacts.weightPercentile=await t.calculateWeightPercentile())},async submitStaging(t){const e=await this.staging.createEncounter();if(!e)throw"Unable to create staging encounter";const n=await this.resolveObs(t,"staging"),i=await Promise.all([this.buildReasonForArtObs(),this.buildWhoStageObs()]),a=await this.staging.saveObservationList([...n,...i]);if(!a)throw"Unable to save patient observations"},async onStagingCondition({label:t}){var e,n;this.stagingFacts.selectedCondition=t;const i=this.staging.getAlertGuidelines(),a=Object(C["a"])(this.stagingFacts,i);if(Object(S["isEmpty"])(a))return!0;if(null!==(e=a[0])&&void 0!==e&&e.actions&&null!==(n=a[0])&&void 0!==n&&n.actions.alert){var o;const t=await(null===(o=a[0])||void 0===o?void 0:o.actions.alert(this.stagingFacts));return!!t}return!0},getFacilities(t=""){return Object(E["b"])(t)},updateStagingFacts(){const t=[this.stagingFacts.stageOneConditions,this.stagingFacts.stageTwoConditions,this.stagingFacts.stageThreeConditions,this.stagingFacts.stageFourConditions];this.stagingFacts.stage=t.reduce((t,e,n)=>Object(S["isEmpty"])(e)?t:n+1,0),this.stagingFacts.selectedConditions=t.reduce((t,e)=>t.concat(e),[])},buildReasonForArtObs(){return this.staging.buildReasonForArtObs(this.stagingFacts.reasonForArt)},buildWhoStageObs(){return this.staging.buildWhoStageObs(this.stagingFacts.whoStage)},buildStagingOptions(t,e=[]){const n=this.staging.getRecommendedConditionGuidelines();return this.staging.getStagingConditions(t).map(t=>{let i,a=!1,o=e.includes(t.name);this.stagingFacts.selectedCondition=t.name;const s=Object(C["a"])(this.stagingFacts,n);if(!Object(S["isEmpty"])(s)){var r,c;const t=s[0];null!==t&&void 0!==t&&null!==(r=t.actions)&&void 0!==r&&r.isChecked&&(o=!0),null!==t&&void 0!==t&&null!==(c=t.actions)&&void 0!==c&&c.disabled&&(a=!0),i=t.description}return{label:t.name,value:t.concept_id,isChecked:o,disabled:a,description:i}})},setWhoStage(){var t;const e=this.staging.getWhoStageGuidelines(),n=Object(C["a"])(this.stagingFacts,e);this.stagingFacts.whoStage=(null===(t=n[0])||void 0===t?void 0:t.concept)||""},setReasonForArt(){var t;const e=this.staging.getProgramEligibilityGuidelines(),n=Object(C["a"])(this.stagingFacts,e);this.stagingFacts.reasonForArt=(null===(t=n[0])||void 0===t?void 0:t.concept)||""},notAsymptomatic(t){const e=t.stage_1_conditions;if(e){const t=e.filter(t=>t.label.match(/asymptomatic/i)&&t.isChecked);return Object(S["isEmpty"])(t)}return!0},hasTransferLater(t){return"has_transfer_letter"in t&&(t.has_transfer_letter&&"Yes"===t.has_transfer_letter.value)},hasStaging(t){return!!this.hasTransferLater(t)||this.canShowStagingFields},getStagingSummaryField(t="Summary"){return{id:"summary",helpText:t,type:a["b"].TT_ART_STAGING_SUMMARY,condition:t=>this.hasStaging(t),onload:()=>{this.setReasonForArt(),this.setWhoStage()},options:()=>[{label:"WHO Stage",value:this.stagingFacts.whoStage,other:{type:"title-section"}},{label:"Condition on starting ART",value:this.stagingFacts.reasonForArt,other:{type:"title-section"}},...this.stagingFacts.selectedConditions.map(t=>({label:t,value:t}))],config:{title:"Selected stage defining conditions",hiddenFooterBtns:["Clear"]}}},isANCclient(){return"ANC"===y.getSuspendedProgram()},getStagingFields(){return[{id:"pregnancy_status",helpText:"Pregnant / Breastfeeding",type:a["b"].TT_MULTIPLE_YES_NO,validation:t=>v["a"].anyEmpty(t),summaryMapValue:t=>({label:t.label,value:t.value}),computedValue:(t,e)=>{let n=[];return this.isANCclient()&&!this.hasTransferLater(e)&&(this.stagingFacts["pregnant"]="Yes",n.push(this.staging.buildValueCoded("Is patient pregnant","Yes"))),n=n.concat(t.map(t=>{const{value:e,other:n}=t,i=n.factID;return this.stagingFacts[i]=(""+e).match(/Yes/i)?"Yes":"No",this.staging.buildValueCoded(n.concept,e)})),{obs:n,tag:"staging"}},options:t=>{if(Object(S["isEmpty"])(t.pregnancy_status)){const e=[];return this.isANCclient()&&!this.hasTransferLater(t)||e.push({label:"Pregnant?",value:"",other:{values:this.yesNoOptions(),concept:"Is patient pregnant",factID:"pregnant"}}),e.push({label:"Breastfeeding?",value:"",other:{values:this.yesNoOptions(),concept:"Is patient breast feeding",factID:"breastFeeding"}}),e}return t.pregnancy_status},condition:t=>this.hasStaging(t)&&this.stagingFacts.isChildBearing},{id:"patient_weight_chart",helpText:"Weight history",type:a["b"].TT_WEIGHT_CHART,options:async()=>{let t=await this.patient.getWeightHistory();return t=t.map(t=>({x:w["b"].toStandardHisDisplayFormat(t.date),y:t.weight})),[{label:"Weight for patient",value:"Weight trail",other:{values:t,age:this.patient.getAge(),bmi:this.bmiObj}}]},config:{hiddenFooterBtns:["Clear"]},condition:t=>this.hasStaging(t)&&this.showStagingWeightChart},{id:"stage_4_conditions",helpText:"Stage 4 conditions",type:a["b"].TT_MULTIPLE_SELECT,options:()=>this.buildStagingOptions(4,this.stagingFacts.stageFourConditions),onValue:t=>this.onStagingCondition(t),computedValue:t=>({tag:"staging",obs:t.map(t=>this.staging.buildWhoCriteriaObs(t.label))}),unload:t=>{this.stagingFacts.stageFourConditions=t.map(t=>t.label),this.updateStagingFacts()},onConditionFalse:()=>{this.stagingFacts.stageFourConditions=[],this.updateStagingFacts()},condition:t=>this.hasStaging(t)&&this.notAsymptomatic(t)},{id:"stage_3_conditions",helpText:"Stage 3 conditions",type:a["b"].TT_MULTIPLE_SELECT,options:()=>this.buildStagingOptions(3,this.stagingFacts.stageThreeConditions),onValue:t=>this.onStagingCondition(t),computedValue:t=>({tag:"staging",obs:t.map(t=>this.staging.buildWhoCriteriaObs(t.label))}),unload:t=>{this.stagingFacts.stageThreeConditions=t.map(t=>t.label),this.updateStagingFacts()},onConditionFalse:()=>{this.stagingFacts.stageThreeConditions=[],this.updateStagingFacts()},condition:t=>this.hasStaging(t)&&this.notAsymptomatic(t)},{id:"stage_2_conditions",helpText:"Stage 2 conditions",type:a["b"].TT_MULTIPLE_SELECT,options:()=>this.buildStagingOptions(2,this.stagingFacts.stageTwoConditions),onValue:t=>this.onStagingCondition(t),computedValue:t=>({tag:"staging",obs:t.map(t=>this.staging.buildWhoCriteriaObs(t.label))}),unload:t=>{this.stagingFacts.stageTwoConditions=t.map(t=>t.label),this.updateStagingFacts()},onConditionFalse:()=>{this.stagingFacts.stageTwoConditions=[],this.updateStagingFacts()},condition:t=>this.hasStaging(t)&&this.notAsymptomatic(t)},{id:"stage_1_conditions",helpText:"Stage 1 conditions",type:a["b"].TT_MULTIPLE_SELECT,validation:t=>{if(Object(S["isEmpty"])(t)&&Object(S["isEmpty"])(this.stagingFacts.selectedConditions))return["Please provide atleast one staging condition"]},options:()=>this.buildStagingOptions(1,this.stagingFacts.stageOneConditions),onValue:t=>this.onStagingCondition(t),computedValue:t=>{const e=t.map(t=>t.label);return this.stagingFacts.stageOneConditions=e,this.updateStagingFacts(),{tag:"staging",obs:e.map(t=>this.staging.buildWhoCriteriaObs(t))}},condition:t=>this.hasStaging(t)},{id:"cd4_available",helpText:"Recent CD4 count results available?",type:a["b"].TT_SELECT,condition:t=>this.hasStaging(t),validation:t=>v["a"].required(t),options:()=>this.yesNoOptions()},{id:"cd4_count",helpText:"CD4 Count",type:a["b"].TT_TEXT,computedValue:t=>{const e=t.value.toString(),n=e.charAt(0),i=parseInt(e.substring(1));return{tag:"staging",modifier:n,count:i,obs:this.staging.buildValueNumber("CD4 count",i,n)}},unload:(t,e,n,i)=>{const{count:a,modifier:o}=i["cd4_count"];this.stagingFacts.cd4=a,this.stagingFacts.cd4Modifier=o},onConditionFalse:()=>{this.stagingFacts.cd4=-1,this.stagingFacts.cd4Modifier=""},validation:t=>{const e=()=>this.staging.cd4CountIsValid(t.value);return this.validateSeries([()=>v["a"].required(t),()=>e()?null:["Please start with either modifier first: >, <, or ="]])},config:{customKeyboard:[A["b"],[["Unknown","Delete"]]]},condition:t=>this.hasStaging(t)&&"Yes"===t.cd4_available.value},...Object(D["b"])({id:"cd4_result_date",helpText:"Cd4 Results",required:!0,minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.staging.getDate(),condition:t=>this.hasStaging(t)&&"Yes"===t.cd4_available.value,estimation:{allowUnknown:!1},computeValue:(t,e)=>(this.stagingFacts.cd4Date=t,{date:t,tag:"staging",isEstimate:e,obs:this.staging.buildValueDate("Cd4 count datetime",t)})},this.staging.getDate()),{id:"location",helpText:"CD4 Location",type:a["b"].TT_SELECT,defaultValue:()=>y.getLocationName(),computedValue:({label:t})=>({tag:"staging",obs:this.staging.buildValueText("Cd4 count location",t)}),validation:t=>v["a"].required(t),options:(t,e="")=>this.getFacilities(e),config:{showKeyboard:!0,isFilterDataViaApi:!0},condition:t=>this.hasStaging(t)&&"Yes"===t.cd4_available.value}]}}});const I=_;e["a"]=I},e86e:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"d",(function(){return s})),n.d(e,"c",(function(){return r})),n.d(e,"f",(function(){return c})),n.d(e,"e",(function(){return d})),n.d(e,"a",(function(){return l})),n.d(e,"g",(function(){return u})),n.d(e,"h",(function(){return g}));var i=n("5713"),a=n("2ef0");async function o(t=""){const e=await i["a"].getFacilities({name:t});return e.filter(t=>!Object(a["isEmpty"])(t)&&""!=t.name.trim()).map(t=>({label:t.name,value:t.location_id,other:t}))}async function s(t=""){const e=await i["a"].getLabs({search_name:t});return e.map(t=>({label:t,value:t}))}async function r(t=""){const e=await i["a"].getFacilities({name:t,tag:"Facility adult sections"});return e.map(t=>({label:t.name,value:t.name,other:t}))}async function c(){const t=await i["a"].getSpecialistClinics();return t.map(t=>({label:t.name,value:t.name,other:t}))}async function d(){const t=await i["a"].getRegions();return t.map(t=>({label:t.name,value:t.region_id,other:t}))}async function l(t){const e=await i["a"].getDistricts(t);return e.map(t=>({label:t.name,value:t.district_id,other:t}))}async function u(t,e=""){const n=await i["a"].getTraditionalAuthorities(t,e);return n.map(t=>({label:t.name,value:t.traditional_authority_id,other:t}))}async function g(t,e=""){const n=await i["a"].getVillages(t,e);return n.map(t=>({label:t.name,value:t.village_id,other:t}))}}}]);
//# sourceMappingURL=chunk-13e9c9f8.7aba03be.js.map