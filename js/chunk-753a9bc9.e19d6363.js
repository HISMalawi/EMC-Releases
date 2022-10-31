(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-753a9bc9"],{7365:function(e,t,n){"use strict";n("13d5");var i,a=n("7a23"),o=n("ad60"),r=n("2ef0"),s=n("0fa1"),c=n("7f35"),l=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(i||(i={}));const u=e=>l["b"].toStandardHisDisplayFormat(e),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+u(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${u(t)} is less than birth date of ${u(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:n,apiDate:a})=>{const o=await Object(c["c"])("Please select a provider for "+t,`BDE: ${u(n)} | Current: ${u(a)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var p=n("c21d"),h=n("7920"),m=n("b5e4"),f=n("8e8b"),v=Object(a["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),f["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[i.SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(r["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(p["a"])(this.facts,d);for(const r in e){var t,n;const s=e[r];if(null!==s&&void 0!==s&&null!==(t=s.actions)&&void 0!==t&&t.alert){var a;const e=this.runflowState(await(null===s||void 0===s||null===(a=s.actions)||void 0===a?void 0:a.alert(this.facts)));if(e===i.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var o;const e=await(null===s||void 0===s||null===(o=s.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await f["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(m["c"])(""+e)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await f["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),i=t.username.toUpperCase();return n<i?-1:n>i?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(r["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var i;const[t]=(null===(i=e.person)||void 0===i?void 0:i.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const b=v;t["a"]=b},7920:function(e,t,n){"use strict";var i=n("7a23");function a(e,t,n,a,o,r){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,8,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=n("6b0d"),c=n.n(s);const l=c()(r,[["render",a]]);t["a"]=l},"80ff":function(e,t,n){"use strict";n.r(t);var i=n("7a23");function a(e,t,n,a,o,r){const s=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(s,{cancelDestinationPath:e.cancelDestination,fields:e.fields,onFinishAction:e.onSubmit},null,8,["cancelDestinationPath","fields","onFinishAction"])}var o=n("9441"),r=n("7365"),s=n("2706"),c=n("d95e"),l=n("e86e"),u=n("cc6f");class d extends u["a"]{constructor(e,t){super(e,114,t)}}class p extends u["a"]{constructor(e,t){super(e,42,t)}}var h=Object(i["defineComponent"])({components:{HisStandardForm:o["a"]},mixins:[r["a"]],data:()=>({referralService:{},admissionService:{}}),watch:{ready:{async handler(e){e&&(this.referralService=new d(this.patientID,this.providerID),this.admissionService=new p(this.patientID,this.providerID),this.fields=this.getFields())},immediate:!0,deep:!0}},methods:{async onSubmit(e,t){if("Admission"===e.opd_outcome.value){await this.admissionService.createEncounter();const e=await this.resolveObs({...t},"admission");await this.admissionService.saveObservationList(e)}else{await this.referralService.createEncounter();const e=await this.resolveObs({...t},"referral");await this.referralService.saveObservationList(e)}this.nextTask()},getFields(){return[{id:"opd_outcome",helpText:"Select outcome",type:c["b"].TT_SELECT,validation:e=>s["a"].required(e),options:()=>[{label:"Admit",value:"Admission"},{label:"Internal referral",value:"Internal referral"},{label:"Refer to another hospital/clinic",value:"External referral"}]},{id:"facility_name",helpText:"Select Facility name",type:c["b"].TT_SELECT,validation:e=>s["a"].required(e),computedValue:({value:e})=>({tag:"referral",obs:this.referralService.buildValueText("Referred",e)}),condition:e=>"External referral"===e.opd_outcome.value,options:(e,t="")=>Object(l["b"])(t),config:{showKeyboard:!0,isFilterDataViaApi:!0}},{id:"specialist_clinic",helpText:"Select clinic",type:c["b"].TT_SELECT,validation:e=>s["a"].required(e),computedValue:({other:e})=>({tag:"referral",obs:this.referralService.buildValueCodedFromConceptId("Specialist clinic",e.concept_id)}),condition:e=>"Internal referral"===e.opd_outcome.value,options:()=>Object(l["f"])(),config:{showKeyboard:!0}},{id:"wards",helpText:"Select ward",type:c["b"].TT_SELECT,condition:e=>"Admission"===e.opd_outcome.value,validation:e=>s["a"].required(e),computedValue:({value:e})=>({tag:"admission",obs:this.admissionService.buildValueText("Admit to ward",e)}),options:(e,t="")=>Object(l["c"])(t),config:{showKeyboard:!0,isFilterDataViaApi:!0}}]}}}),m=n("6b0d"),f=n.n(m);const v=f()(h,[["render",a]]);t["default"]=v},c21d:function(e,t,n){"use strict";function i(e,t){const n=[],i=[-1,"",null,void 0];for(const a in t){if(!(a in e))continue;const o=e[a];i.includes(o)?n.push(!1):n.push(t[a](o,e))}return n.every(Boolean)}function a(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function o(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function r(e,t,n="",r="",s="priority"){const c=[];for(const a in t){const o=t[a],s=[o.target&&n&&o.target!=n,o.targetEvent&&r&&o.targetEvent!=r];s.some(Boolean)||i(e,o.conditions)&&(o.title=a,o.description&&(o.description.text=o.description.info(e)),c.push(o))}return"priority"===s?a(c):o(c)}n.d(t,"a",(function(){return r}))},e86e:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return s})),n.d(t,"f",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"a",(function(){return u})),n.d(t,"g",(function(){return d})),n.d(t,"h",(function(){return p}));var i=n("5713"),a=n("2ef0");async function o(e=""){const t=await i["a"].getFacilities({name:e});return t.filter(e=>!Object(a["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function r(e=""){const t=await i["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function s(e=""){const t=await i["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function c(){const e=await i["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function l(){const e=await i["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function u(e){const t=await i["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function d(e,t=""){const n=await i["a"].getTraditionalAuthorities(e,t);return n.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function p(e,t=""){const n=await i["a"].getVillages(e,t);return n.map(e=>({label:e.name,value:e.village_id,other:e}))}}}]);
//# sourceMappingURL=chunk-753a9bc9.e19d6363.js.map