(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e9acffa4"],{3800:function(e,T,t){"use strict";t.d(T,"d",(function(){return n})),t.d(T,"k",(function(){return o})),t.d(T,"f",(function(){return i})),t.d(T,"n",(function(){return r})),t.d(T,"e",(function(){return c})),t.d(T,"b",(function(){return u})),t.d(T,"m",(function(){return s})),t.d(T,"j",(function(){return E})),t.d(T,"h",(function(){return _})),t.d(T,"a",(function(){return a})),t.d(T,"l",(function(){return l})),t.d(T,"c",(function(){return m})),t.d(T,"i",(function(){return I})),t.d(T,"g",(function(){return h}));const n=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],u=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],E=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],_=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],a=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],l=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],m=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],I=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],h=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},7920:function(e,T,t){"use strict";var n=t("7a23");function o(e,T,t,o,i,r){return Object(n["openBlock"])(),Object(n["createBlock"])(Object(n["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var i=t("9441"),r=Object(n["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:i["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,T){this.$emit("onFinish",e,T)},onIndex(e){this.$emit("onIndex",e)}}}),c=t("d959"),u=t.n(c);const s=u()(r,[["render",o]]);T["a"]=s},d95e:function(e,T,t){"use strict";var n;t.d(T,"b",(function(){return n})),t.d(T,"a",(function(){return o})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(n||(n={}));const o=[n.TT_LINKAGE_CODE,n.TT_MULTI_SELECT_GRID,n.TT_AGE_INPUT,n.TT_BARCODE,n.TT_NOTE,n.TT_SELECT,n.TT_CARD_SELECTOR,n.TT_MULTIPLE_SELECT,n.TT_TEXT,n.TT_NUMBER,n.TT_MONTHLY_DAYS,n.TT_ART_REGIMEN_SELECTION,n.TT_NEXT_VISIT_INTERVAL_SELECTION,n.TT_TABLE_VIEWER,n.TT_DOSAGE_INPUT,n.TT_YES_NO,n.TT_MULTIPLE_YES_NO,n.TT_WEIGHT_CHART,n.TT_VITALS_ENTRY,n.TT_APPOINTMENTS_ENTRY,n.TT_COMPLAINTS_PICKER,n.TT_CLINIC_HOLIDAY_PICKER,n.TT_SUMMARY,n.TT_ART_STAGING_SUMMARY,n.TT_ADHERENCE_INPUT,n.TT_LAB_ORDERS,n.TT_PERSON_RESULT_VIEW,n.TT_PROGRAM_SELECTION,n.TT_DATE_PICKER,n.TT_RELATION_SELECTION,n.TT_FILING_NUMBER_VIEW,n.TT_PERSON_MATCH_VIEW,n.TT_FULL_DATE,n.TT_BATCH_ENTRY,n.TT_BATCH_VERIFICATION,n.TT_BATCH_MOVEMENT,n.TT_IP_ADDRESS,n.TT_TEXT_BANNER,n.TT_DISPENSATION_INPUT,n.TT_DATA_TABLE,n.TT_GROUP_SELECTOR,n.TT_ANC_PREGNANCY_INPUT_CONFIG,n.TT_ANC_PREGNANCY_DETAILS_INPUT,n.TT_ANC_LMP_DATE_INPUT,n.TT_DRUG_TRANSFER_IN,n.TT_GRID_SELECTOR,n.TT_ANC_DRUGSET_INPUT,n.TT_RADIOLOGY_PICKER,n.TT_PRESCRIPTION_INPUT,n.TT_INFINITE_SCROLL_MULTIPLE_SELECT,n.TT_DRUG_DISPENSER]},f159:function(e,T,t){var n={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-fb7a1668","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-fb7a1668","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-fb7a1668","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-3c642140","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function o(e){if(!t.o(n,e))return Promise.resolve().then((function(){var T=new Error("Cannot find module '"+e+"'");throw T.code="MODULE_NOT_FOUND",T}));var T=n[e],o=T[0];return Promise.all(T.slice(1).map(t.e)).then((function(){return t(o)}))}o.keys=function(){return Object.keys(n)},o.id="f159",e.exports=o},f49b:function(e,T,t){"use strict";t.r(T);var n=t("7a23");function o(e,T,t,o,i,r){const c=Object(n["resolveComponent"])("his-standard-form");return Object(n["openBlock"])(),Object(n["createBlock"])(c,{fields:e.fields,onFinishAction:e.onFinish,skipSummary:!0},null,8,["fields","onFinishAction"])}var i=t("d95e"),r=t("7920"),c=t("2706"),u=t("3800"),s=t("156d"),E=t("7f35"),_=t("b5e4"),a=t("d867"),l=Object(n["defineComponent"])({components:{HisStandardForm:r["a"]},methods:{async onFinish(e){const T=e.protocol.value,t=e.ip_address.value,n=e.port.value;s["b"].setLocalStorage(T,t,n);const o=await a["X"].create({message:"Please wait...",backdropDismiss:!1});await o.present();const i=await s["b"].healthCheck();a["X"].dismiss(),i&&200===i.status&&i?this.$router.back():(Object(_["e"])(`\n          Unable to connect to: ${T}://${t}: ${n}\n        `),this.clearLocalStorage())},getFields(){this.fields=[{id:"protocol",helpText:"Select Protocol",type:i["b"].TT_SELECT,requireNext:!1,validation:e=>c["a"].required(e),options:()=>[{label:"HTTP",value:"http"},{label:"HTTPS",value:"https"}]},{id:"ip_address",helpText:"Enter IP Address",type:i["b"].TT_IP_ADDRESS,validation:e=>c["a"].required(e)||c["a"].isIPAddress(e)},{id:"port",helpText:"Enter Port",validation:e=>c["a"].required(e),type:i["b"].TT_TEXT,config:{customKeyboard:[u["j"],[["Delete"]]]}}]},async showConfigNotice(){if(this.isUsingLocalStorage()){const e=await Object(E["a"])("Config notice","The system is currently using user specified configurations.                 Do you wish to reset back to server configurations?","",[{name:"Reset configurations",slot:"start",color:"success"},{name:"New configurations",slot:"end"}]);"Reset configurations"===e&&(this.clearLocalStorage(),this.$router.back())}},isUsingLocalStorage(){return"true"===localStorage.getItem("useLocalStorage")},clearLocalStorage(){const e=["useLocalStorage","apiURL","apiPort","apiProtocol"];s["b"].removeOnly(e)}},data(){return{fields:[]}},async mounted(){await this.showConfigNotice(),this.getFields()}}),m=t("d959"),I=t.n(m);const h=I()(l,[["render",o]]);T["default"]=h}}]);
//# sourceMappingURL=chunk-e9acffa4.4ef611fe.js.map