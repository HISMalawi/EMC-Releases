(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65b4c246"],{"1ac1":function(e,t,n){"use strict";n.r(t);var i=n("7a23");function T(e,t,n,T,o,r){const a=Object(i["resolveComponent"])("his-standard-form"),c=Object(i["resolveComponent"])("ion-page");return Object(i["openBlock"])(),Object(i["createBlock"])(c,null,{default:Object(i["withCtx"])(()=>[Object(i["createVNode"])(a,{fields:e.fields,onFinishAction:e.onFinish,skipSummary:!0},null,8,["fields","onFinishAction"])]),_:1})}var o=n("d95e"),r=n("d1ca"),a=n("7920"),c=n("2706"),u=n("2ef0"),s=n("ad49"),l=n("b5e4"),_=n("d867"),E=n("e86e"),m=Object(i["defineComponent"])({components:{HisStandardForm:a["a"],IonPage:_["D"]},data:()=>({preference:"",fields:[]}),created(){this.preference=this.$route.name,this.fields=[...this.getTargetLab(),...this.getBPThresholdPreferences(),...this.getFilingNumberLimitPreferences(),...this.getAppointmentLimitPreferences(),...this.getHtnAgePreferences(),...this.getNotificationPeriod(),...this.getClinicDaysPreferences(),...this.getClinicHolidaysPreferences(),...this.getCxCaScreeningPreference()]},methods:{isProp(e){return!this.preference||e===this.preference},async onFinish(e,t){for(const n in t)await s["a"].set(n,t[n]),Object(l["d"])("Property has been updated",2e3);this.$router.back()},getTargetLab(){return[{id:r["a"].TARGET_LAB,helpText:"Please select target lab",type:o["b"].TT_SELECT,computedValue:e=>e.value,defaultValue:()=>r["b"].targetLab(),validation:e=>c["a"].required(e),condition:()=>this.isProp("target_lab"),options:(e,t="")=>Object(E["d"])(t),config:{showKeyboard:!0,isFilterDataViaApi:!0}}]},getCxCaScreeningPreference(){const e="cervical_cancer",t=r["a"].CERVICAL_CANCER_SCREENING;return[{id:t,helpText:"Activate CxCa screening",type:o["b"].TT_YES_NO,condition:()=>this.isProp(e),computedValue:e=>e,defaultValue:()=>r["b"].cervicalCancerScreeningEnabled(),validation:e=>c["a"].required(e),options:()=>[{label:"Activate screening?",values:[{label:"Yes",value:"true"},{label:"No",value:"false"}]}]},{id:"starting_screening_age",proxyID:r["a"].CERVICAL_CANCER_AGE_BOUNDS,helpText:"Starting screening age",type:o["b"].TT_NUMBER,condition:n=>this.isProp(e)&&"true"===n[t],defaultValue:async()=>{const{start:e}=await r["b"].cervicalCancerScreeningAgeBounds();if(e)return e},validation:e=>c["a"].required(e)},{id:"maximum_screening_age",proxyID:r["a"].CERVICAL_CANCER_AGE_BOUNDS,helpText:"Maximum screening age",type:o["b"].TT_NUMBER,condition:n=>this.isProp(e)&&"true"===n[t],computedValue:(e,t)=>`${t.starting_screening_age.value}:${e.value}`,defaultValue:async()=>{const{end:e}=await r["b"].cervicalCancerScreeningAgeBounds();if(e)return e},validation:e=>c["a"].required(e)}]},getClinicHolidaysPreferences(){const e=r["a"].CLINIC_HOLIDAYS;return[{id:e,helpText:"Set clinic holiday(s)",type:o["b"].TT_CLINIC_HOLIDAY_PICKER,condition:()=>this.isProp(e),computedValue:e=>e.value,defaultValue:()=>r["b"].clinicHolidays(),validation:e=>c["a"].required(e)}]},getBPThresholdPreferences(){const e="bp_thresholds";return[{id:r["a"].HTN_SYSTOLIC_THRESHOLD,helpText:"Set systolic blood pressure",type:o["b"].TT_NUMBER,condition:()=>this.isProp(e),computedValue:e=>e.value,defaultValue:()=>r["b"].systolicThreshold(),validation:e=>c["a"].required(e)},{id:r["a"].HTN_DIASTOLIC_THRESHOLD,helpText:"Set diastolic blood pressure",type:o["b"].TT_NUMBER,condition:()=>this.isProp(e),computedValue:e=>e.value,defaultValue:()=>r["b"].diastolicThreshold(),validation:e=>c["a"].required(e)}]},getFilingNumberLimitPreferences(){const e=r["a"].FILING_NUMBER_LIMIT;return[{id:e,helpText:"Enter Filing Number Limit",condition:()=>this.isProp(e),computedValue:e=>e.value,defaultValue:()=>r["b"].filingNumberLimit(),type:o["b"].TT_NUMBER,validation:e=>c["a"].required(e)}]},getAppointmentLimitPreferences(){const e=r["a"].APPOINTMENT_LIMIT;return[{id:e,helpText:"Enter Appointment Limit",type:o["b"].TT_NUMBER,computedValue:e=>e.value,condition:()=>this.isProp(e),defaultValue:()=>r["b"].appointmentLimit(),validation:e=>c["a"].required(e)}]},getHtnAgePreferences(){const e=r["a"].HTN_SCREENING_AGE_THRESHOLD;return[{id:e,type:o["b"].TT_NUMBER,helpText:"Enter HTN age Threshold",condition:()=>this.isProp(e),computedValue:e=>e.value,defaultValue:()=>r["b"].htnAgeThreshold(),validation:e=>c["a"].required(e)}]},getNotificationPeriod(){const e=r["a"].NOTIFICATION_PERIOD;return[{id:e,type:o["b"].TT_NUMBER,helpText:"Enter Number of Days",condition:()=>this.isProp(e),computedValue:e=>e.value,defaultValue:()=>r["b"].notificationPeriod(),validation:e=>c["a"].required(e)}]},getClinicDaysPreferences(){const e="clinic_days",t=e=>e.map(e=>e.value).join(),n=e=>{const t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return t.map(t=>({label:t,value:t,isChecked:!Object(u["isEmpty"])(e)&&e.search(t)>=0}))};return[{id:r["a"].ADULT_CLINIC_DAYS,helpText:"Clinic days (adults: 18 yrs and over)",type:o["b"].TT_MULTIPLE_SELECT,condition:()=>this.isProp(e),computedValue:e=>t(e),validation:e=>c["a"].required(e),options:async()=>n(await r["b"].adultClinicDays())},{id:r["a"].PEADS_CLINIC_DAYS,helpText:"Clinic days (children: Under 18 yrs)",type:o["b"].TT_MULTIPLE_SELECT,condition:()=>this.isProp(e),computedValue:e=>t(e),validation:e=>c["a"].required(e),options:async()=>n(await r["b"].peadsClinicDays())}]}}}),d=n("6b0d"),I=n.n(d);const h=I()(m,[["render",T]]);t["default"]=h},7920:function(e,t,n){"use strict";var i=n("7a23");function T(e,t,n,T,o,r){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),a=n("6b0d"),c=n.n(a);const u=c()(r,[["render",T]]);t["a"]=u},d95e:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return T})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(i||(i={}));const T=[i.TT_LINKAGE_CODE,i.TT_MULTI_SELECT_GRID,i.TT_AGE_INPUT,i.TT_BARCODE,i.TT_NOTE,i.TT_SELECT,i.TT_CARD_SELECTOR,i.TT_MULTIPLE_SELECT,i.TT_TEXT,i.TT_NUMBER,i.TT_MONTHLY_DAYS,i.TT_ART_REGIMEN_SELECTION,i.TT_NEXT_VISIT_INTERVAL_SELECTION,i.TT_TABLE_VIEWER,i.TT_DOSAGE_INPUT,i.TT_YES_NO,i.TT_MULTIPLE_YES_NO,i.TT_WEIGHT_CHART,i.TT_VITALS_ENTRY,i.TT_APPOINTMENTS_ENTRY,i.TT_COMPLAINTS_PICKER,i.TT_CLINIC_HOLIDAY_PICKER,i.TT_SUMMARY,i.TT_ART_STAGING_SUMMARY,i.TT_ADHERENCE_INPUT,i.TT_LAB_ORDERS,i.TT_PERSON_RESULT_VIEW,i.TT_PROGRAM_SELECTION,i.TT_DATE_PICKER,i.TT_RELATION_SELECTION,i.TT_FILING_NUMBER_VIEW,i.TT_PERSON_MATCH_VIEW,i.TT_FULL_DATE,i.TT_BATCH_ENTRY,i.TT_BATCH_VERIFICATION,i.TT_BATCH_MOVEMENT,i.TT_IP_ADDRESS,i.TT_TEXT_BANNER,i.TT_DISPENSATION_INPUT,i.TT_DATA_TABLE,i.TT_GROUP_SELECTOR,i.TT_ANC_PREGNANCY_INPUT_CONFIG,i.TT_ANC_PREGNANCY_DETAILS_INPUT,i.TT_ANC_LMP_DATE_INPUT,i.TT_DRUG_TRANSFER_IN,i.TT_GRID_SELECTOR,i.TT_ANC_DRUGSET_INPUT,i.TT_RADIOLOGY_PICKER,i.TT_PRESCRIPTION_INPUT,i.TT_INFINITE_SCROLL_MULTIPLE_SELECT,i.TT_DRUG_DISPENSER]},e86e:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"f",(function(){return c})),n.d(t,"e",(function(){return u})),n.d(t,"a",(function(){return s})),n.d(t,"g",(function(){return l})),n.d(t,"h",(function(){return _}));var i=n("5713"),T=n("2ef0");async function o(e=""){const t=await i["a"].getFacilities({name:e});return t.filter(e=>!Object(T["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function r(e=""){const t=await i["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function a(e=""){const t=await i["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function c(){const e=await i["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function u(){const e=await i["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function s(e){const t=await i["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function l(e,t=""){const n=await i["a"].getTraditionalAuthorities(e,t);return n.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function _(e,t=""){const n=await i["a"].getVillages(e,t);return n.map(e=>({label:e.name,value:e.village_id,other:e}))}},f159:function(e,t,n){var i={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-182277b5","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-182277b5","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-182277b5","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-f0823c9c","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function T(e){if(!n.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],T=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(T)}))}T.keys=function(){return Object.keys(i)},T.id="f159",e.exports=T}}]);
//# sourceMappingURL=chunk-65b4c246.ab3bb491.js.map