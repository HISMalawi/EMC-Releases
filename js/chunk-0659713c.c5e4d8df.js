(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0659713c"],{3800:function(e,t,i){"use strict";i.d(t,"d",(function(){return n})),i.d(t,"e",(function(){return a})),i.d(t,"g",(function(){return o})),i.d(t,"n",(function(){return s})),i.d(t,"f",(function(){return r})),i.d(t,"b",(function(){return l})),i.d(t,"m",(function(){return u})),i.d(t,"k",(function(){return c})),i.d(t,"i",(function(){return d})),i.d(t,"a",(function(){return p})),i.d(t,"l",(function(){return v})),i.d(t,"c",(function(){return h})),i.d(t,"j",(function(){return m})),i.d(t,"h",(function(){return b}));const n=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","","Confirm"]],s=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],l=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],u=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],p=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],v=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],m=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],b=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,i){"use strict";i.d(t,"d",(function(){return o})),i.d(t,"g",(function(){return s})),i.d(t,"f",(function(){return r})),i.d(t,"e",(function(){return l})),i.d(t,"c",(function(){return u})),i.d(t,"b",(function(){return c})),i.d(t,"h",(function(){return p})),i.d(t,"a",(function(){return v}));var n=i("3800");const a=[n["m"],[["","Delete"]]],o=[n["k"],[["Delete"]]],s=[n["k"],[["Delete","Unknown"]]],r=[n["k"],[["N/A"],["Delete","Unknown"]]],l=[n["k"],[["Delete"]]],u=[n["k"],[["Unknown","Delete"],["Qwerty","A-Z"]]],c=[n["i"],[["Unknown"]]],d=[n["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],p=[n["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],v=[{btn:"0-9",keyboard:u},{btn:"?123",keyboard:a},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:p}]},7365:function(e,t,i){"use strict";i("14d9"),i("13d5");var n,a=i("7a23"),o=i("ad60"),s=i("2ef0"),r=i("0fa1"),l=i("7f35"),u=i("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(n||(n={}));const c=e=>u["b"].toStandardHisDisplayFormat(e),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(l["a"])("Data Integrity Issue Found","Patient died on "+c(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?n.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?n.CHANGE_PATIENT_OUTCOME:n.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const i=await Object(l["a"])("Data integrity issue found","",`Session date ${c(t)} is less than birth date of ${c(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===i?n.CHANGE_SESSION_DATE:n.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:i,apiDate:a})=>{const o=await Object(l["c"])("Please select a provider for "+t,`BDE: ${c(i)} | Current: ${c(a)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:n.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:n.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var p=i("c21d"),v=i("7920"),h=i("b5e4"),m=i("8e8b"),b=Object(a["defineComponent"])({components:{HisStandardForm:v["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),m["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const i={};if(i[n.SET_PROVIDER]=e=>{const[t]=e.split(" "),i=Object(s["find"])(this.providers,{username:t});return i&&(this.providerID=i.person_id),n.CONTINUE},i[n.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),n.EXIT),i[n.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),n.EXIT),i[n.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),n.EXIT),e in i)return i[e](t)},async checkEncounterGuidelines(){const e=Object(p["a"])(this.facts,d);for(const s in e){var t,i;const r=e[s];if(null!==r&&void 0!==r&&null!==(t=r.actions)&&void 0!==t&&t.alert){var a;const e=this.runflowState(await(null===r||void 0===r||null===(a=r.actions)||void 0===a?void 0:a.alert(this.facts)));if(e===n.EXIT)return}if(null!==r&&void 0!==r&&null!==(i=r.actions)&&void 0!==i&&i.selection){var o;const e=await(null===r||void 0===r||null===(o=r.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await m["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(h["c"])(""+e)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await m["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const i=e.username.toUpperCase(),n=t.username.toUpperCase();return i<n?-1:i>n?1:0}).map(e=>{var t;let i=""+e.username;if(!Object(s["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var n;const[t]=(null===(n=e.person)||void 0===n?void 0:n.names)||[];i+=` (${t.given_name} ${t.family_name})`}return i}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const i=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const i=t.obs?t.obs:t;return Array.isArray(i)?e=e.concat(i):"function"===typeof i?e.push(i()):e.push(i),e},[]);return Promise.all(i)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(i){return!1}},validateSeries(e){try{for(const t in e){const i=e[t]();if(i)return i}}catch(t){return[t]}}}});const T=b;t["a"]=T},7920:function(e,t,i){"use strict";var n=i("7a23");function a(e,t,i,a,o,s){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=i("9441"),s=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),r=i("d959"),l=i.n(r);const u=l()(s,[["render",a]]);t["a"]=u},b446:function(e,t,i){"use strict";i.d(t,"a",(function(){return n})),i.d(t,"b",(function(){return E}));i("14d9"),i("13d5");var n,a=i("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],s=i("9283"),r=i("2706"),l=i("3800"),u=i("6be2"),c=i("5a0c"),d=i.n(c),p=i("1c74");function v(e,t,i=!0){const n=[];return i&&n.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:a["b"].TT_TEXT,config:{customKeyboard:[l["k"],[n,["DELETE"]]]}}}function h(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:a["b"].TT_SELECT,options:()=>o}}function m(e,t){return{id:e,helpText:t+" Day",type:a["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function b(e,t){return{id:e,helpText:t+" Estimated period",type:a["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function T(e,t){return{id:e,helpText:t+" Age Estimate",type:a["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:u["e"]}}}function f(e){return parseInt(e)<10?"0"+e:e}async function y(e,t,i){if(t.defaultValue){const n=await t.defaultValue(e);if(n){const[e,t,a]=n.split("-");switch(i){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(a)||""}}}return""}function _(e){return s["b"].toStandardHisDisplayFormat(e)}function D(e,t,i,n){if(t.minDate){const a=t.minDate(i,n);if(new Date(e)<new Date(a))return[`${_(e)} is less than minimum date of ${_(a)}`]}if(t.maxDate){const a=t.maxDate(i,n);if(a&&new Date(e)>new Date(a))return[`${_(e)} is greater than max date of  ${_(a)}`]}}function E(e,t=""){let i="",a="",l="",u="",c=!1;const E="year_"+e.id,O="month_"+e.id,S="day_"+e.id,N="age_estimate_"+e.id,g="duration_estimate_"+e.id,A=v(E,e.helpText,e.estimation.allowUnknown),I=h(O,e.helpText),w=m(S,e.helpText),C=T(N,e.helpText),V=b(g,e.helpText),x="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,k=t=>!(t[E]&&t[E].value&&["Unknown"].includes(t[E].value))&&(!e.condition||e.condition(t)),P=(e,t)=>{const i=[{type:"year",value:a,default:"YYYY"},{type:"month",value:l,default:"MM"},{type:"day",value:u,default:"DD"}];return i.reduce((i,n)=>{const a=[null,void 0,"Unknown",""];return t===n.type?a.includes(e)?i.push(n.default):i.push(e):a.includes(n.value)?i.push(n.default):i.push(n.value),i},[]).join("-")};"function"===typeof e.init&&(A.init=e.init),A.updateHelpTextOnValue=e=>`${A.helpText} (${P(null===e||void 0===e?void 0:e.label,"year")})`,A.proxyID=e.id,A.unload=e=>a=e.value.toString(),A.config={...A.config,...e.config},A.defaultValue=t=>y(t,e,"Year"),A.condition=t=>!e.condition||e.condition(t),A.validation=(t,i,n)=>{if(e.required&&r["a"].required(t))return["Year cannot be empty"];const a=t?t.value:"";if(!e.estimation.allowUnknown&&a.toString().match(/unknown/i))return["Value unknown is not permitted"];if(a&&!["Unknown"].includes(a)&&isNaN(a)||a<1900)return["Invalid Year"];if(a&&"function"===typeof e.minDate){const t=s["b"].getYear(e.minDate(i,n));if(parseInt(a)<t)return[`Year of ${a} is less than Minimum year of ${t}`]}if(a&&"function"===typeof e.maxDate){const t=e.maxDate(i,n);if(t&&a>s["b"].getYear(t))return[`Year of ${a} exceeds Maximum year of ${s["b"].getYear(t)}`]}return null},A.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:i?_(i):"Unknown"}),A.appearInSummary=(t,i)=>i===e.id,A.computedValue=t=>{if(i){const[n,a,o]=i.split("-");return i=`${t.value}-${a}-${o}`,e.computeValue(i,!1)}if(t&&"Unknown"===t.value)return i="",e.computeValue("Unknown",!1)},I.updateHelpTextOnValue=e=>`${I.helpText} (${P(null===e||void 0===e?void 0:e.label,"month")})`,I.proxyID=e.id,I.unload=e=>l=f(e.value.toString()),I.condition=e=>k(e),I.validation=e=>r["a"].required(e),I.defaultValue=t=>y(t,e,"Month"),x&&(I.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),I.computedValue=(t,n)=>{if((""+t.value).match(/unknown/i))return i=n[E].value+"-07-15",e.computeValue(i,!0);if(i){const[n,a,o]=i.split("-"),s=f(""+t.value);return i=`${n}-${s}-${o}`,e.computeValue(i,!1)}},w.proxyID=e.id,w.updateHelpTextOnValue=e=>`${w.helpText} (${P(null===e||void 0===e?void 0:e.label,"day")})`,w.condition=e=>!(""+e[O].value).match(/unknown/i)&&k(e),w.validation=(t,n,o)=>r["a"].required(t)?["Day is required for date"]:(c=!!(""+t.value).match(/unknown/i),u=c?"15":f(""+t.value),i=`${a}-${l}-${u}`,D(i,e,n,o)),w.defaultValue=t=>y(t,e,"Day"),w.computedValue=()=>e.computeValue(i,c),w.unload=(t,i,n,a)=>{e.unload&&e.unload(t,i,n,a)},w.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(i,n),w.config={year:e=>e[E].value,month:e=>e[O].value},x||(w.config.keyboardActions=[]);const R=(t,i)=>{const n=["Unknown"===t[E].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===i];return n.every(Boolean)};return C.proxyID=e.id,C.validation=(t,n,a)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(o))return["Not a valid age estimate"];const s=d()(p["e"].getSessionDate()).subtract(t.value,"years").year();return i=s+"-07-15",D(i,e,n,a)},C.condition=e=>R(e,n.AGE_ESTIMATE_FIELD),C.computedValue=()=>e.computeValue(i,!0),C.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(i,n),V.proxyID=e.id,V.validation=(t,n,a)=>r["a"].required(t)?["Please select an estimate"]:(i=d()(p["e"].getSessionDate()).subtract(t.value,"day").format(s["a"]),D(i,e,n,a)),V.condition=e=>R(e,n.MONTH_ESTIMATE_FIELD),V.computedValue=()=>e.computeValue(i,!0),V.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(i,n),[A,I,w,C,V]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(n||(n={}))},c21d:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));i("14d9");function n(e,t){const i=[],n=[-1,"",null,void 0];for(const a in t){if(!(a in e))continue;const o=e[a];n.includes(o)?i.push(!1):i.push(t[a](o,e))}return i.every(Boolean)}function a(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function o(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function s(e,t,i="",s="",r="priority"){const l=[];for(const a in t){const o=t[a],r=[o.target&&i&&o.target!=i,o.targetEvent&&s&&o.targetEvent!=s];r.some(Boolean)||n(e,o.conditions)&&(o.title=a,o.description&&(o.description.text=o.description.info(e)),l.push(o))}return"priority"===r?a(l):o(l)}},d8ba:function(e,t,i){"use strict";i.r(t);var n=i("7a23");function a(e,t,i,a,o,s){const r=Object(n["resolveComponent"])("his-standard-form"),l=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(l,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(r,{fields:e.formFields,skipSummary:!0,onFinishAction:e.onFinish,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]),_:1})}i("14d9");var o,s=i("7365"),r=i("d95e"),l=i("9e49"),u=i("2706"),c=i("d867"),d=i("b446"),p=i("9283"),v=i("ad49");function h(){return v["a"].isProp(o.RECENCY_ESSAY_ACTIVATED+"=Yes")}(function(e){e["RECENCY_ESSAY_ACTIVATED"]="recency_essay_activated"})(o||(o={}));var m={recencyEssayActivated:h},b=i("b5e4"),T=i("2ef0"),f=Object(n["defineComponent"])({components:{IonPage:c["D"]},mixins:[s["a"]],data:()=>({formFields:[],arvNumber:"",hivStatus:"",artStatus:"",arvStartDate:"",recencyEssayActivated:!1,riskOfPreclampsia:null,service:{}}),watch:{ready:{async handler(e){e&&(this.service=new l["a"](this.patientID,this.providerID),await this.service.loadSubsequentVisit(),await this.service.loadArtStatus(),this.recencyEssayActivated=await m.recencyEssayActivated(),this.formFields=this.getFields())},immediate:!0}},methods:{async onFinish(e,t){const i=await this.resolveObs(t);await this.service.createEncounter(),await this.service.saveObservationList(i),await this.service.printLabResults(),this.nextTask()},getFields(){return[{id:"art_summary",helpText:"ART Summary",type:r["b"].TT_SUMMARY,condition:()=>this.service.isHivPositive(),options:()=>[{label:"HIV Status",value:`\n                                <b style="color:${this.service.isHivPositive()?"red":"green"}">\n                                    ${this.service.getHivStatus()}\n                                </b>\n                            `},{label:"On Art",value:this.service.getArtStatus()||"N/A"},{label:"Art Start date",value:p["b"].toStandardHisDisplayFormat(this.service.getArvStartDate())||"N/A"},{label:"ARV Number",value:this.service.getArvNumber()||"N/A"}]},{id:"lab_results",helpText:"Lab Results",type:r["b"].TT_MULTIPLE_YES_NO,condition:()=>!this.service.isPregnancyTestDone&&!this.hivStatus,options:e=>{if(e.lab_results)return e.lab_results;const t=[];return this.service.isPrengnacyTestDone||t.push(this.toYesNoOption("Pregnancy test done",{concept:"B-HCG"})),this.service.hivStatus||t.push(this.toYesNoOption("Previous HIV test done",{concept:"Previous HIV test done"})),t},validation:e=>u["a"].required(e),computedValue:e=>e.map(e=>this.service.buildValueCoded(e.other.concept,e.value))},{id:"prev_hiv_test_result",helpText:"Previous HIV test results",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),condition:e=>this.inArray(e.lab_results,e=>"Previous HIV test done"===e.label&&"Yes"===e.value),options:()=>this.mapStrToOptions(["Negative","Positive","Inconclusive","Unknown"]),computedValue:e=>this.service.buildValueCoded("Previous HIV Test Results",e.value)},...Object(d["b"])({id:"prev_hiv_test_date",helpText:"Previous HIV test",required:!0,minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.service.getDate(),estimation:{allowUnknown:!1},condition:e=>{var t;return!(null===(t=e.prev_hiv_test_result)||void 0===t||!t.value)},computeValue:e=>this.service.buildValueDate("Previous HIV Test Date",e)}),{id:"on_art",helpText:"Patient on ART",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),computedValue:e=>this.service.buildValueCoded("On Art",e.value),condition:e=>"Positive"===e.prev_hiv_test_result.value,options:()=>this.yesNoOptions()},{id:"arv_number",helpText:"ARV Number",type:r["b"].TT_TEXT,validation:e=>u["a"].required(e),computedValue:e=>this.service.buildValueText("Art number",e.value),condition:e=>"Yes"===e.on_art.value},{id:"recency_essay",helpText:"Rapid Recency Essay - Asante Results",type:r["b"].TT_MULTIPLE_YES_NO,condition:e=>"Positive"===e.prev_hiv_test_result.value&&this.recencyEssayActivated,computedValue:e=>e?e.map(e=>this.service.buildValueCoded(e.label,e.value)):null,options:e=>e.recency_essay?e.recency_essay:[this.toYesNoOption("Line 1. Control Line Present"),this.toYesNoOption("Line 2. Positive Verification Line Present"),this.toYesNoOption("Line 3. Long-Term Line Present")]},{id:"available_test_results",helpText:"Available Lab Tests",type:r["b"].TT_MULTIPLE_SELECT,validation:e=>u["a"].required(e),computedValue:e=>Object(T["find"])(e,{label:"None"})?this.service.buildValueCoded("Lab test done","No"):null,onValueUpdate(e,t){return e.map(e=>("None"===t.value&&"None"!=e.value&&(e.isChecked=!1),"None"!=t.value&&t.isChecked&&"None"===e.value&&(e.isChecked=!1),e))},options:async e=>{var t;const i=[],n=!!this.service.isHivPositive()||"Positive"===(null===(t=e.prev_hiv_test_result)||void 0===t?void 0:t.value);n||i.push(this.toOption("HIV")),i.push(this.toOption("HB")),i.push(this.toOption("Syphilis")),i.push(this.toOption("Malaria")),i.push(this.toOption("Blood Group"));const a={label:"Urine",value:"Urine",isChecked:!1};if(null===this.riskOfPreclampsia&&(this.riskOfPreclampsia=await this.service.isAtRiskOfPreEclampsia(),this.riskOfPreclampsia)){const e=await Object(b["a"])("Select urine test to conduct urine protein test",{header:"Client is at risk of pre-eclampsia.",cancelBtnLabel:"Remind later",confirmBtnLabel:"Select Urine Test"});a.isChecked=e}return[...i,a,this.toOption("None")]},config:{footerBtns:[{name:"None",slot:"end",onClickComponentEvents:{refreshOptions:(e,t)=>t.map(e=>(e.isChecked="None"===e.label,e))},onClick:()=>"None"}]},exitsForm:e=>Object(T["find"])(e.available_test_results,{label:"None"})},{id:"hiv_status",helpText:"HIV Test Result",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),condition:e=>e.available_test_results.map(e=>e.value).includes("HIV"),computedValue:e=>this.service.buildValueCoded("HIV status",e.value),options:()=>this.mapStrToOptions(["Negative","Positive","Inconclusive"])},{id:"on_art_1",helpText:"Patient on ART",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),condition:e=>"Positive"===e.hiv_status.value,computedValue:e=>this.service.buildValueCoded("On Art",e.value),options:()=>this.yesNoOptions()},{id:"arv_number_1",helpText:"ARV Number",type:r["b"].TT_TEXT,validation:e=>u["a"].required(e),computedValue:e=>this.service.buildValueText("Art number",e.value),condition:e=>"Yes"===e.on_art_1.value},{id:"recency_essay_1",helpText:"Rapid Recency Essay - Asante Results",type:r["b"].TT_MULTIPLE_YES_NO,condition:e=>"Positive"===e.hiv_status.value&&this.recencyEssayActivated,computedValue:e=>e?e.map(e=>this.service.buildValueCoded(e.label,e.value)):null,options:()=>[this.toYesNoOption("Line 1. Control Line Present"),this.toYesNoOption("Line 2. Positive Verification Line Present"),this.toYesNoOption("Line 3. Long-term Line Present")]},{id:"hb_result",helpText:"HB Test Result (g/dl)",type:r["b"].TT_NUMBER,validation:e=>this.validateSeries([()=>u["a"].required(e),()=>u["a"].rangeOf(e,2,16)]),computedValue:e=>this.service.buildValueNumber("HB Test Result",e.value),condition:e=>e.available_test_results.map(e=>e.value).includes("HB")},{id:"syphilis",helpText:"Syphilis Test Result",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),computedValue:e=>this.service.buildValueCoded("Syphilis Test Result",e.value),condition:e=>e.available_test_results.map(e=>e.value).includes("Syphilis"),options:()=>this.mapStrToOptions(["Negative","Positive"])},{id:"malaria",helpText:"Malaria Test Result",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),condition:e=>e.available_test_results.map(e=>e.value).includes("Malaria"),computedValue:e=>this.service.buildValueCoded("Malaria Test Result",e.value),options:()=>this.mapStrToOptions(["Negative","Positive"])},{id:"blood_group",helpText:"Blood Group Test Result",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),condition:e=>e.available_test_results.map(e=>e.value).includes("Blood Group"),computedValue:e=>this.service.buildValueText("Blood group",e.value),options:()=>this.mapStrToOptions(["A+","A-","B+","B-","AB+","AB-","O+","O-"])},{id:"available_urine_tests",helpText:"Available Urine Tests Results",type:r["b"].TT_MULTIPLE_SELECT,validation:e=>u["a"].required(e),condition:e=>e.available_test_results.map(e=>e.value).includes("Urine"),options:()=>this.mapStrToOptions(["Protein","Glucose","WBC","RBC","Nitrate"]),config:{buildOptionsOnce:!0}},{id:"protein",helpText:"Urine Protein Test Result",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),condition:e=>e.available_urine_tests.map(e=>e.value).includes("Protein"),computedValue:e=>this.service.buildValueText("Urine protein",e.value),options:()=>this.mapStrToOptions(["Negative","(+)","+","++","+++","++++"])},{id:"glucose",helpText:"Glucose Test Result (mg/dl)",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),condition:e=>e.available_urine_tests.map(e=>e.value).includes("Glucose"),computedValue:e=>this.service.buildValueText("Blood glucose",e.value),options:()=>this.mapStrToOptions(["Normal","+","++","+++"])},{id:"wbc",helpText:"White Blood Cells Test Result (cmm)",type:r["b"].TT_NUMBER,validation:e=>this.validateSeries([()=>u["a"].required(e),()=>u["a"].rangeOf(e,1,1e6)]),computedValue:e=>this.service.buildValueNumber("White blood cells",e.value),condition:e=>e.available_urine_tests.map(e=>e.value).includes("WBC")},{id:"rbc",helpText:"Red Blood Cells Test Result (cmm)",type:r["b"].TT_NUMBER,validation:e=>this.validateSeries([()=>u["a"].required(e),()=>u["a"].rangeOf(e,1,1e6)]),computedValue:e=>this.service.buildValueNumber("Red blood cells",e.value),condition:e=>e.available_urine_tests.map(e=>e.value).includes("RBC")},{id:"nitrate",helpText:"Nitrate Test Result",type:r["b"].TT_SELECT,validation:e=>u["a"].required(e),computedValue:e=>this.service.buildValueCoded("Urine Nitrate Test",e.value),condition:e=>e.available_urine_tests.map(e=>e.value).includes("Nitrate"),options:()=>this.mapStrToOptions(["Negative","Trace","Positive"])}]}}}),y=i("d959"),_=i.n(y);const D=_()(f,[["render",a]]);t["default"]=D}}]);
//# sourceMappingURL=chunk-0659713c.c5e4d8df.js.map