(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7be20c1d"],{3800:function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"l",(function(){return a})),n.d(e,"e",(function(){return o})),n.d(e,"b",(function(){return r})),n.d(e,"k",(function(){return s})),n.d(e,"i",(function(){return c})),n.d(e,"g",(function(){return l})),n.d(e,"a",(function(){return u})),n.d(e,"j",(function(){return d})),n.d(e,"c",(function(){return p})),n.d(e,"h",(function(){return h})),n.d(e,"f",(function(){return f}));const i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],r=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],l=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],u=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],d=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],p=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],h=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],f=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},7365:function(t,e,n){"use strict";n("13d5");var i,a=n("7a23"),o=n("ad60"),r=n("2ef0"),s=n("0fa1"),c=n("7f35"),l=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(i||(i={}));const u=t=>l["b"].toStandardHisDisplayFormat(t),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+u(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${u(e)} is less than birth date of ${u(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:a})=>{const o=await Object(c["c"])("Please select a provider for "+e,`BDE: ${u(n)} | Current: ${u(a)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var p=n("c21d"),h=n("7920"),f=n("b5e4"),m=n("8e8b"),v=Object(a["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),m["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[i.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(r["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(p["a"])(this.facts,d);for(const r in t){var e,n;const s=t[r];if(null!==s&&void 0!==s&&null!==(e=s.actions)&&void 0!==e&&e.alert){var a;const t=this.runflowState(await(null===s||void 0===s||null===(a=s.actions)||void 0===a?void 0:a.alert(this.facts)));if(t===i.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var o;const t=await(null===s||void 0===s||null===(o=s.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await m["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(f["c"])(""+t)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await m["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),i=e.username.toUpperCase();return n<i?-1:n>i?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(r["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var i;const[e]=(null===(i=t.person)||void 0===i?void 0:i.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const b=v;e["a"]=b},7920:function(t,e,n){"use strict";var i=n("7a23");function a(t,e,n,a,o,r){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),s=n("6b0d"),c=n.n(s);const l=c()(r,[["render",a]]);e["a"]=l},c21d:function(t,e,n){"use strict";function i(t,e){const n=[],i=[-1,"",null,void 0];for(const a in e){if(!(a in t))continue;const o=t[a];i.includes(o)?n.push(!1):n.push(e[a](o,t))}return n.every(Boolean)}function a(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function o(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function r(t,e,n="",r="",s="priority"){const c=[];for(const a in e){const o=e[a],s=[o.target&&n&&o.target!=n,o.targetEvent&&r&&o.targetEvent!=r];s.some(Boolean)||i(t,o.conditions)&&(o.title=a,o.description&&(o.description.text=o.description.info(t)),c.push(o))}return"priority"===s?a(c):o(c)}n.d(e,"a",(function(){return r}))},c7512:function(t,e,n){"use strict";n.r(e);var i=n("7a23");function a(t,e,n,a,o,r){const s=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(s,{cancelDestinationPath:t.cancelDestination,fields:t.fields,onFinishAction:t.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}var o=n("9441"),r=n("7365"),s=n("cc6f");class c extends s["a"]{constructor(t,e){super(t,104,e)}}var l=n("2706"),u=n("d95e"),d=n("e86e"),p=n("b5e4"),h=n("23e6");const f=28;var m=n("3800"),v=Object(i["defineComponent"])({components:{HisStandardForm:o["a"]},mixins:[r["a"]],data:()=>({registrationService:{}}),watch:{ready:{async handler(t){t&&(this.registrationService=new c(this.patient.getID(),this.providerID),this.fields=this.getFields())},immediate:!0,deep:!0}},methods:{async onSubmit(t,e){await this.asignNID(t);const n=await this.registrationService.createEncounter();if(!n)return Object(p["e"])("Unable to create registration encounter");const i=await this.resolveObs({...e}),a=await this.registrationService.saveObservationList(i);if(!a)return Object(p["e"])("Unable to save observations");this.nextTask()},async asignNID(t){const e=t["national_id_available"],n=t["national_id"];e&&"Yes"===e.value&&await this.patient.updateMWNationalId(n.value)},async mwIdExists(t){if(!t)return!1;const e=await h["a"].findByOtherID(f,t);return e.length>0},getFields(){return[{id:"visit_type",helpText:"Type of visit",type:u["b"].TT_SELECT,validation:t=>l["a"].required(t),computedValue:t=>({obs:this.registrationService.buildValueCoded("Type of visit",t.value)}),options:()=>[{label:"New",value:"New patient"},{label:"Referral",value:"Referral"},{label:"Re-visiting",value:"Re-visiting"}]},{id:"referring_facility_name",helpText:"Referred from",type:u["b"].TT_SELECT,validation:t=>l["a"].required(t),computedValue:({label:t})=>({obs:this.registrationService.buildValueText("Referred from",t)}),condition:t=>"Referral"===t.visit_type.value,options:(t,e="")=>Object(d["b"])(e),config:{showKeyboard:!0,isFilterDataViaApi:!0}},{id:"national_id_available",helpText:"National ID Available",type:u["b"].TT_SELECT,validation:t=>l["a"].required(t),condition:()=>"Unknown"===this.patient.getMWNationalID(),options:()=>this.yesNoUnknownOptions(),appearInSummary:()=>!1},{id:"national_id",helpText:"Enter National ID",type:u["b"].TT_TEXT,validation:t=>l["a"].isMWNationalID(t),condition:t=>"Yes"===t.national_id_available.value,beforeNext:async t=>!t.value||!await this.mwIdExists(t.value.toString())||(Object(p["e"])("National ID already exists"),!1),summaryMapValue:({value:t})=>({value:t,label:"National ID"}),config:{casing:"uppercase",customKeyboard:[m["c"],[["Delete"]]]}},{id:"patient_pregnant",helpText:"Patient pregnant",type:u["b"].TT_SELECT,validation:t=>l["a"].required(t),computedValue:({value:t})=>({obs:this.registrationService.buildValueCoded("PATIENT PREGNANT",t)}),condition:()=>this.patient.isChildBearing(),options:()=>this.yesNoUnknownOptions()}]}}}),b=n("6b0d"),D=n.n(b);const y=D()(v,[["render",a]]);e["default"]=y},e86e:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"d",(function(){return r})),n.d(e,"c",(function(){return s})),n.d(e,"f",(function(){return c})),n.d(e,"e",(function(){return l})),n.d(e,"a",(function(){return u})),n.d(e,"g",(function(){return d})),n.d(e,"h",(function(){return p}));var i=n("5713"),a=n("2ef0");async function o(t=""){const e=await i["a"].getFacilities({name:t});return e.filter(t=>!Object(a["isEmpty"])(t)&&""!=t.name.trim()).map(t=>({label:t.name,value:t.location_id,other:t}))}async function r(t=""){const e=await i["a"].getLabs({search_name:t});return e.map(t=>({label:t,value:t}))}async function s(t=""){const e=await i["a"].getFacilities({name:t,tag:"Facility adult sections"});return e.map(t=>({label:t.name,value:t.name,other:t}))}async function c(){const t=await i["a"].getSpecialistClinics();return t.map(t=>({label:t.name,value:t.name,other:t}))}async function l(){const t=await i["a"].getRegions();return t.map(t=>({label:t.name,value:t.region_id,other:t}))}async function u(t){const e=await i["a"].getDistricts(t);return e.map(t=>({label:t.name,value:t.district_id,other:t}))}async function d(t,e=""){const n=await i["a"].getTraditionalAuthorities(t,e);return n.map(t=>({label:t.name,value:t.traditional_authority_id,other:t}))}async function p(t,e=""){const n=await i["a"].getVillages(t,e);return n.map(t=>({label:t.name,value:t.village_id,other:t}))}}}]);
//# sourceMappingURL=chunk-7be20c1d.f1422922.js.map