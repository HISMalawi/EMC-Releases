(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e1cd824"],{3800:function(e,t,a){"use strict";a.d(t,"d",(function(){return n})),a.d(t,"e",(function(){return i})),a.d(t,"g",(function(){return o})),a.d(t,"n",(function(){return s})),a.d(t,"f",(function(){return r})),a.d(t,"b",(function(){return u})),a.d(t,"m",(function(){return l})),a.d(t,"k",(function(){return c})),a.d(t,"i",(function(){return d})),a.d(t,"a",(function(){return h})),a.d(t,"l",(function(){return p})),a.d(t,"c",(function(){return m})),a.d(t,"j",(function(){return v})),a.d(t,"h",(function(){return f}));const n=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","","Confirm"]],s=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],u=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],d=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],h=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],m=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],v=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,a){"use strict";a.d(t,"d",(function(){return o})),a.d(t,"g",(function(){return s})),a.d(t,"f",(function(){return r})),a.d(t,"e",(function(){return u})),a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return c})),a.d(t,"h",(function(){return h})),a.d(t,"a",(function(){return p}));var n=a("3800");const i=[n["m"],[["","Delete"]]],o=[n["k"],[["Delete"]]],s=[n["k"],[["Delete","Unknown"]]],r=[n["k"],[["N/A"],["Delete","Unknown"]]],u=[n["k"],[["Delete"]]],l=[n["k"],[["Unknown","Delete"],["Qwerty","A-Z"]]],c=[n["i"],[["Unknown"]]],d=[n["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],h=[n["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],p=[{btn:"0-9",keyboard:l},{btn:"?123",keyboard:i},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:h}]},7365:function(e,t,a){"use strict";a("14d9"),a("13d5");var n,i=a("7a23"),o=a("ad60"),s=a("2ef0"),r=a("0fa1"),u=a("7f35"),l=a("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(n||(n={}));const c=e=>l["b"].toStandardHisDisplayFormat(e),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(u["a"])("Data Integrity Issue Found","Patient died on "+c(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?n.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?n.CHANGE_PATIENT_OUTCOME:n.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const a=await Object(u["a"])("Data integrity issue found","",`Session date ${c(t)} is less than birth date of ${c(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===a?n.CHANGE_SESSION_DATE:n.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:a,apiDate:i})=>{const o=await Object(u["c"])("Please select a provider for "+t,`BDE: ${c(a)} | Current: ${c(i)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:n.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:n.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var h=a("c21d"),p=a("7920"),m=a("b5e4"),v=a("8e8b"),f=Object(i["defineComponent"])({components:{HisStandardForm:p["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),v["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const a={};if(a[n.SET_PROVIDER]=e=>{const[t]=e.split(" "),a=Object(s["find"])(this.providers,{username:t});return a&&(this.providerID=a.person_id),n.CONTINUE},a[n.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),n.EXIT),a[n.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),n.EXIT),a[n.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),n.EXIT),e in a)return a[e](t)},async checkEncounterGuidelines(){const e=Object(h["a"])(this.facts,d);for(const s in e){var t,a;const r=e[s];if(null!==r&&void 0!==r&&null!==(t=r.actions)&&void 0!==t&&t.alert){var i;const e=this.runflowState(await(null===r||void 0===r||null===(i=r.actions)||void 0===i?void 0:i.alert(this.facts)));if(e===n.EXIT)return}if(null!==r&&void 0!==r&&null!==(a=r.actions)&&void 0!==a&&a.selection){var o;const e=await(null===r||void 0===r||null===(o=r.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await v["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(m["c"])(""+e)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await v["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const a=e.username.toUpperCase(),n=t.username.toUpperCase();return a<n?-1:a>n?1:0}).map(e=>{var t;let a=""+e.username;if(!Object(s["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var n;const[t]=(null===(n=e.person)||void 0===n?void 0:n.names)||[];a+=` (${t.given_name} ${t.family_name})`}return a}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const a=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const a=t.obs?t.obs:t;return Array.isArray(a)?e=e.concat(a):"function"===typeof a?e.push(a()):e.push(a),e},[]);return Promise.all(a)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(a){return!1}},validateSeries(e){try{for(const t in e){const a=e[t]();if(a)return a}}catch(t){return[t]}}}});const b=f;t["a"]=b},7920:function(e,t,a){"use strict";var n=a("7a23");function i(e,t,a,i,o,s){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=a("9441"),s=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),r=a("d959"),u=a.n(r);const l=u()(s,[["render",i]]);t["a"]=l},b446:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return _}));a("14d9"),a("13d5");var n,i=a("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],s=a("9283"),r=a("2706"),u=a("3800"),l=a("6be2"),c=a("5a0c"),d=a.n(c),h=a("1c74");function p(e,t,a=!0){const n=[];return a&&n.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:i["b"].TT_TEXT,config:{customKeyboard:[u["k"],[n,["DELETE"]]]}}}function m(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:i["b"].TT_SELECT,options:()=>o}}function v(e,t){return{id:e,helpText:t+" Day",type:i["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function f(e,t){return{id:e,helpText:t+" Estimated period",type:i["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function b(e,t){return{id:e,helpText:t+" Age Estimate",type:i["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:l["e"]}}}function y(e){return parseInt(e)<10?"0"+e:e}async function D(e,t,a){if(t.defaultValue){const n=await t.defaultValue(e);if(n){const[e,t,i]=n.split("-");switch(a){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(i)||""}}}return""}function g(e){return s["b"].toStandardHisDisplayFormat(e)}function T(e,t,a,n){if(t.minDate){const i=t.minDate(a,n);if(new Date(e)<new Date(i))return[`${g(e)} is less than minimum date of ${g(i)}`]}if(t.maxDate){const i=t.maxDate(a,n);if(i&&new Date(e)>new Date(i))return[`${g(e)} is greater than max date of  ${g(i)}`]}}function _(e,t=""){let a="",i="",u="",l="",c=!1;const _="year_"+e.id,C="month_"+e.id,S="day_"+e.id,E="age_estimate_"+e.id,x="duration_estimate_"+e.id,w=p(_,e.helpText,e.estimation.allowUnknown),O=m(C,e.helpText),I=v(S,e.helpText),N=b(E,e.helpText),A=f(x,e.helpText),V="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,k=t=>!(t[_]&&t[_].value&&["Unknown"].includes(t[_].value))&&(!e.condition||e.condition(t)),P=(e,t)=>{const a=[{type:"year",value:i,default:"YYYY"},{type:"month",value:u,default:"MM"},{type:"day",value:l,default:"DD"}];return a.reduce((a,n)=>{const i=[null,void 0,"Unknown",""];return t===n.type?i.includes(e)?a.push(n.default):a.push(e):i.includes(n.value)?a.push(n.default):a.push(n.value),a},[]).join("-")};"function"===typeof e.init&&(w.init=e.init),w.updateHelpTextOnValue=e=>`${w.helpText} (${P(null===e||void 0===e?void 0:e.label,"year")})`,w.proxyID=e.id,w.unload=e=>i=e.value.toString(),w.config={...w.config,...e.config},w.defaultValue=t=>D(t,e,"Year"),w.condition=t=>!e.condition||e.condition(t),w.validation=(t,a,n)=>{if(e.required&&r["a"].required(t))return["Year cannot be empty"];const i=t?t.value:"";if(!e.estimation.allowUnknown&&i.toString().match(/unknown/i))return["Value unknown is not permitted"];if(i&&!["Unknown"].includes(i)&&isNaN(i)||i<1900)return["Invalid Year"];if(i&&"function"===typeof e.minDate){const t=s["b"].getYear(e.minDate(a,n));if(parseInt(i)<t)return[`Year of ${i} is less than Minimum year of ${t}`]}if(i&&"function"===typeof e.maxDate){const t=e.maxDate(a,n);if(t&&i>s["b"].getYear(t))return[`Year of ${i} exceeds Maximum year of ${s["b"].getYear(t)}`]}return null},w.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:a?g(a):"Unknown"}),w.appearInSummary=(t,a)=>a===e.id,w.computedValue=t=>{if(a){const[n,i,o]=a.split("-");return a=`${t.value}-${i}-${o}`,e.computeValue(a,!1)}if(t&&"Unknown"===t.value)return a="",e.computeValue("Unknown",!1)},O.updateHelpTextOnValue=e=>`${O.helpText} (${P(null===e||void 0===e?void 0:e.label,"month")})`,O.proxyID=e.id,O.unload=e=>u=y(e.value.toString()),O.condition=e=>k(e),O.validation=e=>r["a"].required(e),O.defaultValue=t=>D(t,e,"Month"),V&&(O.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),O.computedValue=(t,n)=>{if((""+t.value).match(/unknown/i))return a=n[_].value+"-07-15",e.computeValue(a,!0);if(a){const[n,i,o]=a.split("-"),s=y(""+t.value);return a=`${n}-${s}-${o}`,e.computeValue(a,!1)}},I.proxyID=e.id,I.updateHelpTextOnValue=e=>`${I.helpText} (${P(null===e||void 0===e?void 0:e.label,"day")})`,I.condition=e=>!(""+e[C].value).match(/unknown/i)&&k(e),I.validation=(t,n,o)=>r["a"].required(t)?["Day is required for date"]:(c=!!(""+t.value).match(/unknown/i),l=c?"15":y(""+t.value),a=`${i}-${u}-${l}`,T(a,e,n,o)),I.defaultValue=t=>D(t,e,"Day"),I.computedValue=()=>e.computeValue(a,c),I.unload=(t,a,n,i)=>{e.unload&&e.unload(t,a,n,i)},I.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(a,n),I.config={year:e=>e[_].value,month:e=>e[C].value},V||(I.config.keyboardActions=[]);const F=(t,a)=>{const n=["Unknown"===t[_].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===a];return n.every(Boolean)};return N.proxyID=e.id,N.validation=(t,n,i)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(o))return["Not a valid age estimate"];const s=d()(h["e"].getSessionDate()).subtract(t.value,"years").year();return a=s+"-07-15",T(a,e,n,i)},N.condition=e=>F(e,n.AGE_ESTIMATE_FIELD),N.computedValue=()=>e.computeValue(a,!0),N.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(a,n),A.proxyID=e.id,A.validation=(t,n,i)=>r["a"].required(t)?["Please select an estimate"]:(a=d()(h["e"].getSessionDate()).subtract(t.value,"day").format(s["a"]),T(a,e,n,i)),A.condition=e=>F(e,n.MONTH_ESTIMATE_FIELD),A.computedValue=()=>e.computeValue(a,!0),A.beforeNext=(t,n)=>!e.beforeNext||e.beforeNext(a,n),[w,O,I,N,A]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(n||(n={}))},c21d:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));a("14d9");function n(e,t){const a=[],n=[-1,"",null,void 0];for(const i in t){if(!(i in e))continue;const o=e[i];n.includes(o)?a.push(!1):a.push(t[i](o,e))}return a.every(Boolean)}function i(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function o(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function s(e,t,a="",s="",r="priority"){const u=[];for(const i in t){const o=t[i],r=[o.target&&a&&o.target!=a,o.targetEvent&&s&&o.targetEvent!=s];r.some(Boolean)||n(e,o.conditions)&&(o.title=i,o.description&&(o.description.text=o.description.info(e)),u.push(o))}return"priority"===r?i(u):o(u)}},e7aa:function(e,t,a){"use strict";a.r(t);var n=a("7a23");function i(e,t,a,i,o,s){const r=Object(n["resolveComponent"])("his-standard-form");return Object(n["openBlock"])(),Object(n["createBlock"])(r,{fields:e.fields,onFinishAction:e.onFinish,skipSummary:!1,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])}a("14d9");var o=a("d95e"),s=a("7920"),r=a("2706"),u=a("7365"),l=a("ade3"),c=a("cc6f");class d extends c["a"]{constructor(e,t){super(e,181,t),Object(l["a"])(this,"hivStatus",void 0),Object(l["a"])(this,"artStatus",void 0),Object(l["a"])(this,"arvNumber",void 0),Object(l["a"])(this,"arvStartDate",void 0),this.hivStatus="",this.artStatus="",this.arvNumber="",this.arvStartDate=""}getHivStatus(){return this.hivStatus}getArtStatus(){return this.artStatus}getArvNumber(){return this.arvNumber}getArvStartDate(){return this.arvStartDate}isHivPositive(){return!!this.hivStatus.match(/positive/i)}async loadArtStatus(){const e=await c["a"].getJson(`programs/12/patients/${this.patientID}/art_hiv_status`);e&&(this.hivStatus=e["hiv_status"]||this.hivStatus,this.artStatus=e["art_status"]||"",this.arvNumber=e["arv_number"]||"",this.arvStartDate=e["arv_start_date"]||"")}}var h=a("b5e4"),p=a("b446"),m=a("e86e"),v=a("8158"),f=a("23e6"),b=a("ad60"),y=Object(n["defineComponent"])({mixins:[u["a"]],components:{HisStandardForm:s["a"]},data:()=>({assessment:{},obs:[],showHIVQuestions:!0,alreadyEnrolled:!1,offerCxCa:!1}),watch:{patient:{async handler(){this.assessment=new d(this.patientID,this.providerID);new f["a"](await f["a"].findByID(this.patientID));const e=await b["a"].getProgramInformation(this.patientID);"Continue follow-up"===e.current_outcome&&(this.alreadyEnrolled=!0),v["a"].getConceptsByCategory("reason_for_no_cxca"),await this.assessment.loadArtStatus();this.assessment.getHivStatus();""!==this.assessment.getHivStatus()&&(this.showHIVQuestions=!1),"Positive"===this.assessment.getHivStatus()&&(this.showHIVQuestions=!1),await this.setOfferCxCa(),this.fields=await this.getFields()},deep:!0}},methods:{async onFinish(e,t){const a=await this.assessment.createEncounter();if(!a)return Object(h["e"])("Unable to create encounter");const n=[];Object.keys(t).forEach(e=>{n.push(t[e].obs)});const i=await Promise.all([...this.obs,...n]),o=await this.assessment.saveObservationList(i);if(!o)return Object(h["e"])("Unable to save patient observations");Object(h["d"])("Observations and encounter created!"),this.nextTask()},async setOfferCxCa(){const e=await this.assessment.getFirstValueCoded("Offer CxCa");return this.offerCxCa=e&&"Yes"===e,this.offerCxCa||this.obs.push(this.assessment.buildValueCoded("Ever had CxCa","No")),!0},hasHIVStatus(){return""!==this.assessment.getHivStatus},enterPreviousCxCaData(e){const t="Yes"===e.ever_had_cxca.value,a="Yes"===e.results_available.value;return t&&a},getFacilities(e=""){return Object(m["b"])(e)},getReasonsForNoCxcaOptions(){return v["a"].getConceptsByCategory("reason_for_no_cxca").map(e=>({label:e.name,value:e.name,other:{c:e}}))},getFields(){return[{id:"reason_for_visit",helpText:"Reason for visit",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),options:()=>[{label:"Initial screening",value:"Initial screening"},{label:"Postponed treatmment",value:"Postponed treatment"},{label:"One year subsequent check-up after treatment",value:"One year subsequent check-up after treatment"},{label:"Subsequent screening",value:"Subsequent screening"},{label:"Problem visit after treatment",value:"Problem visit after treatment"},{label:"Referral",value:"Referral"}],computedValue:e=>({obs:this.assessment.buildValueCoded("Reason for visit",e.value)})},{id:"hiv_status",helpText:"HIV status",type:o["b"].TT_SELECT,condition:()=>this.showHIVQuestions,validation:e=>r["a"].required(e),options:()=>[{label:"Positive on ART",value:"Positive on ART"},{label:"Positive Not on ART",value:"Positive Not on ART"},{label:"Negative",value:"Negative"},{label:"Never tested",value:"Never tested"},{label:"Prefers Not to disclose",value:"Undisclosed"}],computedValue:e=>({obs:this.assessment.buildValueCoded("HIV status",e.value)})},...Object(p["b"])({id:"hiv_test_date",helpText:"HIV test result date",required:!0,condition:e=>e.hiv_status.value.match(/Negative|ART/i),minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.assessment.getDate(),estimation:{allowUnknown:!0,estimationFieldType:p["a"].MONTH_ESTIMATE_FIELD},computeValue:(e,t)=>({date:e,tag:"cxca screening",isEstimate:t,obs:this.assessment.buildValueDate("HIV test date",e,t)})},this.assessment.getDate()),{id:"ever_had_cxca",helpText:"Ever had CxCa screening",type:o["b"].TT_SELECT,condition:e=>"Initial screening"!==e.reason_for_visit.value&&0==this.alreadyEnrolled,options:()=>this.yesNoOptions(),validation:e=>r["a"].required(e),computedValue:e=>({obs:this.assessment.buildValueCoded("Ever had CxCa",e.value)})},{id:"results_available",helpText:"Results available?",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),condition:e=>"Initial screening"!==e.reason_for_visit.value&&"No"!==e.ever_had_cxca.value,options:()=>this.yesNoOptions(),computedValue:e=>({obs:this.assessment.buildValueCoded("CxCa test results",e.value)})},{id:"location",helpText:"CxCa screening location",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),options:(e,t="")=>this.getFacilities(t),config:{showKeyboard:!0,isFilterDataViaApi:!0},condition:e=>this.enterPreviousCxCaData(e),computedValue:e=>({obs:this.assessment.buildValueText("Previous CxCa location",e.value)})},...Object(p["b"])({id:"cxca_date",helpText:"Previous CxCa test",required:!0,minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.assessment.getDate(),estimation:{allowUnknown:!1},condition:e=>this.enterPreviousCxCaData(e),computeValue:(e,t)=>({date:e,tag:"cxca screening",isEstimate:t,obs:this.assessment.buildValueDate("cxca test date",e)})},this.assessment.getDate()),{id:"previous_screening_method",helpText:"Previous screening method",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),condition:e=>this.enterPreviousCxCaData(e),options:()=>[{label:"VIA",value:"VIA"},{label:"PAP Smear",value:"PAP Smear"},{label:"HPV DNA",value:"HPV DNA"},{label:"Speculum Exam",value:"Speculum Exam"}],computedValue:e=>({obs:this.assessment.buildValueCoded("Previous CxCa screening method",e.value)})},{id:"offer_CxCa",helpText:"Offer CxCa screening today",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),options:()=>this.yesNoOptions(),computedValue:e=>({obs:this.assessment.buildValueCoded("Offer CxCa",e.value)})},{id:"screening_method",helpText:"Screening method being offered",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),condition:e=>"Yes"===e.offer_CxCa.value,options:()=>[{label:"VIA",value:"VIA"},{label:"PAP Smear",value:"PAP Smear"},{label:"HPV DNA",value:"HPV DNA"},{label:"Speculum Exam",value:"Speculum Exam"}],computedValue:e=>({obs:this.assessment.buildValueCoded("CxCa screening method",e.value)})},{id:"reason_for_no_cxca",helpText:"Reason for NOT offering CxCa screening",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),condition:e=>"No"===e.offer_CxCa.value,options:()=>this.getReasonsForNoCxcaOptions(),computedValue:e=>({obs:this.assessment.buildValueCoded("Reason for NOT offering CxCa",e.value)})}]}}}),D=a("d959"),g=a.n(D);const T=g()(y,[["render",i]]);t["default"]=T},e86e:function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"d",(function(){return s})),a.d(t,"c",(function(){return r})),a.d(t,"f",(function(){return u})),a.d(t,"e",(function(){return l})),a.d(t,"a",(function(){return c})),a.d(t,"g",(function(){return d})),a.d(t,"h",(function(){return h}));var n=a("5713"),i=a("2ef0");async function o(e=""){const t=await n["a"].getFacilities({name:e});return t.filter(e=>!Object(i["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function s(e=""){const t=await n["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function r(e=""){const t=await n["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function u(){const e=await n["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function l(){const e=await n["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function c(e){const t=await n["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function d(e,t=""){const a=await n["a"].getTraditionalAuthorities(e,t);return a.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function h(e,t=""){const a=await n["a"].getVillages(e,t);return a.map(e=>({label:e.name,value:e.village_id,other:e}))}}}]);
//# sourceMappingURL=chunk-4e1cd824.679faf4a.js.map