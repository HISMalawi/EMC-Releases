(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b484590"],{"188c":function(e,t,n){"use strict";n.r(t);var i=n("7a23");function a(e,t,n,a,o,r){const u=Object(i["resolveComponent"])("his-standard-form");return Object(i["openBlock"])(),Object(i["createBlock"])(u,{key:e.hisFormKey,fields:e.fields,activeField:e.fieldComponent,skipSummary:!0,onOnIndex:t[0]||(t[0]=t=>e.fieldComponent=""),onOnFinish:e.onFinish},null,8,["fields","activeField","onOnFinish"])}n("13d5"),n("14d9");var o=n("7920"),r=n("d95e"),u=n("b446"),l=n("ade3"),s=n("9b7c"),T=n("cc6f");class c extends T["a"]{constructor(e){super(e,57),Object(l["a"])(this,"patientID",void 0),Object(l["a"])(this,"testTypeID",void 0),Object(l["a"])(this,"resultDate",void 0),Object(l["a"])(this,"testID",void 0),this.patientID=e,this.testTypeID=-1,this.resultDate="",this.testID=-1}createLabResult(e){return T["a"].postJson(`lab/tests/${this.testID}/results`,{encounter_id:this.encounterID,date:this.resultDate,measures:e})}getTestID(){return this.testID}getTestTypeID(){return this.testTypeID}setTestTypeID(e){this.testTypeID=e}setResultDate(e){this.resultDate=e}setTestID(e){this.testID=e}getTestsWithoutResults(){return s["a"].getOrders(this.patientID,{status:"drawn"})}getTestIndicators(){return s["a"].getJson("lab/test_result_indicators",{test_type_id:this.testTypeID})}}var d=n("2706"),m=n("b5e4"),_=n("2ef0"),p=n("9283"),h=n("1c74"),E=n("8e8b"),I=Object(i["defineComponent"])({components:{HisStandardForm:o["a"]},data:()=>({fieldComponent:"",labResult:{},hisFormKey:0,patient:{},fields:[],selectedTest:{},testOptions:[],testIndicators:[]}),watch:{$route:{async handler({params:e}){e&&e.patient_id&&(this.patient=e.patient_id,this.labResult=new c(this.patient),await this.initData(),this.fields=this.getFields())},deep:!0,immediate:!0}},methods:{async onFinish(e,t){try{const e=Object.values(t).filter(e=>"result_indicator"===e.tag&&e.measures).map(e=>e.measures);this.labResult.setTestID(this.selectedTest.value),this.labResult.setResultDate(t.result_date),await this.labResult.createEncounter(),await this.labResult.createLabResult(e),E["a"].invalidate("PATIENT_LAB_ORDERS"),this.testOptions=[],this.selectedTest={},this.testIndicators=[],await this.initData(),this.hisFormKey=Math.floor(5e3*Math.random()),Object(m["d"])("Lab result saved!")}catch(n){Object(m["c"])(""+n),console.error(n)}},generateTestIndicatorsFields(){return this.testIndicators.reduce((e,t)=>e.concat(this.buildTestIndicatorFields(t.indicatorId,t.indicatorName,t.specimen,t.testId)),[])},async validateVLresults(e,t,n){if("HIV viral load"!==e)return!0;const i=n.substring(0,1),a=n.substring(1,n.length);if(s["a"].isValidVLResult(t,i,a))return!0;const o=await Object(m["a"])(`Invalid results for ${t} HIV viral load`,{cancelBtnLabel:"Process result",confirmBtnLabel:"Re-enter result"});return!o},alphaValueIsValid(e){try{return!!e.match(/^(>|<|=)(.*)/)}catch(t){return!1}},numericValueIsValid(e){try{return!!e.match(/^(=|<|>)([0-9]*)$/m)}catch(t){return!1}},isMalariaResult(e){return!!e.match(/mrdt|malaria/i)},isUrineLamResult(e){return!!e.match(/Lam/i)},buildTestIndicatorFields(e,t,n,i){const a=e*i,o=e=>[this.selectedTest.value===i,!!Object(_["find"])(e.result_indicators,{label:t})].every(Boolean),u=e=>this.validateVLresults(t,n,e.value.toString()),l=(n,i)=>{if("Other"===n.value&&t.match(/HIV viral load/i))return{};const o=this.isMalariaResult(t)||this.isUrineLamResult(t)?"text":i["type_"+a].value,r=this.isMalariaResult(t)||this.isUrineLamResult(t)?"="+n.value:n.value.toString(),u=r.charAt(0),l="numeric"===o?parseInt(r.substring(1)):r.substring(1),s=i["result_indicators"].filter(t=>t.value===e)[0];return{tag:"result_indicator",measures:{indicator:{concept_id:s.value},value:l,value_modifier:u,value_type:o},result:l,modifier:u,test:s.label}};return[{id:"type_"+a,helpText:`Result type (${t})`,type:r["b"].TT_SELECT,group:"test_indicator",condition:e=>o(e)&&!this.isMalariaResult(t)&&!this.isUrineLamResult(t),appearInSummary:()=>!1,validation:e=>d["a"].required(e),options:()=>[{label:"Numeric (numbers only)",value:"numeric"},{label:"Alphanumeric(text and numbers)",value:"text"}]},{id:"urine_result_"+a,helpText:`Select Test Result (${t})`,type:r["b"].TT_SELECT,group:"test_indicator",computedValue:l,validation:e=>d["a"].required(e),condition:e=>o(e)&&this.isUrineLamResult(t),options:()=>[{label:"Positive",value:"positive"},{label:"Negative",value:"negative"}]},{id:"num_"+a,helpText:`Test Result (${t})`,type:r["b"].TT_TEXT,group:"test_indicator",computedValue:l,beforeNext:u,onValue:e=>!(e&&e.value&&!this.numericValueIsValid(e.value.toString()))||(Object(m["e"])("You must enter a modifer and numbers only. i.e =90 / >19 / < 750"),!1),validation:e=>d["a"].required(e),condition:e=>o(e)&&"numeric"===e["type_"+a].value,config:{customKeyboard:[[["1","2","3"],["4","5","6","=","<",">"],["7","8","9","."],["","0",""]],[["Delete"]]]}},{id:"alpha_"+a,helpText:`Test Result (${t})`,type:r["b"].TT_TEXT,group:"test_indicator",onValue:e=>!(e&&e.value&&!this.alphaValueIsValid(e.value.toString()))||(Object(m["e"])("You must enter a modifier plus result (for example =LDL)"),!1),computedValue:l,validation:e=>d["a"].required(e),condition:e=>o(e)&&"text"===e["type_"+a].value&&!t.match(/HIV viral load/i)},{id:"VL_alpha_"+a,helpText:`Select Test Result (${t})`,type:r["b"].TT_SELECT,group:"test_indicator",computedValue:l,validation:e=>d["a"].required(e),condition:e=>o(e)&&"text"===e["type_"+a].value&&t.match(/HIV viral load/i),options:()=>[{label:"Collect Another Sample",value:"=Collect Another Sample"},{label:"<LDL",value:"<LDL"},{label:"=LDL",value:"=LDL"},{value:"Other",label:"Other"}]},{id:"other_VL_alpha_"+a,helpText:`Test Result (${t})`,type:r["b"].TT_TEXT,group:"test_indicator",onValue:e=>!(e&&e.value&&!this.alphaValueIsValid(e.value.toString()))||(Object(m["e"])("You must enter a modifier plus result (for example =LDL)"),!1),computedValue:l,validation:e=>d["a"].required(e),condition:e=>o(e)&&"text"===e["type_"+a].value&&t.match(/HIV viral load/i)&&"Other"===e["VL_alpha_"+a].value},{id:"malaria_result_"+a,helpText:`Select Test Result (${t})`,type:r["b"].TT_SELECT,group:"test_indicator",computedValue:l,validation:e=>d["a"].required(e),condition:e=>o(e)&&this.isMalariaResult(t),options:()=>t.match(/mrdt/i)?[{label:"Positive",value:"positive"},{label:"Negative",value:"negative"}]:[{label:"Parasites seen",value:"parasites seen"},{label:"No parasites seen",value:"no parasites seen"}]}]},async initData(){const e=await this.labResult.getTestsWithoutResults();for(const t in e){const n=e[t];for(const e in n.tests){const t=n.tests[e];if(!Object(_["isEmpty"])(t.result))continue;this.labResult.setTestTypeID(t.concept_id);const i=await this.labResult.getTestIndicators(),a=i.map(e=>({testId:t.id,indicatorName:e.name,indicatorId:e.concept_id,specimen:n.specimen.name}));this.testIndicators=[...this.testIndicators,...a],this.testOptions.push({label:t.name,value:t.id,other:{accession:n.accession_number,specimen:n.specimen.name,test:t.name,orderDate:n.order_date,testIndicators:a}})}}},getFields(){return[{id:"test_type",helpText:"Tests without results",type:r["b"].TT_TABLE_VIEWER,options:()=>{const e=this.testOptions.map(e=>[e.other.accession,e.other.specimen,e.other.test,p["b"].toStandardHisDisplayFormat(e.other.orderDate),{type:"button",name:"Select",action:()=>{this.selectedTest=e,this.$nextTick(()=>this.fieldComponent="year_result_date")}}]);return[{label:"",value:"",other:{rows:e,columns:["Acession#","Specimen","Test","Order date"]}}]},validation:e=>d["a"].required(e),config:{overrideDefaultFooterBtns:{nextBtn:{name:"Finish",onClick:()=>this.$router.back()}},hiddenFooterBtns:["Clear","Cancel"]}},...Object(u["b"])({id:"result_date",helpText:"Result",required:!0,estimation:{allowUnknown:!1},minDate:()=>p["b"].toStandardHisFormat(this.selectedTest.other.orderDate),maxDate:()=>h["e"].getSessionDate(),computeValue:e=>e}),{id:"result_indicators",helpText:"Select test result indicators",type:r["b"].TT_MULTIPLE_SELECT,validation:e=>d["a"].required(e),options:()=>this.selectedTest.other.testIndicators.map(e=>({label:e.indicatorName,value:e.indicatorId}))},...this.generateTestIndicatorsFields(),{id:"entry_confirmation",helpText:"Confirm entry",type:r["b"].TT_TABLE_VIEWER,options:(e,t)=>{const n=Object.values(t).filter(e=>"object"===typeof e&&null!=e&&"result_indicator"===e.tag).map(e=>[e.test,e.modifier,e.result]);return[{label:"",value:"",other:{rows:n,columns:["Test","Modifier","Result"]}}]}}]}}}),v=n("d959"),f=n.n(v);const b=f()(I,[["render",a]]);t["default"]=b},3800:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"k",(function(){return a})),n.d(t,"f",(function(){return o})),n.d(t,"n",(function(){return r})),n.d(t,"e",(function(){return u})),n.d(t,"b",(function(){return l})),n.d(t,"m",(function(){return s})),n.d(t,"j",(function(){return T})),n.d(t,"h",(function(){return c})),n.d(t,"a",(function(){return d})),n.d(t,"l",(function(){return m})),n.d(t,"c",(function(){return _})),n.d(t,"i",(function(){return p})),n.d(t,"g",(function(){return h}));const i=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["","Done",""]],a=[["1","2","3"],["4","5","6"],["7","8","9"],["Del","0","."],["Unknown","",""]],o=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0",""]],r=[["1","2","3"],["4","5","6"],["7","8","9"],[".","0","Del"],["Clear","%","/"]],u=[["1","2","3"],["4","5","6"],["7","8","9"],["Del.","0","Clear"]],l=[["1","2","3","<"],["4","5","6",">"],["7","8","9","="],["","0",""]],s=[["1","2","3","+","-","/","*"],["4","5","6","%","=","<",">","Qwerty"],["7","8","9",".",","],["","0",""]],T=[["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]],c=[["1","2","3","4","5","6","7"],["8","9","10","11","12","13","14"],["15","16","17","18","19","20","21"],["22","23","24","25","26","27","28"],["29","30","31"]],d=[["a","b","c","d","e","f","g","h","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],m=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","'"],["z","x","c","v","b","n","m",",",".","A-Z"]],_=[["1","2","3","4","5","6","7","8","9","0"],["a","b","c","d","e","f","g","h","-","."],["i","j","k","l","m","n","o","p","q"],["r","s","t","u","v","w","x","y","z"]],p=[["1","2","3","4","5","6","7","8","9","0","Del"],["q","w","e","r","t","y","u","i","o","p","Clear"],["a","s","d","f","g","h","j","k","l",".","Caps"],["z","x","c","v","b","n","m","<",">","/","Enter"]],h=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l","Del."],["z","x","c","v","b","n","m","Caps","Login"]]},"6be2":function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"g",(function(){return r})),n.d(t,"f",(function(){return u})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return s})),n.d(t,"b",(function(){return T})),n.d(t,"h",(function(){return d})),n.d(t,"a",(function(){return m}));var i=n("3800");const a=[i["m"],[["","Delete"]]],o=[i["j"],[["Delete"]]],r=[i["j"],[["Delete","Unknown"]]],u=[i["j"],[["N/A"],["Delete","Unknown"]]],l=[i["j"],[["Delete"]]],s=[i["j"],[["Unknown","Delete"],["Qwerty","A-Z"]]],T=[i["h"],[["Unknown"]]],c=[i["a"],[["0-9","Delete"],["Qwerty","Unknown"],["","Space"]]],d=[i["l"],[["","Delete"],["?123","0-9"],["Space","Unknown"]]],m=[{btn:"0-9",keyboard:s},{btn:"?123",keyboard:a},{btn:"A-Z",keyboard:c},{btn:"Qwerty",keyboard:d}]},7920:function(e,t,n){"use strict";var i=n("7a23");function a(e,t,n,a,o,r){return Object(i["openBlock"])(),Object(i["createBlock"])(Object(i["resolveDynamicComponent"])(e.formType),{fields:e.fields,skipSummary:e.skipSummary,activeField:e.activeField,cancelDestinationPath:e.cancelDestinationPath,onOnFinish:e.onFinish,onFinish:e.onFinishAction,onOnIndex:e.onIndex},null,40,["fields","skipSummary","activeField","cancelDestinationPath","onOnFinish","onFinish","onOnIndex"])}var o=n("9441"),r=Object(i["defineComponent"])({name:"HisStandardForm",components:{TouchScreenForm:o["a"]},emits:["onFinish","onIndex"],data:()=>({formType:"touch-screen-form"}),props:{onFinishAction:{type:Function},skipSummary:{type:Boolean,default:!1},activeField:{type:String},fields:{type:Object,required:!0},cancelDestinationPath:{type:String,required:!1}},methods:{onFinish(e,t){this.$emit("onFinish",e,t)},onIndex(e){this.$emit("onIndex",e)}}}),u=n("d959"),l=n.n(u);const s=l()(r,[["render",a]]);t["a"]=s},b446:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return D}));n("14d9"),n("13d5");var i,a=n("d95e"),o=[{label:"Jan",value:1},{label:"Feb",value:2},{label:"Mar",value:3},{label:"Apr",value:4},{label:"May",value:5},{label:"Jun",value:6},{label:"Jul",value:7},{label:"Aug",value:8},{label:"Sep",value:9},{label:"Oct",value:10},{label:"Nov",value:11},{label:"Dec",value:12}],r=n("9283"),u=n("2706"),l=n("3800"),s=n("6be2"),T=n("5a0c"),c=n.n(T),d=n("1c74");function m(e,t,n=!0){const i=[];return n&&i.push("UNKNOWN"),{id:e,helpText:t+" Year",appearInSummary:()=>!1,type:a["b"].TT_TEXT,config:{customKeyboard:[l["j"],[i,["DELETE"]]]}}}function _(e,t){return{id:e,helpText:t+" Month",appearInSummary:()=>!1,type:a["b"].TT_SELECT,options:()=>o}}function p(e,t){return{id:e,helpText:t+" Day",type:a["b"].TT_MONTHLY_DAYS,appearInSummary:()=>!1}}function h(e,t){return{id:e,helpText:t+" Estimated period",type:a["b"].TT_SELECT,appearInSummary:()=>!1,options:()=>[{label:"6 months ago",value:180},{label:"12 months ago",value:365},{label:"18 months ago",value:540},{label:"24 months ago",value:730},{label:"Over 2 years ago",value:730}]}}function E(e,t){return{id:e,helpText:t+" Age Estimate",type:a["b"].TT_NUMBER,appearInSummary:()=>!1,config:{keypad:s["e"]}}}function I(e){return parseInt(e)<10?"0"+e:e}async function v(e,t,n){if(t.defaultValue){const i=await t.defaultValue(e);if(i){const[e,t,a]=i.split("-");switch(n){case"Year":return e||"";case"Month":return parseInt(t)||"";case"Day":return parseInt(a)||""}}}return""}function f(e){return r["b"].toStandardHisDisplayFormat(e)}function b(e,t,n,i){if(t.minDate){const a=t.minDate(n,i);if(new Date(e)<new Date(a))return[`${f(e)} is less than minimum date of ${f(a)}`]}if(t.maxDate){const a=t.maxDate(n,i);if(a&&new Date(e)>new Date(a))return[`${f(e)} is greater than max date of  ${f(a)}`]}}function D(e,t=""){let n="",a="",l="",s="",T=!1;const D="year_"+e.id,S="month_"+e.id,N="day_"+e.id,y="age_estimate_"+e.id,R="duration_estimate_"+e.id,A=m(D,e.helpText,e.estimation.allowUnknown),L=_(S,e.helpText),F=p(N,e.helpText),O=E(y,e.helpText),g=h(R,e.helpText),C="boolean"===typeof e.estimation.allowUnknownMonthDay&&e.estimation.allowUnknownMonthDay,H=t=>!(t[D]&&t[D].value&&["Unknown"].includes(t[D].value))&&(!e.condition||e.condition(t)),P=(e,t)=>{const n=[{type:"year",value:a,default:"YYYY"},{type:"month",value:l,default:"MM"},{type:"day",value:s,default:"DD"}];return n.reduce((n,i)=>{const a=[null,void 0,"Unknown",""];return t===i.type?a.includes(e)?n.push(i.default):n.push(e):a.includes(i.value)?n.push(i.default):n.push(i.value),n},[]).join("-")};"function"===typeof e.init&&(A.init=e.init),A.updateHelpTextOnValue=e=>`${A.helpText} (${P(null===e||void 0===e?void 0:e.label,"year")})`,A.proxyID=e.id,A.unload=e=>a=e.value.toString(),A.config={...A.config,...e.config},A.defaultValue=t=>v(t,e,"Year"),A.condition=t=>!e.condition||e.condition(t),A.validation=(t,n,i)=>{if(e.required&&u["a"].required(t))return["Year cannot be empty"];const a=t?t.value:"";if(!e.estimation.allowUnknown&&a.toString().match(/unknown/i))return["Value unknown is not permitted"];if(a&&!["Unknown"].includes(a)&&isNaN(a)||a<1900)return["Invalid Year"];if(a&&"function"===typeof e.minDate){const t=r["b"].getYear(e.minDate(n,i));if(parseInt(a)<t)return[`Year of ${a} is less than Minimum year of ${t}`]}if(a&&"function"===typeof e.maxDate){const t=e.maxDate(n,i);if(t&&a>r["b"].getYear(t))return[`Year of ${a} exceeds Maximum year of ${r["b"].getYear(t)}`]}return null},A.summaryMapValue=()=>({label:e.summaryLabel||e.helpText,value:n?f(n):"Unknown"}),A.appearInSummary=(t,n)=>n===e.id,A.computedValue=t=>{if(n){const[i,a,o]=n.split("-");return n=`${t.value}-${a}-${o}`,e.computeValue(n,!1)}if(t&&"Unknown"===t.value)return n="",e.computeValue("Unknown",!1)},L.updateHelpTextOnValue=e=>`${L.helpText} (${P(null===e||void 0===e?void 0:e.label,"month")})`,L.proxyID=e.id,L.unload=e=>l=I(e.value.toString()),L.condition=e=>H(e),L.validation=e=>u["a"].required(e),L.defaultValue=t=>v(t,e,"Month"),C&&(L.options=()=>[...o,{label:"Unknown",value:"Unknown"}]),L.computedValue=(t,i)=>{if((""+t.value).match(/unknown/i))return n=i[D].value+"-07-15",e.computeValue(n,!0);if(n){const[i,a,o]=n.split("-"),r=I(""+t.value);return n=`${i}-${r}-${o}`,e.computeValue(n,!1)}},F.proxyID=e.id,F.updateHelpTextOnValue=e=>`${F.helpText} (${P(null===e||void 0===e?void 0:e.label,"day")})`,F.condition=e=>!(""+e[S].value).match(/unknown/i)&&H(e),F.validation=(t,i,o)=>u["a"].required(t)?["Day is required for date"]:(T=!!(""+t.value).match(/unknown/i),s=T?"15":I(""+t.value),n=`${a}-${l}-${s}`,b(n,e,i,o)),F.defaultValue=t=>v(t,e,"Day"),F.computedValue=()=>e.computeValue(n,T),F.unload=(t,n,i,a)=>{e.unload&&e.unload(t,n,i,a)},F.beforeNext=(t,i)=>!e.beforeNext||e.beforeNext(n,i),F.config={year:e=>e[D].value,month:e=>e[S].value},C||(F.config.keyboardActions=[]);const V=(t,n)=>{const i=["Unknown"===t[D].value,!e.condition||e.condition(t),e.estimation.estimationFieldType===n];return i.every(Boolean)};return O.proxyID=e.id,O.validation=(t,i,a)=>{if(t&&t.value>300)return["Age estimate is too high and exceeding hard limit of 300"];if(isNaN(parseInt(t.value.toString())))return["Please enter a valid number"];const o=/^(12[0-7]|1[01][0-9]|[1-9]?[0-9])$/;if(!t.value.toString().match(o))return["Not a valid age estimate"];const r=c()(d["e"].getSessionDate()).subtract(t.value,"years").year();return n=r+"-07-15",b(n,e,i,a)},O.condition=e=>V(e,i.AGE_ESTIMATE_FIELD),O.computedValue=()=>e.computeValue(n,!0),O.beforeNext=(t,i)=>!e.beforeNext||e.beforeNext(n,i),g.proxyID=e.id,g.validation=(t,i,a)=>u["a"].required(t)?["Please select an estimate"]:(n=c()(d["e"].getSessionDate()).subtract(t.value,"day").format(r["a"]),b(n,e,i,a)),g.condition=e=>V(e,i.MONTH_ESTIMATE_FIELD),g.computedValue=()=>e.computeValue(n,!0),g.beforeNext=(t,i)=>!e.beforeNext||e.beforeNext(n,i),[A,L,F,O,g]}(function(e){e["AGE_ESTIMATE_FIELD"]="age-estimate-field",e["MONTH_ESTIMATE_FIELD"]="month-period-estimate-field"})(i||(i={}))},d95e:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return a})),function(e){e["TT_LINKAGE_CODE"]="LinkageCodeInput",e["TT_MULTI_SELECT_GRID"]="HisMultiSelectGrid",e["TT_AGE_INPUT"]="HisAgeInput",e["TT_GROUP_SELECTOR"]="HisGroupSelector",e["TT_DATA_TABLE"]="HisDataTable",e["TT_GRID_SELECTOR"]="HisGridSelector",e["TT_NOTE"]="HisNote",e["TT_BARCODE"]="HisBarcodeInput",e["TT_MONTHLY_DAYS"]="HisMonthlyDays",e["TT_TEXT"]="HisTextInput",e["TT_NUMBER"]="HisNumberInput",e["TT_DATETIME"]="datetime",e["TT_SELECT"]="HisSelect",e["TT_MULTIPLE_SELECT"]="HisMultipleSelect",e["TT_ART_REGIMEN_SELECTION"]="HisArtRegimenSelection",e["TT_NEXT_VISIT_INTERVAL_SELECTION"]="HisNextVisitInterval",e["TT_TABLE_VIEWER"]="HisTableViewer",e["TT_DOSAGE_INPUT"]="HisDosageInput",e["TT_YES_NO"]="YesNoSelect",e["TT_MULTIPLE_YES_NO"]="MultiYesNoSelect",e["TT_SUMMARY"]="HisSummary",e["TT_WEIGHT_CHART"]="HisWeightChart",e["TT_VITALS_ENTRY"]="HisVitalsEntry",e["TT_ADHERENCE_INPUT"]="HisAdherenceInput",e["TT_ART_STAGING_SUMMARY"]="ArtStagingSummary",e["TT_LAB_ORDERS"]="HisLabOrders",e["TT_APPOINTMENTS_ENTRY"]="HisAppointments",e["TT_DISPENSATION_INPUT"]="DrugDispensationSelection",e["TT_PROGRAM_SELECTION"]="ProgramSelection",e["TT_DATE_PICKER"]="HisDatePicker",e["TT_PERSON_RESULT_VIEW"]="PersonSearchView",e["TT_RELATION_SELECTION"]="RelationsSelection",e["TT_FILING_NUMBER_VIEW"]="FilingNumberView",e["TT_CARD_SELECTOR"]="HisCardSelector",e["TT_PERSON_MATCH_VIEW"]="PersonMatchView",e["TT_FULL_DATE"]="HisDateInput",e["TT_BATCH_ENTRY"]="HisBatchEntry",e["TT_BATCH_VERIFICATION"]="HisBatchVerification",e["TT_BATCH_MOVEMENT"]="HisBatchMovement",e["TT_COMPLAINTS_PICKER"]="HisComplaintsPicker",e["TT_RADIOLOGY_PICKER"]="HisRadiologyPicker",e["TT_IP_ADDRESS"]="HisIPAddress",e["TT_TEXT_BANNER"]="HisTextBanner",e["TT_DRUG_DISPENSER"]="GeneralDrugDispenser",e["TT_CLINIC_HOLIDAY_PICKER"]="HisClinicHolidayPicker",e["TT_ANC_PREGNANCY_INPUT_CONFIG"]="AncPregnancyInfoConfig",e["TT_ANC_PREGNANCY_DETAILS_INPUT"]="AncPregnancyDetailsInput",e["TT_ANC_LMP_DATE_INPUT"]="AncLmpDateInput",e["TT_ANC_DRUGSET_INPUT"]="AncDrugSetInput",e["TT_DRUG_TRANSFER_IN"]="DrugTransferInput",e["TT_PRESCRIPTION_INPUT"]="HisPrescriptionInput",e["TT_INFINITE_SCROLL_MULTIPLE_SELECT"]="HisInfiniteScrollMultipleSelect"}(i||(i={}));const a=[i.TT_LINKAGE_CODE,i.TT_MULTI_SELECT_GRID,i.TT_AGE_INPUT,i.TT_BARCODE,i.TT_NOTE,i.TT_SELECT,i.TT_CARD_SELECTOR,i.TT_MULTIPLE_SELECT,i.TT_TEXT,i.TT_NUMBER,i.TT_MONTHLY_DAYS,i.TT_ART_REGIMEN_SELECTION,i.TT_NEXT_VISIT_INTERVAL_SELECTION,i.TT_TABLE_VIEWER,i.TT_DOSAGE_INPUT,i.TT_YES_NO,i.TT_MULTIPLE_YES_NO,i.TT_WEIGHT_CHART,i.TT_VITALS_ENTRY,i.TT_APPOINTMENTS_ENTRY,i.TT_COMPLAINTS_PICKER,i.TT_CLINIC_HOLIDAY_PICKER,i.TT_SUMMARY,i.TT_ART_STAGING_SUMMARY,i.TT_ADHERENCE_INPUT,i.TT_LAB_ORDERS,i.TT_PERSON_RESULT_VIEW,i.TT_PROGRAM_SELECTION,i.TT_DATE_PICKER,i.TT_RELATION_SELECTION,i.TT_FILING_NUMBER_VIEW,i.TT_PERSON_MATCH_VIEW,i.TT_FULL_DATE,i.TT_BATCH_ENTRY,i.TT_BATCH_VERIFICATION,i.TT_BATCH_MOVEMENT,i.TT_IP_ADDRESS,i.TT_TEXT_BANNER,i.TT_DISPENSATION_INPUT,i.TT_DATA_TABLE,i.TT_GROUP_SELECTOR,i.TT_ANC_PREGNANCY_INPUT_CONFIG,i.TT_ANC_PREGNANCY_DETAILS_INPUT,i.TT_ANC_LMP_DATE_INPUT,i.TT_DRUG_TRANSFER_IN,i.TT_GRID_SELECTOR,i.TT_ANC_DRUGSET_INPUT,i.TT_RADIOLOGY_PICKER,i.TT_PRESCRIPTION_INPUT,i.TT_INFINITE_SCROLL_MULTIPLE_SELECT,i.TT_DRUG_DISPENSER]},f159:function(e,t,n){var i={"./AncDrugSetInput.vue":["c99f","TouchFormElement0"],"./AncLmpDateInput.vue":["101a","TouchFormElement1"],"./AncPregnancyDetailsInput.vue":["b043","TouchFormElement2"],"./AncPregnancyInfoConfig.vue":["262e","TouchFormElement3"],"./ArtStagingSummary.vue":["43db","TouchFormElement4"],"./BaseTextInput.vue":["36ad","TouchFormElement5"],"./DrugDispensationSelection.vue":["05d5","TouchFormElement6"],"./DrugTransferInput.vue":["de42","TouchFormElement7"],"./FieldMixin.vue":["51c8","TouchFormElement8"],"./FilingNumberView.vue":["c650","TouchFormElement9"],"./GeneralDrugDispenser.vue":["7737","TouchFormElement10"],"./HisAdherenceInput.vue":["f2c3","TouchFormElement11"],"./HisAgeInput.vue":["c05f","TouchFormElement12"],"./HisAppointments.vue":["b2eb","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement13"],"./HisArtRegimenSelection.vue":["47b9","TouchFormElement14"],"./HisBarcodeInput.vue":["dd65","TouchFormElement15"],"./HisBatchEntry.vue":["f2ab","chunk-fb7a1668","TouchFormElement16"],"./HisBatchMovement.vue":["5148","chunk-fb7a1668","TouchFormElement17"],"./HisBatchVerification.vue":["7b0f","chunk-fb7a1668","TouchFormElement18"],"./HisCardSelector.vue":["0734","TouchFormElement19"],"./HisClinicHolidayPicker.vue":["4030","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement20"],"./HisComplaintsPicker.vue":["82d1","TouchFormElement21"],"./HisDataTable.vue":["a6ba","TouchFormElement22"],"./HisDateInput.vue":["374c","TouchFormElement23"],"./HisDatePicker.vue":["9b30","TouchFormElement13~TouchFormElement20~TouchFormElement24","TouchFormElement24"],"./HisDosageInput.vue":["b34c","TouchFormElement25"],"./HisGridSelector.vue":["112a","TouchFormElement26"],"./HisGroupSelector.vue":["81cf","TouchFormElement27"],"./HisIPAddress.vue":["2a82","TouchFormElement28"],"./HisInfiniteScrollMultipleSelect.vue":["52a3","TouchFormElement29"],"./HisLabOrders.vue":["e614","TouchFormElement30"],"./HisMonthlyDays.vue":["69cf","TouchFormElement31"],"./HisMultiSelectGrid.vue":["0fa3","TouchFormElement32"],"./HisMultipleSelect.vue":["2fd5","chunk-45847ec4","TouchFormElement33"],"./HisNextVisitInterval.vue":["3126","TouchFormElement34"],"./HisNote.vue":["c927","TouchFormElement35"],"./HisNumberInput.vue":["5e75","TouchFormElement36"],"./HisPrescriptionInput.vue":["87e5","TouchFormElement37"],"./HisRadiologyPicker.vue":["adc7","chunk-3c642140","TouchFormElement38"],"./HisSelect.vue":["d11f","TouchFormElement39"],"./HisSummary.vue":["e0bd","TouchFormElement40"],"./HisTableViewer.vue":["8904","TouchFormElement41"],"./HisTextBanner.vue":["952c","TouchFormElement42"],"./HisTextInput.vue":["6ef9","TouchFormElement43"],"./HisVitalsEntry.vue":["e333","TouchFormElement44"],"./HisWeightChart.vue":["26a1","TouchFormElement45"],"./LinkageCodeInput.vue":["ac86","TouchFormElement46"],"./MultiYesNoSelect.vue":["5fd1","TouchFormElement47"],"./PersonMatchView.vue":["6591","TouchFormElement48"],"./PersonSearchView.vue":["28b2","TouchFormElement49"],"./ProgramSelection.vue":["e3b4","TouchFormElement50"],"./RelationsSelection.vue":["0e57","TouchFormElement51"],"./SelectMixin.vue":["82a9","TouchFormElement52"],"./YesNoSelect.vue":["71f2","TouchFormElement53"]};function a(e){if(!n.o(i,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],a=t[0];return Promise.all(t.slice(1).map(n.e)).then((function(){return n(a)}))}a.keys=function(){return Object.keys(i)},a.id="f159",e.exports=a}}]);
//# sourceMappingURL=chunk-6b484590.2d44943d.js.map