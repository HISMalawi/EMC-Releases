(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a729b7d6"],{7920:function(e,T,n){"use strict";var t=n("7a23");function i(e,T,n,i,o,_){return Object(t["openBlock"])(),Object(t["createBlock"])(Object(t["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),_=Object(t["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,T){this.$emit("onFinish",e,T)},onIndex(e){this.$emit("onIndex",e)}}}),r=n("6b0d"),E=n.n(r);const c=E()(_,[["render",i]]);T["a"]=c},"829a":function(e,T,n){"use strict";n.r(T);var t=n("7a23");function i(e,T,n,i,o,_){const r=Object(t["resolveComponent"])("his-standard-form");return e.fields.length>0?(Object(t["openBlock"])(),Object(t["createBlock"])(r,{key:0,fields:e.fields,onOnSubmit:e.onSubmit,onOnFinish:e.onFinish,skipSummary:!0},null,8,["fields","onOnSubmit","onOnFinish"])):Object(t["createCommentVNode"])("",!0)}n("14d9");var o=n("d95e"),_=n("ad49"),r=n("7920"),E=n("b5e4"),c=n("2706"),u=n("8e8b"),a=n("cc74"),l=n("d1ca"),s=Object(t["defineComponent"])({components:{HisStandardForm:r["a"]},methods:{onFinish(e){_["a"].set(this.property,e.preference).then(()=>{switch(this.property){case a["a"].DDE_ENABLED:u["a"].invalidate("IS_DDE_ENABLED");break;case l["a"].DRUG_MANAGEMENT:u["a"].invalidate("IS_ART_DRUG_MANAGEMENT_ENABLED");break;case a["a"].MILITARY_SITE:u["a"].invalidate("IS_MILITARY_SITE");break;case l["a"].FAST_TRACK:u["a"].invalidate("IS_ART_FAST_TRACK_ENABLED");break;case l["a"].HTN_ENHANCEMENT:u["a"].invalidate("IS_ART_HTN_ENABLED");break;case l["a"].FILING_NUMBERS:u["a"].invalidate("IS_ART_FILING_NUMBER_ENABLED");break;case l["a"].PILLS_REMAINING:u["a"].invalidate("ASK_HANGING_PILLS");break;case l["a"].THREE_HP_AUTO_SELECT:u["a"].invalidate("ART_AUTO_3HP_SELECTION");break}Object(E["d"])("Property set")}).then(()=>this.$router.push("/"))},async getFields(){this.fields=[{id:"preference",helpText:this.label,type:o["b"].TT_YES_NO,defaultValue:()=>this.val,validation:e=>c["a"].required(e),options:()=>[{label:this.label,values:[{label:"yes",value:"true"},{label:"no",value:"false"}]}]}]}},data(){return{property:null,fields:[],label:null,val:""}},watch:{$route:{async handler({query:e}){if(e.label&&e.property){try{this.val=await _["a"].get(e.property)}catch(T){console.log("fixed global property not found error")}this.property=e.property,this.label=e.label,this.getFields()}},deep:!0,immediate:!0}}}),m=n("6b0d"),I=n.n(m);const N=I()(s,[["render",i]]);T["default"]=N},d95e:function(e,T,n){"use strict";var t;n.d(T,"b",(function(){return t})),n.d(T,"a",(function(){return i})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(t||(t={}));const i=[t.TT_LINKAGE_CODE,t.TT_MULTI_SELECT_GRID,t.TT_AGE_INPUT,t.TT_BARCODE,t.TT_NOTE,t.TT_SELECT,t.TT_CARD_SELECTOR,t.TT_MULTIPLE_SELECT,t.TT_TEXT,t.TT_NUMBER,t.TT_MONTHLY_DAYS,t.TT_ART_REGIMEN_SELECTION,t.TT_NEXT_VISIT_INTERVAL_SELECTION,t.TT_TABLE_VIEWER,t.TT_DOSAGE_INPUT,t.TT_YES_NO,t.TT_MULTIPLE_YES_NO,t.TT_WEIGHT_CHART,t.TT_VITALS_ENTRY,t.TT_APPOINTMENTS_ENTRY,t.TT_COMPLAINTS_PICKER,t.TT_CLINIC_HOLIDAY_PICKER,t.TT_SUMMARY,t.TT_ART_STAGING_SUMMARY,t.TT_ADHERENCE_INPUT,t.TT_LAB_ORDERS,t.TT_PERSON_RESULT_VIEW,t.TT_PROGRAM_SELECTION,t.TT_DATE_PICKER,t.TT_RELATION_SELECTION,t.TT_FILING_NUMBER_VIEW,t.TT_PERSON_MATCH_VIEW,t.TT_FULL_DATE,t.TT_BATCH_ENTRY,t.TT_BATCH_VERIFICATION,t.TT_BATCH_MOVEMENT,t.TT_IP_ADDRESS,t.TT_TEXT_BANNER,t.TT_DISPENSATION_INPUT,t.TT_DATA_TABLE,t.TT_GROUP_SELECTOR,t.TT_ANC_PREGNANCY_INPUT_CONFIG,t.TT_ANC_PREGNANCY_DETAILS_INPUT,t.TT_ANC_LMP_DATE_INPUT,t.TT_DRUG_TRANSFER_IN,t.TT_GRID_SELECTOR,t.TT_ANC_DRUGSET_INPUT,t.TT_RADIOLOGY_PICKER,t.TT_PRESCRIPTION_INPUT,t.TT_INFINITE_SCROLL_MULTIPLE_SELECT,t.TT_DRUG_DISPENSER]},f159:function(e,T,n){var t={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-182277b5","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-182277b5","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-182277b5","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-f0823c9c","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function i(e){if(!n.o(t,e))return Promise.resolve().then((function(){var T=new Error("Cannot find module '"+e+"'");throw T.code="MODULE_NOT_FOUND",T}));var T=t[e],i=T[0];return Promise.all(T.slice(1).map(n.e)).then((function(){return n(i)}))}i.keys=function(){return Object.keys(t)},i.id="f159",e.exports=i}}]);
//# sourceMappingURL=chunk-a729b7d6.8d1ce296.js.map