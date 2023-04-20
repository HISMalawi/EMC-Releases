(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d8a9648"],{"4fc0":function(t,e,n){"use strict";n.r(e);var i=n("7a23");function s(t,e,n,s,r,a){const o=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(o,{skipSummary:!0,cancelDestinationPath:t.cancelDestination,fields:t.fields},null,8,["cancelDestinationPath","fields"])}var r=n("d95e"),a=n("b5e4"),o=n("ade3"),d=n("cc6f"),c=n("71c3");class u extends d["a"]{constructor(t,e){super(t,54,e),Object(o["a"])(this,"drugHistory",void 0),Object(o["a"])(this,"currentDrugOrder",void 0),this.drugHistory=[],this.currentDrugOrder=[]}getDrugHistory(){return this.drugHistory}getCurrentOrder(){return this.currentDrugOrder}buildDispensations(t,e){return[{drug_order_id:t,date:this.date,quantity:e}]}saveDispensations(t){return d["a"].postJson("/dispensations",{dispensations:t,program_id:d["a"].getProgramID()})}async voidOrder(t){return d["a"].void("/dispensations/"+t,{})}async loadDrugHistory(){const t=await c["a"].getDrugOrderHistory(this.patientID);t&&(this.drugHistory=t)}async loadCurrentDrugOrder(){const t=await c["a"].getDrugOrders(this.patientID);t&&(this.currentDrugOrder=await Promise.all(t))}calcCompletePack(t,e){const n=t.barcodes.sort((function(t,e){return t.tabs-e.tabs}));if(0==n.length||0==e)return e;for(let r=0;r<=n.length-1;r++)if(parseInt(n[r].tabs)>=e)return n[r].tabs;const i=parseInt(n[0].tabs);let s=parseInt(n[n.length-1].tabs);while(s<e)s+=i;return s}}var l=n("7365"),p=n("9283"),h=Object(i["defineComponent"])({mixins:[l["a"]],data:()=>({dispensation:{}}),watch:{patient:{async handler(t){this.dispensation=new u(t.getID(),this.providerID),await this.dispensation.loadCurrentDrugOrder(),await this.dispensation.loadDrugHistory(),this.fields=this.getFields()},deep:!0}},methods:{saveDispensations(t){const e=this.buildDispensations(t);return this.dispensation.saveDispensations(e)},buildDispensations(t){return this.dispensation.buildDispensations(t.other.order_id,t.value)},buildMedicationHistory(){return this.dispensation.getDrugHistory().sort((t,e)=>{const n=new Date(t.order.start_date),i=new Date(e.order.start_date);return i-n}).map(t=>({medication:t.drug.name,date:p["b"].toStandardHisDisplayFormat(t.order.start_date),amount:t.quantity}))},buildOrderOptions(){return this.dispensation.getCurrentOrder().map(t=>({label:t.drug.name,value:t.quantity||0,other:{drug_id:t.drug.drug_id,order_id:t.order.order_id,amount_needed:this.calculateCompletePack(t)}}))},getPackSizesRows(t,e){const n=this.dispensation.getDrugPackSizes(t);return n.map(t=>{const n=e>0?e/t:"-";return[t,n,0,0]})},calculateCompletePack(t){const e=parseFloat(t.amount_needed)-(t.quantity||0),n=this.dispensation.calcCompletePack(t,e);return n<0?0:n},isDoneDispensing(t){return t.map(t=>0!=t.value).every(Boolean)},async isValidDispensation(t){let e=!0;const n=parseInt(t.value.toString()),i=t.other["amount_needed"],s=n/i*100;return s>110&&(e=await Object(a["a"])("Are you sure you want to dispense over 110% of the prescribed pill count?")),s<100&&(e=await Object(a["a"])("Are you sure you want to dispense less than 100% of the prescribe amount?")),e},getFields(){return[{id:"dispenses",helpText:"Dispensation",type:r["b"].TT_DRUG_DISPENSER,onValueUpdate:async(t,e)=>-1!=t.value&&this.isDoneDispensing(e)?this.gotoPatientDashboard():(t.other["amount_needed"]=0,await this.dispensation.loadCurrentDrugOrder(),this.buildOrderOptions()),onValue:async(t,e)=>{if(-1===t.value){const e=await this.dispensation.voidOrder(t.other.order_id);return!!e}if(!e){const e=await this.isValidDispensation(t);if(!e)return!1}const n=await this.saveDispensations(t);return!!n||(Object(a["e"])("Unable to save dispensation"),!1)},config:{medicationHistory:this.buildMedicationHistory(),toolbarInfo:[{label:"Name",value:this.patient.getFullName()},{label:"Gender",value:this.patient.getGender()},{label:"Date Of Birth",value:p["b"].toStandardHisDisplayFormat(this.patient.getBirthdate())}],hiddenFooterBtns:["Clear","Finish"]},options:()=>this.buildOrderOptions()}]}}}),g=n("d959"),D=n.n(g);const m=D()(h,[["render",s]]);e["default"]=m},"71c3":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var i=n("1c74");class s extends i["e"]{constructor(){super()}static create(t){return this.postJson("drug_orders",t)}static updateDispensationOrders(t){return this.postJson("dispensations",{program_id:this.getProgramID(),dispensations:t.map(t=>({date:this.getSessionDate(),drug_order_id:t["order_id"],quantity:t["quantity"]}))})}static getDrugOrderHistory(t){return this.getJson("drug_orders",{patient_id:t})}static getDrugOrders(t){return this.getJson("drug_orders",{patient_id:t,date:this.getSessionDate(),program_id:this.getProgramID()})}static getAllDrugOrders(t,e=1e3){return this.getJson("drug_orders",{patient_id:t,program_id:i["e"].getProgramID(),page_size:e})}static getLastDrugsReceived(t){return this.getJson(`patients/${t}/last_drugs_received`,{date:this.getSessionDate(),program_id:this.getProgramID()})}static getDrugDosages(t,e,n=this.getSessionDate()){const i={drug_id:e,date:n};return this.getJson(`programs/${this.getProgramID()}/patients/${t}/drug_doses`,i)}static getOrderByPatient(t,e){return this.getJson("/drug_orders",{patient_id:t,program_id:this.getProgramID(),...e})}}},7365:function(t,e,n){"use strict";n("14d9"),n("13d5");var i,s=n("7a23"),r=n("ad60"),a=n("2ef0"),o=n("0fa1"),d=n("7f35"),c=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(i||(i={}));const u=t=>c["b"].toStandardHisDisplayFormat(t),l={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(d["a"])("Data Integrity Issue Found","Patient died on "+u(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(d["a"])("Data integrity issue found","",`Session date ${u(e)} is less than birth date of ${u(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:s})=>{const r=await Object(d["c"])("Please select a provider for "+e,`BDE: ${u(n)} | Current: ${u(s)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===r.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:r.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var p=n("c21d"),h=n("7920"),g=n("b5e4"),D=n("8e8b"),m=Object(s["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),D["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[i.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(a["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(p["a"])(this.facts,l);for(const a in t){var e,n;const o=t[a];if(null!==o&&void 0!==o&&null!==(e=o.actions)&&void 0!==e&&e.alert){var s;const t=this.runflowState(await(null===o||void 0===o||null===(s=o.actions)||void 0===s?void 0:s.alert(this.facts)));if(t===i.EXIT)return}if(null!==o&&void 0!==o&&null!==(n=o.actions)&&void 0!==n&&n.selection){var r;const t=await(null===o||void 0===o||null===(r=o.actions)||void 0===r?void 0:r.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await D["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(g["c"])(""+t)}this.facts.sessionDate=r["a"].getSessionDate(),this.facts.apiDate=r["a"].getCachedApiDate(),this.facts.isBdeMode=r["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",r["a"].isBDE()&&(this.providers=await D["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),i=e.username.toUpperCase();return n<i?-1:n>i?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(a["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var i;const[e]=(null===(i=t.person)||void 0===i?void 0:i.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(o["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const f=m;e["a"]=f},7920:function(t,e,n){"use strict";var i=n("7a23");function s(t,e,n,s,r,a){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=n("9441"),a=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),o=n("d959"),d=n.n(o);const c=d()(a,[["render",s]]);e["a"]=c},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("14d9");function i(t,e){const n=[],i=[-1,"",null,void 0];for(const s in e){if(!(s in t))continue;const r=t[s];i.includes(r)?n.push(!1):n.push(e[s](r,t))}return n.every(Boolean)}function s(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function r(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function a(t,e,n="",a="",o="priority"){const d=[];for(const s in e){const r=e[s],o=[r.target&&n&&r.target!=n,r.targetEvent&&a&&r.targetEvent!=a];o.some(Boolean)||i(t,r.conditions)&&(r.title=s,r.description&&(r.description.text=r.description.info(t)),d.push(r))}return"priority"===o?s(d):r(d)}}}]);
//# sourceMappingURL=chunk-0d8a9648.c5d5a250.js.map