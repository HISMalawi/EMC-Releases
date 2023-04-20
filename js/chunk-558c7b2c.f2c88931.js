(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-558c7b2c"],{7365:function(t,e,n){"use strict";n("14d9"),n("13d5");var a,i=n("7a23"),o=n("ad60"),r=n("2ef0"),s=n("0fa1"),c=n("7f35"),l=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(a||(a={}));const u=t=>l["b"].toStandardHisDisplayFormat(t),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+u(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?a.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?a.CHANGE_PATIENT_OUTCOME:a.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${u(e)} is less than birth date of ${u(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?a.CHANGE_SESSION_DATE:a.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:i})=>{const o=await Object(c["c"])("Please select a provider for "+e,`BDE: ${u(n)} | Current: ${u(i)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:a.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:a.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var p=n("c21d"),h=n("7920"),m=n("b5e4"),f=n("8e8b"),v=Object(i["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),f["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[a.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(r["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),a.CONTINUE},n[a.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),a.EXIT),n[a.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),a.EXIT),n[a.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),a.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(p["a"])(this.facts,d);for(const r in t){var e,n;const s=t[r];if(null!==s&&void 0!==s&&null!==(e=s.actions)&&void 0!==e&&e.alert){var i;const t=this.runflowState(await(null===s||void 0===s||null===(i=s.actions)||void 0===i?void 0:i.alert(this.facts)));if(t===a.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var o;const t=await(null===s||void 0===s||null===(o=s.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await f["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(m["c"])(""+t)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await f["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),a=e.username.toUpperCase();return n<a?-1:n>a?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(r["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var a;const[e]=(null===(a=t.person)||void 0===a?void 0:a.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const b=v;e["a"]=b},7920:function(t,e,n){"use strict";var a=n("7a23");function i(t,e,n,i,o,r){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),s=n("d959"),c=n.n(s);const l=c()(r,[["render",i]]);e["a"]=l},b805:function(t,e,n){"use strict";n.r(e);var a=n("7a23");function i(t,e,n,i,o,r){const s=Object(a["resolveComponent"])("his-standard-form");return Object(a["openBlock"])(),Object(a["createBlock"])(s,{cancelDestinationPath:t.cancelDestination,fields:t.fields,onFinishAction:t.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}n("14d9");var o=n("7920"),r=n("7365"),s=n("cc6f");class c extends s["a"]{constructor(t,e){super(t,80,e)}}var l=n("2706"),u=n("d95e"),d=n("e86e"),p=n("b5e4"),h=Object(a["defineComponent"])({components:{HisStandardForm:o["a"]},mixins:[r["a"]],data:()=>({receptionService:{}}),watch:{ready:{async handler(t){t&&(this.receptionService=new c(this.patient.getID(),this.providerID),this.fields=this.getFields())},immediate:!0,deep:!0}},methods:{async onSubmit(t,e){const n=await this.receptionService.createEncounter();if(!n)return Object(p["e"])("Unable to create registration encounter");const a=await this.resolveObs({...e}),i=await this.receptionService.saveObservationList(a);if(!i)return Object(p["e"])("Unable to save observations");this.$router.push("/registration/encounters/patient_services/"+this.patientID)},getFields(){return[{id:"referral",helpText:"Is the Patient a Referral Case From Another Health Facility?",type:u["b"].TT_SELECT,validation:t=>l["a"].required(t),computedValue:t=>({obs:this.receptionService.buildValueCoded("Is patient referred?",t.value)}),options:()=>[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},{id:"referring_facility_name",helpText:"Referred from",type:u["b"].TT_SELECT,validation:t=>l["a"].required(t),computedValue:({label:t})=>({obs:this.receptionService.buildValueText("Referred from",t)}),condition:t=>"Yes"===t.referral.value,options:(t,e="")=>Object(d["b"])(e),config:{showKeyboard:!0,isFilterDataViaApi:!0}}]}}}),m=n("d959"),f=n.n(m);const v=f()(h,[["render",i]]);e["default"]=v},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("14d9");function a(t,e){const n=[],a=[-1,"",null,void 0];for(const i in e){if(!(i in t))continue;const o=t[i];a.includes(o)?n.push(!1):n.push(e[i](o,t))}return n.every(Boolean)}function i(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function o(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function r(t,e,n="",r="",s="priority"){const c=[];for(const i in e){const o=e[i],s=[o.target&&n&&o.target!=n,o.targetEvent&&r&&o.targetEvent!=r];s.some(Boolean)||a(t,o.conditions)&&(o.title=i,o.description&&(o.description.text=o.description.info(t)),c.push(o))}return"priority"===s?i(c):o(c)}},e86e:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"d",(function(){return r})),n.d(e,"c",(function(){return s})),n.d(e,"f",(function(){return c})),n.d(e,"e",(function(){return l})),n.d(e,"a",(function(){return u})),n.d(e,"g",(function(){return d})),n.d(e,"h",(function(){return p}));var a=n("5713"),i=n("2ef0");async function o(t=""){const e=await a["a"].getFacilities({name:t});return e.filter(t=>!Object(i["isEmpty"])(t)&&""!=t.name.trim()).map(t=>({label:t.name,value:t.location_id,other:t}))}async function r(t=""){const e=await a["a"].getLabs({search_name:t});return e.map(t=>({label:t,value:t}))}async function s(t=""){const e=await a["a"].getFacilities({name:t,tag:"Facility adult sections"});return e.map(t=>({label:t.name,value:t.name,other:t}))}async function c(){const t=await a["a"].getSpecialistClinics();return t.map(t=>({label:t.name,value:t.name,other:t}))}async function l(){const t=await a["a"].getRegions();return t.map(t=>({label:t.name,value:t.region_id,other:t}))}async function u(t){const e=await a["a"].getDistricts(t);return e.map(t=>({label:t.name,value:t.district_id,other:t}))}async function d(t,e=""){const n=await a["a"].getTraditionalAuthorities(t,e);return n.map(t=>({label:t.name,value:t.traditional_authority_id,other:t}))}async function p(t,e=""){const n=await a["a"].getVillages(t,e);return n.map(t=>({label:t.name,value:t.village_id,other:t}))}}}]);
//# sourceMappingURL=chunk-558c7b2c.f2c88931.js.map