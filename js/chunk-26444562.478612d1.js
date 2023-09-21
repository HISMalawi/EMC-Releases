(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26444562"],{7920:function(e,t,n){"use strict";var i=n("7a23");function T(e,t,n,T,o,r){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),a=n("6b0d"),c=n.n(a);const s=c()(r,[["render",T]]);t["a"]=s},"8a4e":function(e,t,n){"use strict";n.r(t);var i=n("7a23");function T(e,t,n,T,o,r){const a=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(a,{fields:e.fields,activeField:e.activeField,onFinishAction:e.onFinish,skipSummary:!0,onOnIndex:t[0]||(t[0]=t=>e.activeField="")},null,8,["fields","activeField","onFinishAction"])}n("14d9");var o=n("d95e"),r=n("7920"),a=n("2706"),c=n("9283"),s=n("e86e"),u=n("3d6c"),l=n("b5e4"),_=n("2ef0"),E=n("0011"),m=n("1c74");class d extends m["e"]{constructor(){super()}static getDrugs(e={}){return super.getJson("/drug_cms",e)}static search(e=""){return super.getJson("/drug_cms/search",{keyword:e})}}var h=Object(i["defineComponent"])({components:{HisStandardForm:r["a"]},data:()=>({activeField:"",fields:[],drugs:[],selectedDrugs:[],barcode:"",stockService:{}}),methods:{async onFinish(e){const t=this.prepDrugs(e),n=await this.stockService.postItems(t);n?(Object(l["d"])("Stock succesfully added"),this.$router.push("/")):Object(l["c"])("Could not save stock")},getFields(){return[{id:"transfer_origination",helpText:"Select where stock came from",type:o["b"].TT_SELECT,validation:e=>a["a"].required(e),options:()=>[{label:"DHA",value:"DHA"},{label:"Other location",value:"Other location"}]},{id:"transfer_location",helpText:"Location",type:o["b"].TT_SELECT,validation:e=>a["a"].required(e),condition:e=>"Other location"===e.transfer_origination.value,options:(e,t="")=>Object(s["b"])(t),computedValue:e=>e.label,config:{showKeyboard:!0,isFilterDataViaApi:!0}},{id:"barcode",helpText:"Scan barcode",type:o["b"].TT_BARCODE,config:{hiddenFooterBtns:["Clear","Next"]},onValue:async e=>{this.barcode=e,this.activeField="select drugs"},condition:e=>"DHA"===e.transfer_origination.value},{id:"select drugs",helpText:"Select drugs",type:o["b"].TT_INFINITE_SCROLL_MULTIPLE_SELECT,requireNext:!0,validation:e=>a["a"].required(e),options:async(e,t="a")=>{const n=await d.search(t||"a");return this.drugs=this.formatDrugs(n),this.drugs},unload:e=>this.selectedDrugs=e,config:{showKeyboard:!0,isFilterDataViaApi:!0,footerBtns:[{name:"Select all",slot:"end",onClick:async()=>{const e=await d.getDrugs({pagenate:!1});this.drugs=this.formatDrugs(e),this.selectAll(this.drugs)}}]}},{id:"date",helpText:"Delivery Date",type:o["b"].TT_FULL_DATE,validation:e=>a["a"].required(e)},{id:"enter_batches",helpText:"Batch entry",type:o["b"].TT_BATCH_ENTRY,options:()=>this.selectedDrugs,beforeNext:(e,t,n,{currentFieldContext:i})=>{const T=e=>e.map((e,t)=>""+e.label).join(" & "),o=i.drugs.filter(e=>e.entries.map(e=>!e.tins&&!e.expiry&&!e.batchNumber&&!e.tabs).every(Boolean)),r=i.drugs.filter(e=>e.entries.map(e=>{let t=0;return e.tins&&(t+=1),e.expiry&&(t+=1),e.batchNumber&&(t+=1),e.tabs&&(t+=1),t>=1&&t<=3}).some(Boolean));if(!Object(_["isEmpty"])(r)){const e=T(r);return Object(l["e"])("Please fix partial batch entries for drugs: "+e),!1}if(!Object(_["isEmpty"])(o)){const e=T(o);return Object(l["e"])("The following drug batches are empty: "+e),!1}return!0},validation:e=>a["a"].required(e)},{id:"summary",helpText:"Summary",type:o["b"].TT_TABLE_VIEWER,options:e=>this.buildResults(e.enter_batches),config:{hiddenFooterBtns:["Clear"]}}]},buildResults(e){const t=["Drug","Amount per unit","Tins/Pallets","Expiry date","Batch number"],n=e.map(e=>{const t=e.value;return[t.short_name,t.tabs,Object(E["h"])(t.tins),c["b"].toStandardHisDisplayFormat(t.expiry),t.batchNumber]});return[{label:"Confirm entry",value:"Table",other:{columns:t,rows:n}}]},prepDrugs(e){const t=[],n=this.barcode,i="DHA"===e.transfer_origination.value?null:e.transfer_location.value;return e.enter_batches.forEach(T=>{const o=T.value;t.push({batch_number:o.batchNumber,location_id:i,items:[{barcode:n,drug_id:o.drug_inventory_id,expiry_date:o.expiry,quantity:parseInt(o.tabs)*parseInt(o.tins),delivery_date:e.date.value,product_code:o.code,pack_size:o.tabs}]})}),t},selectAll(e){return e.map(e=>(e.isChecked=!0,e))},formatDrugs(e){return e.map(e=>({label:`${e.short_name} (${e.code})`,value:e}))}},created(){this.stockService=new u["a"],this.fields=this.getFields()}}),I=n("6b0d"),p=n.n(I);const N=p()(h,[["render",T]]);t["default"]=N},d95e:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return T})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(i||(i={}));const T=[i.TT_LINKAGE_CODE,i.TT_MULTI_SELECT_GRID,i.TT_AGE_INPUT,i.TT_BARCODE,i.TT_NOTE,i.TT_SELECT,i.TT_CARD_SELECTOR,i.TT_MULTIPLE_SELECT,i.TT_TEXT,i.TT_NUMBER,i.TT_MONTHLY_DAYS,i.TT_ART_REGIMEN_SELECTION,i.TT_NEXT_VISIT_INTERVAL_SELECTION,i.TT_TABLE_VIEWER,i.TT_DOSAGE_INPUT,i.TT_YES_NO,i.TT_MULTIPLE_YES_NO,i.TT_WEIGHT_CHART,i.TT_VITALS_ENTRY,i.TT_APPOINTMENTS_ENTRY,i.TT_COMPLAINTS_PICKER,i.TT_CLINIC_HOLIDAY_PICKER,i.TT_SUMMARY,i.TT_ART_STAGING_SUMMARY,i.TT_ADHERENCE_INPUT,i.TT_LAB_ORDERS,i.TT_PERSON_RESULT_VIEW,i.TT_PROGRAM_SELECTION,i.TT_DATE_PICKER,i.TT_RELATION_SELECTION,i.TT_FILING_NUMBER_VIEW,i.TT_PERSON_MATCH_VIEW,i.TT_FULL_DATE,i.TT_BATCH_ENTRY,i.TT_BATCH_VERIFICATION,i.TT_BATCH_MOVEMENT,i.TT_IP_ADDRESS,i.TT_TEXT_BANNER,i.TT_DISPENSATION_INPUT,i.TT_DATA_TABLE,i.TT_GROUP_SELECTOR,i.TT_ANC_PREGNANCY_INPUT_CONFIG,i.TT_ANC_PREGNANCY_DETAILS_INPUT,i.TT_ANC_LMP_DATE_INPUT,i.TT_DRUG_TRANSFER_IN,i.TT_GRID_SELECTOR,i.TT_ANC_DRUGSET_INPUT,i.TT_RADIOLOGY_PICKER,i.TT_PRESCRIPTION_INPUT,i.TT_INFINITE_SCROLL_MULTIPLE_SELECT,i.TT_DRUG_DISPENSER]},e86e:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"f",(function(){return c})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return u})),n.d(t,"g",(function(){return l})),n.d(t,"h",(function(){return _}));var i=n("5713"),T=n("2ef0");async function o(e=""){const t=await i["a"].getFacilities({name:e});return t.filter(e=>!Object(T["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function r(e=""){const t=await i["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function a(e=""){const t=await i["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function c(){const e=await i["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function s(){const e=await i["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function u(e){const t=await i["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function l(e,t=""){const n=await i["a"].getTraditionalAuthorities(e,t);return n.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function _(e,t=""){const n=await i["a"].getVillages(e,t);return n.map(e=>({label:e.name,value:e.village_id,other:e}))}},f159:function(e,t,n){var i={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-182277b5","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-182277b5","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-182277b5","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-f0823c9c","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function T(e){if(!n.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],T=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(T)}))}T.keys=function(){return Object.keys(i)},T.id="f159",e.exports=T}}]);
//# sourceMappingURL=chunk-26444562.478612d1.js.map