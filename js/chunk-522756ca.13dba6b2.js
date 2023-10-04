(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-522756ca"],{1226:function(e,t,n){"use strict";n.r(t);var o=n("7a23");function i(e,t,n,i,r,a){const s=Object(o["resolveComponent"])("his-standard-form"),T=Object(o["resolveComponent"])("ion-page");return Object(o["openBlock"])(),Object(o["createBlock"])(T,null,{default:Object(o["withCtx"])(()=>[Object(o["createVNode"])(s,{fields:e.formFields,skipSummary:!0,onFinishAction:e.onFinish,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]),_:1})}var r=n("7365"),a=n("d95e"),s=n("cc6f"),T=n("8158");class c extends s["a"]{constructor(e,t){super(e,83,t)}static surgicalHistoryOptions(){return T["a"].getConceptsByCategory("anc_surgical_history").sort((e,t)=>e.name>t.name?1:-1)}}var u=n("2706"),l=n("d867"),E=n("2ef0"),_=Object(o["defineComponent"])({components:{IonPage:l["D"]},mixins:[r["a"]],data:()=>({formFields:[],service:{}}),watch:{ready:{handler(e){e&&(this.formFields=this.getFields())},immediate:!0}},methods:{async onFinish(e,t){const n=await this.resolveObs(t),o=new c(this.patientID,this.providerID);await o.createEncounter(),await o.saveObservationList(n),this.nextTask()},surgeryOptions(e){return[...c.surgicalHistoryOptions(),{name:"None"}].map(t=>e({label:t.name,value:"Yes",isChecked:!1}))},getFields(){return[{id:"history",helpText:"Previous Surgical Procedure(s) Done",type:a["b"].TT_MULTIPLE_SELECT,validation:e=>u["a"].required(e),onValueUpdate:(e,t)=>{if("None"===t.label&&t.isChecked)return e.map(e=>("None"!=e.label&&(e.isChecked=!1),e));if("None"!=t.label&&t.isChecked){const t=Object(E["findIndex"])(e,{label:"None"});e[t].isChecked=!1}return e},computedValue:e=>Object(E["find"])(e,{label:"None"})?c.buildValueText("Procedure done","None"):e.map(e=>c.buildValueCoded(e.label,""+e.value)),options:()=>this.surgeryOptions(e=>e),config:{footerBtns:[{name:"None",slot:"end",onClickComponentEvents:{refreshOptions:()=>this.surgeryOptions(e=>(e.isChecked="None"===e.label,e))},onClick:()=>"None"}]}}]}}}),m=n("d959"),h=n.n(m);const d=h()(_,[["render",i]]);t["default"]=d},7365:function(e,t,n){"use strict";n("14d9"),n("13d5");var o,i=n("7a23"),r=n("ad60"),a=n("2ef0"),s=n("0fa1"),T=n("7f35"),c=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(o||(o={}));const u=e=>c["b"].toStandardHisDisplayFormat(e),l={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(T["a"])("Data Integrity Issue Found","Patient died on "+u(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?o.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?o.CHANGE_PATIENT_OUTCOME:o.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const n=await Object(T["a"])("Data integrity issue found","",`Session date ${u(t)} is less than birth date of ${u(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?o.CHANGE_SESSION_DATE:o.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:n,apiDate:i})=>{const r=await Object(T["c"])("Please select a provider for "+t,`BDE: ${u(n)} | Current: ${u(i)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===r.action?{value:-1,flowState:o.GO_TO_PATIENT_DASHBOARD}:{value:r.selection,flowState:o.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}};var E=n("c21d"),_=n("7920"),m=n("b5e4"),h=n("8e8b"),d=Object(i["defineComponent"])({components:{HisStandardForm:_["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),h["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[o.SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(a["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),o.CONTINUE},n[o.CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),o.EXIT),n[o.CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),o.EXIT),n[o.GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),o.EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(E["a"])(this.facts,l);for(const a in e){var t,n;const s=e[a];if(null!==s&&void 0!==s&&null!==(t=s.actions)&&void 0!==t&&t.alert){var i;const e=this.runflowState(await(null===s||void 0===s||null===(i=s.actions)||void 0===i?void 0:i.alert(this.facts)));if(e===o.EXIT)return}if(null!==s&&void 0!==s&&null!==(n=s.actions)&&void 0!==n&&n.selection){var r;const e=await(null===s||void 0===s||null===(r=s.actions)||void 0===r?void 0:r.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await h["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(m["c"])(""+e)}this.facts.sessionDate=r["a"].getSessionDate(),this.facts.apiDate=r["a"].getCachedApiDate(),this.facts.isBdeMode=r["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",r["a"].isBDE()&&(this.providers=await h["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),o=t.username.toUpperCase();return n<o?-1:n>o?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(a["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var o;const[t]=(null===(o=e.person)||void 0===o?void 0:o.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(s["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const I=d;t["a"]=I},7920:function(e,t,n){"use strict";var o=n("7a23");function i(e,t,n,i,r,a){return Object(o["openBlock"])(),Object(o["createBlock"])(Object(o["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=n("9441"),a=Object(o["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=n("d959"),T=n.n(s);const c=T()(a,[["render",i]]);t["a"]=c},c21d:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("14d9");function o(e,t){const n=[],o=[-1,"",null,void 0];for(const i in t){if(!(i in e))continue;const r=e[i];o.includes(r)?n.push(!1):n.push(t[i](r,e))}return n.every(Boolean)}function i(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function r(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function a(e,t,n="",a="",s="priority"){const T=[];for(const i in t){const r=t[i],s=[r.target&&n&&r.target!=n,r.targetEvent&&a&&r.targetEvent!=a];s.some(Boolean)||o(e,r.conditions)&&(r.title=i,r.description&&(r.description.text=r.description.info(e)),T.push(r))}return"priority"===s?i(T):r(T)}},d95e:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return i})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(o||(o={}));const i=[o.TT_LINKAGE_CODE,o.TT_MULTI_SELECT_GRID,o.TT_AGE_INPUT,o.TT_BARCODE,o.TT_NOTE,o.TT_SELECT,o.TT_CARD_SELECTOR,o.TT_MULTIPLE_SELECT,o.TT_TEXT,o.TT_NUMBER,o.TT_MONTHLY_DAYS,o.TT_ART_REGIMEN_SELECTION,o.TT_NEXT_VISIT_INTERVAL_SELECTION,o.TT_TABLE_VIEWER,o.TT_DOSAGE_INPUT,o.TT_YES_NO,o.TT_MULTIPLE_YES_NO,o.TT_WEIGHT_CHART,o.TT_VITALS_ENTRY,o.TT_APPOINTMENTS_ENTRY,o.TT_COMPLAINTS_PICKER,o.TT_CLINIC_HOLIDAY_PICKER,o.TT_SUMMARY,o.TT_ART_STAGING_SUMMARY,o.TT_ADHERENCE_INPUT,o.TT_LAB_ORDERS,o.TT_PERSON_RESULT_VIEW,o.TT_PROGRAM_SELECTION,o.TT_DATE_PICKER,o.TT_RELATION_SELECTION,o.TT_FILING_NUMBER_VIEW,o.TT_PERSON_MATCH_VIEW,o.TT_FULL_DATE,o.TT_BATCH_ENTRY,o.TT_BATCH_VERIFICATION,o.TT_BATCH_MOVEMENT,o.TT_IP_ADDRESS,o.TT_TEXT_BANNER,o.TT_DISPENSATION_INPUT,o.TT_DATA_TABLE,o.TT_GROUP_SELECTOR,o.TT_ANC_PREGNANCY_INPUT_CONFIG,o.TT_ANC_PREGNANCY_DETAILS_INPUT,o.TT_ANC_LMP_DATE_INPUT,o.TT_DRUG_TRANSFER_IN,o.TT_GRID_SELECTOR,o.TT_ANC_DRUGSET_INPUT,o.TT_RADIOLOGY_PICKER,o.TT_PRESCRIPTION_INPUT,o.TT_INFINITE_SCROLL_MULTIPLE_SELECT,o.TT_DRUG_DISPENSER]},f159:function(e,t,n){var o={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-fb7a1668","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-fb7a1668","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-fb7a1668","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-3c642140","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function i(e){if(!n.o(o,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],i=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(i)}))}i.keys=function(){return Object.keys(o)},i.id="f159",e.exports=i}}]);
//# sourceMappingURL=chunk-522756ca.13dba6b2.js.map