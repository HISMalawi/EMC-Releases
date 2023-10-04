(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-027d3d90"],{"027b":function(e,T,n){"use strict";n.r(T);var t=n("7a23");function o(e,T,n,o,i,r){const u=Object(t["resolveComponent"])("his-standard-form");return Object(t["openBlock"])(),Object(t["createBlock"])(u,{fields:e.fields,onOnFinish:e.onFinish,skipSummary:!0},null,8,["fields","onOnFinish"])}var i=n("d95e"),r=n("7920"),u=n("2706"),c=n("3800"),E=n("cc74"),_=Object(t["defineComponent"])({components:{HisStandardForm:r["a"]},methods:{async onFinish(e){const T=e.use_portal.value;if(await E["b"].setPortalEnabled(T),this.enablePortal){const T=e.ip_address.value,n=e.port.value,t=`http://${T}:${n}`;await E["b"].setPortalIP(t)}this.$router.back()},getFields(){this.fields=[{id:"use_portal",helpText:"Enable Portal?",type:i["b"].TT_SELECT,requireNext:!0,validation:e=>u["a"].required(e),options:()=>[{label:"Yes",value:"true"},{label:"No",value:"false"}],computedValue:async e=>{this.enablePortal="true"===e.value}},{id:"ip_address",helpText:"Enter IP Address",type:i["b"].TT_TEXT,condition:()=>this.enablePortal,validation:e=>u["a"].required(e)||u["a"].isIPAddress(e),config:{customKeyboard:[c["c"],[["Delete"]]]}},{id:"port",helpText:"Enter Port",condition:()=>this.enablePortal,validation:e=>u["a"].required(e),type:i["b"].TT_TEXT,config:{customKeyboard:[c["j"],[["Delete"]]]}}]}},data(){return{fields:[],enablePortal:!1}},mounted(){this.getFields()}}),l=n("d959"),s=n.n(l);const a=s()(_,[["render",o]]);T["default"]=a},3800:function(e,T,n){"use strict";n.d(T,"d",(function(){return t})),n.d(T,"k",(function(){return o})),n.d(T,"f",(function(){return i})),n.d(T,"n",(function(){return r})),n.d(T,"e",(function(){return u})),n.d(T,"b",(function(){return c})),n.d(T,"m",(function(){return E})),n.d(T,"j",(function(){return _})),n.d(T,"h",(function(){return l})),n.d(T,"a",(function(){return s})),n.d(T,"l",(function(){return a})),n.d(T,"c",(function(){return m})),n.d(T,"i",(function(){return I})),n.d(T,"g",(function(){return d}));const t=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],c=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],E=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],_=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],l=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],s=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],a=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],m=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],I=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],d=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},7920:function(e,T,n){"use strict";var t=n("7a23");function o(e,T,n,o,i,r){return Object(t["openBlock"])(),Object(t["createBlock"])(Object(t["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var i=n("9441"),r=Object(t["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:i["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,T){this.$emit("onFinish",e,T)},onIndex(e){this.$emit("onIndex",e)}}}),u=n("d959"),c=n.n(u);const E=c()(r,[["render",o]]);T["a"]=E},d95e:function(e,T,n){"use strict";var t;n.d(T,"b",(function(){return t})),n.d(T,"a",(function(){return o})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(t||(t={}));const o=[t.TT_LINKAGE_CODE,t.TT_MULTI_SELECT_GRID,t.TT_AGE_INPUT,t.TT_BARCODE,t.TT_NOTE,t.TT_SELECT,t.TT_CARD_SELECTOR,t.TT_MULTIPLE_SELECT,t.TT_TEXT,t.TT_NUMBER,t.TT_MONTHLY_DAYS,t.TT_ART_REGIMEN_SELECTION,t.TT_NEXT_VISIT_INTERVAL_SELECTION,t.TT_TABLE_VIEWER,t.TT_DOSAGE_INPUT,t.TT_YES_NO,t.TT_MULTIPLE_YES_NO,t.TT_WEIGHT_CHART,t.TT_VITALS_ENTRY,t.TT_APPOINTMENTS_ENTRY,t.TT_COMPLAINTS_PICKER,t.TT_CLINIC_HOLIDAY_PICKER,t.TT_SUMMARY,t.TT_ART_STAGING_SUMMARY,t.TT_ADHERENCE_INPUT,t.TT_LAB_ORDERS,t.TT_PERSON_RESULT_VIEW,t.TT_PROGRAM_SELECTION,t.TT_DATE_PICKER,t.TT_RELATION_SELECTION,t.TT_FILING_NUMBER_VIEW,t.TT_PERSON_MATCH_VIEW,t.TT_FULL_DATE,t.TT_BATCH_ENTRY,t.TT_BATCH_VERIFICATION,t.TT_BATCH_MOVEMENT,t.TT_IP_ADDRESS,t.TT_TEXT_BANNER,t.TT_DISPENSATION_INPUT,t.TT_DATA_TABLE,t.TT_GROUP_SELECTOR,t.TT_ANC_PREGNANCY_INPUT_CONFIG,t.TT_ANC_PREGNANCY_DETAILS_INPUT,t.TT_ANC_LMP_DATE_INPUT,t.TT_DRUG_TRANSFER_IN,t.TT_GRID_SELECTOR,t.TT_ANC_DRUGSET_INPUT,t.TT_RADIOLOGY_PICKER,t.TT_PRESCRIPTION_INPUT,t.TT_INFINITE_SCROLL_MULTIPLE_SELECT,t.TT_DRUG_DISPENSER]},f159:function(e,T,n){var t={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-fb7a1668","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-fb7a1668","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-fb7a1668","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-3c642140","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function o(e){if(!n.o(t,e))return Promise.resolve().then((function(){var T=new Error("Cannot find module '"+e+"'");throw T.code="MODULE_NOT_FOUND",T}));var T=t[e],o=T[0];return Promise.all(T.slice(1).map(n.e)).then((function(){return n(o)}))}o.keys=function(){return Object.keys(t)},o.id="f159",e.exports=o}}]);
//# sourceMappingURL=chunk-027d3d90.00a49e77.js.map