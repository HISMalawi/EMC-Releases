(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-891099f0"],{3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"k",(function(){return i})),n.d(t,"f",(function(){return o})),n.d(t,"n",(function(){return s})),n.d(t,"e",(function(){return r})),n.d(t,"b",(function(){return u})),n.d(t,"m",(function(){return l})),n.d(t,"j",(function(){return c})),n.d(t,"h",(function(){return T})),n.d(t,"a",(function(){return d})),n.d(t,"l",(function(){return m})),n.d(t,"c",(function(){return h})),n.d(t,"i",(function(){return _})),n.d(t,"g",(function(){return p}));const a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],s=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],r=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],u=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],T=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],d=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],m=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],_=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],p=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"g",(function(){return s})),n.d(t,"f",(function(){return r})),n.d(t,"e",(function(){return u})),n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return c})),n.d(t,"h",(function(){return d})),n.d(t,"a",(function(){return m}));var a=n("3800");const i=[a["m"],[["","Delete"]]],o=[a["j"],[["Delete"]]],s=[a["j"],[["Delete","Unknown"]]],r=[a["j"],[["N/A"],["Delete","Unknown"]]],u=[a["j"],[["Delete"]]],l=[a["j"],[["Unknown","Delete"],["Qwerty","A-Z"]]],c=[a["h"],[["Unknown"]]],T=[a["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],d=[a["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],m=[{btn:"0-9",keyboard:l},{btn:"?123",keyboard:i},{btn:"A-Z",keyboard:T},{btn:"Qwerty",keyboard:d}]},7365:function(e,t,n){"use strict";n("14d9"),n("13d5");var a,i=n("7a23"),o=n("ad60"),s=n("2ef0"),r=n("0fa1"),u=n("7f35"),l=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(a||(a={}));const c=e=>l["b"].toStandardHisDisplayFormat(e),T={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(u["a"])("Data Integrity Issue Found","Patient died on "+c(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?a.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?a.CHANGE_PATIENT_OUTCOME:a.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const n=await Object(u["a"])("Data integrity issue found","",`Session date ${c(t)} is less than birth date of ${c(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?a.CHANGE_SESSION_DATE:a.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:n,apiDate:i})=>{const o=await Object(u["c"])("Please select a provider for "+t,`BDE: ${c(n)} | Current: ${c(i)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:a.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:a.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var d=n("c21d"),m=n("7920"),h=n("b5e4"),_=n("8e8b"),p=Object(i["defineComponent"])({components:{HisStandardForm:m["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),_["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[a.SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(s["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),a.CONTINUE},n[a.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),a.EXIT),n[a.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),a.EXIT),n[a.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),a.EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(d["a"])(this.facts,T);for(const s in e){var t,n;const r=e[s];if(null!==r&&void 0!==r&&null!==(t=r.actions)&&void 0!==t&&t.alert){var i;const e=this.runflowState(await(null===r||void 0===r||null===(i=r.actions)||void 0===i?void 0:i.alert(this.facts)));if(e===a.EXIT)return}if(null!==r&&void 0!==r&&null!==(n=r.actions)&&void 0!==n&&n.selection){var o;const e=await(null===r||void 0===r||null===(o=r.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await _["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(h["c"])(""+e)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await _["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),a=t.username.toUpperCase();return n<a?-1:n>a?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(s["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var a;const[t]=(null===(a=e.person)||void 0===a?void 0:a.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const E=p;t["a"]=E},7920:function(e,t,n){"use strict";var a=n("7a23");function i(e,t,n,i,o,s){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),s=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),r=n("6b0d"),u=n.n(r);const l=u()(s,[["render",i]]);t["a"]=l},b446:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return S}));n("14d9"),n("13d5");var a,i=n("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],s=n("9283"),r=n("2706"),u=n("3800"),l=n("6be2"),c=n("5a0c"),T=n.n(c),d=n("1c74");function m(e,t,n=!0){const a=[];return n&&a.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:i["b"].TT_TEXT,config:{customKeyboard:[u["j"],[a,["DELETE"]]]}}}function h(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:i["b"].TT_SELECT,options:()=>o}}function _(e,t){return{id:e,helpText:t+" Day",type:i["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function p(e,t){return{id:e,helpText:t+" Estimated period",type:i["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function E(e,t){return{id:e,helpText:t+" Age Estimate",type:i["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:l["e"]}}}function v(e){return parseInt(e)<10?"0"+e:e}async function f(e,t,n){if(t.defaultValue){const a=await t.defaultValue(e);if(a){const[e,t,i]=a.split("-");switch(n){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(i)||""}}}return""}function b(e){return s["b"].toStandardHisDisplayFormat(e)}function I(e,t,n,a){if(t.minDate){const i=t.minDate(n,a);if(new Date(e)<new Date(i))return[`${b(e)} is less than minimum date of ${b(i)}`]}if(t.maxDate){const i=t.maxDate(n,a);if(i&&new Date(e)>new Date(i))return[`${b(e)} is greater than max date of  ${b(i)}`]}}function S(e,t=""){let n="",i="",u="",l="",c=!1;const S="year_"+e.id,D="month_"+e.id,N="day_"+e.id,C="age_estimate_"+e.id,A="duration_estimate_"+e.id,y=m(S,e.helpText,e.estimation.allowUnknown),g=h(D,e.helpText),O=_(N,e.helpText),P=E(C,e.helpText),R=p(A,e.helpText),H="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,F=t=>!(t[S]&&t[S].value&&["Unknown"].includes(t[S].value))&&(!e.condition||e.condition(t)),x=(e,t)=>{const n=[{type:"year",value:i,default:"YYYY"},{type:"month",value:u,default:"MM"},{type:"day",value:l,default:"DD"}];return n.reduce((n,a)=>{const i=[null,void 0,"Unknown",""];return t===a.type?i.includes(e)?n.push(a.default):n.push(e):i.includes(a.value)?n.push(a.default):n.push(a.value),n},[]).join("-")};"function"===typeof e.init&&(y.init=e.init),y.updateHelpTextOnValue=e=>`${y.helpText} (${x(null===e||void 0===e?void 0:e.label,"year")})`,y.proxyID=e.id,y.unload=e=>i=e.value.toString(),y.config={...y.config,...e.config},y.defaultValue=t=>f(t,e,"Year"),y.condition=t=>!e.condition||e.condition(t),y.validation=(t,n,a)=>{if(e.required&&r["a"].required(t))return["Year cannot be empty"];const i=t?t.value:"";if(!e.estimation.allowUnknown&&i.toString().match(/unknown/i))return["Value unknown is not permitted"];if(i&&!["Unknown"].includes(i)&&isNaN(i)||i<1900)return["Invalid Year"];if(i&&"function"===typeof e.minDate){const t=s["b"].getYear(e.minDate(n,a));if(parseInt(i)<t)return[`Year of ${i} is less than Minimum year of ${t}`]}if(i&&"function"===typeof e.maxDate){const t=e.maxDate(n,a);if(t&&i>s["b"].getYear(t))return[`Year of ${i} exceeds Maximum year of ${s["b"].getYear(t)}`]}return null},y.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:n?b(n):"Unknown"}),y.appearInSummary=(t,n)=>n===e.id,y.computedValue=t=>{if(n){const[a,i,o]=n.split("-");return n=`${t.value}-${i}-${o}`,e.computeValue(n,!1)}if(t&&"Unknown"===t.value)return n="",e.computeValue("Unknown",!1)},g.updateHelpTextOnValue=e=>`${g.helpText} (${x(null===e||void 0===e?void 0:e.label,"month")})`,g.proxyID=e.id,g.unload=e=>u=v(e.value.toString()),g.condition=e=>F(e),g.validation=e=>r["a"].required(e),g.defaultValue=t=>f(t,e,"Month"),H&&(g.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),g.computedValue=(t,a)=>{if((""+t.value).match(/unknown/i))return n=a[S].value+"-07-15",e.computeValue(n,!0);if(n){const[a,i,o]=n.split("-"),s=v(""+t.value);return n=`${a}-${s}-${o}`,e.computeValue(n,!1)}},O.proxyID=e.id,O.updateHelpTextOnValue=e=>`${O.helpText} (${x(null===e||void 0===e?void 0:e.label,"day")})`,O.condition=e=>!(""+e[D].value).match(/unknown/i)&&F(e),O.validation=(t,a,o)=>r["a"].required(t)?["Day is required for date"]:(c=!!(""+t.value).match(/unknown/i),l=c?"15":v(""+t.value),n=`${i}-${u}-${l}`,I(n,e,a,o)),O.defaultValue=t=>f(t,e,"Day"),O.computedValue=()=>e.computeValue(n,c),O.unload=(t,n,a,i)=>{e.unload&&e.unload(t,n,a,i)},O.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),O.config={year:e=>e[S].value,month:e=>e[D].value},H||(O.config.keyboardActions=[]);const w=(t,n)=>{const a=["Unknown"===t[S].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===n];return a.every(Boolean)};return P.proxyID=e.id,P.validation=(t,a,i)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(o))return["Not a valid age estimate"];const s=T()(d["e"].getSessionDate()).subtract(t.value,"years").year();return n=s+"-07-15",I(n,e,a,i)},P.condition=e=>w(e,a.AGE_ESTIMATE_FIELD),P.computedValue=()=>e.computeValue(n,!0),P.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),R.proxyID=e.id,R.validation=(t,a,i)=>r["a"].required(t)?["Please select an estimate"]:(n=T()(d["e"].getSessionDate()).subtract(t.value,"day").format(s["a"]),I(n,e,a,i)),R.condition=e=>w(e,a.MONTH_ESTIMATE_FIELD),R.computedValue=()=>e.computeValue(n,!0),R.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),[y,g,O,P,R]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(a||(a={}))},c21d:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n("14d9");function a(e,t){const n=[],a=[-1,"",null,void 0];for(const i in t){if(!(i in e))continue;const o=e[i];a.includes(o)?n.push(!1):n.push(t[i](o,e))}return n.every(Boolean)}function i(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function o(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function s(e,t,n="",s="",r="priority"){const u=[];for(const i in t){const o=t[i],r=[o.target&&n&&o.target!=n,o.targetEvent&&s&&o.targetEvent!=s];r.some(Boolean)||a(e,o.conditions)&&(o.title=i,o.description&&(o.description.text=o.description.info(e)),u.push(o))}return"priority"===r?i(u):o(u)}},d95e:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(a||(a={}));const i=[a.TT_LINKAGE_CODE,a.TT_MULTI_SELECT_GRID,a.TT_AGE_INPUT,a.TT_BARCODE,a.TT_NOTE,a.TT_SELECT,a.TT_CARD_SELECTOR,a.TT_MULTIPLE_SELECT,a.TT_TEXT,a.TT_NUMBER,a.TT_MONTHLY_DAYS,a.TT_ART_REGIMEN_SELECTION,a.TT_NEXT_VISIT_INTERVAL_SELECTION,a.TT_TABLE_VIEWER,a.TT_DOSAGE_INPUT,a.TT_YES_NO,a.TT_MULTIPLE_YES_NO,a.TT_WEIGHT_CHART,a.TT_VITALS_ENTRY,a.TT_APPOINTMENTS_ENTRY,a.TT_COMPLAINTS_PICKER,a.TT_CLINIC_HOLIDAY_PICKER,a.TT_SUMMARY,a.TT_ART_STAGING_SUMMARY,a.TT_ADHERENCE_INPUT,a.TT_LAB_ORDERS,a.TT_PERSON_RESULT_VIEW,a.TT_PROGRAM_SELECTION,a.TT_DATE_PICKER,a.TT_RELATION_SELECTION,a.TT_FILING_NUMBER_VIEW,a.TT_PERSON_MATCH_VIEW,a.TT_FULL_DATE,a.TT_BATCH_ENTRY,a.TT_BATCH_VERIFICATION,a.TT_BATCH_MOVEMENT,a.TT_IP_ADDRESS,a.TT_TEXT_BANNER,a.TT_DISPENSATION_INPUT,a.TT_DATA_TABLE,a.TT_GROUP_SELECTOR,a.TT_ANC_PREGNANCY_INPUT_CONFIG,a.TT_ANC_PREGNANCY_DETAILS_INPUT,a.TT_ANC_LMP_DATE_INPUT,a.TT_DRUG_TRANSFER_IN,a.TT_GRID_SELECTOR,a.TT_ANC_DRUGSET_INPUT,a.TT_RADIOLOGY_PICKER,a.TT_PRESCRIPTION_INPUT,a.TT_INFINITE_SCROLL_MULTIPLE_SELECT,a.TT_DRUG_DISPENSER]},e7aa:function(e,t,n){"use strict";n.r(t);var a=n("7a23");function i(e,t,n,i,o,s){const r=Object(a["resolveComponent"])("his-standard-form");return Object(a["openBlock"])(),Object(a["createBlock"])(r,{fields:e.fields,onFinishAction:e.onFinish,skipSummary:!1,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])}n("14d9");var o=n("d95e"),s=n("7920"),r=n("2706"),u=n("7365"),l=n("ade3"),c=n("cc6f");class T extends c["a"]{constructor(e,t){super(e,181,t),Object(l["a"])(this,"hivStatus",void 0),Object(l["a"])(this,"artStatus",void 0),Object(l["a"])(this,"arvNumber",void 0),Object(l["a"])(this,"arvStartDate",void 0),this.hivStatus="",this.artStatus="",this.arvNumber="",this.arvStartDate=""}getHivStatus(){return this.hivStatus}getArtStatus(){return this.artStatus}getArvNumber(){return this.arvNumber}getArvStartDate(){return this.arvStartDate}isHivPositive(){return!!this.hivStatus.match(/positive/i)}async loadArtStatus(){const e=await c["a"].getJson(`programs/12/patients/${this.patientID}/art_hiv_status`);e&&(this.hivStatus=e["hiv_status"]||this.hivStatus,this.artStatus=e["art_status"]||"",this.arvNumber=e["arv_number"]||"",this.arvStartDate=e["arv_start_date"]||"")}}var d=n("b5e4"),m=n("b446"),h=n("e86e"),_=n("8158"),p=n("23e6"),E=n("ad60"),v=Object(a["defineComponent"])({mixins:[u["a"]],components:{HisStandardForm:s["a"]},data:()=>({assessment:{},obs:[],showHIVQuestions:!0,alreadyEnrolled:!1,offerCxCa:!1}),watch:{patient:{async handler(){this.assessment=new T(this.patientID,this.providerID);new p["a"](await p["a"].findByID(this.patientID));const e=await E["a"].getProgramInformation(this.patientID);"Continue follow-up"===e.current_outcome&&(this.alreadyEnrolled=!0),_["a"].getConceptsByCategory("reason_for_no_cxca"),await this.assessment.loadArtStatus();this.assessment.getHivStatus();""!==this.assessment.getHivStatus()&&(this.showHIVQuestions=!1),"Positive"===this.assessment.getHivStatus()&&(this.showHIVQuestions=!1),await this.setOfferCxCa(),this.fields=await this.getFields()},deep:!0}},methods:{async onFinish(e,t){const n=await this.assessment.createEncounter();if(!n)return Object(d["e"])("Unable to create encounter");const a=[];Object.keys(t).forEach(e=>{a.push(t[e].obs)});const i=await Promise.all([...this.obs,...a]),o=await this.assessment.saveObservationList(i);if(!o)return Object(d["e"])("Unable to save patient observations");Object(d["d"])("Observations and encounter created!"),this.nextTask()},async setOfferCxCa(){const e=await this.assessment.getFirstValueCoded("Offer CxCa");return this.offerCxCa=e&&"Yes"===e,this.offerCxCa||this.obs.push(this.assessment.buildValueCoded("Ever had CxCa","No")),!0},hasHIVStatus(){return""!==this.assessment.getHivStatus},enterPreviousCxCaData(e){const t="Yes"===e.ever_had_cxca.value,n="Yes"===e.results_available.value;return t&&n},getFacilities(e=""){return Object(h["b"])(e)},getReasonsForNoCxcaOptions(){return _["a"].getConceptsByCategory("reason_for_no_cxca").map(e=>({label:e.name,value:e.name,other:{c:e}}))},getFields(){return[{id:"reason_for_visit",helpText:"Reason for visit",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),options:()=>[{label:"Initial screening",value:"Initial screening"},{label:"Postponed treatmment",value:"Postponed treatment"},{label:"One year subsequent check-up after treatment",value:"One year subsequent check-up after treatment"},{label:"Subsequent screening",value:"Subsequent screening"},{label:"Problem visit after treatment",value:"Problem visit after treatment"},{label:"Referral",value:"Referral"}],computedValue:e=>({obs:this.assessment.buildValueCoded("Reason for visit",e.value)})},{id:"hiv_status",helpText:"HIV status",type:o["b"].TT_SELECT,condition:()=>this.showHIVQuestions,validation:e=>r["a"].required(e),options:()=>[{label:"Positive on ART",value:"Positive on ART"},{label:"Positive Not on ART",value:"Positive Not on ART"},{label:"Negative",value:"Negative"},{label:"Never tested",value:"Never tested"},{label:"Prefers Not to disclose",value:"Undisclosed"}],computedValue:e=>({obs:this.assessment.buildValueCoded("HIV status",e.value)})},...Object(m["b"])({id:"hiv_test_date",helpText:"HIV test result date",required:!0,condition:e=>e.hiv_status.value.match(/Negative|ART/i),minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.assessment.getDate(),estimation:{allowUnknown:!0,estimationFieldType:m["a"].MONTH_ESTIMATE_FIELD},computeValue:(e,t)=>({date:e,tag:"cxca screening",isEstimate:t,obs:this.assessment.buildValueDate("HIV test date",e,t)})},this.assessment.getDate()),{id:"ever_had_cxca",helpText:"Ever had CxCa screening",type:o["b"].TT_SELECT,condition:e=>"Initial screening"!==e.reason_for_visit.value&&0==this.alreadyEnrolled,options:()=>this.yesNoOptions(),validation:e=>r["a"].required(e),computedValue:e=>({obs:this.assessment.buildValueCoded("Ever had CxCa",e.value)})},{id:"results_available",helpText:"Results available?",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),condition:e=>"Initial screening"!==e.reason_for_visit.value&&"No"!==e.ever_had_cxca.value,options:()=>this.yesNoOptions(),computedValue:e=>({obs:this.assessment.buildValueCoded("CxCa test results",e.value)})},{id:"location",helpText:"CxCa screening location",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),options:(e,t="")=>this.getFacilities(t),config:{showKeyboard:!0,isFilterDataViaApi:!0},condition:e=>this.enterPreviousCxCaData(e),computedValue:e=>({obs:this.assessment.buildValueText("Previous CxCa location",e.value)})},...Object(m["b"])({id:"cxca_date",helpText:"Previous CxCa test",required:!0,minDate:()=>this.patient.getBirthdate(),maxDate:()=>this.assessment.getDate(),estimation:{allowUnknown:!1},condition:e=>this.enterPreviousCxCaData(e),computeValue:(e,t)=>({date:e,tag:"cxca screening",isEstimate:t,obs:this.assessment.buildValueDate("cxca test date",e)})},this.assessment.getDate()),{id:"previous_screening_method",helpText:"Previous screening method",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),condition:e=>this.enterPreviousCxCaData(e),options:()=>[{label:"VIA",value:"VIA"},{label:"PAP Smear",value:"PAP Smear"},{label:"HPV DNA",value:"HPV DNA"},{label:"Speculum Exam",value:"Speculum Exam"}],computedValue:e=>({obs:this.assessment.buildValueCoded("Previous CxCa screening method",e.value)})},{id:"offer_CxCa",helpText:"Offer CxCa screening today",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),options:()=>this.yesNoOptions(),computedValue:e=>({obs:this.assessment.buildValueCoded("Offer CxCa",e.value)})},{id:"screening_method",helpText:"Screening method being offered",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),condition:e=>"Yes"===e.offer_CxCa.value,options:()=>[{label:"VIA",value:"VIA"},{label:"PAP Smear",value:"PAP Smear"},{label:"HPV DNA",value:"HPV DNA"},{label:"Speculum Exam",value:"Speculum Exam"}],computedValue:e=>({obs:this.assessment.buildValueCoded("CxCa screening method",e.value)})},{id:"offer_family_planning",helpText:"Offer Family Planning ?",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),options:()=>this.yesNoOptions(),computedValue:e=>({obs:this.assessment.buildValueCoded("Family planning",e.label)})},{id:"reason_for_no_cxca",helpText:"Reason for NOT offering CxCa screening",type:o["b"].TT_SELECT,validation:e=>r["a"].required(e),condition:e=>"No"===e.offer_CxCa.value,options:()=>this.getReasonsForNoCxcaOptions(),computedValue:e=>({obs:this.assessment.buildValueCoded("Reason for NOT offering CxCa",e.value)})}]}}}),f=n("6b0d"),b=n.n(f);const I=b()(v,[["render",i]]);t["default"]=I},e86e:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return r})),n.d(t,"f",(function(){return u})),n.d(t,"e",(function(){return l})),n.d(t,"a",(function(){return c})),n.d(t,"g",(function(){return T})),n.d(t,"h",(function(){return d}));var a=n("5713"),i=n("2ef0");async function o(e=""){const t=await a["a"].getFacilities({name:e});return t.filter(e=>!Object(i["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function s(e=""){const t=await a["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function r(e=""){const t=await a["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function u(){const e=await a["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function l(){const e=await a["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function c(e){const t=await a["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function T(e,t=""){const n=await a["a"].getTraditionalAuthorities(e,t);return n.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function d(e,t=""){const n=await a["a"].getVillages(e,t);return n.map(e=>({label:e.name,value:e.village_id,other:e}))}},f159:function(e,t,n){var a={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-182277b5","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-182277b5","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-182277b5","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-f0823c9c","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function i(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],i=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(i)}))}i.keys=function(){return Object.keys(a)},i.id="f159",e.exports=i}}]);
//# sourceMappingURL=chunk-891099f0.2d64eaaf.js.map