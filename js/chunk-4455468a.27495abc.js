(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4455468a"],{"1b82":function(t,e,n){"use strict";n.r(e);var i=n("7a23");function a(t,e,n,a,r,s){const o=Object(i["resolveComponent"])("his-standard-form"),c=Object(i["resolveComponent"])("ion-page");return Object(i["openBlock"])(),Object(i["createBlock"])(c,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(o,{fields:t.formFields,skipSummary:!0,onFinishAction:t.onFinish,cancelDestinationPath:t.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]),_:1})}var r=n("7365"),s=n("d95e"),o=n("cc6f");class c extends o["a"]{constructor(t,e){super(t,54,e)}saveNoDispensationObs(){return this.saveValueTextObs("Tetanus Diphtheria","Not dispensed")}}var d=n("8ee8"),u=n("d867"),l=Object(i["defineComponent"])({components:{IonPage:u["D"]},mixins:[r["a"]],data:()=>({formFields:[],service:{}}),watch:{ready:{handler(t){t&&(this.formFields=this.getFields())},immediate:!0}},methods:{async onFinish(t,e){await e["prescription"].action(),this.nextTask()},getFields(){return[{id:"prescription",helpText:"Vaccination",type:s["b"].TT_YES_NO,validation:t=>t?null:["Value is required"],computedValue:t=>t.match(/true/i)?{action:async()=>{const t=new d["a"](this.patientID,this.providerID);await t.createEncounter(),await t.updateVaccinationOrder()}}:{action:async()=>{const t=new c(this.patientID,this.providerID);await t.createEncounter(),await t.saveNoDispensationObs()}},options:()=>[{label:"TD given today?",values:[{label:"yes",value:"true"},{label:"no",value:"false"}]}]}]}}}),p=n("d959"),h=n.n(p);const m=h()(l,[["render",a]]);e["default"]=m},"71c3":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i=n("1c74");class a extends i["e"]{constructor(){super()}static create(t){return this.postJson("drug_orders",t)}static updateDispensationOrders(t){return this.postJson("dispensations",{program_id:this.getProgramID(),dispensations:t.map(t=>({date:this.getSessionDate(),drug_order_id:t["order_id"],quantity:t["quantity"]}))})}static getDrugOrderHistory(t){return this.getJson("drug_orders",{patient_id:t})}static getDrugOrders(t){return this.getJson("drug_orders",{patient_id:t,date:this.getSessionDate(),program_id:this.getProgramID()})}static getAllDrugOrders(t,e=1e3){return this.getJson("drug_orders",{patient_id:t,program_id:i["e"].getProgramID(),page_size:e})}static getLastDrugsReceived(t){return this.getJson(`patients/${t}/last_drugs_received`,{date:this.getSessionDate(),program_id:this.getProgramID()})}static getDrugDosages(t,e,n=this.getSessionDate()){const i={drug_id:e,date:n};return this.getJson(`programs/${this.getProgramID()}/patients/${t}/drug_doses`,i)}static getOrderByPatient(t,e){return this.getJson("/drug_orders",{patient_id:t,program_id:this.getProgramID(),...e})}}},7365:function(t,e,n){"use strict";n("14d9"),n("13d5");var i,a=n("7a23"),r=n("ad60"),s=n("2ef0"),o=n("0fa1"),c=n("7f35"),d=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(i||(i={}));const u=t=>d["b"].toStandardHisDisplayFormat(t),l={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+u(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(c["a"])("Data integrity issue found","",`Session date ${u(e)} is less than birth date of ${u(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:a})=>{const r=await Object(c["c"])("Please select a provider for "+e,`BDE: ${u(n)} | Current: ${u(a)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===r.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:r.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var p=n("c21d"),h=n("7920"),m=n("b5e4"),D=n("8e8b"),g=Object(a["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),D["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[i.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(s["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(p["a"])(this.facts,l);for(const s in t){var e,n;const o=t[s];if(null!==o&&void 0!==o&&null!==(e=o.actions)&&void 0!==e&&e.alert){var a;const t=this.runflowState(await(null===o||void 0===o||null===(a=o.actions)||void 0===a?void 0:a.alert(this.facts)));if(t===i.EXIT)return}if(null!==o&&void 0!==o&&null!==(n=o.actions)&&void 0!==n&&n.selection){var r;const t=await(null===o||void 0===o||null===(r=o.actions)||void 0===r?void 0:r.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await D["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(m["c"])(""+t)}this.facts.sessionDate=r["a"].getSessionDate(),this.facts.apiDate=r["a"].getCachedApiDate(),this.facts.isBdeMode=r["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",r["a"].isBDE()&&(this.providers=await D["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),i=e.username.toUpperCase();return n<i?-1:n>i?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(s["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var i;const[e]=(null===(i=t.person)||void 0===i?void 0:i.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(o["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const f=g;e["a"]=f},7920:function(t,e,n){"use strict";var i=n("7a23");function a(t,e,n,a,r,s){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=n("9441"),s=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),o=n("d959"),c=n.n(o);const d=c()(s,[["render",a]]);e["a"]=d},"8ee8":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return c}));var i=n("cc6f"),a=n("71c3"),r=n("2ef0"),s=n("9283");const o={"Once a day (OD)":1,"Twice a day (BD)":2,"Three a day (TDS)":3,"Four times a day (QID)":4,"Five times a day (5X/D)":5,"Six times a day (Q4HRS)":6,"In the morning (QAM)":.5,"Once a week (QWK)":.14,"Once a month":.03,"Twice a month":.071};class c extends i["a"]{constructor(t,e){super(t,25,e)}vaccinationDrugObj(){return{drug_inventory_id:609,dose:.5,equivalent_daily_dose:.5,frequency:"Once a day (od)",start_date:this.date,auto_expire_date:this.date,instructions:"Once a day",units:"ml"}}async updateVaccinationOrder(){const t=await this.dispenseVaccinationDrug();if(!Object(r["isEmpty"])(t)){const e=t[0].order_id;return a["a"].updateDispensationOrders([{order_id:e,quantity:1}])}throw"Unable to dispense"}dispenseVaccinationDrug(){return this.createOrders([this.vaccinationDrugObj()])}createOrders(t){return a["a"].create({drug_orders:t,encounter_id:this.getEncounterID()})}async submitTreatment(t){await this.createEncounter();const e=await this.createOrders(t.map(t=>this.buildDrugOrderObj(t))),n=new i["a"](this.patientID,54,this.providerID);await n.createEncounter(),t.forEach(t=>{const n=o[t.frequency]*t.duration;e.forEach(e=>{e.drug_inventory_id===t.id&&(e.quantity=n)})}),await a["a"].updateDispensationOrders(e)}buildDrugOrderObj(t){const e=new Date(this.date),n=e.setDate(e.getDate()+parseInt(""+t.duration)),i=t.dose||o[t.frequency],a=parseFloat(i)*o[t.frequency];return{drug_inventory_id:t.id,dose:i,equivalent_daily_dose:a,frequency:t.frequency,start_date:this.date,auto_expire_date:s["b"].toStandardHisFormat(new Date(n)),instructions:t.drug_name+":"+t.dose+" "+t.units+" "+t.frequency+"days",units:t.units}}}},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));n("14d9");function i(t,e){const n=[],i=[-1,"",null,void 0];for(const a in e){if(!(a in t))continue;const r=t[a];i.includes(r)?n.push(!1):n.push(e[a](r,t))}return n.every(Boolean)}function a(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function r(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function s(t,e,n="",s="",o="priority"){const c=[];for(const a in e){const r=e[a],o=[r.target&&n&&r.target!=n,r.targetEvent&&s&&r.targetEvent!=s];o.some(Boolean)||i(t,r.conditions)&&(r.title=a,r.description&&(r.description.text=r.description.info(t)),c.push(r))}return"priority"===o?a(c):r(c)}}}]);
//# sourceMappingURL=chunk-4455468a.27495abc.js.map