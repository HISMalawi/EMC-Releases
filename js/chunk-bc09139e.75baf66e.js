(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bc09139e"],{"5f2c":function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var i=n("ade3"),a=(n("14d9"),n("cc6f")),s=n("71c3"),r=(n("13d5"),n("1c74"));class o extends r["e"]{constructor(){super()}static async fetchAvailableDrugStock(t){const e=await this.getJson("pharmacy/items",{drug_id:t});if(e&&e.length>0)return e.reduce((t,e)=>t+e.current_quantity,0)}}var d=n("d1ca");const c={11:[30],21:[25],22:[60],24:[30,60,90,100],30:[90],39:[60],73:[120],74:[60],76:[1e3],297:[30,60,90],576:[30,60,90],613:[60],731:[60],732:[60],733:[60],734:[30],735:[30],736:[60],738:[60],931:[12,30,60],932:[30],954:[60],963:[30,60,90],968:[60],969:[30],971:[30,60,90],976:[60],977:[30],982:[30],983:[30,90],1039:[30,60,90],1043:[60],1044:[30],1056:[24],1216:[8,12]};class u extends a["a"]{constructor(t,e){super(t,54,e),Object(i["a"])(this,"drugHistory",void 0),Object(i["a"])(this,"currentDrugOrder",void 0),Object(i["a"])(this,"useDrugManagement",void 0),this.drugHistory=[],this.currentDrugOrder=[],this.useDrugManagement=!1}setIsDrugManagementEnabled(t){this.useDrugManagement=t}async loadDrugManagementEnabled(){this.useDrugManagement=await d["b"].drugManagementEnabled()}getDrugHistory(){return this.drugHistory}getCurrentOrder(){return this.currentDrugOrder}buildDispensations(t,e,n){const i=[];for(let a=0;a<n;a++)i.push({drug_order_id:t,date:this.date,quantity:e/n});return i}saveDispensations(t){return a["a"].postJson("/dispensations",{dispensations:t,program_id:a["a"].getProgramID()})}async voidOrder(t){return a["a"].void("/dispensations/"+t,{})}async loadDrugHistory(){try{const t=await s["a"].getDrugOrderHistory(this.patientID);t&&(this.drugHistory=t)}catch(t){console.warn(t)}}async loadCurrentDrugOrder(){const t=await s["a"].getDrugOrders(this.patientID);if(t){if(this.useDrugManagement){const e=t.map(async t=>(t["available_stock"]=await o.fetchAvailableDrugStock(t.drug.drug_id),t));return void(this.currentDrugOrder=await Promise.all(e))}this.currentDrugOrder=t}}getDrugPackSizes(t){return t in c?c[t]:[30,60,90]}calcCompletePack(t,e){const n=t.barcodes.sort((t,e)=>t.tabs-e.tabs);if(0==n.length||0==e)return e;for(const a in n){const{tabs:t}=n[a];if(parseInt(t)>=e)return t}const i=parseInt(n[n.length-1].tabs);return i}}},"71c3":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i=n("1c74");class a extends i["e"]{constructor(){super()}static create(t){return this.postJson("drug_orders",t)}static updateDispensationOrders(t){return this.postJson("dispensations",{program_id:this.getProgramID(),dispensations:t.map(t=>({date:this.getSessionDate(),drug_order_id:t["order_id"],quantity:t["quantity"]}))})}static getDrugOrderHistory(t){return this.getJson("drug_orders",{patient_id:t})}static getDrugOrders(t){return this.getJson("drug_orders",{patient_id:t,date:this.getSessionDate(),program_id:this.getProgramID()})}static getAllDrugOrders(t,e=1e3){return this.getJson("drug_orders",{patient_id:t,program_id:i["e"].getProgramID(),page_size:e})}static getLastDrugsReceived(t){return this.getJson(`patients/${t}/last_drugs_received`,{date:this.getSessionDate(),program_id:this.getProgramID()})}static getDrugDosages(t,e,n=this.getSessionDate()){const i={drug_id:e,date:n};return this.getJson(`programs/${this.getProgramID()}/patients/${t}/drug_doses`,i)}static getOrderByPatient(t,e){return this.getJson("/drug_orders",{patient_id:t,program_id:this.getProgramID(),...e})}}},7365:function(t,e,n){"use strict";n("14d9"),n("13d5");var i,a=n("7a23"),s=n("ad60"),r=n("2ef0"),o=n("0fa1"),d=n("7f35"),c=n("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(i||(i={}));const u=t=>c["b"].toStandardHisDisplayFormat(t),l={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(d["a"])("Data Integrity Issue Found","Patient died on "+u(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const n=await Object(d["a"])("Data integrity issue found","",`Session date ${u(e)} is less than birth date of ${u(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:n,apiDate:a})=>{const s=await Object(d["c"])("Please select a provider for "+e,`BDE: ${u(n)} | Current: ${u(a)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===s.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:s.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var p=n("c21d"),h=n("7920"),g=n("b5e4"),m=n("8e8b"),D=Object(a["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(t){t.params.patient_id&&this.patientID!=t.params.patient_id&&(this.patientID=parseInt(t.params.patient_id),m["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(t,e=null){const n={};if(n[i.SET_PROVIDER]=t=>{const[e]=t.split(" "),n=Object(r["find"])(this.providers,{username:e});return n&&(this.providerID=n.person_id),i.CONTINUE},n[i.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),i.EXIT),n[i.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),i.EXIT),n[i.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),i.EXIT),t in n)return n[t](e)},async checkEncounterGuidelines(){const t=Object(p["a"])(this.facts,l);for(const r in t){var e,n;const o=t[r];if(null!==o&&void 0!==o&&null!==(e=o.actions)&&void 0!==e&&e.alert){var a;const t=this.runflowState(await(null===o||void 0===o||null===(a=o.actions)||void 0===a?void 0:a.alert(this.facts)));if(t===i.EXIT)return}if(null!==o&&void 0!==o&&null!==(n=o.actions)&&void 0!==n&&n.selection){var s;const t=await(null===o||void 0===o||null===(s=o.actions)||void 0===s?void 0:s.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await m["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(g["c"])(""+t)}this.facts.sessionDate=s["a"].getSessionDate(),this.facts.apiDate=s["a"].getCachedApiDate(),this.facts.isBdeMode=s["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",s["a"].isBDE()&&(this.providers=await m["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const n=t.username.toUpperCase(),i=e.username.toUpperCase();return n<i?-1:n>i?1:0}).map(t=>{var e;let n=""+t.username;if(!Object(r["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var i;const[e]=(null===(i=t.person)||void 0===i?void 0:i.names)||[];n+=` (${e.given_name} ${e.family_name})`}return n}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>({label:t,value:t}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(o["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const n=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const n=e.obs?e.obs:e;return Array.isArray(n)?t=t.concat(n):"function"===typeof n?t.push(n()):t.push(n),t},[]);return Promise.all(n)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(n){return!1}},validateSeries(t){try{for(const e in t){const n=t[e]();if(n)return n}}catch(e){return[e]}}}});const f=D;e["a"]=f},7920:function(t,e,n){"use strict";var i=n("7a23");function a(t,e,n,a,s,r){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var s=n("9441"),r=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:s["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),o=n("d959"),d=n.n(o);const c=d()(r,[["render",a]]);e["a"]=c},"9e6a":function(t,e,n){"use strict";n.r(e);var i=n("7a23");function a(t,e,n,a,s,r){const o=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(o,{fields:t.fields,skipSummary:!0,cancelDestinationPath:t.cancelDestination},null,8,["fields","cancelDestinationPath"])}n("14d9");var s=n("d95e"),r=n("b5e4"),o=n("5f2c"),d=n("2ef0"),c=n("7365"),u=n("9283"),l=n("8e8b"),p=Object(i["defineComponent"])({mixins:[c["a"]],data:()=>({dispensation:{}}),watch:{ready:{handler(t){t&&(this.dispensation=new o["a"](this.patientID,this.providerID),this.fields=this.getFields())},immediate:!0}},methods:{saveDispensations(t){return this.dispensation.saveDispensations(this.buildDispensations(t))},buildDispensations(t){var e;if(!Object(d["isEmpty"])(null===(e=t.other)||void 0===e?void 0:e.dispenses)){let e=[];return t.other.dispenses.forEach(([n,i])=>{e=[...e,...this.dispensation.buildDispensations(t.other.order_id,n,i)]}),e}return this.dispensation.buildDispensations(t.other.order_id,parseInt(t.value.toString()),1)},async buildMedicationHistory(){return await this.dispensation.loadDrugHistory(),this.dispensation.getDrugHistory().sort((t,e)=>{const n=new Date(t.order.start_date),i=new Date(e.order.start_date);return i-n}).map(t=>({medication:t.drug.name,date:u["b"].toStandardHisDisplayFormat(t.order.start_date),amount:t.quantity}))},buildOrderOptions(){return this.dispensation.getCurrentOrder().map(t=>({label:t.drug.name,value:t.quantity||0,other:{order:t,drug_id:t.drug.drug_id,order_id:t.order.order_id,available_stock:t.available_stock||"-",amount_needed:this.calculateCompletePack(t),pack_sizes:this.getPackSizesRows(t.drug.drug_id,t.available_stock||0)}}))},getPackSizesRows(t,e){const n=this.dispensation.getDrugPackSizes(t);return n.map(t=>{const n=e>0?Math.floor(e/t):"-";return[t,n,0,0]})},calculateCompletePack(t){const e=parseFloat(t.amount_needed)-(t.quantity||0);return e<=0?0:this.dispensation.calcCompletePack(t,e)},isDoneDispensing(t){return t.map(t=>0!=t.value).every(Boolean)},async isValidDispensation(t){let e=!0;const n=parseInt(t.value.toString()),i=t.other["amount_needed"],a=n/i*100;return a>110&&(e=await Object(r["a"])("Are you sure you want to dispense over 110% of the prescribed pill count?")),a<100&&(e=await Object(r["a"])("Are you sure you want to dispense less than 100% of the prescribe amount?")),e},getFields(){return[{id:"dispenses",helpText:"Dispensation",type:s["b"].TT_DISPENSATION_INPUT,init:async()=>(this.dispensation.setIsDrugManagementEnabled(await l["a"].get("IS_ART_DRUG_MANAGEMENT_ENABLED")),await this.dispensation.loadCurrentDrugOrder(),!0),onValueUpdate:async(t,e)=>-1!=t.value&&this.isDoneDispensing(e)?this.$router.push({name:"appointment"}):(t.other["amount_needed"]=t.other["amount_needed"]-(parseInt(t.value.toString())||0),t.other["amount_needed"]<0&&(t.other["amount_needed"]=0),await this.dispensation.loadCurrentDrugOrder(),this.buildOrderOptions()),onValue:async(t,e)=>{if(-1===t.value){const e=await this.dispensation.voidOrder(t.other.order_id);return!e}if(!e){const e=await this.isValidDispensation(t);if(!e)return!1}const n=await this.saveDispensations(t);return!!n||(Object(r["e"])("Unable to save dispensation"),!1)},config:{isDrugManagementEnabled:()=>this.dispensation.useDrugManagement,medicationHistory:()=>this.buildMedicationHistory(),toolbarInfo:[{label:"Name",value:this.patient.getFullName()},{label:"Gender",value:this.patient.getGender()},{label:"Date Of Birth",value:u["b"].toStandardHisDisplayFormat(this.patient.getBirthdate())}],hiddenFooterBtns:["Clear","Finish"]},options:()=>this.buildOrderOptions()}]}}}),h=n("d959"),g=n.n(h);const m=g()(p,[["render",a]]);e["default"]=m},c21d:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n("14d9");function i(t,e){const n=[],i=[-1,"",null,void 0];for(const a in e){if(!(a in t))continue;const s=t[a];i.includes(s)?n.push(!1):n.push(e[a](s,t))}return n.every(Boolean)}function a(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function s(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function r(t,e,n="",r="",o="priority"){const d=[];for(const a in e){const s=e[a],o=[s.target&&n&&s.target!=n,s.targetEvent&&r&&s.targetEvent!=r];o.some(Boolean)||i(t,s.conditions)&&(s.title=a,s.description&&(s.description.text=s.description.info(t)),d.push(s))}return"priority"===o?a(d):s(d)}}}]);
//# sourceMappingURL=chunk-bc09139e.75baf66e.js.map