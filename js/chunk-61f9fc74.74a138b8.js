(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61f9fc74"],{2819:function(e,t,n){"use strict";n.r(t);var i=n("7a23");function o(e,t,n,o,a,s){const r=Object(i["resolveComponent"])("his-standard-form"),l=Object(i["resolveComponent"])("ion-page");return Object(i["openBlock"])(),Object(i["createBlock"])(l,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(r,{fields:e.fields,skipSummary:!0,onFinishAction:e.onFinish,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]),_:1})}n("14d9");var a=n("7365"),s=n("d95e"),r=n("ade3"),l=n("cc6f"),u=n("ff01");const c={12:13,13:14,14:16,15:17,16:18,17:19,18:20,19:21,20:22,21:24,22:25,23:25,24:27,25:28,26:29,27:30,28:32,29:33,30:34,31:35,32:36,33:37,34:38,35:39,36:40,37:42};class d extends l["a"]{constructor(e,t){super(e,98,t),Object(r["a"])(this,"gestationWeeks",void 0),this.gestationWeeks=0}expectedFundalHeightForGestationWeeks(){return this.getEquivalentFundalHeight(this.gestationWeeks)}async loadPregnancyStatus(){const e=await l["a"].getJson(`programs/${this.programID}/patients/${this.patientID}`);if(e){const t=e["date_of_lnmp"];if(t){const t=new u["a"](this.patientID,this.providerID);this.gestationWeeks=parseInt(t.calculateWeekOfFirstVisit(e["date_of_lnmp"]))}}}getEquivalentFundalWeeks(e){return e<12?c["12"]:e>37?c["37"]:c[e]}getEquivalentFundalHeight(e){for(const t in c){const n=c[t];if(e<=n)return parseInt(t)}return e>42?37:e<13?12:0}}var p=n("2706"),h=n("d867"),v=n("8158"),m=n("2ef0"),f=n("b5e4"),b=n("6be2"),O=Object(i["defineComponent"])({components:{IonPage:h["D"]},mixins:[a["a"]],data:()=>({service:{}}),watch:{ready:{async handler(e){e&&(this.service=new d(this.patientID,this.providerID),await this.service.loadPregnancyStatus(),this.fields=this.getFields())},immediate:!0}},methods:{async onFinish(e,t){await this.service.createEncounter(),await this.service.saveObservationList(await this.resolveObs(t)),this.nextTask()},diagnosisOptions(e){return[...v["a"].getConceptsByCategory("anc_diagnosis"),{name:"None"}].map(t=>e({...this.toOption(t.name),isChecked:!1}))},getFields(){return[{id:"ultrasound",helpText:"Ultrasound scan results available",type:s["b"].TT_SELECT,validation:e=>p["a"].required(e),computedValue:e=>this.service.buildValueCoded("Ultrasound",e.value),options:()=>this.yesNoOptions()},{id:"multiple_gestation",helpText:"Number of fetuses",type:s["b"].TT_SELECT,validation:e=>p["a"].required(e),computedValue:e=>this.service.buildValueText("Multiple gestation",e.value),condition:e=>"Yes"===e.ultrasound.value,options:()=>[{label:"One",value:1},{label:"Two",value:2},{label:"Three",value:3},{label:"Four",value:4},{label:"Unknown",value:"Unknown"}]},{id:"liquor",helpText:"Liquor",type:s["b"].TT_SELECT,validation:e=>p["a"].required(e),computedValue:e=>this.service.buildValueText("LIQUOR",e.value),condition:e=>"Yes"===e.ultrasound.value,options:()=>this.mapStrToOptions(["Adequate","Not adequate","Unknown"])},{id:"lie",helpText:"Lie",type:s["b"].TT_SELECT,validation:e=>p["a"].required(e),computedValue:e=>this.service.buildValueText("Lie",e.value),condition:e=>"Yes"===e.ultrasound.value,options:()=>this.mapStrToOptions(["Longitudinal","Transverse","Unknown"])},{id:"fetal_heart_movement_seen",helpText:"Fetal heart movement seen",type:s["b"].TT_SELECT,validation:e=>p["a"].required(e),computedValue:e=>this.service.buildValueCoded("Fetal heart movement seen",e.value),condition:e=>"Yes"===e.ultrasound.value,options:()=>this.yesNoOptions()},{id:"presentation",helpText:"Presentation",type:s["b"].TT_GROUP_SELECTOR,validation:e=>this.validateSeries([()=>p["a"].required(e),()=>e&&!e.value?["Presentation cannot be Empty!"]:null,()=>{var t,n,i;return e&&null!==e&&void 0!==e&&null!==(t=e.other)&&void 0!==t&&t.subGroupOptions&&Object(m["isEmpty"])(null===e||void 0===e||null===(n=e.other)||void 0===n?void 0:n.subGroupOptionValue)?[((null===e||void 0===e||null===(i=e.other)||void 0===i?void 0:i.subgroupTitle)||"Subgroup")+" has no value selected"]:null},()=>{var t,n,i,o,a,s,r,l;return!e||Object(m["isEmpty"])(null===e||void 0===e||null===(t=e.other)||void 0===t?void 0:t.subGroupOptionValue)||Object(m["isEmpty"])(null===e||void 0===e||null===(n=e.other)||void 0===n||null===(i=n.subGroupOptionValue)||void 0===i||null===(o=i.other)||void 0===o?void 0:o.options)||null!==e&&void 0!==e&&null!==(a=e.other)&&void 0!==a&&null!==(s=a.subGroupOptionValue)&&void 0!==s&&s.value?null:[(null===e||void 0===e||null===(r=e.other)||void 0===r||null===(l=r.subGroupOptionValue)||void 0===l?void 0:l.label)+"'s value isnt selected"]}]),computedValue:e=>{var t,n;const i=[this.service.buildValueText("Presentation",e.label)];var o,a;null!==e&&void 0!==e&&null!==(t=e.other)&&void 0!==t&&null!==(n=t.subGroupOptionValue)&&void 0!==n&&n.value&&i.push(this.service.buildValueText("Position",null===e||void 0===e||null===(o=e.other)||void 0===o||null===(a=o.subGroupOptionValue)||void 0===a?void 0:a.value));return i},options:e=>{const t=(e,t="",n={})=>({label:e,value:t,other:n}),n=[t("Vertex","",{options:this.mapStrToOptions(["Left Occipito Anterior","Left Occipito Transverse","Left Occipito Posterior","Right Occipito Anterior","Right Occipito Transverse","Right Occipito Posterior","Unknown"])}),this.toOption("Oblique"),this.toOption("Transverse"),this.toOption("Breech",{options:this.mapStrToOptions(["Left Sacro Anterior","Left Sacro Transverse","Left Sacro Posterior","Right Sacro Anterior","Right Sacro Transverse","Right Sacro Posterior","Unknown"])}),t("Face","",{concept:"Position",options:this.mapStrToOptions(["Left Mento Anterior","Left Mento Transverse","Left Mento Posterior","Right Mento Anterior","Right Mento Transverse","Right Mento Posterior","Unknown"])}),t("Shoulder","",{options:this.mapStrToOptions(["Left Acromion Dorsal Anterior","Left Acromion Dorsal Transverse","Left Acromion Dorsal Posterior","Right Acromion Dorsal Anterior","Right Acromion Dorsal Transverse","Right Acromion Dorsal Posterior","Unknown"])})];return e.presentation?e.presentation:[t("Cephalic","",{subGroupOptions:n,subgroupTitle:"Cephalic Position",options:this.mapStrToOptions(["Right Occipito Anterior","Left Occipito Anterior","Unknown"])}),t("Breech","",{subGroupOptions:n,subgroupTitle:"Breech Position",options:this.mapStrToOptions(["Right Sacro Anterior","Left Sacro Anterior","Unknown"])}),this.toOption("Ball"),this.toOption("Nil palpable")]}},{id:"enter_fundal_height",helpText:"Fundal height (cm)",type:s["b"].TT_NUMBER,dynamicHelpText:()=>{const e="Fundal height (cm)";return this.service.gestationWeeks?`${e} (${this.service.gestationWeeks}wks/${this.service.getEquivalentFundalHeight(this.service.gestationWeeks)} cm)`:e},beforeNext:async(e,t)=>{if(e&&(""+e.value).match(/unknown/i)&&!["Nil palpable","Ball"].includes(t.presentation.value))return!!await Object(f["a"])("Do you want to proceed with Unknown Fundal height?");const n=this.service.expectedFundalHeightForGestationWeeks(),i=e?parseInt(e.value):-1;return!(this.service.gestationWeeks&&e&&"number"===typeof i&&(i<n||i>n))||!!await Object(f["a"])(`\n                        Fundal height is not equal to expected ${n} cm from gestation weeks of ${this.service.gestationWeeks} .\n                        Are you sure about this value?`)},validation:e=>this.validateSeries([()=>p["a"].required(e),()=>e&&!(""+e.value).match(/unknown/i)?p["a"].rangeOf(e,10,45):null]),computedValue:e=>"Unknown"!=e.value?this.service.buildValueNumber("Fundus",e.value):this.service.buildObs("Fundus",{value_coded:e.value,value_numeric:0}),config:{keypad:b["g"]}},{id:"fetal_heart_beat",helpText:"Fetal heart beat",type:s["b"].TT_SELECT,validation:e=>p["a"].required(e),computedValue:e=>this.service.buildValueText("Fetal Heart Beat",e.value),options:()=>this.mapStrToOptions(["Heard","Not heard"])},{id:"fetal_heart_rate",helpText:"Fetal heart rate",type:s["b"].TT_NUMBER,validation:e=>p["a"].required(e),beforeNext:async e=>{const t=120,n=140,i=e?parseInt(e.value):-1;if(e&&"number"===typeof i&&(i<t||i>n)){const e=await Object(f["a"])(`\n                            The value is out of Range of ${t} - ${n}.\n                            Are you sure about this value?`);return!!e}return!0},condition:e=>"Heard"===e.fetal_heart_beat.value,computedValue:e=>"Unknown"!=e.value?this.service.buildValueNumber("Fetal heart movement seen",""+e.value):this.service.buildObs("Fetal heart movement seen",{value_numeric:0,value_coded:e.value}),config:{keypad:b["g"]}},{id:"enter_fetal_movement",helpText:"Fetal movement heard",type:s["b"].TT_SELECT,validation:e=>p["a"].required(e),computedValue:e=>this.service.buildValueCoded("Fetal movement heard",""+e.value),options:()=>this.yesNoOptions()},{id:"fetal_movement_felt",helpText:"Fetal movement felt",type:s["b"].TT_SELECT,validation:e=>p["a"].required(e),condition:e=>!["Ball","Nil palpable"].includes(e.presentation.label),computedValue:e=>this.service.buildValueCoded("Fetal movement felt",""+e.value),options:()=>this.yesNoOptions()},{id:"last_fmf",helpText:"Last fetal movement felt (in Weeks)",type:s["b"].TT_NUMBER,validation:e=>p["a"].required(e),condition:e=>"Unknown"!=e.fetal_movement_felt.value,computedValue:e=>"Unknown"!=e.value?this.service.buildValueNumber("Last Fetal movement felt",e.value):this.service.buildObs("Last Fetal movement felt",{value_numeric:0,value_coded:e.value}),options:()=>this.yesNoUnknownOptions()},{id:"diagnosis",helpText:"Diagnosis",type:s["b"].TT_MULTIPLE_SELECT,validation:e=>p["a"].required(e),computedValue:e=>e&&e.map(e=>e.value).includes("None")?[]:e.map(e=>this.service.buildValueCoded(e.label,"Yes")),onValueUpdate(e,t){return e.map(e=>("None"===t.value&&"None"!=e.value&&(e.isChecked=!1),"None"!=t.value&&t.isChecked&&"None"===e.value&&(e.isChecked=!1),e))},options:()=>this.diagnosisOptions(e=>e),config:{footerBtns:[{name:"None",slot:"end",onClickComponentEvents:{refreshOptions:()=>this.diagnosisOptions(e=>(e.isChecked="None"===e.label,e))},onClick:()=>"None"}]}}]}}}),T=n("d959"),g=n.n(T);const D=g()(O,[["render",o]]);t["default"]=D},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"j",(function(){return o})),n.d(t,"m",(function(){return a})),n.d(t,"e",(function(){return s})),n.d(t,"b",(function(){return r})),n.d(t,"l",(function(){return l})),n.d(t,"i",(function(){return u})),n.d(t,"g",(function(){return c})),n.d(t,"a",(function(){return d})),n.d(t,"k",(function(){return p})),n.d(t,"c",(function(){return h})),n.d(t,"h",(function(){return v})),n.d(t,"f",(function(){return m}));const i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],s=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],r=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],l=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],c=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],d=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],h=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],v=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],m=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"g",(function(){return s})),n.d(t,"f",(function(){return r})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return c})),n.d(t,"h",(function(){return p})),n.d(t,"a",(function(){return h}));var i=n("3800");const o=[i["l"],[["","Delete"]]],a=[i["i"],[["Delete"]]],s=[i["i"],[["Delete","Unknown"]]],r=[i["i"],[["N/A"],["Delete","Unknown"]]],l=[i["i"],[["Delete"]]],u=[i["i"],[["Unknown","Delete"],["Qwerty","A-Z"]]],c=[i["g"],[["Unknown"]]],d=[i["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],p=[i["k"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],h=[{btn:"0-9",keyboard:u},{btn:"?123",keyboard:o},{btn:"A-Z",keyboard:d},{btn:"Qwerty",keyboard:p}]},7365:function(e,t,n){"use strict";n("14d9"),n("13d5");var i,o=n("7a23"),a=n("ad60"),s=n("2ef0"),r=n("0fa1"),l=n("7f35"),u=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(i||(i={}));const c=e=>u["b"].toStandardHisDisplayFormat(e),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(l["a"])("Data Integrity Issue Found","Patient died on "+c(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const n=await Object(l["a"])("Data integrity issue found","",`Session date ${c(t)} is less than birth date of ${c(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:n,apiDate:o})=>{const a=await Object(l["c"])("Please select a provider for "+t,`BDE: ${c(n)} | Current: ${c(o)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===a.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:a.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var p=n("c21d"),h=n("7920"),v=n("b5e4"),m=n("8e8b"),f=Object(o["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),m["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[i.SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(s["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(p["a"])(this.facts,d);for(const s in e){var t,n;const r=e[s];if(null!==r&&void 0!==r&&null!==(t=r.actions)&&void 0!==t&&t.alert){var o;const e=this.runflowState(await(null===r||void 0===r||null===(o=r.actions)||void 0===o?void 0:o.alert(this.facts)));if(e===i.EXIT)return}if(null!==r&&void 0!==r&&null!==(n=r.actions)&&void 0!==n&&n.selection){var a;const e=await(null===r||void 0===r||null===(a=r.actions)||void 0===a?void 0:a.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await m["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(v["c"])(""+e)}this.facts.sessionDate=a["a"].getSessionDate(),this.facts.apiDate=a["a"].getCachedApiDate(),this.facts.isBdeMode=a["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",a["a"].isBDE()&&(this.providers=await m["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),i=t.username.toUpperCase();return n<i?-1:n>i?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(s["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var i;const[t]=(null===(i=e.person)||void 0===i?void 0:i.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const b=f;t["a"]=b},7920:function(e,t,n){"use strict";var i=n("7a23");function o(e,t,n,o,a,s){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=n("9441"),s=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),r=n("d959"),l=n.n(r);const u=l()(s,[["render",o]]);t["a"]=u},c21d:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));n("14d9");function i(e,t){const n=[],i=[-1,"",null,void 0];for(const o in t){if(!(o in e))continue;const a=e[o];i.includes(a)?n.push(!1):n.push(t[o](a,e))}return n.every(Boolean)}function o(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function a(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function s(e,t,n="",s="",r="priority"){const l=[];for(const o in t){const a=t[o],r=[a.target&&n&&a.target!=n,a.targetEvent&&s&&a.targetEvent!=s];r.some(Boolean)||i(e,a.conditions)&&(a.title=o,a.description&&(a.description.text=a.description.info(e)),l.push(a))}return"priority"===r?o(l):a(l)}},ff01:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var i=n("cc6f"),o=n("74f4"),a=n("5a0c"),s=n.n(a),r=n("0011");class l extends i["a"]{constructor(e,t){super(e,81,t)}async enrollPatient(){const e=new o["a"](this.patientID);await e.enrollProgram(),e.setStateDate(this.date),e.setStateId(118),await e.updateState()}calculateWeekOfFirstVisit(e){const t=new Date(e);t.setDate(t.getDate()+7);const n=new Date(this.getDate()),i=n-t;return String(Math.floor(i/6048e5))}calculateGestationDateFromPeriod(e){return s()(this.date).subtract(e,"months").endOf("month").format("YYYY-MM-DD")}estimateDelieveryDate(e){const t=new Date(e);t.setDate(t.getDate()+7),t.setMonth(t.getMonth()+9);const n=Object(r["a"])(t.getMonth()+1),i=Object(r["a"])(t.getDate());return`${t.getFullYear()}-${n}-${i}`}}}}]);
//# sourceMappingURL=chunk-61f9fc74.74a138b8.js.map