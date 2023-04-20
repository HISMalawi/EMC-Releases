(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74c63811"],{5697:function(t,e,n){"use strict";n.r(e);var i=n("7a23");function a(t,e,n,a,o,s){const r=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(r,{fields:t.fields,onOnFinish:t.onFinish,skipSummary:!0,cancelDestinationPath:t.cancelDestination},null,8,["fields","onOnFinish","cancelDestinationPath"])}var o=n("d95e"),s=n("7920"),r=n("7365"),c=n("2ef0"),l=n("9b7c"),d=n("4db7"),u=Object(i["defineComponent"])({mixins:[r["a"]],components:{HisStandardForm:s["a"]},data:()=>({fields:[],fieldContext:{}}),watch:{ready:{handler(t){t&&(this.fields=this.getFields())}}},methods:{onFinish(){this.nextTask()},getFields(){return[{id:"patient_lab_orders",helpText:"Lab orders",type:o["b"].TT_LAB_ORDERS,onload:t=>{this.fieldContext=t},options:async()=>{const t=await l["a"].getOrdersIncludingGivenResultStatus(this.patientID),e=l["a"].formatLabs(t);return[{label:"Lab orders",value:"order trail",other:{values:e}}]},config:{printOrder:t=>new d["a"](this.patientID).printLabOrderLbl(t),hiddenFooterBtns:["Clear"],footerBtns:[{name:"Order",size:"large",slot:"end",color:"primary",visible:!0,onClick:async()=>{Object(c["isEmpty"])(this.fieldContext)||await this.fieldContext.launchOrderSelection()},visibleOnStateChange:t=>0===t.index}]}}]}}}),h=n("d959"),p=n.n(h);const m=p()(u,[["render",a]]);e["default"]=m},7365:function(t,e,n){"use strict";n("14d9"),n("13d5");var i,a=n("7a23"),o=n("ad60"),s=n("2ef0"),r=n("0fa1"),c=n("7f35"),l=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(i||(i={}));const d=t=>l["b"].toStandardHisDisplayFormat(t),u={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+d(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${d(e)} is less than birth date of ${d(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:a})=>{const o=await Object(c["c"])("Please select a provider for "+e,`BDE: ${d(n)} | Current: ${d(a)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var h=n("c21d"),p=n("7920"),m=n("b5e4"),f=n("8e8b"),D=Object(a["defineComponent"])({components:{HisStandardForm:p["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),f["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[i.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(s["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(h["a"])(this.facts,u);for(const s in t){var e,n;const r=t[s];if(null!==r&&void 0!==r&&null!==(e=r.actions)&&void 0!==e&&e.alert){var a;const t=this.runflowState(await(null===r||void 0===r||null===(a=r.actions)||void 0===a?void 0:a.alert(this.facts)));if(t===i.EXIT)return}if(null!==r&&void 0!==r&&null!==(n=r.actions)&&void 0!==n&&n.selection){var o;const t=await(null===r||void 0===r||null===(o=r.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await f["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(m["c"])(""+t)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await f["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),i=e.username.toUpperCase();return n<i?-1:n>i?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(s["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var i;const[e]=(null===(i=t.person)||void 0===i?void 0:i.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const O=D;e["a"]=O},7920:function(t,e,n){"use strict";var i=n("7a23");function a(t,e,n,a,o,s){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),s=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),r=n("d959"),c=n.n(r);const l=c()(s,[["render",a]]);e["a"]=l},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));n("14d9");function i(t,e){const n=[],i=[-1,"",null,void 0];for(const a in e){if(!(a in t))continue;const o=t[a];i.includes(o)?n.push(!1):n.push(e[a](o,t))}return n.every(Boolean)}function a(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function o(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function s(t,e,n="",s="",r="priority"){const c=[];for(const a in e){const o=e[a],r=[o.target&&n&&o.target!=n,o.targetEvent&&s&&o.targetEvent!=s];r.some(Boolean)||i(t,o.conditions)&&(o.title=a,o.description&&(o.description.text=o.description.info(t)),c.push(o))}return"priority"===r?a(c):o(c)}}}]);
//# sourceMappingURL=chunk-74c63811.d9b2dcb4.js.map