(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9c9e9782"],{6955:function(e,t,T){"use strict";T.r(t);var n=T("7a23");function o(e,t,T,o,r,i){const u=Object(n["resolveComponent"])("report-template"),_=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(_,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(u,{title:e.title,rows:e.rows,columns:e.columns},null,8,["title","rows","columns"])]),_:1})}var r=T("44e3"),i=T("d6aa"),u=T("9ceb"),_=T("ad8d"),c=T("8a30"),E=Object(n["defineComponent"])({mixins:[r["a"]],components:{ReportTemplate:i["a"],IonPage:c["D"]},data:()=>({title:"Active clients with adverse outcomes",rows:[],columns:[[u["a"].thTxt("Filing#"),u["a"].thTxt("Outcome"),u["a"].thTxt("Outcome date")]]}),async created(){const e=new _["b"],t=await e.getArchivingCandidates();t.forEach(e=>{this.rows.push([u["a"].td(e.filing_number),u["a"].td(e.outcome),u["a"].tdDate(e.outcome_date)])})}}),s=T("6b0d"),a=T.n(s);const m=a()(E,[["render",o]]);t["default"]=m},ad8d:function(e,t,T){"use strict";T.d(t,"a",(function(){return _})),T.d(t,"b",(function(){return c}));var n=T("d4ec"),o=T("bee2"),r=T("262e"),i=T("2caf"),u=T("5969"),_=["<1 year","1-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90 plus years"],c=function(e){Object(r["a"])(T,e);var t=Object(i["a"])(T);function T(){return Object(n["a"])(this,T),t.call(this)}return Object(o["a"])(T,[{key:"getBookedAppointments",value:function(e){return u["a"].getJson("programs/".concat(this.programID,"/scheduled_appointments"),{date:e})}},{key:"getViralLoadResults",value:function(e){return this.getReport("/programs/".concat(this.programID,"/reports/high_vl_patients"),{range:e})}},{key:"getOtherOutcome",value:function(e){return this.getReport("patient_outcome_list",{outcome:e})}},{key:"getPatientVisitTypes",value:function(){return this.getReport("patient_visit_types")}},{key:"getClientsDueForVl",value:function(){return this.getReport("clients_due_vl")}},{key:"getClientRentention",value:function(){return this.getReport("/programs/".concat(this.programID,"/reports/retention"))}},{key:"getExternalConsultationClients",value:function(){return this.getReport("".concat(this.programID,"/external_consultation_clients"))}},{key:"getMissedAppointments",value:function(){return this.getReport("missed_appointments")}},{key:"getPregnantWomen",value:function(){return this.getReport("/programs/".concat(this.programID,"/reports/pregnant_patients"))}},{key:"getArchivingCandidates",value:function(){return u["a"].getJson("programs/".concat(this.programID,"/reports/archiving_candidates"),{start_date:this.date})}}]),T}(u["a"])},d95e:function(e,t,T){"use strict";var n;T.d(t,"b",(function(){return n})),T.d(t,"a",(function(){return o})),function(e){e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(n||(n={}));var o=[n.TT_MULTI_SELECT_GRID,n.TT_AGE_INPUT,n.TT_BARCODE,n.TT_NOTE,n.TT_SELECT,n.TT_CARD_SELECTOR,n.TT_MULTIPLE_SELECT,n.TT_TEXT,n.TT_NUMBER,n.TT_MONTHLY_DAYS,n.TT_ART_REGIMEN_SELECTION,n.TT_NEXT_VISIT_INTERVAL_SELECTION,n.TT_TABLE_VIEWER,n.TT_DOSAGE_INPUT,n.TT_YES_NO,n.TT_MULTIPLE_YES_NO,n.TT_WEIGHT_CHART,n.TT_VITALS_ENTRY,n.TT_APPOINTMENTS_ENTRY,n.TT_COMPLAINTS_PICKER,n.TT_CLINIC_HOLIDAY_PICKER,n.TT_SUMMARY,n.TT_ART_STAGING_SUMMARY,n.TT_ADHERENCE_INPUT,n.TT_LAB_ORDERS,n.TT_PERSON_RESULT_VIEW,n.TT_PROGRAM_SELECTION,n.TT_DATE_PICKER,n.TT_RELATION_SELECTION,n.TT_FILING_NUMBER_VIEW,n.TT_PERSON_MATCH_VIEW,n.TT_FULL_DATE,n.TT_BATCH_ENTRY,n.TT_BATCH_VERIFICATION,n.TT_BATCH_MOVEMENT,n.TT_IP_ADDRESS,n.TT_TEXT_BANNER,n.TT_DISPENSATION_INPUT,n.TT_DATA_TABLE,n.TT_GROUP_SELECTOR,n.TT_ANC_PREGNANCY_INPUT_CONFIG,n.TT_ANC_PREGNANCY_DETAILS_INPUT,n.TT_ANC_LMP_DATE_INPUT,n.TT_DRUG_TRANSFER_IN,n.TT_GRID_SELECTOR,n.TT_ANC_DRUGSET_INPUT,n.TT_RADIOLOGY_PICKER,n.TT_PRESCRIPTION_INPUT,n.TT_INFINITE_SCROLL_MULTIPLE_SELECT,n.TT_DRUG_DISPENSER]},f159:function(e,t,T){var n={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262ed","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","TouchFormElement16"],"./HisBatchMovement.vue":["5148","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-daba0634","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement46"],"./PersonMatchView.vue":["6591","TouchFormElement47"],"./PersonSearchView.vue":["28b2","TouchFormElement48"],"./ProgramSelection.vue":["e3b4","TouchFormElement49"],"./RelationsSelection.vue":["0e57","TouchFormElement50"],"./SelectMixin.vue":["82a9","TouchFormElement51"],"./YesNoSelect.vue":["71f2","TouchFormElement52"]};function o(e){if(!T.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],o=t[0];return Promise.all(t.slice(1).map(T.e)).then((function(){return T(o)}))}o.keys=function(){return Object.keys(n)},o.id="f159",e.exports=o}}]);
//# sourceMappingURL=chunk-9c9e9782.9a9c47e8.js.map