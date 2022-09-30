(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-24564210"],{"44e3":function(e,t,r){"use strict";var n=r("1c74"),o=r("7a23"),s=r("b446"),a=r("23e6"),T=r("9283"),i=r("8a30"),u=r("d6aa"),l=r("5969"),c=r("d95e"),_=r("2706"),m=r("9ceb"),E=r("2ef0"),h=Object(o["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){return"M"===e||"male"===e.toLowerCase()?"Male":"Female"},toDate(e){return T["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,r)=>this.getArvInt(e[t])>this.getArvInt(r[t])?1:-1)}catch(r){return console.error(r),e}},getArvInt(e){if("string"===typeof e){const[t,r,n]=e.split("-"),o=parseInt(n);return"number"===typeof o?o:0}return 0},tdARV(e,t={}){return m["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,r,n=!0){const o=await i["X"].create({component:u["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:r,canExport:n,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>i["X"].dismiss()}});o.present()},async drilldownData(e,t,r,n){const o=await i["X"].create({component:u["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:r,rowParser:n,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>i["X"].dismiss()}});o.present()},getDefaultDrillDownTable(){const e=[[m["a"].thTxt("ARV number"),m["a"].thTxt("Gender"),m["a"].thTxt("Birth Date"),m["a"].thTxt("Actions")]],t=async e=>{let t=0;const r=e.map(async e=>{let r=null,n=null;if(Object(E["isArray"])(e)){const[t,r]=e;if(n=t,r in this.drillDownCache){const[e,...t]=this.drillDownCache[r];return[n,...t]}}else if(r=e,r in this.drillDownCache)return this.drillDownCache[r];const o=await a["a"].findByID(r),s=new a["a"](o),T=[];return n&&(t=1,T.push(n)),T.push(this.tdARV(s.getArvNumber())),T.push(m["a"].td(this.formatGender(s.getGender()))),T.push(m["a"].tdDate(s.getBirthdate().toString())),T.push(m["a"].tdBtn("Show",async()=>{await i["X"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+r})})),this.drillDownCache[r]=T,T}),n=await Promise.all(r);return n.sort((e,r)=>e[t].sortValue>r[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:r,rowParser:n}=this.getDefaultDrillDownTable();this.drilldownData(t,r,e,n)},drill(e,t="Drill table"){return e&&e.length>0?m["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):m["a"].td(0)},getQuaterOptions(){const e=l["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,r=5,o=n["e"].getSessionDate()){const a="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:c["b"].TT_SELECT,condition:()=>e,validation:e=>_["a"].required(e),options:()=>{const e=l["a"].getReportQuarters(r);let n=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(n=[{label:"Set custom period",value:"custom_period",other:{}},...n]),n}},...Object(s["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>a,maxDate:()=>o,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(s["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,r,n)=>{"next"===t&&(this.endDate=n.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>o,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const d=h;t["a"]=d},5969:function(e,t,r){"use strict";r.d(t,"a",(function(){return T}));var n=r("1c74"),o=r("9283"),s=r("5a0c"),a=r.n(s);class T extends n["e"]{constructor(){super(),this.endDate="",this.startDate="",this.quarter="",this.date=n["e"].getSessionDate(),this.programID=n["e"].getProgramID()}getDateIntervalPeriod(){return`${o["b"].toStandardHisDisplayFormat(this.startDate)} - ${o["b"].toStandardHisDisplayFormat(this.endDate)}`}setStartDate(e){this.startDate=e}setEndDate(e){this.endDate=e}setQuarter(e){this.quarter=e}getReport(e,t={}){return n["e"].getJson(e,this.buildRequest(t))}buildRequest(e={}){const t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.quarter&&(t["quarter"]=this.quarter),{...t,...e}}static getQuarterBounds(e){const t=t=>a()(`${e}-${t}-01`).daysInMonth(),r=t=>`${e}-${t}-01 00:00`,n=r=>`${e}-${r}-${t(r)} 00:00`;return{Q1:{qtr:1,start:r("01"),end:n("03")},Q2:{qtr:2,start:r("04"),end:n("06")},Q3:{qtr:3,start:r("07"),end:n("09")},Q4:{qtr:4,start:r("10"),end:n("12")}}}static getQtrByDate(e){const t=this.getQuarterBounds(e.getFullYear());for(const r in t){const{start:n,end:o}=t[r];if(e>=new Date(n)&&e<=new Date(o))return t[r]}return null}static buildQtrObj(e,t){const r=this.getQuarterBounds(t),{start:n,end:o}=r[e];return{start:n,end:o,name:`${e} ${t}`}}static getReportQuarters(e=5){const t=[];let r=new Date,n=r.getFullYear();const o=n;r=new Date(`${o}-${r.getMonth()+1}-${r.getDate()} 00:00`);const s=this.getQtrByDate(r);let a=s.qtr,T=0;4===a&&t.push(this.buildQtrObj("Q1",n+1));while(T<e)0===T&&a<4&&t.push(this.buildQtrObj("Q"+(a+1),n)),t.push(this.buildQtrObj("Q"+a,n)),a=a>0?a-=1:a,n=0==a?n-1:n,a=0==a?a+=4:a,T++;return t}}},6955:function(e,t,r){"use strict";r.r(t);var n=r("7a23");function o(e,t,r,o,s,a){const T=Object(n["resolveComponent"])("report-template"),i=Object(n["resolveComponent"])("ion-page");return Object(n["openBlock"])(),Object(n["createBlock"])(i,null,{default:Object(n["withCtx"])(()=>[Object(n["createVNode"])(T,{title:e.title,rows:e.rows,columns:e.columns},null,8,["title","rows","columns"])]),_:1})}var s=r("44e3"),a=r("d6aa"),T=r("9ceb"),i=r("ad8d"),u=r("8a30"),l=Object(n["defineComponent"])({mixins:[s["a"]],components:{ReportTemplate:a["a"],IonPage:u["D"]},data:()=>({title:"Active clients with adverse outcomes",rows:[],columns:[[T["a"].thTxt("Filing#"),T["a"].thTxt("Outcome"),T["a"].thTxt("Outcome date")]]}),async created(){const e=new i["b"],t=await e.getArchivingCandidates();t.forEach(e=>{this.rows.push([T["a"].td(e.filing_number),T["a"].td(e.outcome),T["a"].tdDate(e.outcome_date)])})}}),c=r("6b0d"),_=r.n(c);const m=_()(l,[["render",o]]);t["default"]=m},ad8d:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return s}));var n=r("5969");const o=["<1 year","1-4 years","5-9 years","10-14 years","15-19 years","20-24 years","25-29 years","30-34 years","35-39 years","40-44 years","45-49 years","50-54 years","55-59 years","60-64 years","65-69 years","70-74 years","75-79 years","80-84 years","85-89 years","90 plus years"];class s extends n["a"]{constructor(){super()}getBookedAppointments(e){return n["a"].getJson(`programs/${this.programID}/scheduled_appointments`,{date:e})}getViralLoadResults(e){return this.getReport(`/programs/${this.programID}/reports/high_vl_patients`,{range:e})}getOtherOutcome(e){return this.getReport("patient_outcome_list",{outcome:e})}getPatientVisitTypes(){return this.getReport("patient_visit_types")}getClientsDueForVl(){return this.getReport("clients_due_vl")}getClientRentention(){return this.getReport(`/programs/${this.programID}/reports/retention`)}getExternalConsultationClients(){return this.getReport(this.programID+"/external_consultation_clients")}getMissedAppointments(){return this.getReport("missed_appointments")}getPregnantWomen(){return this.getReport(`/programs/${this.programID}/reports/pregnant_patients`)}getArchivingCandidates(){return n["a"].getJson(`programs/${this.programID}/reports/archiving_candidates`,{start_date:this.date})}}},d95e:function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return o})),function(e){e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(n||(n={}));const o=[n.TT_MULTI_SELECT_GRID,n.TT_AGE_INPUT,n.TT_BARCODE,n.TT_NOTE,n.TT_SELECT,n.TT_CARD_SELECTOR,n.TT_MULTIPLE_SELECT,n.TT_TEXT,n.TT_NUMBER,n.TT_MONTHLY_DAYS,n.TT_ART_REGIMEN_SELECTION,n.TT_NEXT_VISIT_INTERVAL_SELECTION,n.TT_TABLE_VIEWER,n.TT_DOSAGE_INPUT,n.TT_YES_NO,n.TT_MULTIPLE_YES_NO,n.TT_WEIGHT_CHART,n.TT_VITALS_ENTRY,n.TT_APPOINTMENTS_ENTRY,n.TT_COMPLAINTS_PICKER,n.TT_CLINIC_HOLIDAY_PICKER,n.TT_SUMMARY,n.TT_ART_STAGING_SUMMARY,n.TT_ADHERENCE_INPUT,n.TT_LAB_ORDERS,n.TT_PERSON_RESULT_VIEW,n.TT_PROGRAM_SELECTION,n.TT_DATE_PICKER,n.TT_RELATION_SELECTION,n.TT_FILING_NUMBER_VIEW,n.TT_PERSON_MATCH_VIEW,n.TT_FULL_DATE,n.TT_BATCH_ENTRY,n.TT_BATCH_VERIFICATION,n.TT_BATCH_MOVEMENT,n.TT_IP_ADDRESS,n.TT_TEXT_BANNER,n.TT_DISPENSATION_INPUT,n.TT_DATA_TABLE,n.TT_GROUP_SELECTOR,n.TT_ANC_PREGNANCY_INPUT_CONFIG,n.TT_ANC_PREGNANCY_DETAILS_INPUT,n.TT_ANC_LMP_DATE_INPUT,n.TT_DRUG_TRANSFER_IN,n.TT_GRID_SELECTOR,n.TT_ANC_DRUGSET_INPUT,n.TT_RADIOLOGY_PICKER,n.TT_PRESCRIPTION_INPUT,n.TT_INFINITE_SCROLL_MULTIPLE_SELECT,n.TT_DRUG_DISPENSER]},f159:function(e,t,r){var n={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","TouchFormElement16"],"./HisBatchMovement.vue":["5148","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-daba0634","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement46"],"./PersonMatchView.vue":["6591","TouchFormElement47"],"./PersonSearchView.vue":["28b2","TouchFormElement48"],"./ProgramSelection.vue":["e3b4","TouchFormElement49"],"./RelationsSelection.vue":["0e57","TouchFormElement50"],"./SelectMixin.vue":["82a9","TouchFormElement51"],"./YesNoSelect.vue":["71f2","TouchFormElement52"]};function o(e){if(!r.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],o=t[0];return Promise.all(t.slice(1).map(r.e)).then((function(){return r(o)}))}o.keys=function(){return Object.keys(n)},o.id="f159",e.exports=o}}]);
//# sourceMappingURL=chunk-24564210.7b7a1774.js.map