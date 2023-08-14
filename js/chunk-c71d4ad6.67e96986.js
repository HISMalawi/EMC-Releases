(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c71d4ad6"],{"5b71":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var n=i("ade3"),s=i("9b7c"),a=i("cc6f");class r extends a["a"]{constructor(t){super(t,57),Object(n["a"])(this,"patientID",void 0),Object(n["a"])(this,"testTypeID",void 0),Object(n["a"])(this,"resultDate",void 0),Object(n["a"])(this,"testID",void 0),this.patientID=t,this.testTypeID=-1,this.resultDate="",this.testID=-1}createLabResult(t){return a["a"].postJson(`lab/tests/${this.testID}/results`,{encounter_id:this.encounterID,date:this.resultDate,measures:t})}getTestID(){return this.testID}getTestTypeID(){return this.testTypeID}setTestTypeID(t){this.testTypeID=t}setResultDate(t){this.resultDate=t}setTestID(t){this.testID=t}getTestsWithoutResults(){return s["a"].getOrders(this.patientID,{status:"drawn"})}getTestIndicators(){return s["a"].getJson("lab/test_result_indicators",{test_type_id:this.testTypeID})}}},7365:function(t,e,i){"use strict";i("14d9"),i("13d5");var n,s=i("7a23"),a=i("ad60"),r=i("2ef0"),o=i("0fa1"),c=i("7f35"),l=i("9283");(function(t){t["SET_PROVIDER"]="SET_PROVIDER",t["CHANGE_SESSION_DATE"]="change_session_date",t["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",t["CHANGE_PATIENT_OUTCOME"]="change_outcome",t["CONTINUE"]="continue",t["EXIT"]="exit"})(n||(n={}));const u=t=>l["b"].toStandardHisDisplayFormat(t),d={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:t})=>{const e=await Object(c["a"])("Data Integrity Issue Found","Patient died on "+u(t),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===e?n.GO_TO_PATIENT_DASHBOARD:"Change outcome"===e?n.CHANGE_PATIENT_OUTCOME:n.CONTINUE}},conditions:{outcome(t){return"Patient died"===t},outcomeStartDate(t,{sessionDate:e}){return e>=t}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:t,sessionDate:e})=>{const i=await Object(c["a"])("Data integrity issue found","",`Session date ${u(e)} is less than birth date of ${u(t)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===i?n.CHANGE_SESSION_DATE:n.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(t,{sessionDate:e}){return e<t}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:t,encounterName:e,sessionDate:i,apiDate:s})=>{const a=await Object(c["c"])("Please select a provider for "+e,`BDE: ${u(i)} | Current: ${u(s)}`,t,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===a.action?{value:-1,flowState:n.GO_TO_PATIENT_DASHBOARD}:{value:a.selection,flowState:n.SET_PROVIDER}}},conditions:{isBdeMode(t){return t}}}};var h=i("c21d"),p=i("7920"),f=i("b5e4"),m=i("8e8b"),D=i("b432"),b=i("5a0c"),v=i.n(b),T=i("cc6f"),O=i("2ed9"),I=Object(s["defineComponent"])({components:{HisStandardForm:p["a"]},data:()=>({offlineID:null,patient:{},fields:[],patientID:"",providerID:-1,providers:[],encounterStartTime:null,facts:{age:-1,gender:"",birthDate:"",sessionDate:"",apiDate:"",isEnrolledInProgam:!1,encounterName:"N/A",providers:[],isBdeMode:!1,outcome:"",outcomeStartDate:"",village:"",district:"",currentTA:""},formLabel:"",ready:!1}),created(){this.$route.params.patient_id&&(this.offlineID=this.$route.params.patient_id,this.patientID=parseInt(""+this.$route.params.patient_id),this.goOffline()?this.initOfflineData():m["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(t=>{this.patient=t,Object(r["isEmpty"])(this.patient)||Object(D["a"])().cachePatient(this.patient),this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0,this.setStartTime()}).catch(t=>console.log(t))}).catch(()=>{this.goOffline()&&this.initOfflineData()})}))},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{setStartTime(){this.encounterStartTime=(new Date).getTime()},goOffline(){return!D["c"].value||D["b"].value},isOnline(){return D["c"].value},isOfflineMode(){return D["b"].value},initOfflineData(){var t;const e=Object(D["a"])().findByID(this.offlineID),i=null===e||void 0===e||null===(t=e.personParams)||void 0===t?void 0:t.person;i&&(this.facts.birthDate=i.birthdate,this.facts.age=v()(a["a"].getSessionDate()).diff(this.facts.birthDate,"years"),this.facts.district=i.current_district,this.facts.village=i.current_village,this.facts.currentTA=i.current_traditional_authority,this.facts.gender=i.gender,this.ready=!0,this.setStartTime())},async saveFormEncounterAndProceed(t={}){let e="Pending",i=!1,n=null;const s=(new Date).getTime(),a=(s-this.encounterStartTime)/1e3,r=a/60;try{const e=await T["a"].buildValueText("Device",Object(O["f"])()),i=await T["a"].buildValueNumber("Review Time",r);n=[...await this.resolveObs(t.computedData),e,i]}catch(o){return console.error(""+o),Object(f["e"])("Unable to resolve observations")}if(!this.isOfflineMode()){try{const s=new T["a"](this.patientID,t.encounterTypeID,this.providerID);await s.createEncounter()&&await s.saveObservationList(n)&&(e="Success"),"function"===typeof t.callback&&await t.callback(s),i=!0}catch(o){i=!1,/NetworkError|Failed to fetch/i.test(""+o)?e="NetworkError":(e="Exception",console.error("Exception while saving an encounter: "+o))}if("Exception"===e)return Object(f["c"])("An error has occured!")}Object(D["a"])().saveObsOffline({observations:n,id:this.offlineID,uploadStatus:e,encounterName:this.$route.name,encounterTypeID:t.encounterTypeID,meta:t.formData,labOrders:t.labOrders,created:i},i),t.skipNextTask||this.nextTask()},runflowState(t,e=null){const i={};if(i[n.SET_PROVIDER]=t=>{const[e]=t.split(" "),i=Object(r["find"])(this.providers,{username:e});return i&&(this.providerID=i.person_id),n.CONTINUE},i[n.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),n.EXIT),i[n.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),n.EXIT),i[n.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),n.EXIT),t in i)return i[t](e)},async checkEncounterGuidelines(){const t=Object(h["a"])(this.facts,d);for(const r in t){var e,i;const o=t[r];if(null!==o&&void 0!==o&&null!==(e=o.actions)&&void 0!==e&&e.alert){var s;const t=this.runflowState(await(null===o||void 0===o||null===(s=o.actions)||void 0===s?void 0:s.alert(this.facts)));if(t===n.EXIT)return}if(null!==o&&void 0!==o&&null!==(i=o.actions)&&void 0!==i&&i.selection){var a;const t=await(null===o||void 0===o||null===(a=o.actions)||void 0===a?void 0:a.selection(this.facts));this.runflowState(t.flowState,t.value)}}},async setEncounterFacts(){try{const t=await m["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.isEnrolledInProgam=t.programID===a["a"].getProgramID(),this.facts.outcome=t.outcome,this.facts.outcomeStartDate=t.startDate}catch(t){console.error(t),Object(f["c"])(""+t)}this.facts.currentTA=this.patient.getCurrentTA(),this.facts.district=this.patient.getCurrentDistrict(),this.facts.village=this.patient.getCurrentVillage(),this.facts.sessionDate=a["a"].getSessionDate(),this.facts.apiDate=a["a"].getCachedApiDate(),this.facts.isBdeMode=a["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.age=this.patient.getAge(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",a["a"].isBDE()&&(this.providers=await m["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((t,e)=>{const i=t.username.toUpperCase(),n=e.username.toUpperCase();return i<n?-1:i>n?1:0}).map(t=>{var e;let i=""+t.username;if(!Object(r["isEmpty"])(null===t||void 0===t||null===(e=t.person)||void 0===e?void 0:e.names)){var n;const[e]=(null===(n=t.person)||void 0===n?void 0:n.names)||[];i+=` (${e.given_name} ${e.family_name})`}return i}))},toOption(t,e={}){return{label:t,value:t,other:e}},mapStrToOptions(t){return t.map(t=>"string"===typeof t||"number"===typeof t?{label:t,value:t}:t)},patientDashboardUrl(){return"/patient/dashboard/"+this.$route.params.patient_id},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},async nextTask(){try{const t=this.offlineID||this.patientID;await Object(o["b"])(t,this.$router,this.$route)}catch(t){console.error("Workflow error "+t),this.gotoPatientDashboard()}},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(t,e={}){return{label:t,value:"",other:{...e,values:this.yesNoOptions()}}},mapOptions(t){return t.map(t=>({label:t,value:t}))},toConditionalOptions(t){const e=[];for(const i of t)("boolean"!==typeof i[1]||i[1])&&e.push(this.toOption(i[0]));return e},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(t,e=""){const i=Object.values(t).filter(t=>t&&(t.tag===e||""===e)).reduce((t,e)=>{const i=e.obs?e.obs:e;return Array.isArray(i)?t=t.concat(i):"function"===typeof i?t.push(i()):t.push(i),t},[]);return Promise.all(i)},inArray(t,e){try{return t.filter(t=>e(t)).length>0}catch(i){return!1}},validateSeries(t){try{for(const e in t){const i=t[e]();if(i)return i}}catch(e){return[e]}}}});const y=I;e["a"]=y},7920:function(t,e,i){"use strict";var n=i("7a23");function s(t,e,i,s,a,r){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(t.formType),{fields:t.fields,skipSummary:t.skipSummary,activeField:t.activeField,cancelDestinationPath:t.cancelDestinationPath,onOnFinish:t.onFinish,onFinish:t.onFinishAction,onOnIndex:t.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var a=i("9441"),r=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:a["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(t,e){this.$emit("onFinish",t,e)},onIndex(t){this.$emit("onIndex",t)}}}),o=i("6b0d"),c=i.n(o);const l=c()(r,[["render",s]]);e["a"]=l},bb8a:function(t,e,i){"use strict";i.r(e);var n=i("7a23");function s(t,e,i,s,a,r){const o=Object(n["resolveComponent"])("his-standard-form"),c=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(c,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(o,{formLabel:"DBS Result",fields:t.fields,onFinishAction:t.onFinish,cancelDestinationPath:t.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]),_:1})}var a=i("7365"),r=i("9283"),o=i("d95e"),c=i("d867"),l=i("5b71"),u=i("2706"),d=i("0011"),h=i("b5e4"),p=i("2ef0"),f=i("5a0c"),m=i.n(f),D=Object(n["defineComponent"])({components:{IonPage:c["D"]},mixins:[a["a"]],data:()=>({lab:{},orders:[]}),watch:{ready:{async handler(t){t&&(this.lab=new l["a"](this.patientID),this.orders=await this.lab.getTestsWithoutResults(),this.fields=[this.ordersWithoutResultsField(),this.alphaResultField(),this.resultField(),this.resultDateField()])},immediate:!0}},methods:{async onFinish(t,e){this.lab.setTestID(e.result.testID),this.lab.setResultDate(t.result_date.label),await this.lab.createEncounter(),await this.lab.createLabResult([e.result.measures]),this.nextTask()},ordersWithoutResultsField(){let t=[];return{id:"orders",helpText:"Select DBS Order",type:o["b"].TT_SELECT,init:async()=>(t.filter(t=>/dbs/i.test(t.specimen.name)&&t.tests.some(t=>/viral load|HIV DNA polymerase chain reaction/i.test(t.name)&&null===t.result)),!0),isRequired:()=>!0,options:t=>null!=t.orders?t.orders:this.orders.map(t=>{const e=Object(p["find"])(t.tests,t=>/viral load|HIV DNA polymerase chain reaction/i.test(t.name));return{label:`#${t.accession_number} ${Object(d["g"])(t.order_date)}`,value:e.concept_id,other:{testID:e.id}}})}},resultDateField(){return{id:"result_date",helpText:"Result date",type:o["b"].TT_FULL_DATE,isRequired:()=>!0,condition:t=>t.orders.value,validation:(t,e)=>{const i=m()(e.orders.other.order_date).format(r["a"]);return new Date(t.label)>new Date(i)?[`Result date ${t.label} cannot be greater than order date of ${i}`]:null}}},alphaResultField(){return{id:"result",helpText:"Select Test Result",type:o["b"].TT_SELECT,group:"test_indicator",finalComputedValue:(t,e)=>({testID:e.orders.other.testID,measures:{indicator:{concept_id:e.orders.value},value:t.value,value_type:"text"}}),appearInSummary:()=>!1,validation:t=>u["a"].required(t),condition:async()=>this.orders.filter(t=>/dbs/i.test(t.specimen.name)&&t.tests.some(t=>/HIV DNA polymerase chain reaction/i.test(t.name)&&null===t.result)).length>0,options:()=>[{label:"Positive",value:"positive"},{label:"Negative",value:"negative"}]}},resultField(){return{id:"result",helpText:"Test result",type:o["b"].TT_TEXT,isRequired:()=>!0,condition:()=>this.orders.filter(t=>/dbs/i.test(t.specimen.name)&&t.tests.some(t=>/viral load/i.test(t.name)&&null===t.result)).length>0,config:{customKeyboard:[[["1","2","3"],["4","5","6","=","<",">"],["7","8","9","."],["","0",""]],[["Delete"]]]},onValue:t=>!!/^(=|<|>)([0-9]*)$/m.test(""+t.value)||(Object(h["e"])("You must enter a modifer and numbers only. i.e =90 / >19 / < 750"),!1),finalComputedValue:(t,e)=>({testID:e.orders.other.testID,measures:{indicator:{concept_id:e.orders.value},value:parseInt((""+t.value).substring(1)),value_modifier:(""+t.value).charAt(0),value_type:"numeric"}})}}}}),b=i("6b0d"),v=i.n(b);const T=v()(D,[["render",s]]);e["default"]=T},c21d:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));i("14d9");function n(t,e){const i=[],n=[-1,"",null,void 0];for(const s in e){if(!(s in t))continue;const a=t[s];n.includes(a)?i.push(!1):i.push(e[s](a,t))}return i.every(Boolean)}function s(t){return t.sort((t,e)=>t.priority&&e.priority&&t.priority<e.priority?-1:1)}function a(t){return t.sort((t,e)=>t.weight&&e.weight&&t.weight>e.weight?-1:1)}function r(t,e,i="",r="",o="priority"){const c=[];for(const s in e){const a=e[s],o=[a.target&&i&&a.target!=i,a.targetEvent&&r&&a.targetEvent!=r];o.some(Boolean)||n(t,a.conditions)&&(a.title=s,a.description&&(a.description.text=a.description.info(t)),c.push(a))}return"priority"===o?s(c):a(c)}}}]);
//# sourceMappingURL=chunk-c71d4ad6.67e96986.js.map