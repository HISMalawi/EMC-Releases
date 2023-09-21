(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-011d5b96"],{"357c":function(e,t,n){"use strict";n.r(t);var a=n("7a23");function o(e,t,n,o,r,i){const l=Object(a["resolveComponent"])("his-standard-form");return Object(a["openBlock"])(),Object(a["createBlock"])(l,{key:e.hisFormKey,activeField:e.fieldComponent,skipSummary:!0,fields:e.fields,onOnIndex:t[0]||(t[0]=t=>e.fieldComponent=""),onOnFinish:e.onFinish},null,8,["activeField","fields","onOnFinish"])}n("14d9");var r=n("d95e"),i=n("b5e4"),l=n("2706"),u=n("b446"),s=n("ad60"),c=n("74f4"),T=n("7920"),m=n("2ef0"),d=n("9283"),_=n("76df"),p=n("e86e"),E=n("8e8b"),h=Object(a["defineComponent"])({components:{HisStandardForm:T["a"]},data:()=>({hisFormKey:0,patient:{},patientProgram:{},fields:[],fieldComponent:"",activeField:"",activeProgram:{},programSelectionFieldContext:{}}),watch:{fieldComponent(e){e&&(this.activeField=e)},activeField(e){"program_selection"===e&&(this.hisFormKey+=1)},$route:{async handler({params:e}){e&&e.patient_id&&(this.patient=e.patient_id,this.patientProgram=new c["a"](this.patient),this.fields=[this.getProgramSelectionField(),this.getProgramEnrollmentField(),...this.getProgramOutcomeDateFields(),this.getProgramStateField(),this.getTransferOutFacilityFields(),...this.getTransferoutReasonFields(),...this.getStateOutcomeDateFields()])},deep:!0,immediate:!0}},methods:{async onFinish(e){switch(this.activeField){case"program_enrollment":await this.onEnrollProgram();break;case"program_state":await this.onProgramState(e);break}E["a"].invalidate("PATIENT_PROGRAM")},async patientPrograms(){const e=await this.patientProgram.getPrograms();return e.map(e=>({label:e.program.name,value:e.program.program_id,other:{...e,programStates:e.patient_states.map(e=>({name:e.name,startDate:d["b"].toStandardHisDisplayFormat(e.start_date),endDate:e.end_date?d["b"].toStandardHisDisplayFormat(e.end_date):"N/A",actions:this.getStateActions(e)}))}}))},async allPrograms(){const e=this.programSelectionFieldContext.listData,t=await s["a"].getAllPrograms();return t.map(t=>({label:t.name,value:t.program_id,disabled:Object(m["find"])(e,{value:t.program_id}),other:{...t}}))},async programWorkflows(){const e=await s["a"].getProgramWorkflows(this.patientProgram.getProgramId());if(!Object(m["isEmpty"])(e))return e[0].states.map(e=>({label:e.name,value:e.program_workflow_state_id,other:{...e}}))},getStateActions(e){const t=[{name:"Void",color:"danger",action:async(t,n)=>{await this.onVoidState(e.patient_state_id,t,n)}}];return"Patient transferred out"===e.name&&t.push({name:"Print",color:"primary",action:async()=>await this.patientProgram.printTransferout(e.start_date)}),t},onUpdateState(){if(-1===this.patientProgram.getProgramId())return Object(i["e"])("Please select a program");this.fieldComponent="program_state"},async onProgramState(e){try{await this.patientProgram.updateState(),this.fieldComponent="program_selection",e.transfer_out_state&&await this.patientProgram.transferOutEncounter(e.transfer_out_state.other,e.reason_for_transferrout.value),Object(i["d"])("State has been updated")}catch(t){Object(i["c"])(""+t)}},async onEnrollProgram(){const e=this.patientProgram.getProgramId();if(-1===e)return Object(i["e"])("Please select a program");try{this.activeProgram=await this.patientProgram.enrollProgram(),this.fieldComponent="program_state",Object(i["d"])("Patient has been enrolled!")}catch(t){this.activeProgram={},Object(i["c"])(""+t)}},async onVoidState(e,t,n){await Object(_["a"])(async a=>{try{this.patientProgram.setStateId(e),await this.patientProgram.voidState(a),this.patientProgram.setStateId(-1),t.other.programStates.splice(n,1),Object(i["d"])("State has been voided")}catch(o){Object(i["c"])(""+o)}})},async onVoidProgram(){const e=this.patientProgram.getPatientProgramId();if(-1===e)return Object(i["e"])("Please select a program");await Object(_["a"])(async e=>{try{await this.patientProgram.voidProgram(e);const t=this.programSelectionFieldContext,n=Object(m["findIndex"])(t.listData,{value:this.patientProgram.getProgramId()});t.listData.splice(n,1),t.activeProgram={},this.patientProgram.setPatientProgramId(-1),this.patientProgram.setProgramId(-1),Object(i["d"])("Program removed")}catch(t){console.error(t),Object(i["c"])(""+t)}})},getStateOutcomeDateFields(){return Object(u["b"])({id:"state_outcome_date",helpText:"State",condition:e=>e.program_state,required:!0,minDate:()=>this.patientProgram.getProgramDate(),maxDate:()=>s["a"].getSessionDate(),estimation:{allowUnknown:!0,estimationFieldType:u["a"].MONTH_ESTIMATE_FIELD},computeValue:e=>this.patientProgram.setStateDate(e)},this.patientProgram.getProgramDate()||s["a"].getSessionDate())},getTransferOutFacilityFields(){return{id:"transfer_out_state",helpText:"Please Select facility name",type:r["b"].TT_SELECT,validation:e=>l["a"].required(e),condition:e=>"Patient transferred out"===e.program_state.label,options:(e,t="")=>Object(p["b"])(t),config:{showKeyboard:!0,isFilterDataViaApi:!0}}},getTransferoutReasonFields(){return[{id:"transferout_reasons",proxyID:"reason_for_transferrout",helpText:"Reason for Transferring out",type:r["b"].TT_SELECT,validation:e=>l["a"].required(e),condition:e=>"Patient transferred out"===e.program_state.label,options:()=>{const e=e=>({label:e,value:e});return[e("Workplace transfer/lost job-related reasons"),e("Relocation to another place/home village"),e("Transport due to long distance"),e("School"),e("Business"),e("Marriage"),e("Unknown"),e("Clinic not helping"),e("Other")]}},{id:"transferout_other",proxyID:"reason_for_transferrout",helpText:"Other Reason for Transferring out",type:r["b"].TT_TEXT,condition:e=>"Other"===e.transferout_reasons.value,validation:e=>l["a"].required(e)}]},getProgramStateField(){return{id:"program_state",helpText:"State",type:r["b"].TT_SELECT,validation:e=>l["a"].required(e),options:()=>this.programWorkflows(),condition:()=>"program_state"===this.activeField,unload:e=>this.patientProgram.setStateId(e.value)}},getProgramEnrollmentField(){return{id:"program_enrollment",helpText:"Please select a programme",type:r["b"].TT_SELECT,condition:()=>"program_enrollment"===this.activeField,unload:e=>this.patientProgram.setProgramId(e.value),options:()=>this.allPrograms(),validation:e=>l["a"].required(e),config:{showKeyboard:!0}}},getProgramOutcomeDateFields(){return Object(u["b"])({id:"program_outcome_date",helpText:"Outcome",required:!0,minDate:()=>d["b"].estimateDateFromAge(100),maxDate:()=>s["a"].getSessionDate(),condition:()=>"program_enrollment"===this.activeField,estimation:{allowUnknown:!0,estimationFieldType:u["a"].MONTH_ESTIMATE_FIELD},computeValue:e=>this.patientProgram.setProgramDate(e)},s["a"].getSessionDate())},getProgramSelectionField(){const e=e=>!Object(m["isEmpty"])(e.program_selection);return{id:"program_selection",helpText:"Programs",type:r["b"].TT_PROGRAM_SELECTION,onload:e=>{this.activeField="program_selection",this.programSelectionFieldContext=e},onValue:e=>(e&&(this.activeProgram=e.other,this.patientProgram.setProgramId(e.value),this.patientProgram.setPatientProgramId(e.other.patient_program_id),this.patientProgram.setProgramDate(d["b"].toStandardHisFormat(e.other.date_enrolled))),!0),validation:e=>l["a"].required(e),options:()=>this.patientPrograms(),config:{onVoidState:this.onVoidState,hiddenFooterBtns:["Back","Next","Clear"],footerBtns:[{name:"Void Program",slot:"end",color:"danger",state:{visible:{default:(t,n)=>e(n),onValue:(t,n)=>e(n)}},onClick:async()=>{await this.onVoidProgram()}},{name:"Update state",slot:"end",state:{visible:{default:(t,n)=>e(n),onValue:(t,n)=>e(n)}},onClick:async()=>{await this.onUpdateState()}},{name:"Enroll",color:"success",slot:"end",onClick:()=>{this.fieldComponent="program_enrollment"}}]}}}}}),f=n("6b0d"),g=n.n(f);const I=g()(h,[["render",o]]);t["default"]=I},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"k",(function(){return o})),n.d(t,"f",(function(){return r})),n.d(t,"n",(function(){return i})),n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return u})),n.d(t,"m",(function(){return s})),n.d(t,"j",(function(){return c})),n.d(t,"h",(function(){return T})),n.d(t,"a",(function(){return m})),n.d(t,"l",(function(){return d})),n.d(t,"c",(function(){return _})),n.d(t,"i",(function(){return p})),n.d(t,"g",(function(){return E}));const a=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],l=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],u=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],c=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],T=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],m=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],d=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],_=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],E=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"g",(function(){return i})),n.d(t,"f",(function(){return l})),n.d(t,"e",(function(){return u})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return c})),n.d(t,"h",(function(){return m})),n.d(t,"a",(function(){return d}));var a=n("3800");const o=[a["m"],[["","Delete"]]],r=[a["j"],[["Delete"]]],i=[a["j"],[["Delete","Unknown"]]],l=[a["j"],[["N/A"],["Delete","Unknown"]]],u=[a["j"],[["Delete"]]],s=[a["j"],[["Unknown","Delete"],["Qwerty","A-Z"]]],c=[a["h"],[["Unknown"]]],T=[a["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],m=[a["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],d=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:o},{btn:"A-Z",keyboard:T},{btn:"Qwerty",keyboard:m}]},"76df":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n("7f35");async function o(e,t="action-sheet-modal"){const n=await Object(a["c"])("Are you sure you want to void record?","Please specify reason for voiding this record",["Mistake/ Wrong Entry","Duplicate","System Error"],[{name:"Cancel",slot:"start"},{name:"Void",color:"danger",slot:"end",role:"action"}],"",t);n.selection&&"Void"===n.action&&await e(n.selection)}},7920:function(e,t,n){"use strict";var a=n("7a23");function o(e,t,n,o,r,i){return Object(a["openBlock"])(),Object(a["createBlock"])(Object(a["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var r=n("9441"),i=Object(a["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:r["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),l=n("6b0d"),u=n.n(l);const s=u()(i,[["render",o]]);t["a"]=s},b446:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return v}));n("14d9"),n("13d5");var a,o=n("d95e"),r=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],i=n("9283"),l=n("2706"),u=n("3800"),s=n("6be2"),c=n("5a0c"),T=n.n(c),m=n("1c74");function d(e,t,n=!0){const a=[];return n&&a.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:o["b"].TT_TEXT,config:{customKeyboard:[u["j"],[a,["DELETE"]]]}}}function _(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:o["b"].TT_SELECT,options:()=>r}}function p(e,t){return{id:e,helpText:t+" Day",type:o["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function E(e,t){return{id:e,helpText:t+" Estimated period",type:o["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function h(e,t){return{id:e,helpText:t+" Age Estimate",type:o["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:s["e"]}}}function f(e){return parseInt(e)<10?"0"+e:e}async function g(e,t,n){if(t.defaultValue){const a=await t.defaultValue(e);if(a){const[e,t,o]=a.split("-");switch(n){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(o)||""}}}return""}function I(e){return i["b"].toStandardHisDisplayFormat(e)}function S(e,t,n,a){if(t.minDate){const o=t.minDate(n,a);if(new Date(e)<new Date(o))return[`${I(e)} is less than minimum date of ${I(o)}`]}if(t.maxDate){const o=t.maxDate(n,a);if(o&&new Date(e)>new Date(o))return[`${I(e)} is greater than max date of  ${I(o)}`]}}function v(e,t=""){let n="",o="",u="",s="",c=!1;const v="year_"+e.id,P="month_"+e.id,b="day_"+e.id,y="age_estimate_"+e.id,D="duration_estimate_"+e.id,N=d(v,e.helpText,e.estimation.allowUnknown),F=_(P,e.helpText),A=p(b,e.helpText),O=h(y,e.helpText),C=E(D,e.helpText),R="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,H=t=>!(t[v]&&t[v].value&&["Unknown"].includes(t[v].value))&&(!e.condition||e.condition(t)),w=(e,t)=>{const n=[{type:"year",value:o,default:"YYYY"},{type:"month",value:u,default:"MM"},{type:"day",value:s,default:"DD"}];return n.reduce((n,a)=>{const o=[null,void 0,"Unknown",""];return t===a.type?o.includes(e)?n.push(a.default):n.push(e):o.includes(a.value)?n.push(a.default):n.push(a.value),n},[]).join("-")};"function"===typeof e.init&&(N.init=e.init),N.updateHelpTextOnValue=e=>`${N.helpText} (${w(null===e||void 0===e?void 0:e.label,"year")})`,N.proxyID=e.id,N.unload=e=>o=e.value.toString(),N.config={...N.config,...e.config},N.defaultValue=t=>g(t,e,"Year"),N.condition=t=>!e.condition||e.condition(t),N.validation=(t,n,a)=>{if(e.required&&l["a"].required(t))return["Year cannot be empty"];const o=t?t.value:"";if(!e.estimation.allowUnknown&&o.toString().match(/unknown/i))return["Value unknown is not permitted"];if(o&&!["Unknown"].includes(o)&&isNaN(o)||o<1900)return["Invalid Year"];if(o&&"function"===typeof e.minDate){const t=i["b"].getYear(e.minDate(n,a));if(parseInt(o)<t)return[`Year of ${o} is less than Minimum year of ${t}`]}if(o&&"function"===typeof e.maxDate){const t=e.maxDate(n,a);if(t&&o>i["b"].getYear(t))return[`Year of ${o} exceeds Maximum year of ${i["b"].getYear(t)}`]}return null},N.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:n?I(n):"Unknown"}),N.appearInSummary=(t,n)=>n===e.id,N.computedValue=t=>{if(n){const[a,o,r]=n.split("-");return n=`${t.value}-${o}-${r}`,e.computeValue(n,!1)}if(t&&"Unknown"===t.value)return n="",e.computeValue("Unknown",!1)},F.updateHelpTextOnValue=e=>`${F.helpText} (${w(null===e||void 0===e?void 0:e.label,"month")})`,F.proxyID=e.id,F.unload=e=>u=f(e.value.toString()),F.condition=e=>H(e),F.validation=e=>l["a"].required(e),F.defaultValue=t=>g(t,e,"Month"),R&&(F.options=()=>[...r,{label:"Unknown",value:"Unknown"}]),F.computedValue=(t,a)=>{if((""+t.value).match(/unknown/i))return n=a[v].value+"-07-15",e.computeValue(n,!0);if(n){const[a,o,r]=n.split("-"),i=f(""+t.value);return n=`${a}-${i}-${r}`,e.computeValue(n,!1)}},A.proxyID=e.id,A.updateHelpTextOnValue=e=>`${A.helpText} (${w(null===e||void 0===e?void 0:e.label,"day")})`,A.condition=e=>!(""+e[P].value).match(/unknown/i)&&H(e),A.validation=(t,a,r)=>l["a"].required(t)?["Day is required for date"]:(c=!!(""+t.value).match(/unknown/i),s=c?"15":f(""+t.value),n=`${o}-${u}-${s}`,S(n,e,a,r)),A.defaultValue=t=>g(t,e,"Day"),A.computedValue=()=>e.computeValue(n,c),A.unload=(t,n,a,o)=>{e.unload&&e.unload(t,n,a,o)},A.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),A.config={year:e=>e[v].value,month:e=>e[P].value},R||(A.config.keyboardActions=[]);const L=(t,n)=>{const a=["Unknown"===t[v].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===n];return a.every(Boolean)};return O.proxyID=e.id,O.validation=(t,a,o)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const r=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(r))return["Not a valid age estimate"];const i=T()(m["e"].getSessionDate()).subtract(t.value,"years").year();return n=i+"-07-15",S(n,e,a,o)},O.condition=e=>L(e,a.AGE_ESTIMATE_FIELD),O.computedValue=()=>e.computeValue(n,!0),O.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),C.proxyID=e.id,C.validation=(t,a,o)=>l["a"].required(t)?["Please select an estimate"]:(n=T()(m["e"].getSessionDate()).subtract(t.value,"day").format(i["a"]),S(n,e,a,o)),C.condition=e=>L(e,a.MONTH_ESTIMATE_FIELD),C.computedValue=()=>e.computeValue(n,!0),C.beforeNext=(t,a)=>!e.beforeNext||e.beforeNext(n,a),[N,F,A,O,C]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(a||(a={}))},d95e:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return o})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(a||(a={}));const o=[a.TT_LINKAGE_CODE,a.TT_MULTI_SELECT_GRID,a.TT_AGE_INPUT,a.TT_BARCODE,a.TT_NOTE,a.TT_SELECT,a.TT_CARD_SELECTOR,a.TT_MULTIPLE_SELECT,a.TT_TEXT,a.TT_NUMBER,a.TT_MONTHLY_DAYS,a.TT_ART_REGIMEN_SELECTION,a.TT_NEXT_VISIT_INTERVAL_SELECTION,a.TT_TABLE_VIEWER,a.TT_DOSAGE_INPUT,a.TT_YES_NO,a.TT_MULTIPLE_YES_NO,a.TT_WEIGHT_CHART,a.TT_VITALS_ENTRY,a.TT_APPOINTMENTS_ENTRY,a.TT_COMPLAINTS_PICKER,a.TT_CLINIC_HOLIDAY_PICKER,a.TT_SUMMARY,a.TT_ART_STAGING_SUMMARY,a.TT_ADHERENCE_INPUT,a.TT_LAB_ORDERS,a.TT_PERSON_RESULT_VIEW,a.TT_PROGRAM_SELECTION,a.TT_DATE_PICKER,a.TT_RELATION_SELECTION,a.TT_FILING_NUMBER_VIEW,a.TT_PERSON_MATCH_VIEW,a.TT_FULL_DATE,a.TT_BATCH_ENTRY,a.TT_BATCH_VERIFICATION,a.TT_BATCH_MOVEMENT,a.TT_IP_ADDRESS,a.TT_TEXT_BANNER,a.TT_DISPENSATION_INPUT,a.TT_DATA_TABLE,a.TT_GROUP_SELECTOR,a.TT_ANC_PREGNANCY_INPUT_CONFIG,a.TT_ANC_PREGNANCY_DETAILS_INPUT,a.TT_ANC_LMP_DATE_INPUT,a.TT_DRUG_TRANSFER_IN,a.TT_GRID_SELECTOR,a.TT_ANC_DRUGSET_INPUT,a.TT_RADIOLOGY_PICKER,a.TT_PRESCRIPTION_INPUT,a.TT_INFINITE_SCROLL_MULTIPLE_SELECT,a.TT_DRUG_DISPENSER]},e86e:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return l})),n.d(t,"f",(function(){return u})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return c})),n.d(t,"g",(function(){return T})),n.d(t,"h",(function(){return m}));var a=n("5713"),o=n("2ef0");async function r(e=""){const t=await a["a"].getFacilities({name:e});return t.filter(e=>!Object(o["isEmpty"])(e)&&""!=e.name.trim()).map(e=>({label:e.name,value:e.location_id,other:e}))}async function i(e=""){const t=await a["a"].getLabs({search_name:e});return t.map(e=>({label:e,value:e}))}async function l(e=""){const t=await a["a"].getFacilities({name:e,tag:"Facility adult sections"});return t.map(e=>({label:e.name,value:e.name,other:e}))}async function u(){const e=await a["a"].getSpecialistClinics();return e.map(e=>({label:e.name,value:e.name,other:e}))}async function s(){const e=await a["a"].getRegions();return e.map(e=>({label:e.name,value:e.region_id,other:e}))}async function c(e){const t=await a["a"].getDistricts(e);return t.map(e=>({label:e.name,value:e.district_id,other:e}))}async function T(e,t=""){const n=await a["a"].getTraditionalAuthorities(e,t);return n.map(e=>({label:e.name,value:e.traditional_authority_id,other:e}))}async function m(e,t=""){const n=await a["a"].getVillages(e,t);return n.map(e=>({label:e.name,value:e.village_id,other:e}))}},f159:function(e,t,n){var a={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-182277b5","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-182277b5","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-182277b5","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-f0823c9c","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function o(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],o=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(o)}))}o.keys=function(){return Object.keys(a)},o.id="f159",e.exports=o}}]);
//# sourceMappingURL=chunk-011d5b96.55164e45.js.map