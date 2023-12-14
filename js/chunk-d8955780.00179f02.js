(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d8955780"],{7365:function(e,t,n){"use strict";n("14d9"),n("13d5");var i=n("7a23"),a=n("ad60"),o=n("2ef0"),r=n("0fa1"),s=n("b3b1"),c=n("c21d"),u=n("7920"),T=n("b5e4"),l=n("8e8b"),d=Object(i["defineComponent"])({components:{HisStandardForm:u["a"]},data:()=>({patient:{},fields:[],patientID:"",providerID:-1,providers:[],facts:{sessionDate:"",apiDate:"",encounterName:"N/A",providers:[],isBdeMode:!1,birthDate:"",outcome:"",outcomeStartDate:""},ready:!1}),watch:{$route:{handler(e){e.params.patient_id&&this.patientID!=e.params.patient_id&&(this.patientID=parseInt(e.params.patient_id),l["a"].get("ACTIVE_PATIENT",{patientID:this.patientID}).then(e=>{this.patient=e,this.setEncounterFacts().then(()=>{this.checkEncounterGuidelines().then(()=>{this.ready=!0})})}))},immediate:!0,deep:!0}},computed:{cancelDestination(){return this.patientDashboardUrl()}},methods:{runflowState(e,t=null){const n={};if(n[s["b"].SET_PROVIDER]=e=>{const[t]=e.split(" "),n=Object(o["find"])(this.providers,{username:t});return n&&(this.providerID=n.person_id),s["b"].CONTINUE},n[s["b"].CHANGE_SESSION_DATE]=()=>(this.$router.push("/session/date?patient_dashboard_redirection_id="+this.patientID),s["b"].EXIT),n[s["b"].CHANGE_PATIENT_OUTCOME]=()=>(this.$router.push("/patient/programs/"+this.patientID),s["b"].EXIT),n[s["b"].GO_TO_PATIENT_DASHBOARD]=()=>(this.gotoPatientDashboard(),s["b"].EXIT),e in n)return n[e](t)},async checkEncounterGuidelines(){const e=Object(c["a"])(this.facts,s["a"]);for(const o in e){var t,n;const r=e[o];if(null!==r&&void 0!==r&&null!==(t=r.actions)&&void 0!==t&&t.alert){var i;const e=this.runflowState(await(null===r||void 0===r||null===(i=r.actions)||void 0===i?void 0:i.alert(this.facts)));if(e===s["b"].EXIT)return}if(null!==r&&void 0!==r&&null!==(n=r.actions)&&void 0!==n&&n.selection){var a;const e=await(null===r||void 0===r||null===(a=r.actions)||void 0===a?void 0:a.selection(this.facts));this.runflowState(e.flowState,e.value)}}},async setEncounterFacts(){try{const e=await l["a"].get("PATIENT_PROGRAM",{patientID:this.patientID});this.facts.outcome=e.outcome,this.facts.outcomeStartDate=e.startDate}catch(e){console.error(e),Object(T["c"])(""+e)}this.facts.sessionDate=a["a"].getSessionDate(),this.facts.apiDate=a["a"].getCachedApiDate(),this.facts.isBdeMode=a["a"].isBDE(),this.facts.birthDate=this.patient.getBirthdate(),this.facts.encounterName=this.$route.name?this.$route.name.toString().toUpperCase():"N/A",a["a"].isBDE()&&(this.providers=await l["a"].get("PROVIDERS"),this.facts.providers=this.providers.sort((e,t)=>{const n=e.username.toUpperCase(),i=t.username.toUpperCase();return n<i?-1:n>i?1:0}).map(e=>{var t;let n=""+e.username;if(!Object(o["isEmpty"])(null===e||void 0===e||null===(t=e.person)||void 0===t?void 0:t.names)){var i;const[t]=(null===(i=e.person)||void 0===i?void 0:i.names)||[];n+=` (${t.given_name} ${t.family_name})`}return n}))},toOption(e,t={}){return{label:e,value:e,other:t}},mapStrToOptions(e){return e.map(e=>({label:e,value:e}))},patientDashboardUrl(){return"/patient/dashboard/"+this.patientID},gotoPatientDashboard(){return this.$router.push({path:this.patientDashboardUrl()})},nextTask(){return Object(r["b"])(this.patientID,this.$router)},yesNoOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"}]},toYesNoOption(e,t={}){return{label:e,value:"",other:{...t,values:this.yesNoOptions()}}},mapOptions(e){return e.map(e=>({label:e,value:e}))},yesNoUnknownOptions(){return[{label:"Yes",value:"Yes"},{label:"No",value:"No"},{label:"Unknown",value:"Unknown"}]},resolveObs(e,t=""){const n=Object.values(e).filter(e=>e&&(e.tag===t||""===t)).reduce((e,t)=>{const n=t.obs?t.obs:t;return Array.isArray(n)?e=e.concat(n):"function"===typeof n?e.push(n()):e.push(n),e},[]);return Promise.all(n)},inArray(e,t){try{return e.filter(e=>t(e)).length>0}catch(n){return!1}},validateSeries(e){try{for(const t in e){const n=e[t]();if(n)return n}}catch(t){return[t]}}}});const m=d;t["a"]=m},7920:function(e,t,n){"use strict";var i=n("7a23");function a(e,t,n,a,o,r){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),s=n("6b0d"),c=n.n(s);const u=c()(r,[["render",a]]);t["a"]=u},9841:function(e,t,n){"use strict";n.r(t);var i=n("7a23");function a(e,t,n,a,o,r){const s=Object(i["resolveComponent"])("his-standard-form"),c=Object(i["resolveComponent"])("ion-page");return Object(i["openBlock"])(),Object(i["createBlock"])(c,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(s,{fields:e.fields,skipSummary:!0,onFinishAction:e.onFinish,cancelDestinationPath:e.cancelDestination},null,8,["fields","onFinishAction","cancelDestinationPath"])]),_:1})}var o=n("7365"),r=n("d95e"),s=n("ff01"),c=n("2706"),u=n("d867"),T=n("e86e"),l=n("b5e4"),d=n("1c74"),m=Object(i["defineComponent"])({components:{IonPage:u["D"]},mixins:[o["a"]],data:()=>({service:{},gestationWeeks:0,delieveryDate:"",lnmp:""}),watch:{ready:{async handler(e){e&&(this.service=new s["a"](this.patientID,this.providerID),this.fields=this.getFields())},immediate:!0}},methods:{async onFinish(e,t){try{await this.service.enrollPatient()}catch(i){if(!(i instanceof d["d"]))throw i;console.warn(""+i)}const n=await this.resolveObs(t);await this.service.createEncounter(),await this.service.saveObservationList(n),this.nextTask()},buildLnmpObs(e=!1){return[e?this.service.buildValueDateEstimated("Last menstrual period",this.lnmp):this.service.buildValueDate("Last menstrual period",this.lnmp),this.service.buildValueNumber("Week of First Visit",this.gestationWeeks)]},getFields(){return[{id:"lnmp",helpText:"Last Normal Menstrual Period",type:r["b"].TT_FULL_DATE,config:{allowUnknown:!0},computedValue:this.buildLnmpObs,beforeNext:async e=>(this.lnmp=e.value,this.gestationWeeks=this.service.calculateWeekOfFirstVisit(this.lnmp),!(this.gestationWeeks<=0||this.gestationWeeks>42)||Object(l["a"])("Gestation weeks out of range of 0-42. Are you sure you want to continue?")),validation:e=>this.validateSeries([()=>c["a"].required(e),()=>{if(e.value){const t=new Date(e.value),n=new Date;if(t>n)return["Last menstrual period cannot be in the future"]}return null}])},{id:"estimate_lmp",helpText:"Gestation (months)",type:r["b"].TT_NUMBER,condition:e=>"Unknown"===e.lnmp.value,computedValue:()=>this.buildLnmpObs(!0),validation:e=>this.validateSeries([()=>c["a"].required(e),()=>c["a"].rangeOf(e,1,10)]),beforeNext:e=>(this.lnmp=this.service.calculateGestationDateFromPeriod(e.value),this.gestationWeeks=this.service.calculateWeekOfFirstVisit(this.lnmp),!0)},{id:"expected_delivary_date",helpText:"Expected Date Of Delivery",type:r["b"].TT_FULL_DATE,dynamicHelpText:()=>`Expected Date Of Delivery (Gestation Weeks: ${this.gestationWeeks})`,defaultValue:()=>this.service.estimateDelieveryDate(this.lnmp),computedValue:e=>this.service.buildValueDate("Estimated date of delivery",e.value),validation:e=>c["a"].required(e)},{id:"planned_delivery_place",helpText:"Planned delivery place",type:r["b"].TT_SELECT,computedValue:e=>this.service.buildValueText("Planned Delivery Place",e.label),validation:e=>c["a"].required(e),options:(e,t="")=>Object(T["b"])(t),config:{footerBtns:[{name:"Here",slot:"end",onClickComponentEvents:{setValue:e=>e.btnOutput},onClick:()=>s["a"].getLocationName()}],showKeyboard:!0,isFilterDataViaApi:!0}},{id:"bed_net_available_for_use",helpText:"Mosquito net in good condition available for own use",type:r["b"].TT_SELECT,condition:()=>!1,computedValue:e=>this.service.buildValueCoded("Do you use bed nets",e.value),validation:e=>c["a"].required(e),options:()=>this.yesNoOptions()},{id:"bed_net_given",helpText:"Bed net given today",type:r["b"].TT_SELECT,computedValue:e=>this.service.buildValueCoded("Mosquito net started",e.value),validation:e=>c["a"].required(e),options:()=>this.yesNoOptions()},{id:"previous_td_given",helpText:"Previous TD given before this pregnancy",type:r["b"].TT_NUMBER,computedValue:e=>this.service.buildValueNumber("TD Booster",e.value),validation:e=>c["a"].required(e)}]}}}),E=n("6b0d"),_=n.n(E);const h=_()(m,[["render",a]]);t["default"]=h},b3b1:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return s}));var i,a=n("7f35"),o=n("9283");(function(e){e["SET_PROVIDER"]="SET_PROVIDER",e["CHANGE_SESSION_DATE"]="change_session_date",e["GO_TO_PATIENT_DASHBOARD"]="go_to_patient_dashboard",e["CHANGE_PATIENT_OUTCOME"]="change_outcome",e["CONTINUE"]="continue",e["EXIT"]="exit"})(i||(i={}));const r=e=>o["b"].toStandardHisDisplayFormat(e),s={"Warn if attempting to create new encounters for a deceased patient":{priority:1,actions:{alert:async({outcomeStartDate:e})=>{const t=await Object(a["a"])("Data Integrity Issue Found","Patient died on "+r(e),"Proceeding with this outcome might affect accuracy of some reports",[{name:"Cancel",slot:"end",color:"primary"},{name:"Change outcome",slot:"end",color:"primary"},{name:"Continue Anyway",slot:"end",color:"danger"}]);return"Cancel"===t?i.GO_TO_PATIENT_DASHBOARD:"Change outcome"===t?i.CHANGE_PATIENT_OUTCOME:i.CONTINUE}},conditions:{outcome(e){return"Patient died"===e},outcomeStartDate(e,{sessionDate:t}){return t>=e}}},"A patient's date of birth must not be less than Session Date":{priority:2,actions:{alert:async({birthDate:e,sessionDate:t})=>{const n=await Object(a["a"])("Data integrity issue found","",`Session date ${r(t)} is less than birth date of ${r(e)}`,[{name:"Cancel",slot:"end",color:"danger"},{name:"Change session date",slot:"end",color:"success"}]);return"Change session date"===n?i.CHANGE_SESSION_DATE:i.GO_TO_PATIENT_DASHBOARD}},conditions:{birthDate(e,{sessionDate:t}){return t<e}}},"Select Encounter provider when in back data entry":{priority:3,actions:{selection:async({providers:e,encounterName:t,sessionDate:n,apiDate:o})=>{const s=await Object(a["c"])("Please select a provider for "+t,`BDE: ${r(n)} | Current: ${r(o)}`,e,[{name:"Cancel",color:"danger",slot:"start",role:"default"},{name:"Confirm",slot:"end",role:"action"}]);return"Cancel"===s.action?{value:-1,flowState:i.GO_TO_PATIENT_DASHBOARD}:{value:s.selection,flowState:i.SET_PROVIDER}}},conditions:{isBdeMode(e){return e}}}}},c21d:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n("14d9");function i(e,t){const n=[],i=[-1,"",null,void 0];for(const a in t){if(!(a in e))continue;const o=e[a];i.includes(o)?n.push(!1):n.push(t[a](o,e))}return n.every(Boolean)}function a(e){return e.sort((e,t)=>e.priority&&t.priority&&e.priority<t.priority?-1:1)}function o(e){return e.sort((e,t)=>e.weight&&t.weight&&e.weight>t.weight?-1:1)}function r(e,t,n="",r="",s="priority"){const c=[];for(const a in t){const o=t[a],s=[o.target&&n&&o.target!=n,o.targetEvent&&r&&o.targetEvent!=r];s.some(Boolean)||i(e,o.conditions)&&(o.title=a,o.description&&(o.description.text=o.description.info(e)),c.push(o))}return"priority"===s?a(c):o(c)}},d95e:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return a})),function(e){e["TT_ASYNC_MULTI_SELECT"]="AsyncMultiSelect",e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(i||(i={}));const a=[i.TT_ASYNC_MULTI_SELECT,i.TT_LINKAGE_CODE,i.TT_MULTI_SELECT_GRID,i.TT_AGE_INPUT,i.TT_BARCODE,i.TT_NOTE,i.TT_SELECT,i.TT_CARD_SELECTOR,i.TT_MULTIPLE_SELECT,i.TT_TEXT,i.TT_NUMBER,i.TT_MONTHLY_DAYS,i.TT_ART_REGIMEN_SELECTION,i.TT_NEXT_VISIT_INTERVAL_SELECTION,i.TT_TABLE_VIEWER,i.TT_DOSAGE_INPUT,i.TT_YES_NO,i.TT_MULTIPLE_YES_NO,i.TT_WEIGHT_CHART,i.TT_VITALS_ENTRY,i.TT_APPOINTMENTS_ENTRY,i.TT_COMPLAINTS_PICKER,i.TT_CLINIC_HOLIDAY_PICKER,i.TT_SUMMARY,i.TT_ART_STAGING_SUMMARY,i.TT_ADHERENCE_INPUT,i.TT_LAB_ORDERS,i.TT_PERSON_RESULT_VIEW,i.TT_PROGRAM_SELECTION,i.TT_DATE_PICKER,i.TT_RELATION_SELECTION,i.TT_FILING_NUMBER_VIEW,i.TT_PERSON_MATCH_VIEW,i.TT_FULL_DATE,i.TT_BATCH_ENTRY,i.TT_BATCH_VERIFICATION,i.TT_BATCH_MOVEMENT,i.TT_IP_ADDRESS,i.TT_TEXT_BANNER,i.TT_DISPENSATION_INPUT,i.TT_DATA_TABLE,i.TT_GROUP_SELECTOR,i.TT_ANC_PREGNANCY_INPUT_CONFIG,i.TT_ANC_PREGNANCY_DETAILS_INPUT,i.TT_DRUG_TRANSFER_IN,i.TT_GRID_SELECTOR,i.TT_ANC_DRUGSET_INPUT,i.TT_RADIOLOGY_PICKER,i.TT_PRESCRIPTION_INPUT,i.TT_INFINITE_SCROLL_MULTIPLE_SELECT,i.TT_DRUG_DISPENSER]},e86e:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return s})),n.d(t,"f",(function(){return c})),n.d(t,"e",(function(){return u})),n.d(t,"a",(function(){return T})),n.d(t,"g",(function(){return l})),n.d(t,"h",(function(){return d}));var i=n("5713"),a=n("2ef0");async function o(e=""){const t=await i["a"].getFacilities({name:e});return t.filter(e=>!Object(a["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function r(e=""){const t=await i["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function s(e=""){const t=await i["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function c(){const e=await i["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function u(){const e=await i["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function T(e){const t=await i["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function l(e,t=""){const n=await i["a"].getTraditionalAuthorities(e,t);return n.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function d(e,t=""){const n=await i["a"].getVillages(e,t);return n.map(e=>({label:e.name,value:e.village_id,other:e}))}},f159:function(e,t,n){var i={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement1"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement2"],"./ArtStagingSummary.vue":["43db","TouchFormElement3"],"./AsyncMultiSelect.vue":["5de2","chunk-03993608","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","chunk-337918c0","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","chunk-337918c0","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-182277b5","chunk-337918c0","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-182277b5","chunk-337918c0","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-182277b5","chunk-337918c0","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","chunk-337918c0","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","chunk-03993608","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-03993608","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","chunk-337918c0","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function a(e){if(!n.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],a=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(a)}))}a.keys=function(){return Object.keys(i)},a.id="f159",e.exports=a},ff01:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n("cc6f"),a=n("74f4"),o=n("5a0c"),r=n.n(o),s=n("0011");class c extends i["a"]{constructor(e,t){super(e,81,t)}async enrollPatient(){const e=new a["a"](this.patientID);await e.enrollProgram(),e.setStateDate(this.date),e.setStateId(118),await e.updateState()}calculateWeekOfFirstVisit(e){const t=new Date(e);t.setDate(t.getDate()+7);const n=new Date(this.getDate()),i=n-t;return Math.floor(i/6048e5)}calculateGestationDateFromPeriod(e){return r()(this.date).subtract(e,"months").endOf("month").format("YYYY-MM-DD")}estimateDelieveryDate(e){const t=new Date(e);t.setDate(t.getDate()+7),t.setMonth(t.getMonth()+9);const n=Object(s["a"])(t.getMonth()+1),i=Object(s["a"])(t.getDate());return`${t.getFullYear()}-${n}-${i}`}estimateLnmpDate(e){return r()().subtract(e,"weeks").subtract(7,"days").format("YYYY-MM-DD")}buildDelieveryDateObs(e){if("Unknown"!=e)return[this.buildValueDate("Last menstrual period",e),this.buildValueDate("Estimated date of delivery",this.estimateDelieveryDate(e)),this.buildValueNumber("Week of First Visit",this.calculateWeekOfFirstVisit(e))]}}}}]);
//# sourceMappingURL=chunk-d8955780.00179f02.js.map