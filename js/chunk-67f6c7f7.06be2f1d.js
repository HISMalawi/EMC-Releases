(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67f6c7f7"],{"44e3":function(e,t,r){"use strict";var n=r("1c74"),a=r("7a23"),o=r("b446"),T=r("23e6"),i=r("9283"),u=r("8a30"),s=r("d6aa"),c=r("5969"),l=r("d95e"),_=r("2706"),E=r("9ceb"),m=r("2ef0"),h=Object(a["defineComponent"])({data:()=>({fields:[],report:{},reportReady:!1,period:"",startDate:"",endDate:"",customFileName:"",drillDownCache:{}}),methods:{formatGender(e){return"M"===e||"male"===e.toLowerCase()?"Male":"Female"},toDate(e){return i["b"].toStandardHisDisplayFormat(e)},sortByArvNumber(e,t="arv_number"){try{return e.sort((e,r)=>this.getArvInt(e[t])>this.getArvInt(r[t])?1:-1)}catch(r){return console.error(r),e}},getArvInt(e){if("string"===typeof e){const[t,r,n]=e.split("-"),a=parseInt(n);return"number"===typeof a?a:0}return 0},tdARV(e,t={}){return E["a"].td(e,{sortValue:this.getArvInt(e),...t})},confirmPatient(e){return this.$router.push("/patients/confirm?person_id="+e)},async drilldownAsyncRows(e,t,r,n=!0){const a=await u["X"].create({component:s["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,asyncRows:r,canExport:n,showFilters:!0,rowsPerPage:50,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>u["X"].dismiss()}});a.present()},async drilldownData(e,t,r,n){const a=await u["X"].create({component:s["a"],cssClass:"large-modal",componentProps:{title:e,columns:t,rows:r,rowParser:n,rowsPerPage:50,showFilters:!0,paginated:!0,showReportStamp:!1,footerColor:"light",onFinish:()=>u["X"].dismiss()}});a.present()},getDefaultDrillDownTable(){const e=[[E["a"].thTxt("ARV number"),E["a"].thTxt("Gender"),E["a"].thTxt("Birth Date"),E["a"].thTxt("Actions")]],t=async e=>{let t=0;const r=e.map(async e=>{let r=null,n=null;if(Object(m["isArray"])(e)){const[t,r]=e;if(n=t,r in this.drillDownCache){const[e,...t]=this.drillDownCache[r];return[n,...t]}}else if(r=e,r in this.drillDownCache)return this.drillDownCache[r];const a=await T["a"].findByID(r),o=new T["a"](a),i=[];return n&&(t=1,i.push(n)),i.push(this.tdARV(o.getArvNumber())),i.push(E["a"].td(this.formatGender(o.getGender()))),i.push(E["a"].tdDate(o.getBirthdate().toString())),i.push(E["a"].tdBtn("Show",async()=>{await u["X"].dismiss({}),this.$router.push({path:"/patient/dashboard/"+r})})),this.drillDownCache[r]=i,i}),n=await Promise.all(r);return n.sort((e,r)=>e[t].sortValue>r[t].sortValue?1:-1)};return{rowParser:t,columns:e}},runTableDrill(e,t="Drilldown patients"){const{columns:r,rowParser:n}=this.getDefaultDrillDownTable();this.drilldownData(t,r,e,n)},drill(e,t="Drill table"){return e&&e.length>0?E["a"].tdLink(e.length,()=>this.runTableDrill(e,t)):E["a"].td(0)},getQuaterOptions(){const e=c["a"].getReportQuarters();return e.map(e=>({label:e.name,value:e.start,other:e}))},getDateDurationFields(e=!1,t=!1,r=5,a=n["e"].getSessionDate()){const T="2000-01-01";return[{id:"quarter",helpText:"Select Quarter",type:l["b"].TT_SELECT,condition:()=>e,validation:e=>_["a"].required(e),options:()=>{const e=c["a"].getReportQuarters(r);let n=e.map(e=>({label:e.name,value:e.start,other:e}));return t&&(n=[{label:"Set custom period",value:"custom_period",other:{}},...n]),n}},...Object(o["b"])({id:"start_date",helpText:"Start",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,minDate:()=>T,maxDate:()=>a,estimation:{allowUnknown:!1},computeValue:e=>e}),...Object(o["b"])({id:"end_date",helpText:"End",required:!0,condition:t=>t.quarter&&"custom_period"===t.quarter.value||!e,unload:(e,t,r,n)=>{"next"===t&&(this.endDate=n.end_date)},minDate:(e,t)=>t.start_date,maxDate:()=>a,estimation:{allowUnknown:!1},computeValue:e=>e})]}}});const d=h;t["a"]=d},5969:function(e,t,r){"use strict";r.d(t,"a",(function(){return _}));var n=r("5530"),a=r("d4ec"),o=r("bee2"),T=r("262e"),i=r("2caf"),u=(r("99af"),r("1c74")),s=r("9283"),c=r("5a0c"),l=r.n(c),_=function(e){Object(T["a"])(r,e);var t=Object(i["a"])(r);function r(){var e;return Object(a["a"])(this,r),e=t.call(this),e.endDate="",e.startDate="",e.quarter="",e.date=u["e"].getSessionDate(),e.programID=u["e"].getProgramID(),e}return Object(o["a"])(r,[{key:"getDateIntervalPeriod",value:function(){return"".concat(s["b"].toStandardHisDisplayFormat(this.startDate)," - ").concat(s["b"].toStandardHisDisplayFormat(this.endDate))}},{key:"setStartDate",value:function(e){this.startDate=e}},{key:"setEndDate",value:function(e){this.endDate=e}},{key:"setQuarter",value:function(e){this.quarter=e}},{key:"getReport",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return u["e"].getJson(e,this.buildRequest(t))}},{key:"buildRequest",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t={date:this.date,program_id:this.programID};return this.startDate&&this.endDate&&(t["start_date"]=this.startDate,t["end_date"]=this.endDate),this.quarter&&(t["quarter"]=this.quarter),Object(n["a"])(Object(n["a"])({},t),e)}}],[{key:"getQuarterBounds",value:function(e){var t=function(t){return l()("".concat(e,"-").concat(t,"-01")).daysInMonth()},r=function(t){return"".concat(e,"-").concat(t,"-01 00:00")},n=function(r){return"".concat(e,"-").concat(r,"-").concat(t(r)," 00:00")};return{Q1:{qtr:1,start:r("01"),end:n("03")},Q2:{qtr:2,start:r("04"),end:n("06")},Q3:{qtr:3,start:r("07"),end:n("09")},Q4:{qtr:4,start:r("10"),end:n("12")}}}},{key:"getQtrByDate",value:function(e){var t=this.getQuarterBounds(e.getFullYear());for(var r in t){var n=t[r],a=n.start,o=n.end;if(e>=new Date(a)&&e<=new Date(o))return t[r]}return null}},{key:"buildQtrObj",value:function(e,t){var r=this.getQuarterBounds(t),n=r[e],a=n.start,o=n.end;return{start:a,end:o,name:"".concat(e," ").concat(t)}}},{key:"getReportQuarters",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t=[],r=new Date,n=r.getFullYear(),a=n;r=new Date("".concat(a,"-").concat(r.getMonth()+1,"-").concat(r.getDate()," 00:00"));var o=this.getQtrByDate(r),T=o.qtr,i=0;4===T&&t.push(this.buildQtrObj("Q1",n+1));while(i<e)0===i&&T<4&&t.push(this.buildQtrObj("Q".concat(T+1),n)),t.push(this.buildQtrObj("Q".concat(T),n)),T=T>0?T-=1:T,n=0==T?n-1:n,T=0==T?T+=4:T,i++;return t}}]),r}(u["e"])},"91e4":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r("5969");class a extends n["a"]{constructor(){super(),this.stock=[]}async loadStock(){this.stock=await n["a"].getJson("pharmacy/items",{paginate:!1})}getStockReport(){return n["a"].getJson("pharmacy/stock_report",{paginate:!1})}loadTrail(){return this.getReport("pharmacy/audit_trail")}groupStock(){const e={};for(const t in this.stock){const r=this.stock[t],n=r["drug_id"];e[n]||(e[n]={current_quantity:0,expiry_dates:[],pack_size:r.pack_size,drug_name:null===r["drug_name"]?r["drug_legacy_name"]:r["drug_name"]}),0!==r.current_quantity&&(e[n]["current_quantity"]+=parseFloat(r.current_quantity),e[n]["expiry_dates"].push(r["expiry_date"]))}return Object.values(e).map(e=>{let t="0";t=null==e.pack_size?e.current_quantity+"(tabs)":Math.trunc(e.current_quantity/e.pack_size);const r=e.expiry_dates.sort((e,t)=>+new Date(e)-+new Date(t))[0];return{drugName:e.drug_name,currentQuantity:t,quantityIsTabs:null===e.pack_size,expiryDate:r}})}}},c016:function(e,t,r){"use strict";r.r(t);var n=r("7a23");function a(e,t,r,a,o,T){const i=Object(n["resolveComponent"])("report-template");return Object(n["openBlock"])(),Object(n["createBlock"])(i,{title:e.title,rows:e.rows,columns:e.columns},null,8,["title","rows","columns"])}var o=r("91e4"),T=r("44e3"),i=r("d6aa"),u=r("9ceb"),s=r("0011"),c=Object(n["defineComponent"])({mixins:[T["a"]],components:{ReportTemplate:i["a"]},data:()=>({title:"HIV Stock report",rows:[],stock:[],columns:[[u["a"].thTxt("Medication"),u["a"].thTxt("Earliest Expiry date"),u["a"].thTxt("Stock on hand(Tins)")]]}),async created(){this.report=new o["a"],await this.report.loadStock(),this.report.groupStock().forEach(e=>{this.rows.push([u["a"].td(e.drugName),u["a"].tdDate(e.expiryDate),u["a"].td(e.quantityIsTabs?Object(s["f"])(e.currentQuantity)+" (tabs)":Object(s["f"])(e.currentQuantity),{sortValue:parseInt(e.currentQuantity)})])})}}),l=r("6b0d"),_=r.n(l);const E=_()(c,[["render",a]]);t["default"]=E},d95e:function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return a})),function(e){e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(n||(n={}));const a=[n.TT_MULTI_SELECT_GRID,n.TT_AGE_INPUT,n.TT_BARCODE,n.TT_NOTE,n.TT_SELECT,n.TT_CARD_SELECTOR,n.TT_MULTIPLE_SELECT,n.TT_TEXT,n.TT_NUMBER,n.TT_MONTHLY_DAYS,n.TT_ART_REGIMEN_SELECTION,n.TT_NEXT_VISIT_INTERVAL_SELECTION,n.TT_TABLE_VIEWER,n.TT_DOSAGE_INPUT,n.TT_YES_NO,n.TT_MULTIPLE_YES_NO,n.TT_WEIGHT_CHART,n.TT_VITALS_ENTRY,n.TT_APPOINTMENTS_ENTRY,n.TT_COMPLAINTS_PICKER,n.TT_CLINIC_HOLIDAY_PICKER,n.TT_SUMMARY,n.TT_ART_STAGING_SUMMARY,n.TT_ADHERENCE_INPUT,n.TT_LAB_ORDERS,n.TT_PERSON_RESULT_VIEW,n.TT_PROGRAM_SELECTION,n.TT_DATE_PICKER,n.TT_RELATION_SELECTION,n.TT_FILING_NUMBER_VIEW,n.TT_PERSON_MATCH_VIEW,n.TT_FULL_DATE,n.TT_BATCH_ENTRY,n.TT_BATCH_VERIFICATION,n.TT_BATCH_MOVEMENT,n.TT_IP_ADDRESS,n.TT_TEXT_BANNER,n.TT_DISPENSATION_INPUT,n.TT_DATA_TABLE,n.TT_GROUP_SELECTOR,n.TT_ANC_PREGNANCY_INPUT_CONFIG,n.TT_ANC_PREGNANCY_DETAILS_INPUT,n.TT_ANC_LMP_DATE_INPUT,n.TT_DRUG_TRANSFER_IN,n.TT_GRID_SELECTOR,n.TT_ANC_DRUGSET_INPUT,n.TT_RADIOLOGY_PICKER,n.TT_PRESCRIPTION_INPUT,n.TT_INFINITE_SCROLL_MULTIPLE_SELECT,n.TT_DRUG_DISPENSER]},f159:function(e,t,r){var n={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262ed","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","chunk-10567f65","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","TouchFormElement16"],"./HisBatchMovement.vue":["5148","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","TouchFormElement18"],"./HisCardSelector.vue":["0734","chunk-10567f65","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","chunk-10567f65","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-10567f65","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","chunk-10567f65","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-10567f65","TouchFormElement38"],"./HisSelect.vue":["d11f","chunk-10567f65","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./MultiYesNoSelect.vue":["5fd1","chunk-10567f65","TouchFormElement46"],"./PersonMatchView.vue":["6591","TouchFormElement47"],"./PersonSearchView.vue":["28b2","TouchFormElement48"],"./ProgramSelection.vue":["e3b4","TouchFormElement49"],"./RelationsSelection.vue":["0e57","TouchFormElement50"],"./SelectMixin.vue":["82a9","chunk-10567f65","TouchFormElement51"],"./YesNoSelect.vue":["71f2","chunk-10567f65","TouchFormElement52"]};function a(e){if(!r.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],a=t[0];return Promise.all(t.slice(1).map(r.e)).then((function(){return r(a)}))}a.keys=function(){return Object.keys(n)},a.id="f159",e.exports=a}}]);
//# sourceMappingURL=chunk-67f6c7f7.06be2f1d.js.map