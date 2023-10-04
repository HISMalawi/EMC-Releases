(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30bbb10a"],{7365:function(t,e,n){"use strict";n("14d9"),n("13d5");var a,i=n("7a23"),o=n("ad60"),r=n("2ef0"),s=n("0fa1"),c=n("7f35"),l=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(a||(a={}));const u=t=>l["b"].toStandardHisDisplayFormat(t),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+u(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?a.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?a.CHANGE_PATIENT_OUTCOME:a.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${u(e)} is less than birth date of ${u(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?a.CHANGE_SESSION_DATE:a.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:i})=>{const o=await Object(c["c"])("Please select a provider for "+e,`BDE: ${u(n)} | Current: ${u(i)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:a.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:a.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var p=n("c21d"),h=n("7920"),E=n("b5e4"),D=n("8e8b"),m=Object(i["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),D["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[a.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(r["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),a.CONTINUE},n[a.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),a.EXIT),n[a.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),a.EXIT),n[a.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),a.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(p["a"])(this.facts,d);for(const r in t){var e,n;const s=t[r];if(null!==s&&void 0!==s&&null!==(e=s.actions)&&void 0!==e&&e.alert){var i;const t=this.runflowState(await(null===s||void 0===s||null===(i=s.actions)||void 0===i?void 0:i.alert(this.facts)));if(t===a.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var o;const t=await(null===s||void 0===s||null===(o=s.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await D["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(E["c"])(""+t)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await D["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),a=e.username.toUpperCase();return n<a?-1:n>a?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(r["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var a;const[e]=(null===(a=t.person)||void 0===a?void 0:a.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const T=m;e["a"]=T},b791:function(t,e,n){"use strict";n.r(e);var a=n("7a23");function i(t,e,n,i,o,r){const s=Object(a["resolveComponent"])("his-standard-form"),c=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(c,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(s,{fields:t.fields,onFinishAction:t.onFinish,skipSummary:!0,cancelDestinationPath:"/"},null,8,["fields","onFinishAction"])]),_:1})}var o=n("df95"),r=n("d95e"),s=n("d867"),c=n("7365"),l=n("2706"),u=n("80b5"),d=Object(a["defineComponent"])({mixins:[c["a"]],components:{IonPage:s["D"]},created(){this.fields=[{id:"data_cleaning_datetime",helpText:"Date data cleaning done",type:r["b"].TT_FULL_DATE,computedValue:t=>t.value,validation:t=>l["a"].required(t)},(()=>{const t=u["a"].getGivenNameField();return t.helpText="Verifier's First name",t.proxyID="supervisors",t})(),(()=>{const t=u["a"].getFamilyNameField();return t.helpText="Verifier's Last name",t.proxyID="supervisors",t.computedValue=(t,e)=>[`${e.given_name.value} ${t.value}`],t})()]},methods:{async onFinish(t,e){const n=await(new o["b"]).saveDataCleaningVerification(e);n&&this.$router.back()}}}),p=n("d959"),h=n.n(p);const E=h()(d,[["render",i]]);e["default"]=E},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("14d9");function a(t,e){const n=[],a=[-1,"",null,void 0];for(const i in e){if(!(i in t))continue;const o=t[i];a.includes(o)?n.push(!1):n.push(e[i](o,t))}return n.every(Boolean)}function i(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function o(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function r(t,e,n="",r="",s="priority"){const c=[];for(const i in e){const o=e[i],s=[o.target&&n&&o.target!=n,o.targetEvent&&r&&o.targetEvent!=r];s.some(Boolean)||a(t,o.conditions)&&(o.title=i,o.description&&(o.description.text=o.description.info(t)),c.push(o))}return"priority"===s?i(c):o(c)}},df95:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return o}));var a,i=n("5969");(function(t){t["DobMoreThanEnrolledDate"]="DOB MORE THAN DATE ENROLLED",t["ClientsWithEncountersAfterDeath"]="CLIENTS WITH ENCOUNTERS AFTER DECLARED DEAD",t["DobMoreThanDateEnrolled"]="DOB MORE THAN DATE ENROLLED",t["DateEnrolledLessThanEarliestStartDate"]="DATE ENROLLED LESS THAN EARLIEST START DATE",t["MalesWithFemaleObs"]="MALE CLIENTS WITH FEMALE OBS",t["PrescriptionWithoutDispensation"]="PRESCRIPTION WITHOUT DISPENSATION",t["MissingDemographics"]="MISSING DEMOGRAPHICS",t["MissingStartReasons"]="MISSING START REASONS",t["MultipleStartReasons"]="MULTIPLE START REASONS",t["PreArtOrUnknownOutcomes"]="PRE ART OR UNKNOWN OUTCOMES",t["MissingVlResults"]="MISSING VL RESULTS"})(a||(a={}));class o extends i["a"]{constructor(){super()}saveDataCleaningVerification(t){return i["a"].postJson("data_cleaning_confirmation",t)}getCleaningToolReport(t){return this.getReport("art_data_cleaning_tools",{report_name:t})}getEnrolledOnArtBeforeBirth(){return i["a"].getJson("enrolled_on_art_before_birth")}getIncompleteVisits(){return this.getReport("incomplete_visits",{tool_name:"INCOMPLETE VISITS"})}}}}]);
//# sourceMappingURL=chunk-30bbb10a.23809ffd.js.map