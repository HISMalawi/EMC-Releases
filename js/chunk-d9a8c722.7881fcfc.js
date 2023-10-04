(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d9a8c722"],{"5ca2":function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var a=i("cc6f"),n=i("b89f");class o extends a["a"]{constructor(e,t){super(e,121,t)}static getListOfRadiologyTests(e){return super.getJson("radiology_set",{id:e})}getPatientExaminations(){return a["a"].getJson("radiology/examinations",{patient_id:this.patientID})}createOrder(e){return a["a"].postJson("orders/radiology",e)}printExamination(e){const t=new n["a"];return t.printLbl("orders/radiology?accession_number="+e)}}},7365:function(e,t,i){"use strict";i("14d9"),i("13d5");var a,n=i("7a23"),o=i("ad60"),s=i("2ef0"),r=i("0fa1"),l=i("7f35"),d=i("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(a||(a={}));const c=e=>d["b"].toStandardHisDisplayFormat(e),u={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(l["a"])("Data Integrity Issue Found","Patient died on "+c(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?a.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?a.CHANGE_PATIENT_OUTCOME:a.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const i=await Object(l["a"])("Data integrity issue found","",`Session date ${c(t)} is less than birth date of ${c(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===i?a.CHANGE_SESSION_DATE:a.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:i,apiDate:n})=>{const o=await Object(l["c"])("Please select a provider for "+t,`BDE: ${c(i)} | Current: ${c(n)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===o.action?{value:-1,flowState:a.GO_TO_PATIENT_DASHBOARD}:{value:o.selection,flowState:a.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var p=i("c21d"),h=i("7920"),m=i("b5e4"),v=i("8e8b"),f=Object(n["defineComponent"])({components:{HisStandardForm:h["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),v["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const i={};if(i[a.SET_PROVIDER]=e=>{const[t]=e.split(" "),i=Object(s["find"])(this.providers,{username:t});return i&&(this.providerID=i.person_id),a.CONTINUE},i[a.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),a.EXIT),i[a.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),a.EXIT),i[a.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),a.EXIT),e in i)return i[e](t)},async checkEncounterGuidelines(){const e=Object(p["a"])(this.facts,u);for(const s in e){var t,i;const r=e[s];if(null!==r&&void 0!==r&&null!==(t=r.actions)&&void 0!==t&&t.alert){var n;const e=this.runflowState(await(null===r||void 0===r||null===(n=r.actions)||void 0===n?void 0:n.alert(this.facts)));if(e===a.EXIT)return}if(null!==r&&void 0!==r&&null!==(i=r.actions)&&void 0!==i&&i.selection){var o;const e=await(null===r||void 0===r||null===(o=r.actions)||void 0===o?void 0:o.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await v["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(m["c"])(""+e)}this.facts.sessionDate=o["a"].getSessionDate(),this.facts.apiDate=o["a"].getCachedApiDate(),this.facts.isBdeMode=o["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",o["a"].isBDE()&&(this.providers=await v["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const i=e.username.toUpperCase(),a=t.username.toUpperCase();return i<a?-1:i>a?1:0}).map(e=>{var t;let i=""+e.username;if(!Object(s["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var a;const[t]=(null===(a=e.person)||void 0===a?void 0:a.names)||[];i+=` (${t.given_name} ${t.family_name})`}return i}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const i=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const i=t.obs?t.obs:t;return Array.isArray(i)?e=e.concat(i):"function"===typeof i?e.push(i()):e.push(i),e},[]);return Promise.all(i)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(i){return!1}},validateSeries(e){try{for(const t in e){const i=e[t]();if(i)return i}}catch(t){return[t]}}}});const b=f;t["a"]=b},b14f:function(e,t,i){"use strict";i.r(t);var a=i("7a23");function n(e,t,i,n,o,s){const r=Object(a["resolveComponent"])("his-standard-form"),l=Object(a["resolveComponent"])("ion-page");return Object(a["openBlock"])(),Object(a["createBlock"])(l,null,{default:Object(a["withCtx"])(()=>[Object(a["createVNode"])(r,{fields:e.fields,onFinishAction:e.onFinish,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]),_:1})}i("14d9");var o=i("7365"),s=i("7920"),r=i("d867"),l=i("d95e"),d=i("2706"),c=i("5ca2"),u=i("1c74");class p extends u["e"]{constructor(){super()}static getInternalSections(){return super.getJson("internal_sections")}static createInternalSection(e){return super.postJson("internal_sections",{name:e})}}var h=i("2ef0"),m=i("b5e4"),v=i("80b5"),f=i("f149"),b=Object(a["defineComponent"])({mixins:[o["a"]],components:{IonPage:r["D"],HisStandardForm:s["a"]},data:()=>({service:{},examinationOptions:[],defaultExternalLocation:"",detailedExaminationOptions:[]}),watch:{ready:{handler(e){e&&(this.service=new c["a"](this.patientID,this.providerID),this.fields.push(this.listOfRadiologyTestsField()),this.fields.push(this.examinationField()),this.fields.push(this.detailedExaminationField()),this.fields.push(this.referralTypeField()),this.fields.push(this.internalReferralField()),this.fields.push(this.externalReferralField()),this.fields.push(this.payingField()),this.fields.push(this.paymentTypeField()),this.fields.push(this.receiptField()),this.fields.push(this.paymentAmountField()),this.fields.push(this.invoiceField()),this.fields.push(this.invoiceAmountField()))},immediate:!0}},methods:{async getTestsOptions(e){return(await c["a"].getListOfRadiologyTests(e)).map(e=>({label:e.name,value:e.concept_id}))},validateAmount(e){return e.match(/([0-9]+\\.[0-9])|Unknown$/i)?["You must enter a decimal number"]:null},async onFinish(e,t){await this.service.createEncounter();const i=await this.service.createOrder({concept_id:t["list_of_radiology_test"]["concept"],encounter_id:this.service.encounterID,provider_id:this.providerID}),a=(await this.resolveObs(t)).map(e=>(e["order_id"]=i.order_id,e));await this.service.saveObservationList(a),this.service.printExamination(i.accession_number),this.gotoPatientDashboard()},listOfRadiologyTestsField(){let e=[],t=-1;return{id:"list_of_radiology_test",helpText:"Please select the type of examination",type:l["b"].TT_SELECT,validation:e=>d["a"].required(e),computedValue:e=>({concept:e.value,obs:this.service.buildValueCoded("RADIOLOGY TEST",e.value)}),beforeNext:async e=>(t!=e.value&&(t=e.value,this.examinationOptions=await this.getTestsOptions(e.value)),!0),options:async()=>(Object(h["isEmpty"])(e)&&(e=await this.getTestsOptions("LIST OF RADIOLOGY TESTS")),e)}},examinationField(){let e=-1;return{id:"examination",helpText:"Please select the examination",type:l["b"].TT_SELECT,validation:e=>d["a"].required(e),computedValue:e=>({obs:this.service.buildValueCoded("Examination",e.value)}),condition:()=>!Object(h["isEmpty"])(this.examinationOptions),beforeNext:async(t,i)=>(e!=i.list_of_radiology_test.value&&(e=t.value,this.detailedExaminationOptions=await this.getTestsOptions(e)),!0),options:()=>this.examinationOptions}},detailedExaminationField(){return{id:"detailed_examination",helpText:"Please select the detailed examination",type:l["b"].TT_SELECT,condition:()=>!Object(h["isEmpty"])(this.detailedExaminationOptions),computedValue:e=>({obs:this.service.buildValueCoded("Detailed examination",e.value)}),validation:e=>d["a"].required(e),options:()=>this.detailedExaminationOptions}},referralTypeField(){return{id:"referral_type",helpText:"Please select the referral type",type:l["b"].TT_SELECT,validation:e=>d["a"].required(e),computedValue:e=>({obs:this.service.buildValueText("Source of referral",e.label)}),options:()=>this.mapStrToOptions(["External","Internal"])}},externalReferralField(){const e=v["a"].getFacilityLocationField();return e.id="external_referral",e.init=async()=>(this.defaultExternalLocation=await f["b"].defaultReferralLocation(),!0),e.defaultValue=()=>this.defaultExternalLocation,e.condition=e=>"External"===e.referral_type.value,e.computedValue=e=>({obs:this.service.buildValueText("REFERRED FROM",e.label)}),e},internalReferralField(){let e=[];return{id:"referred_by",helpText:"Referred from",type:l["b"].TT_SELECT,validation:e=>d["a"].required(e),condition:e=>"Internal"===e.referral_type.value,computedValue:e=>({obs:this.service.buildValueText("REFERRED FROM",e.label)}),options:async()=>(Object(h["isEmpty"])(e)&&(e=(await p.getInternalSections()).map(e=>({value:e.id,label:(""+(null===e||void 0===e?void 0:e.name)).toUpperCase()}))),e),config:{showKeyboard:!0,footerBtns:[{name:"Add Referral",slot:"end",color:"success",onClick:async(e,t,i)=>{if("string"!=typeof i.filter||i.filter.length<3)return Object(m["e"])("Please enter a valid name");if(i.filtered.some(e=>e.label.toLowerCase()===i.filter.toLowerCase()))return Object(m["e"])("Can't add already existing referral location");if(await Object(m["a"])("Do you want to add referral location?")){const e=await p.createInternalSection(i.filter.toUpperCase());e?(i.filter=e.name,i.listData=[{label:e.name,value:e.id},...i.listData]):Object(m["c"])("Unable to add "+i.filter)}}}]}}},payingField(){return{id:"paying",helpText:"Is this a paying patient?",type:l["b"].TT_SELECT,computedValue:e=>({obs:this.service.buildValueCoded("PAYING",e.value)}),validation:e=>d["a"].required(e),options:()=>this.yesNoOptions()}},paymentTypeField(){return{id:"payment_type",helpText:"Select payment method",type:l["b"].TT_SELECT,validation:e=>d["a"].required(e),condition:e=>"Yes"===e.paying.value,computedValue:e=>({obs:this.service.buildValueCoded("PAYMENT TYPE",e.value)}),options:()=>this.mapStrToOptions(["Cash","Invoice"])}},receiptField(){return{id:"receipt_number",helpText:"Enter receipt number",type:l["b"].TT_TEXT,condition:e=>"Cash"===e.payment_type.value,computedValue:e=>({obs:this.service.buildValueText("RECEIPT NUMBER",e.value)}),validation:e=>d["a"].validateSeries([()=>d["a"].required(e),()=>this.validateAmount(""+e.value)])}},invoiceField(){return{id:"invoice_number",helpText:"Enter invoice number",type:l["b"].TT_TEXT,computedValue:e=>({obs:this.service.buildValueText("INVOICE NUMBER",e.value)}),condition:e=>"Invoice"===e.payment_type.value,validation:e=>d["a"].required(e)}},paymentAmountField(){return{id:"payment_amount",helpText:"Enter payment amount",type:l["b"].TT_NUMBER,condition:e=>e.receipt_number.value,computedValue:e=>({obs:this.service.buildValueNumber("PAYMENT AMOUNT",e.value)}),validation:e=>d["a"].validateSeries([()=>d["a"].required(e),()=>this.validateAmount(""+e.value)])}},invoiceAmountField(){return{id:"invoice_amount",helpText:"Enter invoice amount",type:l["b"].TT_NUMBER,condition:e=>e.invoice_number.value,computedValue:e=>({obs:this.service.buildValueNumber("INVOICE AMOUNT",e.value)}),validation:e=>d["a"].validateSeries([()=>d["a"].required(e),()=>this.validateAmount(""+e.value)])}}}}),T=i("d959"),E=i.n(T);const y=E()(b,[["render",n]]);t["default"]=y},c21d:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));i("14d9");function a(e,t){const i=[],a=[-1,"",null,void 0];for(const n in t){if(!(n in e))continue;const o=e[n];a.includes(o)?i.push(!1):i.push(t[n](o,e))}return i.every(Boolean)}function n(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function o(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function s(e,t,i="",s="",r="priority"){const l=[];for(const n in t){const o=t[n],r=[o.target&&i&&o.target!=i,o.targetEvent&&s&&o.targetEvent!=s];r.some(Boolean)||a(e,o.conditions)&&(o.title=n,o.description&&(o.description.text=o.description.info(e)),l.push(o))}return"priority"===r?n(l):o(l)}},f149:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var a,n=i("ad49");(function(e){e["DEFAULT_REFERRAL_LOCATION"]="default.referral.location"})(a||(a={})),t["b"]={defaultReferralLocation:()=>n["a"].get(a.DEFAULT_REFERRAL_LOCATION)}}}]);
//# sourceMappingURL=chunk-d9a8c722.7881fcfc.js.map